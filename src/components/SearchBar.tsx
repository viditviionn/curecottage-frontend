import React, { useEffect, useMemo, useRef, useState } from "react";
import { Search, MapPin, Calendar, Users, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  variant?: "page" | "header";
  onSearch?: (
    location: string,
    checkIn: string,
    checkOut: string,
    guests: number,
  ) => void;
  loading?: boolean;
  location?: string;
  checkIn?: string;
  checkOut?: string;
  adults?: number;
  children?: number;
}

type ActivePanel = "where" | "when" | "who" | null;

const SUGGESTIONS = [
  { title: "All", subtitle: "View properties from all cities", icon: MapPin },
  {
    title: "Bangalore",
    subtitle: "Because your wishlist has stays in Bangalore",
    icon: MapPin,
  },
  {
    title: "Mumbai",
    subtitle: "Because your wishlist has stays in Mumbai",
    icon: MapPin,
  },
  {
    title: "Delhi",
    subtitle: "Because your wishlist has stays in Delhi",
    icon: MapPin,
  },
  {
    title: "Chennai",
    subtitle: "Because your wishlist has stays in Chennai",
    icon: MapPin,
  },
  {
    title: "Hyderabad",
    subtitle: "Because your wishlist has stays in Hyderabad",
    icon: MapPin,
  },
];

const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, n));

export const SearchBar = ({
  variant = "page",
  onSearch,
  loading = false,
  location: propLocation = "All",
  checkIn: propCheckIn = "",
  checkOut: propCheckOut = "",
  adults: propAdults = 1,
  children: propChildren = 0,
}: SearchBarProps) => {
  const [location, setLocation] = useState(propLocation);
  const [checkIn, setCheckIn] = useState(propCheckIn);
  const [checkOut, setCheckOut] = useState(propCheckOut);

  const [adults, setAdults] = useState(propAdults);
  const [children, setChildren] = useState(propChildren);
  const [infants, setInfants] = useState(0);
  const [pets, setPets] = useState(0);

  // Sync with props when they change (e.g., when docked to header)
  useEffect(() => {
    setLocation(propLocation);
    setCheckIn(propCheckIn);
    setCheckOut(propCheckOut);
    setAdults(propAdults);
    setChildren(propChildren);
  }, [propLocation, propCheckIn, propCheckOut, propAdults, propChildren]);

  const guests = useMemo(() => adults + children, [adults, children]);

  const whoLabel = useMemo(() => {
    const parts: string[] = [];
    const g = adults + children;
    if (g > 0) parts.push(`${g} guest${g > 1 ? "s" : ""}`);
    if (infants > 0) parts.push(`${infants} infant${infants > 1 ? "s" : ""}`);
    if (pets > 0) parts.push(`${pets} pet${pets > 1 ? "s" : ""}`);
    return parts.join(" • ");
  }, [adults, children, infants, pets]);

  const [active, setActive] = useState<ActivePanel>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const dockRef = useRef<HTMLDivElement | null>(null);
  const [docked, setDocked] = useState(false);

  // IntersectionObserver for docking detection (only for page variant)
  useEffect(() => {
    if (variant !== "page") return;

    const mq = window.matchMedia("(min-width: 1024px)");
    if (!mq.matches) return;

    const el = dockRef.current;
    if (!el) return;

    const HEADER_OFFSET = 80; // Header height offset
    let rafId: number | null = null;
    let lastState: boolean | null = null;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (rafId) cancelAnimationFrame(rafId);

        rafId = requestAnimationFrame(() => {
          const shouldDock = !entry.isIntersecting;

          // Only update if state changed
          if (lastState === shouldDock) return;
          lastState = shouldDock;

          setDocked(shouldDock);
          window.dispatchEvent(
            new CustomEvent("cc:searchDock", {
              detail: { docked: shouldDock },
            }),
          );
        });
      },
      {
        threshold: 0,
        rootMargin: `-${HEADER_OFFSET}px 0px 0px 0px`,
      },
    );

    // Small delay to ensure element is positioned
    const timeoutId = setTimeout(() => {
      io.observe(el);
    }, 50);

    return () => {
      clearTimeout(timeoutId);
      if (rafId) cancelAnimationFrame(rafId);
      io.disconnect();
      setDocked(false);
      window.dispatchEvent(
        new CustomEvent("cc:searchDock", { detail: { docked: false } }),
      );
    };
  }, [variant]);

  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (!active) return;
      const el = rootRef.current;
      if (!el) return;
      if (!el.contains(e.target as Node)) setActive(null);
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [active]);

  const runSearch = () => {
    if (loading) return; // ✅ block multiple clicks
    setActive(null);
    onSearch?.(location, checkIn, checkOut, guests);
  };

  const Seg = ({
    id,
    label,
    value,
    placeholder,
  }: {
    id: Exclude<ActivePanel, null>;
    label: string;
    value: string;
    placeholder: string;
  }) => {
    const isActive = active === id;

    return (
      <button
        type="button"
        onClick={() => setActive(id)}
        className={[
          "flex-1 text-left px-6 py-3 rounded-full transition-all",
          "hover:bg-muted/50",
          isActive
            ? "bg-background shadow-md ring-1 ring-border"
            : "bg-transparent",
        ].join(" ")}
      >
        <div className="text-[12px] font-semibold text-foreground">{label}</div>
        <div className="text-sm text-muted-foreground mt-0.5 line-clamp-1">
          {value || placeholder}
        </div>
      </button>
    );
  };

  const CounterRow = ({
    title,
    subtitle,
    value,
    min = 0,
    max = 20,
    onChange,
  }: {
    title: string;
    subtitle: string;
    value: number;
    min?: number;
    max?: number;
    onChange: (next: number) => void;
  }) => (
    <div className="flex items-center justify-between py-4 border-b last:border-b-0">
      <div>
        <div className="font-semibold text-foreground">{title}</div>
        <div className="text-sm text-muted-foreground">{subtitle}</div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onChange(clamp(value - 1, min, max))}
          disabled={value <= min}
          className={[
            "h-9 w-9 rounded-full border flex items-center justify-center transition",
            value <= min ? "opacity-40 cursor-not-allowed" : "hover:bg-muted",
          ].join(" ")}
        >
          −
        </button>
        <div className="w-6 text-center text-foreground">{value}</div>
        <button
          type="button"
          onClick={() => onChange(clamp(value + 1, min, max))}
          disabled={value >= max}
          className={[
            "h-9 w-9 rounded-full border flex items-center justify-center transition",
            value >= max ? "opacity-40 cursor-not-allowed" : "hover:bg-muted",
          ].join(" ")}
        >
          +
        </button>
      </div>
    </div>
  );

  return (
    <div ref={rootRef} className="relative">
      {active && variant === "page" && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[1px]"
          onClick={() => setActive(null)}
        />
      )}

      {/* Intersection observer sentinel (only for page variant) */}
      {variant === "page" && <div ref={dockRef} className="" />}

      {/* DESKTOP */}
      <div
        className={[
          "hidden md:block relative z-50 transform-gpu will-change-[opacity,transform]",
          variant === "header"
            ? "opacity-100 scale-100 translate-y-0"
            : docked
              ? "lg:opacity-0 lg:scale-95 lg:-translate-y-2 lg:pointer-events-none"
              : "lg:opacity-100 lg:scale-100 lg:translate-y-0",
          "transition-all duration-500 ease-out",
        ].join(" ")}
      >
        <div className={`bg-muted/40 border border-border rounded-full shadow-lg p-1 mx-auto w-full transition-colors duration-200 hover:bg-black/20 ${variant === "header" ? "max-w-[800px]" : "max-w-[700px]"}`}>
          <div className="flex items-center gap-1">
            <Seg
              id="where"
              label="Where"
              value={location}
              placeholder="Search destinations"
            />

            <div className="h-8 w-px bg-border" />

            <Seg
              id="when"
              label="When"
              value={checkIn && checkOut ? `${checkIn} → ${checkOut}` : ""}
              placeholder="Add dates"
            />

            <div className="h-8 w-px bg-border" />

            <Seg
              id="who"
              label="Who"
              value={whoLabel}
              placeholder="Add guests"
            />

            <div className="pr-1">
              <Button
                className="rounded-full h-12 w-12 p-0 bg-[#14B8A6] hover:bg-[#0D9488] text-white shadow-md flex items-center justify-center"
                onClick={runSearch}
                disabled={loading}
                aria-label={loading ? "Searching" : "Search"}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span className="sr-only">Searching...</span>
                  </>
                ) : (
                  <>
                    <Search className="h-5 w-5" />
                    <span className="sr-only">Search</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        <div
          className={[
            "absolute left-0 right-0 mt-3 z-50 transition-all duration-200 ease-out",
            active
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-2 pointer-events-none",
          ].join(" ")}
        >
          {active === "where" && (
            <div className="bg-background border rounded-3xl shadow-2xl p-4 max-w-xl">
              <div className="text-sm font-semibold text-foreground px-2 pb-3">
                Suggested destinations
              </div>

              <div className="max-h-[360px] overflow-auto pr-2">
                {SUGGESTIONS.map((s) => {
                  const Icon = s.icon;
                  return (
                    <button
                      key={s.title}
                      type="button"
                      onClick={() => {
                        setLocation(s.title); // ✅ FIX: direct city set
                        setActive("when");
                      }}
                      className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-muted transition text-left"
                    >
                      <div className="h-12 w-12 rounded-2xl bg-muted flex items-center justify-center">
                        <Icon className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">
                          {s.title}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {s.subtitle}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="px-2 pt-3">
                <div className="text-xs font-semibold text-muted-foreground mb-2">
                  Or type a city
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <Input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Search destinations"
                    className="rounded-xl"
                  />
                </div>
              </div>
            </div>
          )}

          {active === "when" && (
            <div className="bg-background border rounded-3xl shadow-2xl p-6 max-w-5xl">
              <div className="flex items-center justify-center gap-2 mb-6">
                <button className="px-5 py-2 rounded-full bg-muted font-semibold">
                  Dates
                </button>
                <button className="px-5 py-2 rounded-full hover:bg-muted/60">
                  Months
                </button>
                <button className="px-5 py-2 rounded-full hover:bg-muted/60">
                  Flexible
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="rounded-2xl border p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div className="font-semibold">Check-in</div>
                  </div>
                  <Input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                  />
                </div>

                <div className="rounded-2xl border p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div className="font-semibold">Check-out</div>
                  </div>
                  <Input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-6">
                {[
                  "Exact dates",
                  "± 1 day",
                  "± 2 days",
                  "± 3 days",
                  "± 7 days",
                  "± 14 days",
                ].map((x) => (
                  <button
                    key={x}
                    type="button"
                    className="px-4 py-2 rounded-full border hover:bg-muted transition text-sm"
                    onClick={() => setActive("who")}
                  >
                    {x}
                  </button>
                ))}
              </div>
            </div>
          )}

          {active === "who" && (
            <div className="bg-background border rounded-3xl shadow-2xl p-6 max-w-xl ml-auto">
              <CounterRow
                title="Adults"
                subtitle="Ages 13 or above"
                value={adults}
                min={1}
                onChange={setAdults}
              />
              <CounterRow
                title="Children"
                subtitle="Ages 2–12"
                value={children}
                onChange={setChildren}
              />
              <CounterRow
                title="Infants"
                subtitle="Under 2"
                value={infants}
                max={10}
                onChange={setInfants}
              />
              <CounterRow
                title="Pets"
                subtitle="Bringing a service animal?"
                value={pets}
                max={5}
                onChange={setPets}
              />

              <div className="flex items-center justify-between pt-5 ">
                <button
                  type="button"
                  className="text-sm underline text-muted-foreground hover:text-foreground"
                  onClick={() => {
                    setAdults(1);
                    setChildren(0);
                    setInfants(0);
                    setPets(0);
                  }}
                >
                  Clear all
                </button>

                <Button
                  className="rounded-full px-6 bg-[#14B8A6] hover:bg-[#0D9488] text-white"
                  onClick={runSearch}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      Search
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MOBILE */}
      <div className="md:hidden bg-card rounded-2xl shadow-xl p-2 border border-border/50 backdrop-blur-sm relative z-10">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col p-2 rounded-xl hover:bg-accent/50 transition-colors">
            <label className="text-xs font-medium text-foreground mb-1">
              Location
            </label>
            <div className="flex items-center gap-2">
              <MapPin className="h-3 w-3 text-muted-foreground" />
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Search destinations"
                className="border-none p-0 h-auto text-xs placeholder:text-muted-foreground focus-visible:ring-0"
              />
            </div>
          </div>

          <div className="flex flex-col p-2 rounded-xl hover:bg-accent/50 transition-colors">
            <label className="text-xs font-medium text-foreground mb-1">
              Guests
            </label>
            <div className="flex items-center gap-2">
              <Users className="h-3 w-3 text-muted-foreground" />
              <Input
                type="number"
                min="1"
                value={guests}
                onChange={() => {}}
                disabled
                className="border-none p-0 h-auto text-xs focus-visible:ring-0"
              />
            </div>
            <div className="text-[11px] text-muted-foreground mt-1">
              Adults {adults}, Children {children}
            </div>
          </div>

          <div className="flex flex-col p-2 rounded-xl hover:bg-accent/50 transition-colors">
            <label className="text-xs font-medium text-foreground mb-1">
              Check-in
            </label>
            <div className="flex items-center gap-2">
              <Calendar className="h-3 w-3 text-muted-foreground" />
              <Input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="border-none p-0 h-auto text-xs focus-visible:ring-0"
              />
            </div>
          </div>

          <div className="flex flex-col p-2 rounded-xl hover:bg-accent/50 transition-colors">
            <label className="text-xs font-medium text-foreground mb-1">
              Check-out
            </label>
            <div className="flex items-center gap-2">
              <Calendar className="h-3 w-3 text-muted-foreground" />
              <Input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="border-none p-0 h-auto text-xs focus-visible:ring-0"
              />
            </div>
          </div>

          <div className="col-span-2">
            <Button
              className="w-full h-10 rounded-xl bg-[#14B8A6] hover:bg-[#0D9488] text-white"
              onClick={runSearch}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
