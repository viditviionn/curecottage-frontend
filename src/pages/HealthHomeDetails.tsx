import React from "react";
import { useParams } from "react-router-dom";
import {
  MapPin,
  Star,
  Users,
  Calendar,
  Phone,
  Heart,
  Shield,
} from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useGetPropertyByIdQuery } from "@/rtk/api/showproperty";
import { toast } from "sonner";

const fallbackImg =
  "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&h=600&fit=crop";

const HealthHomeDetails = () => {
  const { id } = useParams();
  const [showGallery, setShowGallery] = React.useState(false);
const [activeIndex, setActiveIndex] = React.useState(0);
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

  const { data: property, isLoading, isError } = useGetPropertyByIdQuery(id ?? "", {
    skip: !id,
  });

  if (isLoading) return <div className="p-6 text-muted-foreground">Loading...</div>;
  if (isError || !property) return <div className="p-6 text-red-500">Failed to load property</div>;

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
const nights = Math.max(1, property.minStayNights || 1); // for UI demo (2 nights style)
const total = nightly * nights;

// optional: show a fake "old" price like Airbnb (example 40% higher)
const oldTotal = total ? Math.round(total * 1.4) : 0;

  return (
    <div className="min-h-screen bg-background">
      <Header activePage="health-homes" />

      {/* Hero Carousel */}
          {/* ✅ Hero Image Grid (Airbnb style) */}
          <section className="relative">
            <div className="container mx-auto px-3 sm:px-4 pt-6">
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
                  <button className="text-sm underline">Share</button>
                  <button className="text-sm underline">Save</button>
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
                  <Badge variant="secondary" className="rounded-full px-3 py-1">
                    {property.propertyType.toUpperCase()}
                  </Badge>
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
                  // onClick={() => {
                  //   toast.success("Reserve clicked", { description: "Booking flow coming soon." });
                  // }}
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
    </div>
  );
};

export default HealthHomeDetails;
