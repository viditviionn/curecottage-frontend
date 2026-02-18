import React, { useMemo, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay";
import { Heart, MapPin, Users, Hospital, Star, ArrowLeft } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
import {
  Property,
  useGetAvailablePropertiesQuery,
} from "@/rtk/api/showproperty";

const Homes = () => {
  const navigate = useNavigate();

  const [selectedCity, setSelectedCity] = useState<string>("All");
  const [selectedCheckIn, setSelectedCheckIn] = useState<string>("");
  const [selectedCheckOut, setSelectedCheckOut] = useState<string>("");
  const [selectedAdults, setSelectedAdults] = useState<number>(1);
  const [selectedChildren, setSelectedChildren] = useState<number>(0);
  const [hasSearched, setHasSearched] = useState(false);

  // For auto-scroll to results
  const resultsRef = useRef<HTMLDivElement | null>(null);

  const { data, isLoading, isFetching, isError } =
    useGetAvailablePropertiesQuery({ page: 1, limit: 100 });

  const showSkeleton = isLoading || isFetching;
  const healthHomes = data?.properties ?? [];

  const cities = ["Bangalore", "Chennai", "Delhi", "Mumbai", "Hyderabad"];

  const handleSearch = (
    location: string,
    checkIn: string,
    checkOut: string,
    guests: number,
  ) => {
    setSelectedCity(location);
    setSelectedCheckIn(checkIn);
    setSelectedCheckOut(checkOut);
    setSelectedAdults(guests > 0 ? guests : 1);
    setSelectedChildren(0);

    // Mark as searched if specific city is selected (not "All")
    if (location !== "All") {
      setHasSearched(true);
    } else {
      setHasSearched(false);
    }
  };

  // After search, scroll to results
  useEffect(() => {
    if (!hasSearched) return;

    requestAnimationFrame(() => {
      resultsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }, [hasSearched, selectedCity]);

  const getCardImage = (p: Property) =>
    p.images?.find((img) => img.isPrimary)?.imageUrl || p.images?.[0]?.imageUrl;

  const getLocation = (p: Property) =>
    [p.addressLine1, p.city].filter(Boolean).join(", ");

  const getHealthHomesByCity = (city: string) =>
    healthHomes.filter(
      (p) => (p.city || "").trim().toLowerCase() === city.trim().toLowerCase(),
    );

  const citiesWithHomes = useMemo(
    () => {
      const allCitiesWithHomes = cities
        .map((city) => ({ city, cityHomes: getHealthHomesByCity(city) }))
        .filter(({ cityHomes }) => cityHomes.length > 0);

      // Filter by selected city if not "All"
      if (selectedCity && selectedCity !== "All") {
        const filteredCity = selectedCity.trim();
        return allCitiesWithHomes.filter(
          ({ city }) => city.trim().toLowerCase() === filteredCity.toLowerCase()
        );
      }

      return allCitiesWithHomes;
    },
    [healthHomes, selectedCity],
  );

  const SkeletonLine = ({ className = "" }: { className?: string }) => (
    <div className={`rounded-full bg-muted/60 animate-pulse ${className}`} />
  );

  const SkeletonCard = () => (
    <div className="rounded-2xl border overflow-hidden bg-background">
      <div className="h-36 bg-muted/60 animate-pulse" />
      <div className="p-4 space-y-2">
        <SkeletonLine className="h-4 w-3/5" />
        <SkeletonLine className="h-3 w-2/5" />
      </div>
    </div>
  );

  const CityHealthHomesSectionSkeleton = ({ city }: { city: string }) => (
    <section className="py-6 md:py-10">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-4 md:mb-6">
          <SkeletonLine className="h-7 w-72" />
          <div className="mt-3 flex gap-3">
            <SkeletonLine className="h-4 w-24" />
            <SkeletonLine className="h-4 w-44" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={`${city}-${i}`} />
          ))}
        </div>
      </div>
    </section>
  );

  const CityHealthHomesSection = ({
    city,
    cityHomes,
    hasSearched,
  }: {
    city: string;
    cityHomes: Property[];
    hasSearched: boolean;
  }) => {
    const mobileAutoplayPlugin = useMemo(
      () => Autoplay({ delay: 3000, stopOnInteraction: false, playOnInit: true }),
      []
    );
    const desktopAutoplayPlugin = useMemo(
      () => Autoplay({ delay: 3000, stopOnInteraction: false, playOnInit: true }),
      []
    );

    // Card component to reuse
    const PropertyCard = ({ home, isMobile = false }: { home: Property; isMobile?: boolean }) => (
      <Card
        className={`group cursor-pointer hover:shadow-xl transition-all duration-300 ${
          isMobile ? 'hover:-translate-y-1' : 'hover:-translate-y-2'
        } border-2 hover:border-primary/30 overflow-hidden w-full`}
        onClick={() => navigate(`/health-home/${home.id}`)}
      >
        <div className={`relative ${isMobile ? 'h-36' : 'h-28 md:h-36'} overflow-hidden`}>
          <img
            src={getCardImage(home)}
            alt={home.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {isMobile ? (
            <>
              <div className="absolute top-2 right-2 bg-green-600 text-white backdrop-blur-sm rounded-lg px-2 py-1">
                <span className="text-xs font-semibold">
                  {home.status.toUpperCase()}
                </span>
              </div>
              <div className="absolute top-2 left-2 bg-primary text-primary-foreground rounded-lg px-2 py-1">
                <span className="text-xs font-semibold">
                  {home.propertyType.toUpperCase()}
                </span>
              </div>
            </>
          ) : (
            <>
              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-semibold">New</span>
                </div>
              </div>
              <div className="absolute top-2 left-2 bg-[#14B8A6] text-primary-foreground rounded-lg px-2 py-1">
                <span className="text-xs font-semibold">
                  ₹{home.totalRooms * 500}/day
                </span>
              </div>
            </>
          )}
        </div>

        <CardContent className="p-4">
          {isMobile ? (
            <>
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
            </>
          ) : (
            <>
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
            </>
          )}
        </CardContent>
      </Card>
    );

    return (
      <section className="py-6 md:py-10">
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
                <span>{cityHomes.length} health homes</span>
              </div>
            </div>
          </div>

          {/* Grid Layout when searched */}
          {hasSearched ? (
            <>
              {/* Mobile Grid */}
              <div className="md:hidden">
                <div className="grid grid-cols-1 gap-4">
                  {cityHomes.map((home) => (
                    <PropertyCard key={home.id} home={home} isMobile={true} />
                  ))}
                </div>
              </div>

              {/* Desktop Grid */}
              <div className="hidden md:block">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {cityHomes.map((home) => (
                    <PropertyCard key={home.id} home={home} />
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Mobile Carousel */}
              <div className="md:hidden relative">
            <Carousel
              plugins={[mobileAutoplayPlugin]}
              opts={{ align: "start", loop: cityHomes.length > 1 }}
              className="w-full relative"
            >
              <CarouselContent className="-ml-4">
                {cityHomes.map((home) => (
                  <CarouselItem key={home.id} className="pl-4 basis-full">
                    <PropertyCard home={home} isMobile={true} />
                  </CarouselItem>
                ))}
              </CarouselContent>

              {cityHomes.length > 1 && (
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
              opts={{ align: "start", loop: cityHomes.length > 4 }}
              className="w-full relative"
            >
              <CarouselContent className="-ml-4">
                {cityHomes.map((home) => (
                  <CarouselItem key={home.id} className="pl-4 basis-1/4">
                    <PropertyCard home={home} />
                  </CarouselItem>
                ))}
              </CarouselContent>

              {cityHomes.length > 4 && (
                <>
                  <CarouselPrevious className="-left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white shadow" />
                  <CarouselNext className="-right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white shadow" />
                </>
              )}
            </Carousel>
          </div>
            </>
          )}
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <Header
        activePage="homes"
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

      {/* Search Bar */}
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

      {/* Back Button */}
      <div className="container mx-auto px-4 pt-2 pb-2 max-w-7xl">
      <Button
              onClick={() => navigate(-1)}
              className="mb-4 h-9 text-sm px-4 flex items-center gap-2"
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
      </div>

      {/* Results section ref for scrolling */}
      <div ref={resultsRef} />

      {showSkeleton ? (
        cities.map((city) => <CityHealthHomesSectionSkeleton key={city} city={city} />)
      ) : isError ? (
        <section className="py-10">
          <div className="container mx-auto px-4 max-w-7xl">
            <p className="text-red-500">Failed to load properties</p>
          </div>
        </section>
      ) : citiesWithHomes.length === 0 ? (
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center py-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {hasSearched ? "No Health Homes Found" : "No Health Homes Available"}
              </h2>
              <p className="text-gray-600 mb-4">
                {hasSearched
                  ? `We couldn't find any health homes in ${selectedCity} for your selected dates.`
                  : "We couldn't find any health homes at the moment."}
              </p>
              {hasSearched && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedCity("All");
                    setHasSearched(false);
                  }}
                  className="mt-4"
                >
                  View All Cities
                </Button>
              )}
            </div>
          </div>
        </section>
      ) : (
        citiesWithHomes.map(({ city, cityHomes }) => (
          <CityHealthHomesSection key={city} city={city} cityHomes={cityHomes} hasSearched={hasSearched} />
        ))
      )}

      <Footer />
    </div>
  );
};

export default Homes;


