import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Upload, ArrowLeft, Heart, Info, Stethoscope, Users, Check } from 'lucide-react';
import Header from "@/components/Header";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { useUserProfileQuery } from '@/rtk/api/authApi';
import { Amenity, PropertyFull, useAddAmenitiesToPropertyMutation, useAddMedicalAmenitiesToPropertyMutation, useAddPropertyPricingMutation, useConvertToHostMutation, useCreatePropertyMutation, useGetAmenitiesQuery, useGetMedicalAmenitiesQuery, useGetPropertyByIdQuery, useGetPropertyImagesQuery, useSetPrimaryPropertyImageMutation, useUpdatePropertyMutation, useUpdatePropertyStatusMutation, useUploadPropertyImagesMutation } from '@/rtk/api/convertToHost';
import { Checkbox } from "@/components/ui/checkbox";

type PricingFormState = {
  basePricePerNight: number | "";
  currency: string;
  weekendMultiplier: number | "";
  seasonMultiplier: number | "";
  cleaningFee: number | "";
  serviceFeePercentage: number | "";
  taxPercentage: number | "";
  minStayNights: number | "";
  isActive: boolean;
};
type Step1Errors = Partial<Record<
  | "businessName"
  | "ownerName"
  | "email"
  | "phone"
  | "address"
  | "city"
  | "state"
  | "pincode"
  | "description",
  string
>>;
type Step2Errors = Partial<Record<
  | "amenities"
  | "medicalAmenities"
  // | "experience"
  // | "certifications"
  // | "pricing"
  | "Images",
  string
>>;
type Step3Errors = Partial<Record<
  | "basePricePerNight"
  | "weekendMultiplier"
  | "seasonMultiplier"
  | "cleaningFee"
  | "serviceFeePercentage"
  | "taxPercentage"
  | "minStayNights",
  string
>>;

const BecomeProvider = () => {
  const [searchParams] = useSearchParams();

  const [step1Errors, setStep1Errors] = useState<Step1Errors>({});
  const [step2Errors, setStep2Errors] = useState<Step2Errors>({});
  const [step3Errors, setStep3Errors] = useState<Step3Errors>({});


  const [formData, setFormData] = useState({
    serviceType: '',
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    description: '',
    facilities: [],
    pricing: '',
    experience: '',
    certifications: '',
    availability: ''
  });
  const [pricingData, setPricingData] = useState<PricingFormState>({
    basePricePerNight: "",
    currency: "INR",
    weekendMultiplier: "",
    seasonMultiplier: "",
    cleaningFee: "",
    serviceFeePercentage: "",
    taxPercentage: "",
    minStayNights: "",
    isActive: true,
  });
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [propertyId, setPropertyId] = useState<string | null>(null);
  const [photos, setPhotos] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [activePreview, setActivePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [selectedAmenityIds, setSelectedAmenityIds] = useState<string[]>([]);
  const [selectedMedicalAmenityIds, setSelectedMedicalAmenityIds] = useState<string[]>([]);
  const [selectedPrimaryImageId, setSelectedPrimaryImageId] = useState<string | null>(null);


  // Api parts
  const { data: profileRes, isLoading, error } = useUserProfileQuery();
  const [convertToHost, { isLoading: isConverting }] = useConvertToHostMutation();
  const [createProperty, { isLoading: isCreatingProperty }] = useCreatePropertyMutation();
  const {
    data: amenities = [],
    isLoading: amenitiesLoading,
    isError: amenitiesError,
  } = useGetAmenitiesQuery(undefined, { skip: step !== 2 });
  const {
    data: medicalAmenities = [],
    isLoading: medicalLoading,
    isError: medicalError,
  } = useGetMedicalAmenitiesQuery(undefined, { skip: step !== 2 });
  const [uploadPropertyImages, { isLoading: isUploadingImages }] = useUploadPropertyImagesMutation();
  const [addAmenitiesToProperty, { isLoading: isSavingAmenities }] = useAddAmenitiesToPropertyMutation();
  const [addMedicalAmenitiesToProperty, { isLoading: isSavingMedicalAmenities }] =
  useAddMedicalAmenitiesToPropertyMutation();
  const {
    data: propertyImages = [],
    isLoading: imagesLoading,
    isError: imagesError,
    refetch: refetchImages,
  } = useGetPropertyImagesQuery(propertyId as string, {
    skip: step !== 3 || !propertyId,
    refetchOnMountOrArgChange: true,
  });
  const [addPropertyPricing, { isLoading: isSavingPricing }] = useAddPropertyPricingMutation();
  const [setPrimaryPropertyImage, { isLoading: isSettingPrimary }] =
  useSetPrimaryPropertyImageMutation();
  const [updatePropertyStatus, { isLoading: isUpdatingStatus }] =
  useUpdatePropertyStatusMutation();

  const location = useLocation();
  
  const editId = searchParams.get("edit");       
  const isEditMode = !!editId;
  
  // optional state fallback (profile se pass hua)
  const stateProperty = (location.state as { property: PropertyFull })?.property as PropertyFull | undefined;
  const { data: fetchedProperty, isLoading: isLoadingProperty, isError: isErrorProperty } = useGetPropertyByIdQuery(editId as string, {
    skip: !isEditMode,
  });
  const editProperty = stateProperty || fetchedProperty;
  
  const [updateProperty, { isLoading: isUpdatingProperty }] = useUpdatePropertyMutation();

const profileUser = profileRes; 
const navigate = useNavigate();
const fileRef = React.useRef<HTMLInputElement | null>(null);

// validation part 
const validateStep1 = () => {
  const e: Step1Errors = {};

  if (!formData.businessName.trim()) e.businessName = "Health Home Name is required";
  if (!formData.ownerName.trim()) e.ownerName = "Owner/Contact Person Name is required";

  if (!formData.email.trim()) {
    e.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
    e.email = "Enter a valid email";
  }

  if (!formData.phone.trim()) {
    e.phone = "Phone number is required";
  } else if (!/^\d{10}$/.test(formData.phone.trim())) {
    e.phone = "Enter 10 digit phone number";
  }

  if (!formData.address.trim()) e.address = "Address is required";
  if (!formData.city.trim()) e.city = "City is required";
  if (!formData.state.trim()) e.state = "State is required";

  if (!formData.pincode.trim()) {
    e.pincode = "Pincode is required";
  } else if (!/^\d{6}$/.test(formData.pincode.trim())) {
    e.pincode = "Enter 6 digit pincode";
  }

  if (!formData.description.trim()) e.description = "Description is required";

  setStep1Errors(e);
  return Object.keys(e).length === 0;
};

const validateStep2 = () => {
  const e: Step2Errors = {};

  if (selectedAmenityIds.length === 0) {
    e.amenities = "Please select at least 1 property amenity";
  }
  if (selectedMedicalAmenityIds.length === 0) {
    e.medicalAmenities = "Please select at least 1 Medical amenity";
  }

  // if (!formData.experience.trim()) e.experience = "Medical Experience & Team is required";
  // if (!formData.certifications.trim()) e.certifications = "Medical Licenses & Certifications is required";
  // if (!formData.pricing.trim()) e.pricing = "Pricing & Packages is required";
  if (!photos.length) e.Images = "Please upload at least 1 property Image";
  setStep2Errors(e);
  return Object.keys(e).length === 0;
};
const validateStep3 = () => {
  const e: Step3Errors = {};

  if (pricingData.basePricePerNight === "" || Number(pricingData.basePricePerNight) <= 0)
    e.basePricePerNight = "Base price is required";

  if (pricingData.weekendMultiplier === "" || Number(pricingData.weekendMultiplier) <= 0)
    e.weekendMultiplier = "Weekend multiplier is required";

  if (pricingData.seasonMultiplier === "" || Number(pricingData.seasonMultiplier) <= 0)
    e.seasonMultiplier = "Season multiplier is required";

  if (pricingData.cleaningFee === "" || Number(pricingData.cleaningFee) < 0)
    e.cleaningFee = "Cleaning fee is required";

  if (pricingData.serviceFeePercentage === "" || Number(pricingData.serviceFeePercentage) < 0)
    e.serviceFeePercentage = "Service fee % is required";

  if (pricingData.taxPercentage === "" || Number(pricingData.taxPercentage) < 0)
    e.taxPercentage = "Tax % is required";

  if (pricingData.minStayNights === "" || Number(pricingData.minStayNights) <= 0)
    e.minStayNights = "Min stay nights is required";

  setStep3Errors(e);
  return Object.keys(e).length === 0;
};



useEffect(() => {
  if (!isEditMode || !editId) return;
  setPropertyId(editId); // ✅ important for later steps

  if (!editProperty) return;

  setFormData((prev) => ({
    ...prev,
    serviceType: prev.serviceType || "health-homes",
    businessName: editProperty.name ?? "",
    description: editProperty.description ?? "",
    address: editProperty.addressLine1 ?? "",
    city: editProperty.city ?? "",
    state: editProperty.state ?? "",
    pincode: editProperty.postalCode ?? "",
  }));
}, [isEditMode, editId, editProperty]);
// profile data fetching and autofill
useEffect(() => {
  if (!profileUser) return;

  const fullName = `${profileUser.firstName ?? ""} ${profileUser.lastName ?? ""}`.trim();

  setFormData((prev) => ({
    ...prev,

    ownerName: prev.ownerName || fullName,
    email: prev.email || profileUser.email || "",
    phone: prev.phone || profileUser.phoneNumber || "",

    serviceType: prev.serviceType || (profileUser?.hostDetails ? "health-homes" : "home-conversion"),
  }));
}, [profileUser]);

// useEffect part

  useEffect(() => {
    const serviceParam = searchParams.get('service');
    if (serviceParam) {
      setFormData(prev => ({ 
        ...prev, 
        serviceType: serviceParam
      }));
    }
  }, [searchParams]);
  useEffect(() => {
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previews]);

  useEffect(() => {
    if (step === 3 && propertyId) refetchImages();
  }, [step, propertyId, refetchImages]);
  useEffect(() => {
    if (step !== 3) return;
    if (!propertyImages?.length) return;
  
    const currentPrimary = propertyImages.find((x) => x.isPrimary);
    setSelectedPrimaryImageId(currentPrimary?.id ?? propertyImages[0].id);
  }, [step, propertyImages]);


  // logic parts 
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  
    // ✅ clear error for that field
    setStep1Errors(prev => {
      if (!(field in prev)) return prev;
      const copy = { ...prev };
      delete (copy as Record<string, string>)[field];
      return copy;
    });
    setStep2Errors((prev) => {
      if (!(field in prev)) return prev;
      const copy = { ...prev };
      delete (copy as Record<string, string>)[field];
      return copy;
    });
  };

  const toggleAmenity = (id: string, checked: boolean) => {
    setSelectedAmenityIds((prev) =>
      checked ? [...prev, id] : prev.filter((x) => x !== id)
    );
  
    // ✅ clear amenities error
    setStep2Errors((prev) => {
      if (!prev.amenities) return prev;
      const copy = { ...prev };
      delete copy.amenities;
      return copy;
    });
  };
  const toggleMedicalAmenity = (id: string, checked: boolean) => {
    setSelectedMedicalAmenityIds((prev) =>
      checked ? [...prev, id] : prev.filter((x) => x !== id)
    );
    setStep2Errors((prev) => {
      if (!prev.medicalAmenities) return prev;
      const copy = { ...prev };
      delete copy.medicalAmenities;
      return copy;
    });
  };
  const amenitiesByCategory = useMemo(() => {
    const allowed = new Set(["basic"]);
    const map = new Map<string, Amenity[]>();
  
    amenities.forEach((a) => {
      const key = (a.category || "other").toLowerCase();
      if (!allowed.has(key)) return;
  
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(a);
    });
  
    const order = ["basic"];
    return order
      .filter((k) => map.has(k))
      .map((k) => [k, map.get(k)!] as [string, Amenity[]]);
  }, [amenities]);
  
  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const ok = validateStep1();
    if (!ok) {
      toast({
        title: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }
  
    if (!profileUser?.id) {
      toast({ title: "User not found", variant: "destructive" });
      return;
    }
  
    setUploading(true);

    if (isEditMode) {
      if (!editId) return;
  
      try {
        const body = {
          name: formData.businessName,
          description: formData.description,
  
          // keep existing if available (otherwise defaults)
          propertyType: (editProperty as PropertyFull)?.propertyType ?? "cottage",
          totalRooms: (editProperty as PropertyFull)?.totalRooms ?? 1,
  
          addressLine1: formData.address,
          city: formData.city,
          state: formData.state,
          country: (editProperty as PropertyFull)?.country ?? "India",
          postalCode: formData.pincode,
  
          latitude: (editProperty as PropertyFull)?.latitude ?? 19.076,
          longitude: (editProperty as PropertyFull)?.longitude ?? 72.8777,
          checkInTime: (editProperty as PropertyFull)?.checkInTime ?? "14:00:00",
          checkOutTime: (editProperty as PropertyFull)?.checkOutTime ?? "12:00:00",
          minStayNights: (editProperty as PropertyFull)?.minStayNights ?? 1,
          cancellationPolicyDays: (editProperty as PropertyFull)?.cancellationPolicyDays ?? 7,
        };
  
        await updateProperty({ propertyId: editId, body }).unwrap();
  
        toast({ title: "Updated", description: "Property updated successfully ✅" });
  
        navigate("/profile"); // abhi edit only step-1
        return;
      } catch (err: unknown) {
        if (err instanceof Error) {
          toast({
            title: "Update failed",
            description: err.message || "Something went wrong",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Update failed",
            description: "Something went wrong",
            variant: "destructive",
          });
        }
      }
    }
  
    try {
      // 1) Convert to host (ignore "already host" type errors if needed)
      try {
        await convertToHost({ userId: profileUser.id }).unwrap();
      } catch (err: unknown) {
        if (err instanceof Error) {
          toast({
            title: "Failed",
            description: err.message || "Something went wrong",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Failed",
            description: "Something went wrong",
            variant: "destructive",
          });
        }
      }
  
      // 2) Create property
      const propertyPayload = {
        name: formData.businessName,
        description: formData.description,
        propertyType: "cottage",     
        totalRooms: 1,                
  
        addressLine1: formData.address,
        city: formData.city,
        state: formData.state,
        country: "India",
        postalCode: formData.pincode,
        latitude: 19.076,
        longitude: 72.8777,
        checkInTime: "14:00:00",
        checkOutTime: "12:00:00",
        minStayNights: 1,
        cancellationPolicyDays: 7,
      };
  
      const created = await createProperty(propertyPayload).unwrap();
  
      toast({
        title: "Success",
        description: "Host enabled + Property created successfully.",
      });
      setPropertyId(created?.data?.property?.id);
      setStep(2); 
  
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast({
          title: "Failed",
          description: err.message || "Something went wrong",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Failed",
          description: "Something went wrong",
          variant: "destructive",
        });
      }
    } finally {
      setUploading(false);
    }
  };
  const handleStep2Submit = async () => {
    if (!propertyId) {
      toast({ title: "Property not found", variant: "destructive" });
      return;
    }
    const ok = validateStep2();
  if (!ok) {
    toast({ title: "Please fill all required fields", variant: "destructive" });
    return;
  }
  
    if (selectedAmenityIds.length === 0) {
      toast({
        title: "Select at least 1 property amenity",
        variant: "destructive",
      });
      return;
    }
  
    try {
      // 1) Save property amenities
      const res1 = await addAmenitiesToProperty({
        propertyId,
        amenityIds: selectedAmenityIds,
      }).unwrap();
  
      // 2) Save medical amenities (optional — if none selected, skip)
      if (selectedMedicalAmenityIds.length > 0) {
        const res2 = await addMedicalAmenitiesToProperty({
          propertyId,
          medicalAmenityIds: selectedMedicalAmenityIds,
        }).unwrap();
  
        toast({
          title: "Saved successfully",
          description:
            (res2?.message || "Medical amenities saved") +
            " • " +
            (res1?.message || "Property amenities saved"),
        });
      } else {
        toast({
          title: "Property amenities saved",
          description: res1?.message || "Saved successfully",
        });
      }
      setStep(3);
      window.scrollTo({ top: 0, behavior: "smooth" });
  
      // ✅ yaha aage next page / navigation bhi kar sakte ho if needed
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast({
          title: "Failed to save amenities",
          description: err.message || "Something went wrong",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Failed to save amenities",
          description: "Something went wrong while saving amenities",
          variant: "destructive",
        });
      }
    }
  };
  
  const ALLOWED_IMAGE_TYPES = new Set([
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/gif",
  ]);
  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setStep2Errors((prev) => {
      if (!prev.Images) return prev;
      const copy = { ...prev };
      delete copy.Images;
      return copy;
    });
    const selected = Array.from(event.target.files || []);
    if (!selected.length) return;
  
    // ✅ validate types
    const validFiles = selected.filter((f) => ALLOWED_IMAGE_TYPES.has(f.type));
    const invalidFiles = selected.filter((f) => !ALLOWED_IMAGE_TYPES.has(f.type));
  
    // show error for invalid
    if (invalidFiles.length > 0) {
      toast({
        title: "Invalid file type",
        description:
          `Only JPG, JPEG, PNG, WEBP, GIF allowed.\nInvalid: ${invalidFiles
            .map((f) => f.name)
            .join(", ")}`,
        variant: "destructive",
      });
    }
  
    // if nothing valid -> stop
    if (validFiles.length === 0) {
      event.target.value = "";
      return;
    }
  
    if (!propertyId) {
      toast({ title: "Property not created yet", variant: "destructive" });
      event.target.value = "";
      return;
    }
  
    // previews for valid files only
    const newPreviews = validFiles.map((file) => URL.createObjectURL(file));
  
    setPhotos((prev) => [...prev, ...validFiles]);
    setPreviews((prev) => [...prev, ...newPreviews]);
  
    try {
      const res = await uploadPropertyImages({ propertyId, files: validFiles }).unwrap();
  
      toast({
        title: "Images uploaded",
        description: res?.message || `${validFiles.length} image(s) uploaded`,
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast({
          title: "Upload failed",
          description: err.message || "Something went wrong while uploading images",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Upload failed",
          description: "Something went wrong while uploading images",
          variant: "destructive",
        });
      }
  
      // (Optional) if upload fails, remove the previews we just added
      setPreviews((prev) => prev.slice(0, prev.length - newPreviews.length));
      setPhotos((prev) => prev.slice(0, prev.length - validFiles.length));
      newPreviews.forEach((u) => URL.revokeObjectURL(u));
    } finally {
      event.target.value = ""; // allow reselect same file
    }
  };
  
  const removePhotoAt = (index: number) => {
    setPreviews((prev) => {
      const url = prev[index];
      if (url) URL.revokeObjectURL(url); // cleanup
      return prev.filter((_, i) => i !== index);
    });
  
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  
    // if modal open for removed image -> close
    setActivePreview((curr) => {
      const removedUrl = previews[index];
      return curr === removedUrl ? null : curr;
    });
  };
  const handlePricingChange = (field: string, value: string | number | boolean) => {
    setPricingData((prev) => ({ ...prev, [field]: value }));
    setStep3Errors((prev) => {
      if (!(field in prev)) return prev;
      const copy = { ...prev };
      delete (copy as Record<string, string>)[field];
      return copy;
    });
  };

  const canSavePricing = useMemo(() => {
    return (
      pricingData.basePricePerNight !== "" &&
      pricingData.weekendMultiplier !== "" &&
      pricingData.seasonMultiplier !== "" &&
      pricingData.cleaningFee !== "" &&
      pricingData.serviceFeePercentage !== "" &&
      pricingData.taxPercentage !== "" &&
      pricingData.minStayNights !== ""
    );
  }, [pricingData]);

  const handleSavePricing = async () => {
    if (!propertyId) {
      toast({ title: "Property not found", variant: "destructive" });
      return;
    }
    const ok = validateStep3();
    if (!ok) {
      toast({ title: "Please fix pricing errors", variant: "destructive" });
      return;
    }
  
    if (propertyImages.length > 0 && !selectedPrimaryImageId) {
      toast({ title: "Please select a primary image", variant: "destructive" });
      return;
    }
  
    try {
      // 1) set primary image
      if (selectedPrimaryImageId) {
        await setPrimaryPropertyImage({ propertyId, imageId: selectedPrimaryImageId }).unwrap();
        await refetchImages();
      }
  
      // 2) save pricing
      await addPropertyPricing({
        propertyId,
        body: {
          basePricePerNight: Number(pricingData.basePricePerNight),
          currency: pricingData.currency,
          weekendMultiplier: Number(pricingData.weekendMultiplier),
          seasonMultiplier: Number(pricingData.seasonMultiplier),
          cleaningFee: Number(pricingData.cleaningFee),
          serviceFeePercentage: Number(pricingData.serviceFeePercentage),
          taxPercentage: Number(pricingData.taxPercentage),
          minStayNights: Number(pricingData.minStayNights),
          isActive: pricingData.isActive,
        },
      }).unwrap();
  
      // 3) ✅ update property status (active/inactive) — ONLY HERE
      await updatePropertyStatus({
        propertyId,
        status: "active",
      }).unwrap();
  
      toast({
        title: "Saved successfully",
        description: "Pricing saved + Status set to active",
      });
  
      navigate("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
      toast({
        title: "Failed",
        description: err.message || "Something went wrong",
        variant: "destructive",
      });
      } else {
        toast({
          title: "Failed",
          description: "Something went wrong",
        variant: "destructive",
      });
    } 
    }
  };
  
  
  


  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-shrink-0 flex items-center gap-2"
                style={{
                  backgroundColor: 'hsl(176.84deg 50.26% 37.06%)',
                  color: 'white',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'hsl(42.69deg 77.34% 44.61%)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'hsl(176.84deg 50.26% 37.06%)';
                }}
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back</span>
              </Button>
              <div className="flex-1 text-center">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
                  {formData.serviceType === 'health-homes' ? 'Be the Host' : 'List Your Service'}
                </h1>
                <p className="text-sm sm:text-base md:text-xl text-muted-foreground px-2">
                  {formData.serviceType === 'health-homes' 
                    ? 'Join our network of health home hosts and help patients recover in comfort in your specialized facility.'
                    : formData.serviceType === 'home-conversion'
                    ? 'Join our network of medical equipment providers and help families convert their homes into safe medical care environments.'
                    : 'Join our network and help provide quality healthcare services across India'
                  }
                </p>
              </div>
              <div className="w-10 flex-shrink-0"></div>
            </div>
          </div>

          <Card>
            <CardHeader className="pb-4 sm:pb-6">
            <CardTitle className="text-lg sm:text-xl">
              {step === 1 ? "Provider Registration Form" : step === 2 ? "Property Amenities *" : "Pricing & Fees"}
            </CardTitle>
            </CardHeader>

            <CardContent>
            {step === 1 && (
               <form onSubmit={handleStep1Submit} noValidate  className="space-y-4 sm:space-y-6">
                {/* Service Type */}
                <div className="space-y-3 sm:space-y-4">
                  <Label className="text-sm sm:text-base">Service Type *</Label>
                  <div className="">
                    <Button
                      type="button"
                      variant={formData.serviceType === 'health-homes' ? 'default' : 'outline'}
                      onClick={() => handleInputChange('serviceType', 'health-homes')}
                      className="h-16 w-full sm:h-24 flex flex-col justify-center"
                    >
                      <Heart className="h-5 w-5 sm:h-6 sm:w-6 mb-1 sm:mb-2" />
                      <span className="font-semibold text-sm sm:text-base">Health Home Host</span>
                      <span className="text-[10px] text-white sm:text-xs text-muted-foreground">Offer recovery accommodation</span>
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-1.5 sm:space-y-2">
                    <Label htmlFor="businessName" className="text-sm">
                      {formData.serviceType === 'health-homes' ? 'Health Home Name' : 
                       //   formData.serviceType === 'home-conversion' ? 'Business Name' : 
                       'Business or Property Name'} *
                    </Label>
                    <Input
                      id="businessName"
                      value={formData.businessName}
                      onChange={(e) => handleInputChange('businessName', e.target.value)}
                      placeholder='Enter your business or property name'
                      required
                      className="text-sm"
                    />
                    {step1Errors.businessName && (
                        <p className="text-xs text-red-500 mt-1">{step1Errors.businessName}</p>
                    )}
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    <Label htmlFor="ownerName" className="text-sm">Owner/Contact Person Name *</Label>
                    <Input
                      id="ownerName"
                      value={formData.ownerName}
                      onChange={(e) => handleInputChange('ownerName', e.target.value)}
                      placeholder="Enter your full name"
                      required
                      className="text-sm"
                    />
                    {step1Errors.ownerName && (
                      <p className="text-xs text-red-500 mt-1">{step1Errors.ownerName}</p>
                    )}
                  </div>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-1.5 sm:space-y-2">
                    <Label htmlFor="email" className="text-sm">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="your.email@example.com"
                      required
                      className="text-sm"
                    />
                    {step1Errors.email && (
                      <p className="text-xs text-red-500 mt-1">{step1Errors.email}</p>
                    )}
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    <Label htmlFor="phone" className="text-sm">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+91 9876543210"
                      required
                      className="text-sm"
                    />
                    {step1Errors.phone && (
                      <p className="text-xs text-red-500 mt-1">{step1Errors.phone}</p>
                    )}
                  </div>
                </div>

                {/* Address Information */}
               <div className="space-y-3 sm:space-y-4">
                  <div className="space-y-1.5 sm:space-y-2">
                    <Label htmlFor="address" className="text-sm">Complete Address *</Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="Enter complete address with landmarks"
                      required
                      className="text-sm"
                    />
                    {step1Errors.address && (
                      <p className="text-xs text-red-500 mt-1">{step1Errors.address}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    <div className="space-y-1.5 sm:space-y-2">
                      <Label htmlFor="city" className="text-sm">City *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        placeholder="City"
                        required
                        className="text-sm"
                      />
                      {step1Errors.city && (
                        <p className="text-xs text-red-500 mt-1">{step1Errors.city}</p>
                      )}
                    </div>

                    <div className="space-y-1.5 sm:space-y-2">
                      <Label htmlFor="state" className="text-sm">State *</Label>
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        placeholder="State"
                        required
                        className="text-sm"
                      />
                      {step1Errors.state && (
                        <p className="text-xs text-red-500 mt-1">{step1Errors.state}</p>
                      )}
                    </div>

                    <div className="space-y-1.5 sm:space-y-2">
                      <Label htmlFor="pincode" className="text-sm">Pincode *</Label>
                      <Input
                        id="pincode"
                        value={formData.pincode}
                        onChange={(e) => handleInputChange('pincode', e.target.value)}
                        placeholder="123456"
                        required
                        className="text-sm"
                      />
                      {step1Errors.pincode && (
                        <p className="text-xs text-red-500 mt-1">{step1Errors.pincode}</p>
                      )}
                    </div>
                  </div>

                  {/* Full width */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <Label htmlFor="description" className="text-sm">Health Home Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Describe your health home facilities, patient capacity, specializations, and care philosophy..."
                      rows={4}
                      required
                      className="w-full text-sm"
                    />
                    {step1Errors.description && (
                      <p className="text-xs text-red-500 mt-1">{step1Errors.description}</p>
                    )}
                  </div>
                  <div className="pt-6 flex justify-end">
                  <Button
                      type="submit"
                      size="lg"
                      disabled={
                        uploading ||
                        isConverting ||
                        isCreatingProperty ||
                        isUpdatingProperty ||
                        !formData.serviceType ||
                        !formData.businessName ||
                        !formData.ownerName ||
                        !formData.email ||
                        !formData.phone
                      }
                    >
                      {isEditMode
                        ? (isUpdatingProperty ? "Updating..." : "Update")
                        : (uploading || isConverting || isCreatingProperty ? "Please wait..." : "Next")}
                    </Button>
                </div>
                </div>
              </form>
               )}
              {step === 2 && (
                <div className="space-y-6">

                  {amenitiesLoading && <p>Loading amenities...</p>}
                  {amenitiesError && <p className="text-red-500">Failed to load amenities</p>}

                  {!amenitiesLoading && !amenitiesError && (
                    <div className="space-y-6">
                      {/* Category wise (optional) */}
                      {amenitiesByCategory.map(([category, list]) => (
                        <div key={category} className="space-y-3">

                          {/* ✅ White screenshot jaisa grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                          {list.map((a) => (
                              <div key={a.id} className="flex items-center gap-2">
                                <Checkbox
                                  id={a.id}
                                  checked={selectedAmenityIds.includes(a.id)}
                                  onCheckedChange={(checked) => toggleAmenity(a.id, !!checked)}
                                />
                                <Label htmlFor={a.id} className="text-sm">
                                  {a.name}
                                </Label>
                              </div>
                            ))}
                          </div>
                            {step2Errors.amenities && (
                              <p className="text-xs text-red-500 mt-2">{step2Errors.amenities}</p>
                            )}
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="pt-6">
                    <h2 className="text-lg font-semibold">Medical Amenities *</h2>

                    {medicalLoading && <p className="mt-3">Loading medical amenities...</p>}
                    {medicalError && <p className="mt-3 text-red-500">Failed to load medical amenities</p>}

                    {!medicalLoading && !medicalError && (
                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {medicalAmenities.map((m) => (
                          <label
                            key={m.id}
                            htmlFor={`med-${m.id}`}
                            className="flex items-center gap-2 cursor-pointer select-none"
                            title={m.description ?? ""}
                          >
                            <Checkbox
                              id={`med-${m.id}`}
                              checked={selectedMedicalAmenityIds.includes(m.id)}
                              onCheckedChange={(checked) => toggleMedicalAmenity(m.id, !!checked)}
                            />
                             <Label htmlFor={m.id} className="text-sm">
                                  {m.title}
                                </Label>
                          </label>
                        ))}
                         {step2Errors.medicalAmenities && (
                              <p className="text-xs text-red-500 mt-2">{step2Errors.medicalAmenities}</p>
                            )}
                      </div>
                      
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 ">
                          <div className="space-y-2">
                            <Label htmlFor="experience">Medical Experience & Team</Label>
                            <Textarea
                              id="experience"
                              value={formData.experience}
                              onChange={(e) => handleInputChange('experience', e.target.value)}
                              placeholder="Medical team qualifications, years of experience, specializations..."
                              rows={3}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="certifications">Medical Licenses & Certifications</Label>
                            <Textarea
                              id="certifications"
                              value={formData.certifications}
                              onChange={(e) => handleInputChange('certifications', e.target.value)}
                              placeholder="Medical licenses, healthcare registrations, accreditations..."
                              rows={3}
                              required
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="pricing">Pricing & Packages *</Label>
                            <Textarea
                              id="pricing"
                              value={formData.pricing}
                              onChange={(e) => handleInputChange('pricing', e.target.value)}
                              placeholder="Daily rates, package deals, insurance accepted..."
                              rows={3}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="availability">Availability & Capacity</Label>
                            <Textarea
                              id="availability"
                              value={formData.availability}
                              onChange={(e) => handleInputChange('availability', e.target.value)}
                              placeholder="Total capacity, current availability, admission process..."
                              rows={3}
                            />
                          </div>
                        </div>

                        <div className="space-y-3 pt-6">
                      <Label htmlFor="photos">Upload Photos (Property, Equipment, Facilities) *</Label>
                      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                        <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground mb-4">
                          Click to upload or drag and drop photos of your facility, equipment, and services
                        </p>
                        <Input
                          ref={fileRef}
                          type="file"
                          multiple
                          accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                          onChange={handlePhotoUpload}
                          className="hidden"
                        />
                        {step2Errors.Images && (
                          <p className="text-xs text-red-500 mt-2">{step2Errors.Images}</p>
                        )}
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => fileRef.current?.click()}
                        >
                          Choose Files
                        </Button>
                        {previews.length > 0 && (
                            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-left">
                              {previews.map((url, idx) => (
                                <div key={url} className="relative group">
                                  {/* ❌ remove */}
                                  <button
                                    type="button"
                                    onClick={() => removePhotoAt(idx)}
                                    className="absolute right-2 top-2 z-10 rounded-full bg-black/60 text-white w-7 h-7 flex items-center justify-center
                                              opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition"
                                    aria-label="Remove image"
                                  >
                                    ✕
                                  </button>

                                  {/* click to open */}
                                  <button
                                    type="button"
                                    className="w-full"
                                    onClick={() => setActivePreview(url)}
                                  >
                                    <img
                                      src={url}
                                      alt={`preview-${idx}`}
                                      className="h-24 w-full object-cover rounded-md border"
                                    />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                  </div>
                
                  {activePreview && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center">
                      {/* overlay */}
                      <button
                        type="button"
                        className="absolute inset-0 bg-black/70"
                        onClick={() => setActivePreview(null)}
                        aria-label="Close preview"
                      />

                      {/* content */}
                      <div className="relative z-[61] max-w-5xl w-[92%]">
                        <button
                          type="button"
                          onClick={() => setActivePreview(null)}
                          className="absolute -top-10 right-0 text-white bg-black/60 rounded-full w-9 h-9 flex items-center justify-center"
                          aria-label="Close"
                        >
                          ✕
                        </button>

                        <img
                          src={activePreview}
                          alt="Selected preview"
                          className="max-h-[80vh] w-full object-contain rounded-lg bg-black"
                        />
                      </div>
                    </div>
                  )}
                  <div className="flex  justify-end pt-2">

                    <Button
                      onClick={handleStep2Submit}
                      disabled={isSavingAmenities || isSavingMedicalAmenities}
                    >
                      {(isSavingAmenities || isSavingMedicalAmenities) ? "Saving..." : "Save & Continue"}
                    </Button>
                  </div>
                </div>
              )}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* basePricePerNight */}
                    <div className="space-y-2">
                      <Label>Base Price / Night</Label>
                      <Input
                        type="number"
                        value={pricingData.basePricePerNight}
                        onChange={(e) => handlePricingChange("basePricePerNight", e.target.value === "" ? "" : Number(e.target.value))}
                      />
                      {step3Errors.basePricePerNight && (
                        <p className="text-xs text-red-500 mt-1">{step3Errors.basePricePerNight}</p>
                      )}
                    </div>

                    {/* currency */}
                    <div className="space-y-2">
                      <Label>Currency</Label>
                      <Input
                        value={pricingData.currency}
                        onChange={(e) => handlePricingChange("currency", e.target.value)}
                        placeholder="INR"
                        disabled
                      />
                    </div>

                    {/* weekendMultiplier */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label>Weekend Multiplier</Label>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                type="button"
                                className="inline-flex h-5 w-5 items-center justify-center rounded-full border text-muted-foreground hover:text-foreground"
                                aria-label="Weekend multiplier info"
                              >
                                <Info className="h-3.5 w-3.5" />
                              </button>
                            </TooltipTrigger>

                            <TooltipContent side="top">
                              <p>This is a Weekend Multiplier</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>

                      <Input
                        type="number"
                        step="0.1"
                        value={pricingData.weekendMultiplier}
                        onChange={(e) =>
                          handlePricingChange("weekendMultiplier", Number(e.target.value))
                        }
                      />
                      {step3Errors.weekendMultiplier && (
                        <p className="text-xs text-red-500 mt-1">{step3Errors.weekendMultiplier}</p>
                      )}
                    </div>



                    {/* seasonMultiplier */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label>Season Multiplier</Label>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                type="button"
                                className="inline-flex h-5 w-5 items-center justify-center rounded-full border text-muted-foreground hover:text-foreground"
                                aria-label="Season multiplier info"
                              >
                                <Info className="h-3.5 w-3.5" />
                              </button>
                            </TooltipTrigger>

                            <TooltipContent side="top">
                              <p>This is a Season Multiplier</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>

                      <Input
                        type="number"
                        step="0.1"
                        value={pricingData.seasonMultiplier}
                        onChange={(e) =>
                          handlePricingChange("seasonMultiplier", Number(e.target.value))
                        }
                      />
                      {step3Errors.seasonMultiplier && (
                        <p className="text-xs text-red-500 mt-1">{step3Errors.seasonMultiplier}</p>
                      )}
                    </div>


                    {/* cleaningFee */}
                    <div className="space-y-2">
                      <Label>Cleaning Fee</Label>
                      <Input
                        type="number"
                        value={pricingData.cleaningFee}
                        onChange={(e) => handlePricingChange("cleaningFee", Number(e.target.value))}
                      />
                      {step3Errors.cleaningFee && (
                        <p className="text-xs text-red-500 mt-1">{step3Errors.cleaningFee}</p>
                      )}
                    </div>

                    {/* serviceFeePercentage */}
                    <div className="space-y-2">
                      <Label>Service Fee %</Label>
                      <Input
                        type="number"
                        value={pricingData.serviceFeePercentage}
                        onChange={(e) => handlePricingChange("serviceFeePercentage", Number(e.target.value))}
                      />
                      {step3Errors.serviceFeePercentage && (
                        <p className="text-xs text-red-500 mt-1">{step3Errors.serviceFeePercentage}</p>
                      )}
                    </div>

                    {/* taxPercentage */}
                    <div className="space-y-2">
                      <Label>Tax %</Label>
                      <Input
                        type="number"
                        value={pricingData.taxPercentage}
                        onChange={(e) => handlePricingChange("taxPercentage", Number(e.target.value))}
                      />
                      {step3Errors.taxPercentage && (
                        <p className="text-xs text-red-500 mt-1">{step3Errors.taxPercentage}</p>
                      )}
                    </div>

                    {/* minStayNights */}
                    <div className="space-y-2">
                      <Label>Min Stay Nights</Label>
                      <Input
                        type="number"
                        value={pricingData.minStayNights}
                        onChange={(e) => handlePricingChange("minStayNights", Number(e.target.value))}
                        onBlur={() => {
                          if (pricingData.minStayNights === "" || Number(pricingData.minStayNights) < 1) {
                            handlePricingChange("minStayNights", 1);
                          }
                        }}
                      />
                      {step3Errors.minStayNights && (
                        <p className="text-xs text-red-500 mt-1">{step3Errors.minStayNights}</p>
                      )}
                    </div>

                    {/* isActive */}
                    <div className="space-y-2 md:col-span-2 flex items-center gap-2">
                      <Checkbox
                        checked={pricingData.isActive}
                        onCheckedChange={(checked) => handlePricingChange("isActive", !!checked)}
                      />
                      <Label>Active</Label>
                    </div>
                  </div>
                  {/* ✅ Property Photos Section (below Active) */}
                  <div className="pt-6 border-t space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Property Photos</h3>

                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => refetchImages()}
                      >
                        Refresh
                      </Button>
                    </div>

                    {imagesLoading && <p className="text-sm text-muted-foreground">Loading images...</p>}
                    {imagesError && <p className="text-sm text-red-500">Failed to load images</p>}

                    {!imagesLoading && !imagesError && propertyImages.length === 0 && (
                      <p className="text-sm text-muted-foreground">No images uploaded yet.</p>
                    )}

                    {!imagesLoading && !imagesError && propertyImages.length > 0 && (
                     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                     {propertyImages.map((img) => {
                       const isSelected = selectedPrimaryImageId === img.id;
                   
                       return (
                         <button
                           key={img.id}
                           type="button"
                           onClick={() => setSelectedPrimaryImageId(img.id)} // ✅ select only one
                           onDoubleClick={() => setActivePreview(img.imageUrl)} // ✅ optional: preview on double click
                           className={[
                             "relative rounded-md border overflow-hidden",
                             "transition-all duration-200 ease-out",
                             isSelected ? "-translate-y-2 shadow-lg ring-2 ring-primary" : "hover:-translate-y-1 hover:shadow",
                           ].join(" ")}
                         >
                           <img
                             src={img.imageUrl}
                             alt="Property"
                             className="h-24 w-full object-cover"
                           />
                   
                           {/* Selected badge */}
                           {isSelected && (
                             <span className="absolute left-2 top-2 text-[10px] px-2 py-1 rounded bg-primary text-primary-foreground">
                               Selected
                             </span>
                           )}
                   
                           {/* Already primary badge */}
                           {img.isPrimary && !isSelected && (
                             <span className="absolute left-2 top-2 text-[10px] px-2 py-1 rounded bg-black/60 text-white">
                               Primary
                             </span>
                           )}
                         </button>
                       );
                     })}
                   </div>                   
                    )}
                  </div>


                  <div className="flex justify-end pt-4">
                  <Button
                      onClick={handleSavePricing}
                      disabled={isSavingPricing || isSettingPrimary || isUpdatingStatus || !canSavePricing}
                    >
                      {(isSavingPricing || isSettingPrimary || isUpdatingStatus) ? "Saving..." : "Save Pricing"}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BecomeProvider;