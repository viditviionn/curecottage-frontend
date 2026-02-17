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
  Copy,
  MessageCircle,
  Instagram,
  Facebook,
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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useGetPropertyByIdQuery } from "@/rtk/api/showproperty";
import { toast } from "sonner";
import { useUpdatePropertyStatusMutation } from "@/rtk/api/convertToHost";
import { useSelector } from "react-redux";
import { RootState } from "@/rtk/store";

const fallbackImg =
  "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&h=600&fit=crop";

  const Skeleton = ({ className = "" }: { className?: string }) => (
    <div className={`animate-pulse bg-muted/60 ${className}`} />
  );
  
  const HealthHomeDetailsSkeleton = () => (
    <div className="min-h-screen bg-background">
      <Header activePage="health-homes" />
  
      {/* Hero skeleton */}
      <section className="relative">
        <div className="container mx-auto px-3 sm:px-4 pt-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="w-full space-y-2">
              <Skeleton className="h-8 w-2/3 rounded-lg" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-28 rounded-full" />
                <Skeleton className="h-4 w-40 rounded-full" />
                <Skeleton className="h-4 w-20 rounded-full" />
              </div>
            </div>
  
            <div className="hidden sm:flex items-center gap-3">
              <Skeleton className="h-5 w-14 rounded-md" />
              <Skeleton className="h-5 w-12 rounded-md" />
              <Skeleton className="h-9 w-[110px] rounded-full" />
            </div>
          </div>
  
          <div className="relative overflow-hidden rounded-2xl">
            {/* Desktop */}
            <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-2 h-[420px] bg-muted">
              <Skeleton className="col-span-2 row-span-2 h-full w-full" />
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="col-span-1 row-span-1 h-full w-full" />
              ))}
            </div>
  
            {/* Mobile */}
            <div className="md:hidden h-[240px] bg-muted">
              <Skeleton className="h-full w-full" />
            </div>
  
            <div className="absolute bottom-3 right-3">
              <Skeleton className="h-10 w-40 rounded-xl" />
            </div>
          </div>
        </div>
      </section>
  
      {/* Body skeleton */}
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Main */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="rounded-2xl">
              <CardContent className="p-6 space-y-5">
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
  
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-2 rounded-xl border p-3">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-3 w-20 rounded-full" />
                        <Skeleton className="h-4 w-36 rounded-full" />
                      </div>
                    </div>
                  ))}
                </div>
  
                <div className="flex flex-wrap gap-2">
                  <Skeleton className="h-7 w-24 rounded-full" />
                  <Skeleton className="h-7 w-24 rounded-full" />
                </div>
              </CardContent>
            </Card>
  
            <Card className="rounded-2xl">
              <CardContent className="p-6 space-y-3">
                <Skeleton className="h-5 w-44 rounded-lg" />
                <Skeleton className="h-4 w-full rounded-full" />
                <Skeleton className="h-4 w-11/12 rounded-full" />
                <Skeleton className="h-4 w-10/12 rounded-full" />
                <Skeleton className="h-4 w-9/12 rounded-full" />
              </CardContent>
            </Card>
  
            <Card className="rounded-2xl">
              <CardContent className="p-6 space-y-4">
                <Skeleton className="h-5 w-56 rounded-lg" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-2 rounded-xl border p-3">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <Skeleton className="h-4 w-32 rounded-full" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
  
          {/* Sidebar */}
          <div className="space-y-4">
            <Card className="sticky top-24 rounded-2xl shadow-lg">
              <CardContent className="p-6 space-y-5">
                <div className="flex items-baseline gap-2">
                  <Skeleton className="h-6 w-24 rounded-full" />
                  <Skeleton className="h-8 w-28 rounded-full" />
                  <Skeleton className="h-4 w-28 rounded-full" />
                </div>
  
                <div className="rounded-xl border overflow-hidden">
                  <div className="grid grid-cols-2 border-b">
                    <div className="p-3 border-r space-y-2">
                      <Skeleton className="h-3 w-16 rounded-full" />
                      <Skeleton className="h-4 w-24 rounded-full" />
                      <Skeleton className="h-3 w-20 rounded-full" />
                    </div>
                    <div className="p-3 space-y-2">
                      <Skeleton className="h-3 w-16 rounded-full" />
                      <Skeleton className="h-4 w-24 rounded-full" />
                      <Skeleton className="h-3 w-20 rounded-full" />
                    </div>
                  </div>
  
                  <div className="p-3 flex items-center justify-between">
                    <div className="space-y-2">
                      <Skeleton className="h-3 w-16 rounded-full" />
                      <Skeleton className="h-4 w-20 rounded-full" />
                    </div>
                    <Skeleton className="h-8 w-24 rounded-md" />
                  </div>
                </div>
  
                <Skeleton className="h-10 w-full rounded-xl" />
                <Skeleton className="h-12 w-full rounded-full" />
                <Skeleton className="h-4 w-40 mx-auto rounded-full" />
              </CardContent>
            </Card>
  
            <div className="flex justify-center">
              <Skeleton className="h-4 w-44 rounded-full" />
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


const openGallery = (idx: number) => {
  setActiveIndex(idx);
  setShowGallery(true);
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

// show only to host owner AND when navigating from profile page
const fromProfile = (routerLocation.state as { fromProfile?: boolean })?.fromProfile ?? false;
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

  const handleShareInstagram = () => {
    // Instagram doesn't support direct URL sharing, so we'll copy URL and show message
    handleCopyUrl();
    toast.info("URL copied! You can paste it in your Instagram post/story");
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

  const location = [property.addressLine1, property.city].filter(Boolean).join(", ");
  const reviewCount = property._count?.reviews ?? 0;

  const pricePerNight =
    property.pricing?.find((p) => p.isActive)?.basePricePerNight ??
    property.pricing?.[0]?.basePricePerNight ??
    null;

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

      {/* Hero Carousel */}
          {/* ✅ Hero Image Grid (Airbnb style) */}
          <section className="relative">
            <div className="container mx-auto px-3 sm:px-4 pt-6">
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
                className="hover:bg-primary bg-primary text-white flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4 p-1 hover:rounded-md rounded-md"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </button>
              
              {/* Title row */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
                    {property.name}
                  </h1>
                  <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{location}</span>
                    <span className="mx-1">•</span>
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">New</span>
                    <span>({reviewCount})</span>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-3">
                    <button 
                      onClick={() => setShowShareDialog(true)}
                      className="text-sm underline hover:text-primary transition-colors"
                    >
                      Share
                    </button>

                    {canToggleStatus && (
                      <button
                        type="button"
                        onClick={onToggleStatus}
                        disabled={isStatusUpdating}
                        aria-label="Toggle property status"
                        className={[
                          "relative w-[110px] h-9 rounded-full px-2 flex items-center border shadow-sm transition-colors",
                          localStatus === "active"
                            ? "bg-green-600 border-green-700"
                            : "bg-red-600 border-red-700",
                          isStatusUpdating ? "opacity-70 cursor-not-allowed" : "cursor-pointer",
                        ].join(" ")}
                      >
                        {/* Label */}
                        <span
                          className={[
                            "absolute text-[11px] font-semibold tracking-wide text-white",
                            localStatus === "active" ? "left-4" : "right-4",
                          ].join(" ")}
                        >
                          {localStatus === "active" ? "ACTIVE" : "INACTIVE"}
                        </span>

                        {/* Knob */}
                        <span
                          className={[
                            "h-7 w-7 rounded-full bg-white shadow transition-all",
                            localStatus === "active" ? "ml-auto" : "ml-0",
                          ].join(" ")}
                        />
                      </button>
                    )}
                  </div>
              </div>

              {/* Grid */}
              <div className="relative overflow-hidden rounded-2xl">
                {/* Desktop grid */}
                <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-2 h-[420px] bg-muted">
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
                <div className="md:hidden h-[240px] bg-muted">
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
                  className="absolute bottom-3 right-3 bg-white text-black rounded-xl px-4 py-2 shadow-md border flex items-center gap-2 text-sm font-medium"
                >
                  <span className="inline-block">☰</span>
                  Show all photos
                </button>
              </div>
            </div>
          </section>

          {/* ✅ Simple Lightbox Modal */}
          {showGallery && (
            <div className="fixed inset-0 z-[80] bg-black/80 flex items-center justify-center px-3">
              <div className="relative w-full max-w-5xl">
                {/* Close */}
                <button
                  type="button"
                  onClick={() => setShowGallery(false)}
                  className="absolute -top-10 right-0 text-white bg-black/60 rounded-full w-9 h-9 flex items-center justify-center"
                  aria-label="Close"
                >
                  ✕
                </button>

                {/* Image */}
                <div className="bg-black rounded-xl overflow-hidden">
                  <img
                    src={imageUrls[activeIndex] ?? fallbackImg}
                    alt="Preview"
                    className="w-full max-h-[75vh] object-contain"
                  />
                </div>

                {/* Thumbnails */}
                <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
                  {imageUrls.map((src, idx) => (
                    <button
                      key={src + idx}
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      className={[
                        "h-16 w-24 rounded-lg overflow-hidden border",
                        idx === activeIndex ? "border-white" : "border-white/30 opacity-80",
                      ].join(" ")}
                    >
                      <img src={src} alt={`thumb-${idx}`} className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Click outside close */}
              <button
                type="button"
                onClick={() => setShowGallery(false)}
                className="absolute inset-0 -z-10"
                aria-label="Close overlay"
              />
            </div>
          )}


      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
         {/* Main */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">
                      {property.name}
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Hosted by{" "}
                      <span className="font-medium text-foreground">
                        {property.host?.firstName} {property.host?.lastName}
                      </span>
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Contact</p>
                    <p className="text-sm font-medium">{property.host?.phoneNumber ?? "N/A"}</p>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 rounded-xl border p-3">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Rooms</p>
                      <p className="text-sm font-medium">{property.totalRooms} room(s)</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 rounded-xl border p-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Check-in / Check-out</p>
                      <p className="text-sm font-medium">
                        {property.checkInTime} • {property.checkOutTime}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 rounded-xl border p-3">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Minimum stay</p>
                      <p className="text-sm font-medium">{property.minStayNights} night(s)</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 rounded-xl border p-3">
                    <Heart className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Cancellation policy</p>
                      <p className="text-sm font-medium">
                        {property.cancellationPolicyDays} day(s)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {/* <Badge variant="outline" className="rounded-full px-3 py-1">
                    {property.propertyType.toUpperCase()}
                  </Badge> */}
                  <Badge variant="outline" className="rounded-full px-3 py-1">
                    {property.status.toUpperCase()}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* ✅ Description */}
            <Card className="rounded-2xl">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3">About this place</h3>

                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed line-clamp-4">
                  {property.description}
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Medical Amenities
                </h3>

                {medicalAmenities.length ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {medicalAmenities.map((x) => (
                      <div
                        key={x}
                        className="flex items-center gap-2 rounded-xl border p-3 text-sm"
                      >
                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                          ✅
                        </div>
                        <span className="text-foreground">{x}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No medical amenities</p>
                )}
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  What this place offers (Amenities)
                </h3>

                {amenities.length ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {amenities.map((x) => (
                      <div
                        key={x}
                        className="flex items-center gap-2 text-sm text-foreground"
                      >
                        <span className="text-muted-foreground">•</span>
                        <span>{x}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No amenities</p>
                )}

                {amenities.length > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    className="mt-5 rounded-xl"
                    onClick={() =>
                      toast.success("All amenities", {
                        description: amenities.join(", "),
                      })
                    }
                  >
                    Show all {amenities.length} amenities
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <Card className="sticky top-24 rounded-2xl shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-baseline gap-2 mb-5">
                  {oldTotal > 0 && (
                    <span className="text-muted-foreground line-through text-xl">
                      ₹{oldTotal.toLocaleString("en-IN")}
                    </span>
                  )}
                  <span className="text-2xl font-bold text-foreground">
                    ₹{total ? total.toLocaleString("en-IN") : "--"}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    for {nights} {nights === 1 ? "night" : "nights"}
                  </span>
                </div>

                <div className="rounded-xl border overflow-hidden mb-4">
                  {/* Dates */}
                  <div className="grid grid-cols-2 border-b">
                    <div className="p-3 border-r">
                      <div className="text-[11px] font-semibold uppercase">Check-in</div>
                      <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="mt-1 w-full text-sm outline-none bg-transparent"
                      />
                      <div className="text-xs text-muted-foreground mt-1">
                        {formatShort(checkIn)}
                      </div>
                    </div>

                    <div className="p-3">
                      <div className="text-[11px] font-semibold uppercase">Checkout</div>
                      <input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="mt-1 w-full text-sm outline-none bg-transparent"
                      />
                      <div className="text-xs text-muted-foreground mt-1">
                        {formatShort(checkOut)}
                      </div>
                    </div>
                  </div>

                  {/* Guests */}
                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <div className="text-[11px] font-semibold uppercase">Guests</div>
                      <div className="text-sm text-foreground">{guests} guest</div>
                    </div>

                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="text-sm border rounded-md px-2 py-1 bg-background"
                    >
                      {[1, 2, 3, 4, 5, 6].map((g) => (
                        <option key={g} value={g}>
                          {g} guest{g > 1 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="rounded-xl bg-muted/40 py-3 text-center text-sm text-foreground mb-5">
                  Free cancellation before <span className="font-medium">8 March</span>
                </div>

                <Button
                  className="w-full h-12 rounded-full text-base font-semibold"
                  onClick={() => {
                    // ✅ 1) must be logged in
                    if (!authUser?.id) {
                      toast.error("Please sign in to reserve");

                      navigate("/auth", {
                        state: {
                          from: `/health-home/${property.id}`, // or use location.pathname (better)
                          reserveIntent: true,
                          payload: { checkIn, checkOut, guests, propertyId: property.id },
                        },
                      });

                      return;
                    }

                    // ✅ 2) basic guard
                    if (!checkIn || !checkOut) {
                      toast.error("Please select check-in and check-out dates");
                      return;
                    }

                    // ✅ 3) logged-in flow unchanged
                    navigate(`/reserve/${property.id}`, {
                      state: { checkIn, checkOut, guests },
                    });
                  }}
                >
                  Reserve
                </Button>

                <div className="mt-3 text-center text-sm text-muted-foreground">
                  You won't be charged yet
                </div>
              </CardContent>
            </Card>
            <button
              type="button"
              className="mx-auto flex items-center gap-2 text-sm text-muted-foreground underline hover:text-foreground"
              onClick={() => toast.success("Reported", { description: "Thanks for the report." })}
            >
              <span className="text-base">🏳️</span>
              Report this listing
            </button>
          </div>
        </div>
      </div>

      {/* Share Dialog */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share this property</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <Button
              variant="outline"
              className="flex flex-col items-center gap-2 h-auto py-4"
              onClick={handleCopyUrl}
            >
              <Copy className="h-6 w-6" />
              <span>Copy URL</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center gap-2 h-auto py-4"
              onClick={handleShareWhatsApp}
            >
              <MessageCircle className="h-6 w-6 text-green-600" />
              <span>WhatsApp</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center gap-2 h-auto py-4"
              onClick={handleShareInstagram}
            >
              <Instagram className="h-6 w-6 text-pink-600" />
              <span>Instagram</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center gap-2 h-auto py-4"
              onClick={handleShareFacebook}
            >
              <Facebook className="h-6 w-6 text-blue-600" />
              <span>Facebook</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HealthHomeDetails;
