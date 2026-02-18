import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Loader2, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { useGetPropertyByIdQuery } from "@/rtk/api/showproperty";

type ReserveState = {
  checkIn?: string;
  checkOut?: string;
  guests?: number;
};

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

type Plan = {
  id: "standard" | "premium" | "family";
  title: string;
  subtitle: string;
  pricePerNight: number;
  badge?: string;
  points: string[];
};

type AddOn = {
  id: string;
  title: string;
  price: number;
  unit: "/trip" | "/day" | "/session";
};

const PLANS: Plan[] = [
  {
    id: "standard",
    title: "Standard Recovery",
    subtitle: "Ideal for short stays (3–7 days)",
    pricePerNight: 2500,
    points: [
      "1BHK with adjustable bed",
      "Medical-grade cleaning & Wi-Fi",
      "Wheelchair accessible",
      "Near hospitals",
    ],
  },
  {
    id: "premium",
    title: "Premium Recovery",
    subtitle: "Perfect for international patients (7–21 days)",
    pricePerNight: 4500,
    badge: "MOST POPULAR",
    points: [
      "Everything in Standard PLUS",
      "Adjustable bed + attendant bed",
      "Oxygen concentrator & grab rails",
      "Dedicated medical concierge",
      "Hospital liaison services",
    ],
  },
  {
    id: "family",
    title: "Family Recovery Suite",
    subtitle: "For extended stays & families (14–45 days)",
    pricePerNight: 7000,
    points: [
      "2BHK with separate patient room",
      "Full kitchen & washing machine",
      "Premium concierge & all services",
    ],
  },
];

const ADDONS: AddOn[] = [
  { id: "shuttle", title: "Cab / Hospital Shuttle", price: 500, unit: "/trip" },
  { id: "cook", title: "Cook", price: 800, unit: "/day" },
  { id: "meals", title: "Therapeutic Meals", price: 600, unit: "/day" },
  { id: "physio", title: "Physiotherapy", price: 1200, unit: "/session" },
  { id: "helper", title: "Helper / Attendant", price: 700, unit: "/day" },
];

function AirbnbDateInput({
  value,
  onChange,
  placeholder = "Add date",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const [focused, setFocused] = React.useState(false);
  const type = focused || value ? "date" : "text";

  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className="w-full bg-transparent text-xs text-muted-foreground outline-none placeholder:text-muted-foreground/80"
    />
  );
}

export default function ReserveBooking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state || {}) as ReserveState;

  const { data: property, isLoading, isError } = useGetPropertyByIdQuery(id ?? "", {
    skip: !id,
  });

  const [checkIn, setCheckIn] = React.useState(state.checkIn ?? "");
  const [checkOut, setCheckOut] = React.useState(state.checkOut ?? "");
  const [guests, setGuests] = React.useState<number>(state.guests ?? 1);

  const [selectedPlanId, setSelectedPlanId] = React.useState<Plan["id"] | null>(null);
  const [selectedAddOns, setSelectedAddOns] = React.useState<Record<string, boolean>>({});
  const [confirming, setConfirming] = React.useState(false);

  if (isLoading) return <div className="p-6 text-muted-foreground">Loading...</div>;
  if (isError || !property) return <div className="p-6 text-red-500">Failed to load property</div>;

  // Get actual property price from API
  const propertyPricePerNight =
    property.pricing?.find((p) => p.isActive)?.basePricePerNight ??
    property.pricing?.[0]?.basePricePerNight ??
    0;

  // Update plans with actual property price
  const plansWithActualPrice = PLANS.map((plan) => ({
    ...plan,
    pricePerNight: propertyPricePerNight || plan.pricePerNight, // Use property price if available, else fallback to plan price
  }));

  const selectedPlan = selectedPlanId ? plansWithActualPrice.find((p) => p.id === selectedPlanId) : null;
  // Default plan for display when no plan is selected
  const displayPlan = selectedPlan || plansWithActualPrice[0]; // Use first plan (Standard) as default

  const nightsSelected = checkIn && checkOut ? diffNights(checkIn, checkOut) : 0;
  const nights = Math.max(nightsSelected, 0);

  const addOnTotal = ADDONS.reduce((sum, a) => {
    if (!selectedAddOns[a.id]) return sum;
    const mul = a.unit === "/day" ? Math.max(1, nights) : 1;
    return sum + a.price * mul;
  }, 0);

  // Calculate price based on selected plan or default plan
  const planSubtotal = displayPlan.pricePerNight * Math.max(1, nights);
  const total = planSubtotal + addOnTotal;

  const canConfirm = Boolean(selectedPlan) && Boolean(checkIn && checkOut && nightsSelected > 0);

  const toggleAddon = (id: string) => {
    setSelectedAddOns((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const onConfirm = async () => {
    if (!canConfirm) {
      toast.error("Select plan + valid dates first");
      return;
    }

    try {
      setConfirming(true);
      await new Promise((r) => setTimeout(r, 900));
      toast.success("Booking confirmed (UI ready)", {
        description: "Next: connect POST /bookings API",
      });
    } finally {
      setConfirming(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header activePage="health-homes" />

      <div className="w-full flex justify-center">
        <div className="w-[90%] origin-top scale-90">
          <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-5">
            {/* top header row */}
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold">Choose your recovery plan</h1>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Select a plan and confirm your booking.
                </p>
              </div>

              <Button variant="outline" onClick={() => navigate(-1)} className="h-8 text-xs px-3">
                Back
              </Button>
            </div>

            {/* MAIN GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
              {/* LEFT: Plans (cards) */}
              <div className="lg:col-span-2 space-y-3">
                {plansWithActualPrice.map((plan) => {
                  const active = plan.id === selectedPlanId;

                  return (
                    <button
                      key={plan.id}
                      type="button"
                      onClick={() => setSelectedPlanId(plan.id)}
                      className="w-full text-left"
                    >
                      <Card
                        className={[
                          "rounded-xl border transition-all",
                          active ? "border-primary shadow-lg" : "hover:shadow-md",
                        ].join(" ")}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="text-base sm:text-lg font-bold text-foreground">
                                {plan.title}
                              </div>
                              <div className="text-xs text-muted-foreground mt-0.5 italic">
                                {plan.subtitle}
                              </div>
                            </div>

                            {plan.badge && (
                              <Badge className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 text-[10px] px-2 py-0.5">
                                {plan.badge}
                              </Badge>
                            )}
                          </div>

                          <div className="mt-3 space-y-1.5">
                            {plan.points.map((p) => (
                              <div
                                key={p}
                                className="flex items-start gap-1.5 text-xs text-muted-foreground"
                              >
                                <CheckCircle2 className="h-3.5 w-3.5 text-primary mt-0.5 flex-shrink-0" />
                                <span>{p}</span>
                              </div>
                            ))}
                          </div>

                          {active && (
                            <div className="mt-3 text-xs font-medium text-red-600">
                              Selected
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </button>
                  );
                })}
              </div>

              {/* RIGHT: Trip Details (Airbnb) + Booking Summary + Add-ons */}
              <div className="space-y-3">
                <div className="lg:sticky lg:top-20 space-y-3">
                  {/* ✅ Airbnb Trip Details on RIGHT */}
                  <Card className="rounded-xl">
                    <CardContent className="p-4 space-y-3">
                      <div className="text-base font-bold">Add dates for prices</div>

                      {/* Airbnb inner box */}
                      <div className="rounded-lg border-2 border-foreground/80 overflow-hidden">
                        <div className="grid grid-cols-2">
                          <div className="p-2.5 border-r border-foreground/80">
                            <div className="text-[10px] font-semibold tracking-wide text-foreground uppercase">
                              Check-in
                            </div>
                            <AirbnbDateInput value={checkIn} onChange={setCheckIn} />
                          </div>

                          <div className="p-2.5">
                            <div className="text-[10px] font-semibold tracking-wide text-foreground uppercase">
                              Checkout
                            </div>
                            <AirbnbDateInput value={checkOut} onChange={setCheckOut} />
                          </div>
                        </div>

                        <div className="border-t border-foreground/80 p-2.5">
                          <div className="flex items-center justify-between gap-2">
                            <div>
                              <div className="text-[10px] font-semibold tracking-wide text-foreground uppercase">
                                Guests
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {guests} guest{guests > 1 ? "s" : ""}
                              </div>
                            </div>

                            <div className="relative">
                              <select
                                value={guests}
                                onChange={(e) => setGuests(Number(e.target.value))}
                                className="appearance-none bg-transparent pr-6 pl-1.5 py-1 text-xs outline-none cursor-pointer"
                                aria-label="Guests"
                              >
                                {[1, 2, 3, 4, 5, 6].map((g) => (
                                  <option key={g} value={g}>
                                    {g} guest{g > 1 ? "s" : ""}
                                  </option>
                                ))}
                              </select>
                              <ChevronDown className="h-3.5 w-3.5 absolute right-0.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {checkIn && checkOut && nightsSelected === 0 && (
                        <p className="text-[10px] text-red-500">
                          Checkout must be after check-in.
                        </p>
                      )}
                    </CardContent>
                  </Card>

                  {/* Booking Summary */}
                  <Card className="rounded-xl">
                    <CardContent className="p-4 space-y-3">
                      <div className="text-base font-bold">Booking Summary</div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">
                            {selectedPlan ? "Selected plan" : "Plan"}
                          </span>
                          <span className={`font-semibold ${!selectedPlan ? "text-muted-foreground" : ""}`}>
                            {displayPlan.title}
                            {!selectedPlan && " (Default)"}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Price</span>
                          <span className={`font-semibold ${!selectedPlan ? "text-muted-foreground" : ""}`}>
                            {money(displayPlan.pricePerNight)}/night
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Nights</span>
                          <span className="font-semibold">{nightsSelected || 0}</span>
                        </div>

                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Add-ons</span>
                          <span className="font-semibold">{money(addOnTotal)}</span>
                        </div>

                        <div className="border-t pt-2 flex items-center justify-between">
                          <span className="font-semibold text-sm">Total</span>
                          <span className={`font-semibold text-sm ${!selectedPlan ? "text-muted-foreground" : ""}`}>
                            {money(total)}
                          </span>
                        </div>

                        {!selectedPlan && (
                          <p className="text-[10px] text-muted-foreground pt-1.5 border-t">
                            Select a plan to confirm booking
                          </p>
                        )}
                      </div>

                      <Button
                        className="w-full h-10 rounded-full font-semibold text-sm"
                        onClick={onConfirm}
                        disabled={!canConfirm || confirming}
                      >
                        {confirming ? (
                          <>
                            <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
                            Confirming...
                          </>
                        ) : (
                          "Confirm Booking"
                        )}
                      </Button>

                      <p className="text-center text-[10px] text-muted-foreground">
                        You won't be charged yet
                      </p>
                    </CardContent>
                  </Card>

                  {/* Add-On Services */}
                  <Card className="rounded-xl">
                    <CardContent className="p-4">
                      <div className="text-base font-bold mb-3">Add-On Services</div>

                      <div className="space-y-2">
                        {ADDONS.map((a) => {
                          const on = Boolean(selectedAddOns[a.id]);
                          return (
                            <button
                              key={a.id}
                              type="button"
                              onClick={() => toggleAddon(a.id)}
                              className={[
                                "w-full rounded-lg border px-3 py-2 flex items-center justify-between transition",
                                on ? "border-primary bg-primary/5" : "hover:bg-muted/40",
                              ].join(" ")}
                            >
                              <div className="text-left">
                                <div className="text-xs font-semibold">{a.title}</div>
                                <div className="text-[10px] text-muted-foreground">
                                  {money(a.price)}
                                  {a.unit}
                                </div>
                              </div>

                              <div
                                className={[
                                  "h-4 w-4 rounded-full border flex items-center justify-center",
                                  on
                                    ? "border-primary bg-primary text-primary-foreground"
                                    : "border-muted-foreground/30",
                                ].join(" ")}
                              >
                                {on && <CheckCircle2 className="h-3 w-3" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            <div className="h-6" />
          </div>
        </div>
      </div>
    </div>
  );
}
