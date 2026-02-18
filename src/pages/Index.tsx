// ✅ Index.tsx (FULL FILE)
// Place this as: src/pages/Index.tsx (or your existing path)
import {
  ArrowRight,
  CheckCircle2,
  Plane,
  User,
  Phone,
  Mail,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { listings, features } from "../data/listing";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Heart,
  MapPin,
  Star,
  Users,
  CheckCircle,
  Calendar,
  Hospital,
  Shield,
} from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

import Header from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";

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

import { useNavigate } from "react-router-dom";
import healthHomesImage from "@/assets/HomeScreenCart.jpg";

import {
  GetAvailablePropertiesArgs,
  Property,
  useGetAvailablePropertiesQuery,
} from "@/rtk/api/showproperty";
import Footer from "../components/Footer.tsx";

const Index = () => {
  const navigate = useNavigate();

  const [selectedCity, setSelectedCity] = useState<string>("All");
  const [selectedCheckIn, setSelectedCheckIn] = useState<string>("");
  const [selectedCheckOut, setSelectedCheckOut] = useState<string>("");
  const [selectedAdults, setSelectedAdults] = useState<number>(1);
  const [selectedChildren, setSelectedChildren] = useState<number>(0);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLogedIn, setIsLoggedIn] = useState(false); // Placeholder for auth state
  console.log("isLogedIn", isLogedIn);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    setIsLoggedIn(!!token); // converts to true/false
  }, []);

  // For auto-scroll to results
  const resultsRef = useRef<HTMLDivElement | null>(null);

  const [queryArgs, setQueryArgs] = useState<GetAvailablePropertiesArgs>({
    page: 1,
    limit: 100,
  });

  const { data, isLoading, isFetching, isError } =
    useGetAvailablePropertiesQuery(queryArgs);

  const showSkeleton = isLoading || isFetching;
  const healthHomes = data?.properties ?? [];

  const handleSearch = (
    location: string,
    checkIn: string,
    checkOut: string,
    guests: number,
  ) => {
    setSelectedCity(location);
    setSelectedCheckIn(checkIn);
    setSelectedCheckOut(checkOut);
    setSelectedAdults(guests > 0 ? guests : 1); // Simplified: using guests as adults
    setSelectedChildren(0); // Reset children for simplicity

    // Only mark as searched if specific city is selected (not "All")
    if (location !== "All") {
      setHasSearched(true);
    } else {
      setHasSearched(false);
    }

    setQueryArgs({
      page: 1,
      limit: 100,
      city: location === "All" ? undefined : location,
      checkInDate: checkIn || undefined,
      checkOutDate: checkOut || undefined,
    });
  };

  // After search, scroll to results (so user knows where results are)
  useEffect(() => {
    if (!hasSearched) return;

    requestAnimationFrame(() => {
      resultsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }, [hasSearched, selectedCity]);

  const cities = ["Bangalore","Mumbai", "Hyderabad"];
  // "Chennai", "Delhi", 

  const filteredHomes = useMemo(() => {
    if (!selectedCity || selectedCity === "All") return healthHomes;
    const city = selectedCity.trim().toLowerCase();
    return healthHomes.filter(
      (p) => (p.city || "").trim().toLowerCase() === city,
    );
  }, [healthHomes, selectedCity]);

  const citiesToRender = useMemo(() => {
    if (!selectedCity || selectedCity === "All") return cities;
    return [selectedCity];
  }, [selectedCity]);

  const getCardImage = (p: Property) =>
    p.images?.find((img) => img.isPrimary)?.imageUrl || p.images?.[0]?.imageUrl;

  const getLocation = (p: Property) =>
    [p.addressLine1, p.city].filter(Boolean).join(", ");

  const getHealthHomesByCity = (city: string) =>
    filteredHomes.filter(
      (p) => (p.city || "").trim().toLowerCase() === city.trim().toLowerCase(),
    );

  // City Health Homes Section Component
  const CityHealthHomesSection = ({
    city,
    cityHomes,
    displayedHomes,
    hasSearched,
  }: {
    city: string;
    cityHomes: Property[];
    displayedHomes: Property[];
    hasSearched: boolean;
  }) => {
    const mobileAutoplayPlugin = useMemo(
      () => Autoplay({ delay: 3000, stopOnInteraction: true, playOnInit: true }),
      []
    );
    const desktopAutoplayPlugin = useMemo(
      () => Autoplay({ delay: 3000, stopOnInteraction: true, playOnInit: true }),
      []
    );

    return (
      <section className="py-6 md:py-6">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-4 md:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2 md:mb-3">
              Health Homes in {city}
            </h2>
            <div className="flex flex-wrap gap-2 sm:gap-4 text-muted-foreground text-xs">
              <div className="flex items-center gap-1 sm:gap-2">
                <MapPin className="h-3 w-3" />
                <span>{city}</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <Heart className="h-3 w-3" />
                <span>
                  {displayedHomes.length} of {cityHomes.length} health homes
                </span>
              </div>
            </div>
          </div>

          {/* When NOT searched: show carousels (mobile + desktop) */}
          {!hasSearched ? (
            <>
              {/* Mobile Carousel */}
              <div className="md:hidden relative">
                <Carousel
                  plugins={[mobileAutoplayPlugin]}
                  opts={{ align: "start", loop: displayedHomes.length > 1 }}
                  className="w-full relative"
                >
                  <CarouselContent className="-ml-4">
                    {displayedHomes.map((home) => (
                      <CarouselItem key={home.id} className="pl-4 basis-full">
                        <Card
                          className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/30 overflow-hidden w-full"
                          onClick={() => navigate(`/health-home/${home.id}`)}
                        >
                          <div className="relative h-36 overflow-hidden">
                            <img
                              src={getCardImage(home)}
                              alt={home.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />


                            <div className="absolute top-2 left-2 bg-primary text-primary-foreground rounded-lg px-2 py-1">
                              <span className="text-xs font-semibold">
                                {home.propertyType.toUpperCase()}
                              </span>
                            </div>
                          </div>

                          <CardContent className="p-4">
                            <h3 className="text-base font-semibold mb-1 group-hover:text-primary transition-colors line-clamp-1">
                              {home.name}
                            </h3>

                            <div className="flex items-center gap-1 text-muted-foreground mb-2">
                              <MapPin className="h-3 w-3" />
                              <span className="text-xs line-clamp-1">
                                {getLocation(home)}
                              </span>
                            </div>

                            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                              <div className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                <span>{home.totalRooms} rooms</span>
                              </div>
                            </div>

                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full text-sm"
                            >
                              View Details
                            </Button>
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>

                  {displayedHomes.length > 1 && (
                    <>
                      <CarouselPrevious className="-left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white shadow" />
                      <CarouselNext className="-right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white shadow" />
                    </>
                  )}
                </Carousel>
              </div>

              {/* Desktop Carousel */}
              <div className="hidden md:block relative">
                <Carousel
                  plugins={[desktopAutoplayPlugin]}
                  opts={{ align: "start", loop: displayedHomes.length > 4 }}
                  className="w-full relative"
                >
                  <CarouselContent className="-ml-4">
                    {displayedHomes.map((home) => (
                      <CarouselItem key={home.id} className="pl-4 basis-1/4">
                        <Card
                          className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/30 overflow-hidden w-full"
                          onClick={() => navigate(`/health-home/${home.id}`)}
                        >
                          <div className="relative h-28 md:h-36 overflow-hidden">
                            <img
                              src={getCardImage(home)}
                              alt={home.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                <span className="text-xs font-semibold">
                                  New
                                </span>
                              </div>
                            </div>
                            <div className="absolute top-2 left-2 bg-[#14B8A6] text-primary-foreground rounded-lg px-2 py-1">
                              <span className="text-xs font-semibold">
                                ₹{home.totalRooms * 500}/day
                              </span>
                            </div>
                          </div>

                          <CardContent className="p-4">
                            <div className="mb-3">
                              <h3 className="text-base md:text-lg font-semibold mb-1 text-foreground group-hover:text-primary transition-colors line-clamp-1">
                                {home.name}
                              </h3>
                              <div className="flex items-center gap-1 text-muted-foreground mb-2">
                                <MapPin className="h-3 w-3" />
                                <span className="text-xs line-clamp-1">
                                  {getLocation(home)}
                                </span>
                              </div>
                              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Users className="h-3 w-3" />
                                  <span>{home.totalRooms} rooms</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Hospital className="h-3 w-3" />
                                  <span>Nearby hospital</span>
                                </div>
                              </div>
                            </div>


                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full text-sm group-hover:bg-[#14B8A6] group-hover:text-primary-foreground transition-all duration-300"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/health-home/${home.id}`);
                              }}
                            >
                              View Details
                            </Button>
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>

                  {displayedHomes.length > 4 && (
                    <>
                      <CarouselPrevious className="-left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white shadow" />
                      <CarouselNext className="-right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white shadow" />
                    </>
                  )}
                </Carousel>
              </div>
            </>
          ) : (
            /* When searched: show simple grid (3 per row on desktop) */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {displayedHomes.map((home) => (
                <Card
                  key={home.id}
                  className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/30 overflow-hidden w-full"
                >
                  <div className="relative h-36 overflow-hidden">
                    <img
                      src={getCardImage(home)}
                      alt={home.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-semibold">New</span>
                      </div>
                    </div>
                    <div className="absolute top-2 left-2 bg-primary text-primary-foreground rounded-lg px-2 py-1">
                      <span className="text-xs font-semibold">
                        ₹{home.totalRooms * 500}/day
                      </span>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <div className="mb-3">
                      <h3 className="text-base md:text-lg font-semibold mb-1 text-foreground group-hover:text-primary transition-colors line-clamp-1">
                        {home.name}
                      </h3>
                      <div className="flex items-center gap-1 text-muted-foreground mb-2">
                        <MapPin className="h-3 w-3" />
                        <span className="text-xs line-clamp-1">
                          {getLocation(home)}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>{home.totalRooms} rooms</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Hospital className="h-3 w-3" />
                          <span>Nearby hospital</span>
                        </div>
                      </div>
                    </div>


                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-sm group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                      onClick={() => navigate(`/health-home/${home.id}`)}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* {cityHomes.length === 0 && (
            <div className="text-center py-8 md:py-12">
              <h3 className="text-xl sm:text-2xl font-semibold text-muted-foreground mb-3 md:mb-4">
                No health homes found in {city}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 md:mb-6">
                We're expanding to more locations. Stay tuned!
              </p>
            </div>
          )} */}
        </div>
      </section>
    );
  };

  // Skeletons
  const SkeletonLine = ({ className = "" }: { className?: string }) => (
    <div className={`rounded-full bg-muted/60 animate-pulse ${className}`} />
  );

  const SkeletonCard = () => (
    <div className="rounded-2xl border overflow-hidden bg-background">
      <div className="h-40 bg-muted/60 animate-pulse" />
      <div className="p-4 space-y-2">
        <SkeletonLine className="h-4 w-3/5" />
        <SkeletonLine className="h-3 w-2/5" />
      </div>
    </div>
  );

  const CityHealthHomesSectionSkeleton = ({ city }: { city: string }) => (
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="mb-6 md:mb-8">
          <SkeletonLine className="h-7 w-72" />
          <div className="mt-3 flex gap-3">
            <SkeletonLine className="h-4 w-24" />
            <SkeletonLine className="h-4 w-44" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          {Array.from({ length: 14 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      {/* ✅ Header: SearchBar will animate in when docked */}
      <Header
        activePage="health-homes"
        centerContent={
          <SearchBar
            onSearch={handleSearch}
            loading={showSkeleton}
            location={selectedCity}
            checkIn={selectedCheckIn}
            checkOut={selectedCheckOut}
            adults={selectedAdults}
            children={selectedChildren}
          />
        }
      />

      {/* ✅ SearchBar BELOW header (page variant - hides when docked) */}
      <div className="container mx-auto px-4">
        {/* Desktop */}
        <div className="hidden md:block pt-2">
          <div className="mx-auto w-full max-w-[820px]">
            <SearchBar
              variant="page"
              onSearch={handleSearch}
              loading={showSkeleton}
              location={selectedCity}
              checkIn={selectedCheckIn}
              checkOut={selectedCheckOut}
              adults={selectedAdults}
              children={selectedChildren}
            />
          </div>
        </div>

        {/* Mobile (always visible) */}
        <div className="md:hidden pt-2">
          <div className="mx-auto w-full max-w-[820px]">
            <SearchBar
              onSearch={handleSearch}
              loading={showSkeleton}
              location={selectedCity}
              checkIn={selectedCheckIn}
              checkOut={selectedCheckOut}
              adults={selectedAdults}
              children={selectedChildren}
            />
          </div>
        </div>
      </div>

      {/* Hero Section: hide after search */}
      {/* ✅ NEW HERO SECTION */}
      {!hasSearched && (
        <>
          <section className="py-12">
            <div className="container mx-auto px-4 max-w-7xl">
              <div
                className="bg-[#eaf3f1] rounded-2xl p-6 md:p-8"
                style={{
                  boxShadow:
                    "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
                }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  {/* LEFT CONTENT */}
                  <div>
                    {/* Badges */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 text-xs rounded-full border border-[#14B8A6] text-[#14B8A6] bg-white">
                        Prime location — Within 3 Km of hospital
                      </span>

                      <span className="px-3 py-1 text-xs rounded-full border border-[#14B8A6] text-[#14B8A6] bg-white">
                        Multilingual support
                      </span>
                    </div>

                    {/* Heading */}
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
                      Your Comfort.
                      <br />
                      Your Recovery.
                      <br />
                      <span className="text-[#14B8A6]">Our Priority.</span>
                    </h1>

                    {/* Description */}
                    <p className="text-gray-600 text-base mb-6 max-w-lg">
                      Hospital-adjacent recovery homes designed for healing. Full medical concierge and nutritious meal plans included.
                    </p>

                    {/* CTA */}
                    <Button
                      onClick={() => {
                        resultsRef.current?.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      }}
                      className="rounded-full px-6 py-4 text-base bg-[#14B8A6] hover:bg-[#119e8f] text-white shadow-lg"
                    >
                      Book your stay today
                    </Button>
                  </div>

                  {/* RIGHT IMAGE */}
                  <div className="relative">
                    <img
                      src={healthHomesImage}
                      alt="Premium Recovery Suites"
                      className="rounded-2xl shadow-xl w-full h-[320px] object-cover"
                    />

                    {/* Overlay Text */}
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-lg font-semibold">Premium Recovery Suites</h3>
                      <p className="text-xs opacity-90">Designed for post-surgical care</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>


          <section className="container mx-auto px-4 md:px-6 mb-5 max-w-7xl">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 font-heading">
              Why Choose QureHome?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#14B8A6] hover:border-2 transition-all"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-3">
                    <feature.icon size={20} strokeWidth={2} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                    {feature.title}
                  </h3>
                  <ul className="space-y-1.5">
                    {feature.items.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-xs text-gray-600"
                      >
                        <CheckCircle2
                          size={12}
                          className="mt-0.5 text-primary shrink-0"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
          
        </>
      )}

      {/* Anchor for auto-scroll */}
      <div ref={resultsRef} className="scroll-mt-[140px]" />

      {/* Health Homes by Cities */}
      {showSkeleton ? (
        citiesToRender.map((city) => (
          <CityHealthHomesSectionSkeleton key={city} city={city} />
        ))
      ) : isError ? (
        <section className="py-10">
          <div className="container mx-auto px-4">
            <p className="text-red-500">Failed to load properties</p>
          </div>
        </section>
      ) : (
        (() => {
          const citiesWithHomes = citiesToRender
            .map((city) => {
              const cityHomes = getHealthHomesByCity(city);
              return { city, cityHomes };
            })
            .filter(({ cityHomes }) => cityHomes.length > 0);

          // Show "no city found" message if searched but no results
          if (hasSearched && citiesWithHomes.length === 0) {
            return (
              <section className="py-16">
                <div className="container mx-auto px-4 max-w-7xl">
                  <div className="text-center py-12">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                      No Health Homes Found
                    </h2>
                    <p className="text-gray-600 text-lg mb-6">
                      We couldn't find any health homes in <span className="font-semibold text-[#14B8A6]">{selectedCity}</span> at the moment.
                    </p>
                    <p className="text-gray-500 mb-8">
                      Please try searching for a different city or check back later as we're constantly expanding our network.
                    </p>
                    <Button
                      onClick={() => {
                        setSelectedCity("All");
                        setHasSearched(false);
                        setQueryArgs({
                          page: 1,
                          limit: 100,
                        });
                      }}
                      className="bg-[#14B8A6] hover:bg-[#119e8f] text-white px-6 py-3 rounded-full"
                    >
                      View All Cities
                    </Button>
                  </div>
                </div>
              </section>
            );
          }

          return citiesWithHomes.map(({ city, cityHomes }) => {
            const displayedHomes = cityHomes;
            return (
              <CityHealthHomesSection
                key={city}
                city={city}
                cityHomes={cityHomes}
                displayedHomes={displayedHomes}
                hasSearched={hasSearched}
              />
            );
          });
        })()
      )}
      {!hasSearched && (
        <>
          <section className="bg-gray-50 py-12 mb-12 border-y border-gray-100">
            <div className="container mx-auto px-4 md:px-6 max-w-7xl">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-8 font-heading text-center">
                How QureHome Works
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
                {/* Connector Line (Desktop) */}
                <div className="hidden md:block absolute top-5 left-0 w-full h-0.5 bg-gray-200 -z-10"></div>

                {[
                  {
                    title: "1. Book Your Stay",
                    desc: "Match your medical needs.",
                  },
                  {
                    title: "2. Arrive and Settle",
                    desc: "Airport pickup included. Meet coordinator.",
                  },
                  {
                    title: "3. Focus on Treatment",
                    desc: "We handle transport and meals. You heal.",
                  },
                  {
                    title: "4. Recover Comfortably",
                    desc: "Post-discharge nursing and support.",
                  },
                ].map((step, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center text-center bg-gray-50"
                  >
                    <div className="w-10 h-10 bg-white border-2 border-primary text-primary font-bold rounded-full flex items-center justify-center mb-3 shadow-sm z-10 text-sm">
                      {idx + 1}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1 text-sm">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-xs">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Trust Section */}

          <section className="container mx-auto px-4 sm:px-6 md:px-6 mb-20 max-w-7xl">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 font-heading text-center">
              Frequently Asked Questions
            </h2>

            {/* ✅ IMPORTANT: each AccordionItem value must be UNIQUE */}
            <Accordion type="single" collapsible className="w-full space-y-3">
              <AccordionItem
                value="item-1"
                className="rounded-2xl border bg-white/70 px-4 md:px-6 shadow-sm transition-all hover:shadow-md hover:bg-white"
              >
                <AccordionTrigger>
                  How close are you to the hospitals?
                </AccordionTrigger>
                <AccordionContent>
                  All our properties are within 3km (10-minute drive) of Apollo
                  and Fortis hospitals on Bannerghatta Road.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-2"
                className="rounded-2xl border bg-white/70 px-4 md:px-6 shadow-sm transition-all hover:shadow-md hover:bg-white"
              >
                <AccordionTrigger>Can I cook my own food?</AccordionTrigger>
                <AccordionContent>
                  Yes! All rooms have kitchenettes. We also offer therapeutic
                  meal services if you prefer home-style nutritious food.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-3"
                className="rounded-2xl border bg-white/70 px-4 md:px-6 shadow-sm transition-all hover:shadow-md hover:bg-white"
              >
                <AccordionTrigger>Is airport pickup included?</AccordionTrigger>
                <AccordionContent>
                  Airport transfers are included in our weekly packages or
                  available as an affordable add-on service.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-4"
                className="rounded-2xl border bg-white/70 px-4 md:px-6 shadow-sm transition-all hover:shadow-md hover:bg-white"
              >
                <AccordionTrigger>
                  Do you have wheelchair access?
                </AccordionTrigger>
                <AccordionContent>
                  Absolutely. All properties have elevator access,
                  wheelchair-friendly entrances, and adapted bathrooms with grab
                  rails.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-5"
                className="rounded-2xl border bg-white/70 px-4 md:px-6 shadow-sm transition-all hover:shadow-md hover:bg-white"
              >
                <AccordionTrigger>
                  What if I need nursing care?
                </AccordionTrigger>
                <AccordionContent>
                  We coordinate post-discharge nursing visits through our vetted
                  agency partners to ensure medical safety.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* More FAQ Button */}
            <div className="text-center mt-6">
              <Button
                variant="outline"
                onClick={() => navigate("/faq")}
                className="border-[#14B8A6] text-[#14B8A6] hover:bg-[#14B8A6] hover:text-white px-6 py-4 text-sm font-semibold rounded-full transition-all duration-300"
              >
                More FAQs
              </Button>
            </div>
          </section>

          <section className="pt-0 pb-6">
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="text-center">
                <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 md:mb-6">
                  Trusted Health Home Network
                </h2>
                <div className="grid grid-cols-3 gap-4 md:gap-6">
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-1">
                      150+
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Verified Health Homes
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-1">
                      24/7
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Nursing Support
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-1">
                      100%
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Medical-Ready
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
      <Footer />
    </div>
  );
};

export default Index;
