import React from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  MapPin,
  Star,
  Users,
  Calendar,
  Phone,
  Heart,
  Shield,
  ArrowLeft,
  ArrowRight,
  Copy,
  MessageCircle,
  Mail,
  MessageSquare,
  Twitter,
  Instagram,
  Facebook,
  Share2,
  Building2,
  Clock,
  DollarSign,
  User,
  BedDouble,
  FileText,
  Pencil,
  Eye,
  BookOpen,
} from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGetPropertyByIdQuery } from "@/rtk/api/showproperty";
import { toast } from "sonner";
import { useUpdatePropertyStatusMutation } from "@/rtk/api/convertToHost";
import { useSelector } from "react-redux";
import { RootState } from "@/rtk/store";

const fallbackImg =
  "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&h=600&fit=crop";

/** Format "14:00:00" -> "2:00 PM" */
function formatTime(timeStr: string | undefined): string {
  if (!timeStr) return "—";
  const [h, m] = timeStr.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, "0")} ${period}`;
}

/** Format ISO date for display */
function formatDate(iso: string | undefined): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

  const Skeleton = ({ className = "" }: { className?: string }) => (
    <div className={`animate-pulse bg-muted/60 ${className}`} />
  );
  
  const HealthHomeDetailsSkeleton = () => (
    <div className="min-h-screen bg-background">
      <Header activePage="health-homes" />
  
      <div className="w-full flex justify-center">
        <div className="w-[90%] origin-top scale-90">
      {/* Hero skeleton */}
      <section className="relative">
        <div className="container mx-auto px-3 sm:px-4 pt-4">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="w-full space-y-1.5">
              <Skeleton className="h-6 w-2/3 rounded-lg" />
              <div className="flex items-center gap-1.5">
                <Skeleton className="h-3 w-24 rounded-full" />
                <Skeleton className="h-3 w-32 rounded-full" />
                <Skeleton className="h-3 w-16 rounded-full" />
              </div>
            </div>

              <div className="hidden sm:flex items-center gap-2">
                <Skeleton className="h-4 w-12 rounded-md" />
                <Skeleton className="h-4 w-10 rounded-md" />
                <Skeleton className="h-7 w-[95px] rounded-full" />
              </div>
            </div>

            <div className="relative overflow-hidden rounded-xl">
              {/* Desktop */}
              <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-1.5 h-[320px] bg-muted">
                <Skeleton className="col-span-2 row-span-2 h-full w-full" />
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="col-span-1 row-span-1 h-full w-full" />
                ))}
              </div>

              {/* Mobile */}
              <div className="md:hidden h-[200px] bg-muted">
                <Skeleton className="h-full w-full" />
              </div>

              <div className="absolute bottom-2 right-2">
                <Skeleton className="h-8 w-32 rounded-lg" />
              </div>
            </div>
          </div>
        </section>

        {/* Body skeleton */}
        <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-5">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
            {/* Main */}
            <div className="lg:col-span-2 space-y-4">
              <Card className="rounded-xl">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-6 w-1/2 rounded-lg" />
                      <Skeleton className="h-4 w-1/3 rounded-full" />
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-3 w-16 rounded-full" />
                      <Skeleton className="h-4 w-24 rounded-full" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="flex items-center gap-2 rounded-lg border p-2.5">
                        <Skeleton className="h-6 w-6 rounded-full" />
                        <div className="flex-1 space-y-1.5">
                          <Skeleton className="h-2.5 w-16 rounded-full" />
                          <Skeleton className="h-3 w-28 rounded-full" />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-xl">
                <CardContent className="p-4 space-y-2">
                  <Skeleton className="h-4 w-36 rounded-lg" />
                  <Skeleton className="h-4 w-full rounded-full" />
                  <Skeleton className="h-4 w-11/12 rounded-full" />
                  <Skeleton className="h-4 w-10/12 rounded-full" />
                  <Skeleton className="h-4 w-9/12 rounded-full" />
                </CardContent>
              </Card>

              <Card className="rounded-xl">
                <CardContent className="p-4 space-y-3">
                  <Skeleton className="h-4 w-44 rounded-lg" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="flex items-center gap-2 rounded-lg border p-2.5">
                        <Skeleton className="h-6 w-6 rounded-full" />
                        <Skeleton className="h-3 w-28 rounded-full" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-3">
              <Card className="sticky top-20 rounded-xl shadow-lg">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-baseline gap-2">
                    <Skeleton className="h-6 w-24 rounded-full" />
                    <Skeleton className="h-8 w-28 rounded-full" />
                    <Skeleton className="h-4 w-28 rounded-full" />
                  </div>

                  <div className="rounded-lg border overflow-hidden">
                    <div className="grid grid-cols-2 border-b">
                      <div className="p-2.5 border-r space-y-1.5">
                        <Skeleton className="h-2.5 w-12 rounded-full" />
                        <Skeleton className="h-3 w-20 rounded-full" />
                        <Skeleton className="h-2.5 w-16 rounded-full" />
                      </div>
                      <div className="p-2.5 space-y-1.5">
                        <Skeleton className="h-2.5 w-12 rounded-full" />
                        <Skeleton className="h-3 w-20 rounded-full" />
                        <Skeleton className="h-2.5 w-16 rounded-full" />
                      </div>
                    </div>

                    <div className="p-2.5 flex items-center justify-between">
                      <div className="space-y-1.5">
                        <Skeleton className="h-2.5 w-12 rounded-full" />
                        <Skeleton className="h-3 w-16 rounded-full" />
                      </div>
                      <Skeleton className="h-7 w-20 rounded-md" />
                    </div>
                  </div>

                  <Skeleton className="h-8 w-full rounded-lg" />
                  <Skeleton className="h-10 w-full rounded-full" />
                  <Skeleton className="h-3 w-36 mx-auto rounded-full" />
                </CardContent>
              </Card>

              <div className="flex justify-center">
                <Skeleton className="h-3 w-36 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);



const HealthHomeDetails = () => {
  const navigate = useNavigate();
  const routerLocation = useLocation();
  const { id } = useParams();
  const [showGallery, setShowGallery] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [showShareDialog, setShowShareDialog] = React.useState(false);
  // ✅ dates (for now default)
  const [checkIn, setCheckIn] = React.useState("2026-03-13");
  const [checkOut, setCheckOut] = React.useState("2026-03-15");

  // ✅ guests dropdown UI
  const [guests, setGuests] = React.useState(1);


  // small formatter
  const formatShort = (iso: string) => {
    const d = new Date(iso);
    return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
  };

  const { data: property, isLoading, refetch, isFetching, isError } = useGetPropertyByIdQuery(id ?? "", {
    skip: !id,
  });

  const authUser = useSelector((state: RootState) => state.auth.user);

  const [updatePropertyStatus, { isLoading: isStatusUpdating }] =
    useUpdatePropertyStatusMutation();

  // local status for instant UI update
  const [localStatus, setLocalStatus] = React.useState<"active" | "inactive">(
    "inactive"
  );

  React.useEffect(() => {
    const s = (property?.status ?? "inactive").toLowerCase();
    setLocalStatus(s === "active" ? "active" : "inactive");
  }, [property?.status]);

  if (isLoading) return <HealthHomeDetailsSkeleton />;

  if (isError || !property) return <div className="p-6 text-red-500">Failed to load property</div>;

// Host view: from Profile or current user is the property host
const fromProfile = (routerLocation.state as { fromProfile?: boolean })?.fromProfile ?? false;
const isHostView =
  fromProfile || (!!authUser?.id && authUser.id === property?.host?.id);
const canToggleStatus =
  !!authUser?.id && authUser.id === property?.host?.id && fromProfile;

  // Share functionality
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = `Check out this health home: ${property.name || "Health Home"}`;

  const handleCopyUrl = async () => {
    try {
      if (currentUrl) {
        await navigator.clipboard.writeText(currentUrl);
        toast.success("URL copied to clipboard!");
        setShowShareDialog(false);
      }
    } catch (err) {
      toast.error("Failed to copy URL");
    }
  };

  const handleShareWhatsApp = () => {
    if (currentUrl) {
      const url = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${currentUrl}`)}`;
      window.open(url, "_blank");
      setShowShareDialog(false);
    }
  };

  const handleShareEmail = () => {
    if (currentUrl) {
      const subject = encodeURIComponent(shareText);
      const body = encodeURIComponent(`${shareText}\n\n${currentUrl}`);
      const url = `mailto:?subject=${subject}&body=${body}`;
      // Use window.location.href for mailto links to open email client
      window.location.href = url;
      setShowShareDialog(false);
    }
  };

  const handleShareMessages = () => {
    if (currentUrl) {
      // For SMS/Messages app
      const url = `sms:?body=${encodeURIComponent(`${shareText} ${currentUrl}`)}`;
      window.location.href = url;
      setShowShareDialog(false);
    }
  };

  const handleShareMessenger = () => {
    if (currentUrl) {
      // Facebook Messenger share - using send dialog
      // Note: This requires a Facebook App ID, but we'll use a fallback approach
      const url = `https://www.facebook.com/dialog/send?link=${encodeURIComponent(currentUrl)}&redirect_uri=${encodeURIComponent(currentUrl)}`;
      window.open(url, "_blank");
      setShowShareDialog(false);
    }
  };

  const handleShareTwitter = () => {
    if (currentUrl) {
      const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}`;
      window.open(url, "_blank");
      setShowShareDialog(false);
    }
  };

  const handleShareInstagram = () => {
    // Instagram doesn't support direct URL sharing via web browser
    // Best approach: Copy URL and show message
    if (currentUrl) {
      navigator.clipboard.writeText(currentUrl).then(() => {
        toast.success("URL copied! You can paste it in your Instagram post/story");
      }).catch(() => {
        toast.info("Please copy the URL manually and share on Instagram");
      });
      setShowShareDialog(false);
    } else {
      toast.info("Please share manually on Instagram");
      setShowShareDialog(false);
    }
  };

  const handleShareFacebook = () => {
    if (currentUrl) {
      const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
      window.open(url, "_blank");
      setShowShareDialog(false);
    }
  };

  const imageUrls =
    property.images?.length
      ? [
        ...property.images.filter((x) => x.isPrimary).map((x) => x.imageUrl),
        ...property.images.filter((x) => !x.isPrimary).map((x) => x.imageUrl),
      ]
      : [fallbackImg];

  const openGallery = (idx: number) => {
    setActiveIndex(idx);
    setShowGallery(true);
  };

  const handleNextImage = () => {
    if (imageUrls && imageUrls.length > 0 && activeIndex < imageUrls.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  const handlePreviousImage = () => {
    if (imageUrls && imageUrls.length > 0 && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  const location = [property.addressLine1, property.city].filter(Boolean).join(", ");
  const reviewCount = property._count?.reviews ?? 0;

  const activePricing =
    property.pricing?.find((p) => p.isActive) ?? property.pricing?.[0] ?? null;
  const pricePerNight =
    activePricing?.basePricePerNight ?? null;

  const amenities = property.amenities?.map((a) => a.amenity?.name).filter(Boolean) ?? [];
  const medicalAmenities =
    property.medicalAmenities?.map((m) => m.medicalAmenity?.title).filter(Boolean) ?? [];

  const phone = property.host?.phoneNumber ?? "N/A";


  // ✅ pricing helpers
  const nightly = pricePerNight ?? 0;
  const nights = Math.max(1, property.minStayNights || 1);
  const total = nightly * nights;

  const oldTotal = total ? Math.round(total * 1.4) : 0;

  const onToggleStatus = async () => {
    if (!property?.id) return;

    const nextStatus: "active" | "inactive" =
      localStatus === "active" ? "inactive" : "active";

    try {
      await updatePropertyStatus({
        propertyId: property.id,
        status: nextStatus,
      }).unwrap();

      setLocalStatus(nextStatus);

      toast.success("Status updated", {
        description: `Property is now ${nextStatus.toUpperCase()}`,
      });
      refetch();
      window.location.reload();
    } catch (err) {
      toast.error("Failed to update status");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header activePage="health-homes" />
      {isFetching && (
        <div className="fixed top-0 left-0 right-0 z-[90]">
          <div className="h-1 w-full bg-primary/30 animate-pulse" />
        </div>
      )}

      <div className="w-full flex flex-col lg:flex-row justify-center gap-4 px-3 sm:px-4 lg:px-6">
        <div className="w-full lg:w-[70%] origin-top scale-90 lg:scale-100">
      {/* Hero Carousel */}
          {/* ✅ Hero Image Grid (Airbnb style) */}
          <section className="relative">
            <div className="w-full mx-auto px-3 sm:px-4 lg:px-6 pt-4">
              {/* Back button */}
              <button
                type="button"
                onClick={() => {
                  if (fromProfile) {
                    navigate('/profile', { state: { activeTab: 'property' } });
                  } else {
                    navigate(-1);
                  }
                }}
                className="bg-primary text-white flex items-center gap-2 text-sm font-medium transition-colors mb-3 px-4 py-2 rounded-md hover:bg-primary/90"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back</span>
              </button>


              {/* Title row */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <h1 className="text-lg sm:text-xl md:text-2xl font-bold">
                    {property.name}
                  </h1>
                  <div className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{location}</span>
                    <span className="mx-0.5">•</span>
                    <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">New</span>
                    <span>({reviewCount})</span>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-2">
                    {isHostView ? (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 gap-1.5 text-xs"
                          onClick={() => navigate(`/become-provider?edit=${property.id}`, { state: { property } })}
                        >
                          <Pencil className="h-3.5 w-3.5" />
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 gap-1.5 text-xs"
                          onClick={() => navigate(`/health-home/${property.id}`)}
                        >
                          <Eye className="h-3.5 w-3.5" />
                          View as guest
                        </Button>
                      </>
                    ) : (
                      <button
                        onClick={() => setShowShareDialog(true)}
                        className="flex items-center gap-1 text-xs underline hover:text-primary transition-colors"
                      >
                        <Share2 className="h-3.5 w-3.5" />
                        Share
                      </button>
                    )}

                    {canToggleStatus && (
                      <button
                        type="button"
                        onClick={onToggleStatus}
                        disabled={isStatusUpdating}
                        aria-label="Toggle property status"
                        className={[
                          "relative w-[95px] h-7 rounded-full px-1.5 flex items-center border shadow-sm transition-colors",
                          localStatus === "active"
                            ? "bg-green-600 border-green-700"
                            : "bg-red-600 border-red-700",
                          isStatusUpdating ? "opacity-70 cursor-not-allowed" : "cursor-pointer",
                        ].join(" ")}
                      >
                        {/* Label */}
                        <span
                          className={[
                            "absolute text-[10px] font-semibold tracking-wide text-white",
                            localStatus === "active" ? "left-3" : "right-3",
                          ].join(" ")}
                        >
                          {localStatus === "active" ? "ACTIVE" : "INACTIVE"}
                        </span>

                      {/* Knob */}
                      <span
                        className={[
                          "h-5 w-5 rounded-full bg-white shadow transition-all",
                          localStatus === "active" ? "ml-auto" : "ml-0",
                        ].join(" ")}
                      />
                    </button>
                  )}
                </div>
              </div>

              {/* Grid */}
              <div className="relative overflow-hidden rounded-xl">
                {/* Desktop grid */}
                <div className="hidden md:grid grid-cols-4 grid-rows-2 min-h-[320px] h-[380px]">
                  {/* Big image */}
                  <button
                    type="button"
                    onClick={() => openGallery(0)}
                    className="col-span-2 row-span-2 overflow-hidden"
                  >
                    <img
                      src={imageUrls[0] ?? fallbackImg}
                      alt="Main"
                      className="h-full w-full object-cover hover:opacity-95 transition"
                    />
                  </button>

                  {/* 4 small images */}
                  {Array.from({ length: 4 }).map((_, i) => {
                    const idx = i + 1;
                    const src = imageUrls[idx] ?? imageUrls[0] ?? fallbackImg;

                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => openGallery(idx)}
                        className="col-span-1 row-span-1 overflow-hidden"
                      >
                        <img
                          src={src}
                          alt={`Thumb ${idx + 1}`}
                          className="h-full w-full object-cover hover:opacity-95 transition"
                        />
                      </button>
                    );
                  })}
                </div>

                {/* Mobile: show only big image */}
                <div className="md:hidden min-h-[220px] h-[280px]">
                  <button
                    type="button"
                    onClick={() => openGallery(0)}
                    className="h-full w-full overflow-hidden"
                  >
                    <img
                      src={imageUrls[0] ?? fallbackImg}
                      alt="Main"
                      className="h-full w-full object-cover"
                    />
                  </button>
                </div>

                {/* Show all photos button */}
                <button
                  type="button"
                  onClick={() => openGallery(0)}
                  className="absolute bottom-2 right-2 bg-white text-black rounded-lg px-3 py-1.5 shadow-md border flex items-center gap-1.5 text-xs font-medium"
                >
                  <span className="inline-block text-xs">☰</span>
                  Show all photos
                </button>
              </div>

              {/* Main Content: same width as image div, directly under it */}
              <div className="pt-4 sm:pt-5 pb-6">
                {isHostView ? (
              /* ——— Host view: property details dashboard ——— */
              <div className="w-full space-y-6">
                {/* Stats strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <Card className="rounded-xl">
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <BookOpen className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Bookings</p>
                        <p className="text-lg font-semibold">{property._count?.bookings ?? 0}</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="rounded-xl">
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                        <Star className="h-5 w-5 text-amber-600 fill-amber-500" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Reviews</p>
                        <p className="text-lg font-semibold">{property._count?.reviews ?? 0}</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="rounded-xl">
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                        <BedDouble className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Rooms</p>
                        <p className="text-lg font-semibold">{property.totalRooms}</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="rounded-xl">
                    <CardContent className="p-4 flex items-center gap-3">
                      <Badge
                        variant={localStatus === "active" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {localStatus.toUpperCase()}
                      </Badge>
                      <div>
                        <p className="text-xs text-muted-foreground">Status</p>
                        <p className="text-sm font-medium capitalize">{localStatus}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Host info */}
                {property.host && (
                  <Card className="rounded-xl">
                    <CardContent className="p-4 sm:p-5">
                      <h2 className="text-base font-semibold flex items-center gap-2 mb-3">
                        <User className="h-4 w-4" />
                        Host
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-muted-foreground text-xs">Name</p>
                          <p className="font-medium">{property.host.firstName} {property.host.lastName}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs">Email</p>
                          <p className="font-medium">{property.host.email}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs">Phone</p>
                          <p className="font-medium">{property.host.phoneNumber ?? "—"}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Location */}
                <Card className="rounded-xl">
                  <CardContent className="p-4 sm:p-5">
                    <h2 className="text-base font-semibold flex items-center gap-2 mb-3">
                      <MapPin className="h-4 w-4" />
                      Location
                    </h2>
                    <div className="text-sm text-muted-foreground space-y-0.5">
                      <p>{property.addressLine1}</p>
                      {property.addressLine2 && <p>{property.addressLine2}</p>}
                      <p>{[property.city, property.state, property.postalCode].filter(Boolean).join(", ")}</p>
                      <p>{property.country}</p>
                      {(property.latitude != null || property.longitude != null) && (
                        <p className="pt-1 text-xs">Coordinates: {property.latitude}, {property.longitude}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Stay policy */}
                <Card className="rounded-xl">
                  <CardContent className="p-4 sm:p-5">
                    <h2 className="text-base font-semibold flex items-center gap-2 mb-3">
                      <Clock className="h-4 w-4" />
                      Stay policy
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      <div className="flex justify-between py-1.5 border-b">
                        <span className="text-muted-foreground">Check-in</span>
                        <span className="font-medium">{formatTime(property.checkInTime)}</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b">
                        <span className="text-muted-foreground">Check-out</span>
                        <span className="font-medium">{formatTime(property.checkOutTime)}</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b">
                        <span className="text-muted-foreground">Min stay</span>
                        <span className="font-medium">{property.minStayNights} night(s)</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b">
                        <span className="text-muted-foreground">Max stay</span>
                        <span className="font-medium">{property.maxStayNights ?? "No limit"}</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b sm:col-span-2">
                        <span className="text-muted-foreground">Cancellation (full refund)</span>
                        <span className="font-medium">{property.cancellationPolicyDays} day(s) before</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Pricing */}
                {activePricing && (
                  <Card className="rounded-xl">
                    <CardContent className="p-4 sm:p-5">
                      <h2 className="text-base font-semibold flex items-center gap-2 mb-3">
                        <DollarSign className="h-4 w-4" />
                        Pricing
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                        <div className="flex justify-between py-1.5 border-b">
                          <span className="text-muted-foreground">Base price / night</span>
                          <span className="font-medium">{activePricing.currency} {activePricing.basePricePerNight?.toLocaleString("en-IN")}</span>
                        </div>
                        {activePricing.cleaningFee != null && (
                          <div className="flex justify-between py-1.5 border-b">
                            <span className="text-muted-foreground">Cleaning fee</span>
                            <span className="font-medium">{activePricing.currency} {activePricing.cleaningFee}</span>
                          </div>
                        )}
                        {activePricing.weekendMultiplier != null && (
                          <div className="flex justify-between py-1.5 border-b">
                            <span className="text-muted-foreground">Weekend multiplier</span>
                            <span className="font-medium">{activePricing.weekendMultiplier}x</span>
                          </div>
                        )}
                        {activePricing.seasonMultiplier != null && (
                          <div className="flex justify-between py-1.5 border-b">
                            <span className="text-muted-foreground">Season multiplier</span>
                            <span className="font-medium">{activePricing.seasonMultiplier}x</span>
                          </div>
                        )}
                        {activePricing.serviceFeePercentage != null && (
                          <div className="flex justify-between py-1.5 border-b">
                            <span className="text-muted-foreground">Service fee</span>
                            <span className="font-medium">{activePricing.serviceFeePercentage}%</span>
                          </div>
                        )}
                        {activePricing.taxPercentage != null && (
                          <div className="flex justify-between py-1.5 border-b">
                            <span className="text-muted-foreground">Tax</span>
                            <span className="font-medium">{activePricing.taxPercentage}%</span>
                          </div>
                        )}
                        <div className="flex justify-between py-1.5 border-b sm:col-span-2">
                          <span className="text-muted-foreground">Effective</span>
                          <span className="font-medium">{formatDate(activePricing.effectiveFrom)} {activePricing.effectiveTo ? `– ${formatDate(activePricing.effectiveTo)}` : "– ongoing"}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Overview */}
                <Card className="rounded-xl">
                  <CardContent className="p-4 sm:p-5">
                    <h2 className="text-base font-semibold flex items-center gap-2 mb-3">
                      <Building2 className="h-4 w-4" />
                      Overview
                    </h2>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">{property.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">{property.propertyType}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{property.description}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Images */}
                <Card className="rounded-xl">
                  <CardContent className="p-4 sm:p-5">
                    <h2 className="text-base font-semibold flex items-center gap-2 mb-3">
                      <FileText className="h-4 w-4" />
                      Photos ({property.images?.length ?? 0})
                    </h2>
                    {property.images?.length ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                        {property.images
                          .slice()
                          .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
                          .map((img) => (
                            <div key={img.id} className="relative rounded-lg overflow-hidden border aspect-square">
                              <img src={img.imageUrl} alt={img.caption ?? "Property"} className="h-full w-full object-cover" />
                              {img.isPrimary && (
                                <span className="absolute top-1 right-1 bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5 rounded">Primary</span>
                              )}
                              {img.caption && (
                                <p className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[10px] px-1.5 py-0.5 truncate">{img.caption}</p>
                              )}
                            </div>
                          ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No photos</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            ) : (
              /* ——— Guest view: listing with reserve sidebar ——— */
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
                <div className="lg:col-span-2 space-y-4">
                  <Card className="rounded-xl">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h2 className="text-lg font-semibold text-foreground">{property.name}</h2>
                          <p className="mt-0.5 text-xs text-muted-foreground">
                            Hosted by{" "}
                            <span className="font-medium text-foreground">
                              {property.host?.firstName} {property.host?.lastName}
                            </span>
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] text-muted-foreground">Contact</p>
                          <p className="text-xs font-medium">{property.host?.phoneNumber ?? "N/A"}</p>
                        </div>
                      </div>
                      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div className="flex items-center gap-2 rounded-lg border p-2.5">
                          <Users className="h-3.5 w-3.5 text-muted-foreground" />
                          <div>
                            <p className="text-[10px] text-muted-foreground">Rooms</p>
                            <p className="text-xs font-medium">{property.totalRooms} room(s)</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 rounded-lg border p-2.5">
                          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                          <div>
                            <p className="text-[10px] text-muted-foreground">Check-in / Check-out</p>
                            <p className="text-xs font-medium">
                              {formatTime(property.checkInTime)} • {formatTime(property.checkOutTime)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 rounded-lg border p-2.5">
                          <Shield className="h-3.5 w-3.5 text-muted-foreground" />
                          <div>
                            <p className="text-[10px] text-muted-foreground">Minimum stay</p>
                            <p className="text-xs font-medium">{property.minStayNights} night(s)</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 rounded-lg border p-2.5">
                          <Heart className="h-3.5 w-3.5 text-muted-foreground" />
                          <div>
                            <p className="text-[10px] text-muted-foreground">Cancellation policy</p>
                            <p className="text-xs font-medium">{property.cancellationPolicyDays} day(s)</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        <Badge variant="outline" className="rounded-full px-2 py-0.5 text-xs">
                          {property.status.toUpperCase()}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="rounded-xl">
                    <CardContent className="p-4">
                      <h3 className="text-base font-semibold mb-2">About this place</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-4">
                        {property.description}
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="rounded-xl">
                    <CardContent className="p-4">
                      <h3 className="text-base font-semibold mb-3 flex items-center gap-1.5">
                        <Shield className="h-4 w-4" />
                        Medical Amenities
                      </h3>
                      {medicalAmenities.length ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {medicalAmenities.map((x) => (
                            <div key={x} className="flex items-center gap-2 rounded-lg border p-2.5 text-xs">
                              <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-xs">✅</div>
                              <span className="text-foreground">{x}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-muted-foreground">No medical amenities</p>
                      )}
                    </CardContent>
                  </Card>
                  <Card className="rounded-xl">
                    <CardContent className="p-4">
                      <h3 className="text-base font-semibold mb-3 flex items-center gap-1.5">
                        <Heart className="h-4 w-4" />
                        What this place offers (Amenities)
                      </h3>
                      {amenities.length ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {amenities.map((x) => (
                            <div key={x} className="flex items-center gap-1.5 text-xs text-foreground">
                              <span className="text-muted-foreground">•</span>
                              <span>{x}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-muted-foreground">No amenities</p>
                      )}
                    </CardContent>
                  </Card>
                </div>
                <div className="space-y-3">
                  <Card className="sticky top-20 rounded-xl shadow-lg">
                    <CardContent className="p-4">
                      <div className="flex items-baseline gap-1.5 mb-3">
                        {oldTotal > 0 && (
                          <span className="text-muted-foreground line-through text-base">₹{oldTotal.toLocaleString("en-IN")}</span>
                        )}
                        <span className="text-xl font-bold text-foreground">₹{total ? total.toLocaleString("en-IN") : "--"}</span>
                        <span className="text-xs text-muted-foreground">for {nights} {nights === 1 ? "night" : "nights"}</span>
                      </div>
                      <div className="rounded-lg border overflow-hidden mb-3">
                        <div className="grid grid-cols-2 border-b">
                          <div className="p-2.5 border-r">
                            <div className="text-[10px] font-semibold uppercase">Check-in</div>
                            <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="mt-0.5 w-full text-xs outline-none bg-transparent" />
                            <div className="text-[10px] text-muted-foreground mt-0.5">{formatShort(checkIn)}</div>
                          </div>
                          <div className="p-2.5">
                            <div className="text-[10px] font-semibold uppercase">Checkout</div>
                            <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="mt-0.5 w-full text-xs outline-none bg-transparent" />
                            <div className="text-[10px] text-muted-foreground mt-0.5">{formatShort(checkOut)}</div>
                          </div>
                        </div>
                        <div className="p-2.5 flex items-center justify-between">
                          <div>
                            <div className="text-[10px] font-semibold uppercase">Guests</div>
                            <div className="text-xs text-foreground">{guests} guest</div>
                          </div>
                          <select value={guests} onChange={(e) => setGuests(Number(e.target.value))} className="text-xs border rounded-md px-1.5 py-0.5 bg-background">
                            {[1, 2, 3, 4, 5, 6].map((g) => (
                              <option key={g} value={g}>{g} guest{g > 1 ? "s" : ""}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="rounded-lg bg-muted/40 py-2 text-center text-xs text-foreground mb-3">
                        Free cancellation before <span className="font-medium">8 March</span>
                      </div>
                      <Button
                        className="w-full h-10 rounded-full text-sm font-semibold"
                        onClick={() => {
                          if (!authUser?.id) {
                            toast.error("Please sign in to reserve");
                            navigate("/auth", { state: { from: `/health-home/${property.id}`, reserveIntent: true, payload: { checkIn, checkOut, guests, propertyId: property.id } } });
                            return;
                          }
                          if (!checkIn || !checkOut) {
                            toast.error("Please select check-in and check-out dates");
                            return;
                          }
                          navigate(`/reserve/${property.id}`, { state: { checkIn, checkOut, guests } });
                        }}
                      >
                        Reserve
                      </Button>
                      <div className="mt-2 text-center text-xs text-muted-foreground">You won't be charged yet</div>
                    </CardContent>
                  </Card>
                  <button type="button" className="mx-auto flex items-center gap-1.5 text-xs text-muted-foreground underline hover:text-foreground" onClick={() => toast.success("Reported", { description: "Thanks for the report." })}>
                    <span className="text-sm">🏳️</span>
                    Report this listing
                  </button>
                </div>
              </div>
            )}
              </div>
            </div>
          </section>

      {/* Simple Lightbox Modal */}
          {showGallery && (
            <div className="fixed inset-0 z-[80] bg-black/80 flex items-start justify-center px-3 pt-20 md:pt-28 pb-8 md:pb-12 overflow-y-auto">
              <div className="relative w-full max-w-5xl mt-4 md:mt-8">
                <button
                  type="button"
                  onClick={() => setShowGallery(false)}
                  className="absolute -top-8 right-0 text-white bg-black/60 rounded-full w-8 h-8 flex items-center justify-center text-sm"
                  aria-label="Close"
                >
                  ✕
                </button>
                {imageUrls && imageUrls.length > 1 && (
                  <button
                    type="button"
                    onClick={handlePreviousImage}
                    disabled={activeIndex === 0}
                    className={`absolute left-3 top-1/2 -translate-y-1/2 text-white bg-black/60 rounded-full w-9 h-9 flex items-center justify-center hover:bg-black/80 transition-colors z-10 ${
                      activeIndex === 0 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                    }`}
                    aria-label="Previous image"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                )}
                {imageUrls && imageUrls.length > 1 && (
                  <button
                    type="button"
                    onClick={handleNextImage}
                    disabled={activeIndex === imageUrls.length - 1}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 text-white bg-black/60 rounded-full w-9 h-9 flex items-center justify-center hover:bg-black/80 transition-colors z-10 ${
                      activeIndex === imageUrls.length - 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                    }`}
                    aria-label="Next image"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                )}
                <div className="bg-black rounded-xl overflow-hidden">
                  <img
                    src={imageUrls[activeIndex] ?? fallbackImg}
                    alt="Preview"
                    className="w-full max-h-[75vh] object-contain"
                  />
                </div>
                <div className="mt-2 flex gap-1.5 overflow-x-auto pb-2">
                  {imageUrls.map((src, idx) => (
                    <button
                      key={src + idx}
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      className={[
                        "h-12 w-16 rounded-md overflow-hidden border",
                        idx === activeIndex ? "border-white" : "border-white/30 opacity-80",
                      ].join(" ")}
                    >
                      <img src={src} alt={`thumb-${idx}`} className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowGallery(false)}
                className="absolute inset-0 -z-10"
                aria-label="Close overlay"
              />
            </div>
          )}
        </div>

        {/* Amenities card - positioned in white space on the right */}
        {isHostView && (
          <div className="w-full lg:w-[25%] origin-top scale-90 lg:scale-100 pt-4 lg:pt-[110px] self-start">
            <div className="lg:sticky top-4 space-y-3">
              <Card className="rounded-xl">
                <CardContent className="p-4 sm:p-5">
                  <h2 className="text-base font-semibold flex items-center gap-2 mb-3">
                    <Heart className="h-4 w-4" />
                    Amenities
                  </h2>
                  {amenities.length ? (
                    <div className="flex flex-wrap gap-2">
                      {amenities.map((a) => (
                        <Badge key={a} variant="secondary" className="text-xs">
                          {a}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No amenities added</p>
                  )}
                </CardContent>
              </Card>

              {/* Medical amenities */}
              <Card className="rounded-xl">
                <CardContent className="p-4 sm:p-5">
                  <h2 className="text-base font-semibold flex items-center gap-2 mb-3">
                    <Shield className="h-4 w-4" />
                    Medical amenities
                  </h2>
                  {property.medicalAmenities?.length ? (
                    <div className="space-y-2">
                      {property.medicalAmenities.map((ma) => (
                        <div key={ma.medicalAmenityId} className="flex items-start justify-between gap-2 rounded-lg border p-3 text-sm">
                          <div>
                            <p className="font-medium">{ma.medicalAmenity?.title}</p>
                            {ma.notes && <p className="text-xs text-muted-foreground mt-0.5">{ma.notes}</p>}
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-muted-foreground text-xs">Qty</p>
                            <p className="font-medium">{ma.quantity}</p>
                            {ma.isAvailable !== undefined && (
                              <Badge variant={ma.isAvailable ? "default" : "secondary"} className="mt-1 text-[10px]">
                                {ma.isAvailable ? "Available" : "Unavailable"}
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No medical amenities added</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>

          {/* Share Dialog */}
          <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
            <DialogContent className="sm:max-w-md p-3 max-h-[70vh] overflow-y-auto">
              <DialogHeader className="pb-1.5">
                <DialogTitle className="text-base font-semibold">Share this place</DialogTitle>
              </DialogHeader>

              {/* Property Info */}
              <div className="flex gap-2 py-1.5 border-b">
                <img
                  src={imageUrls[0] ?? fallbackImg}
                  alt={property.name}
                  className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-xs truncate">{property.name}</h3>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Star className="h-2.5 w-2.5 fill-black text-black" />
                    <span className="text-[10px] text-muted-foreground">4.86</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    {property.totalRooms} bedroom · {property.totalRooms} bed · 1 private bathroom
                  </p>
                </div>
              </div>

          {/* Share Options */}
          <div className="grid grid-cols-2 gap-1.5 pt-1.5">
            <Button
              variant="outline"
              className="flex flex-col items-center gap-1 h-auto py-2 bg-gray-50 hover:bg-gray-100"
              onClick={handleCopyUrl}
            >
              <Copy className="h-3.5 w-3.5" />
              <span className="text-[10px]">Copy Link</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center gap-1 h-auto py-2 bg-gray-50 hover:bg-gray-100"
              onClick={handleShareEmail}
            >
              <Mail className="h-3.5 w-3.5" />
              <span className="text-[10px]">Email</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center gap-1 h-auto py-2 bg-gray-50 hover:bg-gray-100"
              onClick={handleShareMessages}
            >
              <MessageSquare className="h-3.5 w-3.5" />
              <span className="text-[10px]">Messages</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center gap-1 h-auto py-2 bg-gray-50 hover:bg-gray-100"
              onClick={handleShareWhatsApp}
            >
              <MessageCircle className="h-3.5 w-3.5 text-green-600" />
              <span className="text-[10px]">WhatsApp</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center gap-1 h-auto py-2 bg-gray-50 hover:bg-gray-100"
              onClick={handleShareMessenger}
            >
              <MessageSquare className="h-3.5 w-3.5 text-blue-600" />
              <span className="text-[10px]">Messenger</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center gap-1 h-auto py-2 bg-gray-50 hover:bg-gray-100"
              onClick={handleShareFacebook}
            >
              <Facebook className="h-3.5 w-3.5 text-blue-600" />
              <span className="text-[10px]">Facebook</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center gap-1 h-auto py-2 bg-gray-50 hover:bg-gray-100"
              onClick={handleShareTwitter}
            >
              <Twitter className="h-3.5 w-3.5" />
              <span className="text-[10px]">Twitter</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center gap-1 h-auto py-2 bg-gray-50 hover:bg-gray-100"
              onClick={handleShareInstagram}
            >
              <Instagram className="h-3.5 w-3.5 text-pink-600" />
              <span className="text-[10px]">Instagram</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HealthHomeDetails;
