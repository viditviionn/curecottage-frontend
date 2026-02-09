import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MapPin, Shield, Calendar, Users } from "lucide-react";
import { toast } from "sonner";
import { useGetPropertyByIdQuery } from "@/rtk/api/showproperty";

type ReserveState = {
  checkIn?: string;
  checkOut?: string;
  guests?: number;
};

const fallbackImg =
  "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&h=600&fit=crop";

function diffNights(checkIn: string, checkOut: string) {
  const a = new Date(checkIn);
  const b = new Date(checkOut);
  const ms = b.getTime() - a.getTime();
  const nights = Math.ceil(ms / (1000 * 60 * 60 * 24));
  return Number.isFinite(nights) ? Math.max(0, nights) : 0;
}

function money(n: number) {
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
}

export default function ReserveBooking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state || {}) as ReserveState;

  const [checkIn, setCheckIn] = React.useState(state.checkIn ?? "");
  const [checkOut, setCheckOut] = React.useState(state.checkOut ?? "");
  const [guests, setGuests] = React.useState<number>(state.guests ?? 1);

  const { data: property, isLoading, isError } = useGetPropertyByIdQuery(id ?? "", {
    skip: !id,
  });

  if (isLoading) return <div className="p-6 text-muted-foreground">Loading...</div>;
  if (isError || !property) return <div className="p-6 text-red-500">Failed to load property</div>;

  const locationText = [property.addressLine1, property.city].filter(Boolean).join(", ");

  const activePricing =
    property.pricing?.find((p) => p.isActive) ?? property.pricing?.[0] ?? null;

  const nightly = activePricing?.basePricePerNight ?? 0;
  const cleaningFee = activePricing?.cleaningFee ?? 0;
  const serviceFeePct = activePricing?.serviceFeePercentage ?? 0;
  const taxPct = activePricing?.taxPercentage ?? 0;
  const minStay = activePricing?.minStayNights ?? property.minStayNights ?? 1;

  const nightsSelected = checkIn && checkOut ? diffNights(checkIn, checkOut) : 0;
  const nights = Math.max(nightsSelected, minStay);

  const subtotal = nightly * nights;
  const serviceFee = (serviceFeePct / 100) * subtotal;
  const tax = (taxPct / 100) * subtotal;
  const total = subtotal + cleaningFee + serviceFee + tax;

  const cover =
    property.images?.find((x) => x.isPrimary)?.imageUrl ||
    property.images?.[0]?.imageUrl ||
    fallbackImg;

  const canContinue = Boolean(checkIn && checkOut && nightsSelected > 0);

  const onConfirm = () => {
    if (!canContinue) {
      toast.error("Please select valid check-in and check-out dates");
      return;
    }

    // ✅ later: call booking API here
    toast.success("Booking step ready", {
      description: "Next: connect POST /bookings API",
    });

    // Example: navigate to success page
    // navigate(`/reserve/${property.id}/success`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header activePage="health-homes" />

      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-10">
        {/* top row */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Confirm and reserve</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Review your trip details and confirm your booking.
            </p>
          </div>

          <Button variant="outline" onClick={() => navigate(-1)}>
            Back
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">
            {/* Trip details */}
            <Card className="rounded-2xl">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Your trip
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Check-in</div>
                    <Input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Check-out</div>
                    <Input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-xl border p-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">Guests</div>
                      <div className="text-xs text-muted-foreground">Select number of guests</div>
                    </div>
                  </div>

                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="text-sm border rounded-md px-3 py-2 bg-background"
                  >
                    {[1, 2, 3, 4, 5, 6].map((g) => (
                      <option key={g} value={g}>
                        {g} guest{g > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>

                {checkIn && checkOut && nightsSelected === 0 && (
                  <p className="text-xs text-red-500">
                    Checkout must be after check-in.
                  </p>
                )}

                {/* {nightsSelected > 0 && nightsSelected < minStay && (
                  <p className="text-xs text-amber-600">
                    Minimum stay is {minStay} night(s). Total will be calculated for {minStay}.
                  </p>
                )} */}
              </CardContent>
            </Card>

            {/* Rules / Safety */}
            <Card className="rounded-2xl">
              <CardContent className="p-6 space-y-3">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  House rules & policies
                </h2>

                <div className="text-sm text-muted-foreground leading-relaxed">
                  By selecting “Confirm and reserve”, you agree to the host’s rules and the cancellation policy.
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{property.propertyType.toUpperCase()}</Badge>
                  <Badge variant="outline">{property.status.toUpperCase()}</Badge>
                </div>
              </CardContent>
            </Card>


            {/* Confirm button (mobile) */}
            <div className="lg:hidden">
              <Button className="w-full h-12 rounded-full text-base font-semibold" onClick={onConfirm}>
                Confirm and reserve
              </Button>
              <p className="text-center text-xs text-muted-foreground mt-2">
                You won’t be charged yet
              </p>
            </div>
          </div>

          {/* RIGHT Sticky Summary */}
          <div className="space-y-4">
            <Card className="rounded-2xl shadow-lg sticky top-24">
              <CardContent className="p-6 space-y-5">
                {/* Property mini card */}
                <div className="flex gap-4">
                  <img
                    src={cover}
                    alt={property.name}
                    className="h-20 w-28 rounded-xl object-cover border"
                  />
                  <div className="min-w-0">
                    <div className="font-semibold line-clamp-2">{property.name}</div>
                    <div className="mt-1 text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span className="line-clamp-1">{locationText}</span>
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">
                      {property.totalRooms} room(s)
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex items-baseline justify-between">
                    <div className="text-lg font-semibold">Price details</div>
                    <div className="text-sm text-muted-foreground">
                      {money(nightly)}/night
                    </div>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span>
                      {money(nightly)} × {nights} night{nights > 1 ? "s" : ""}
                    </span>
                    <span>{money(subtotal)}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span>Cleaning fee</span>
                    <span>{money(cleaningFee)}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span>Service fee ({serviceFeePct}%)</span>
                    <span>{money(serviceFee)}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span>Taxes ({taxPct}%)</span>
                    <span>{money(tax)}</span>
                  </div>

                  <div className="border-t pt-3 flex justify-between font-semibold">
                    <span>Total</span>
                    <span>{money(total)}</span>
                  </div>
                </div>

                <Button
                  className="w-full h-12 rounded-full text-base font-semibold"
                  onClick={onConfirm}
                  disabled={!canContinue}
                >
                  Confirm and reserve
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  You won’t be charged yet
                </p>
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
}