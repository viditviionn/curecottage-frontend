// ✅ Index.tsx (FULL FILE)
// Place this as: src/pages/Index.tsx (or your existing path)

import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Heart,
  MapPin,
  Star,
  Users,
  CheckCircle,
  Calendar,
  Hospital,
  Shield,
} from 'lucide-react';
import Autoplay from 'embla-carousel-autoplay';

import Header from '@/components/Header';
import { SearchBar } from '@/components/SearchBar';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

import { useNavigate } from 'react-router-dom';
import healthHomesImage from '@/assets/health-homes.jpg';

import {
  GetAvailablePropertiesArgs,
  Property,
  useGetAvailablePropertiesQuery,
} from '@/rtk/api/showproperty';

const Index = () => {
  const navigate = useNavigate();

  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [selectedCheckIn, setSelectedCheckIn] = useState<string>('');
  const [selectedCheckOut, setSelectedCheckOut] = useState<string>('');
  const [selectedAdults, setSelectedAdults] = useState<number>(1);
  const [selectedChildren, setSelectedChildren] = useState<number>(0);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLogedIn, setIsLoggedIn] = useState(false); // Placeholder for auth state
  console.log("isLogedIn", isLogedIn);

useEffect(() => {
  const token = localStorage.getItem('auth_token');
  setIsLoggedIn(!!token); // converts to true/false
}, []);


  // For auto-scroll to results
  const resultsRef = useRef<HTMLDivElement | null>(null);

  const [queryArgs, setQueryArgs] = useState<GetAvailablePropertiesArgs>({
    page: 1,
    limit: 100,
  });

  const { data, isLoading, isFetching, isError } = useGetAvailablePropertiesQuery(queryArgs);

  const showSkeleton = isLoading || isFetching;
  const healthHomes = data?.properties ?? [];

  const handleSearch = (location: string, checkIn: string, checkOut: string, guests: number) => {
    setSelectedCity(location);
    setSelectedCheckIn(checkIn);
    setSelectedCheckOut(checkOut);
    setSelectedAdults(guests > 0 ? guests : 1); // Simplified: using guests as adults
    setSelectedChildren(0); // Reset children for simplicity
    
    // Only mark as searched if specific city is selected (not "All")
    if (location !== 'All') {
      setHasSearched(true);
    } else {
      setHasSearched(false);
    }

    setQueryArgs({
      page: 1,
      limit: 100,
      city: location === 'All' ? undefined : location,
      checkInDate: checkIn || undefined,
      checkOutDate: checkOut || undefined,
    });
  };

  // After search, scroll to results (so user knows where results are)
  useEffect(() => {
    if (!hasSearched) return;

    requestAnimationFrame(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, [hasSearched, selectedCity]);

  const cities = ['Bangalore', 'Chennai', 'Delhi', 'Mumbai', 'Hyderabad'];

  const filteredHomes = useMemo(() => {
    if (!selectedCity || selectedCity === 'All') return healthHomes;
    const city = selectedCity.trim().toLowerCase();
    return healthHomes.filter((p) => (p.city || '').trim().toLowerCase() === city);
  }, [healthHomes, selectedCity]);

  const citiesToRender = useMemo(() => {
    if (!selectedCity || selectedCity === 'All') return cities;
    return [selectedCity];
  }, [selectedCity]);

  const getCardImage = (p: Property) =>
    p.images?.find((img) => img.isPrimary)?.imageUrl || p.images?.[0]?.imageUrl;

  const getLocation = (p: Property) => [p.addressLine1, p.city].filter(Boolean).join(', ');

  const getHealthHomesByCity = (city: string) =>
    filteredHomes.filter(
      (p) => (p.city || '').trim().toLowerCase() === city.trim().toLowerCase()
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
    const autoplayPlugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));


    return (
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="mb-6 md:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 md:mb-4">
              Health Homes in {city}
            </h2>
            <div className="flex flex-wrap gap-2 sm:gap-4 text-muted-foreground text-sm">
              <div className="flex items-center gap-1 sm:gap-2">
                <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>{city}</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <Heart className="h-3 w-3 sm:h-4 sm:w-4" />
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
              <div className="md:hidden">
                <Carousel
                  plugins={[autoplayPlugin.current]}
                  opts={{ align: 'start', loop: displayedHomes.length > 1 }}
                  className="w-full relative"
                  onMouseEnter={autoplayPlugin.current.stop}
                  onMouseLeave={autoplayPlugin.current.reset}
                >
                  <CarouselContent className="-ml-4">
                    {displayedHomes.map((home) => (
                      <CarouselItem key={home.id} className="pl-4 basis-full">
                        <Card
                          className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/30 overflow-hidden w-full"
                          onClick={() => navigate(`/health-home/${home.id}`)}
                        >
                          <div className="relative h-40 overflow-hidden">
                            <img
                              src={getCardImage(home)}
                              alt={home.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />

                            <div className="absolute top-2 right-2 bg-green-600 text-white backdrop-blur-sm rounded-lg px-2 py-1">
                              <span className="text-xs font-semibold">{home.status.toUpperCase()}</span>
                            </div>

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
                              <span className="text-xs line-clamp-1">{getLocation(home)}</span>
                            </div>

                            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                              <div className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                <span>{home.totalRooms} rooms</span>
                              </div>
                            </div>

                            <Button variant="outline" size="sm" className="w-full text-sm">
                              View Details
                            </Button>
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>

                  <CarouselPrevious className="left-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white shadow" />
                  <CarouselNext className="right-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white shadow" />
                </Carousel>
              </div>

              {/* Desktop Carousel */}
              <div className="hidden md:block">
                <Carousel opts={{ align: 'start', loop: displayedHomes.length > 4 }} className="w-full relative">
                  <CarouselContent className="-ml-4">
                    {displayedHomes.map((home) => (
                      <CarouselItem key={home.id} className="pl-4 basis-1/4">
                        <Card
                          className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/30 overflow-hidden w-full"
                          onClick={() => navigate(`/health-home/${home.id}`)}
                        >
                          <div className="relative h-32 md:h-40 overflow-hidden">
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
                              <span className="text-xs font-semibold">₹{home.totalRooms * 500}/day</span>
                            </div>
                          </div>

                          <CardContent className="p-4">
                            <div className="mb-3">
                              <h3 className="text-base md:text-lg font-semibold mb-1 text-foreground group-hover:text-primary transition-colors line-clamp-1">
                                {home.name}
                              </h3>
                              <div className="flex items-center gap-1 text-muted-foreground mb-2">
                                <MapPin className="h-3 w-3" />
                                <span className="text-xs line-clamp-1">{getLocation(home)}</span>
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

                            <div className="mb-3">
                              <div className="flex flex-wrap gap-1">
                                <Badge variant="secondary" className="text-xs py-0 px-2 h-5">
                                  {home.propertyType.toUpperCase()}
                                </Badge>
                                <Badge
                                  variant="outline"
                                  className="text-xs bg-green-600 text-white py-0 px-2 h-5"
                                >
                                  {home.status.toUpperCase()}
                                </Badge>
                              </div>
                            </div>

                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full text-sm group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
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

                  <CarouselPrevious className="left-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white shadow" />
                  <CarouselNext className="right-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white shadow" />
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
                  <div className="relative h-40 overflow-hidden">
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
                      <span className="text-xs font-semibold">₹{home.totalRooms * 500}/day</span>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <div className="mb-3">
                      <h3 className="text-base md:text-lg font-semibold mb-1 text-foreground group-hover:text-primary transition-colors line-clamp-1">
                        {home.name}
                      </h3>
                      <div className="flex items-center gap-1 text-muted-foreground mb-2">
                        <MapPin className="h-3 w-3" />
                        <span className="text-xs line-clamp-1">{getLocation(home)}</span>
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

                    <div className="mb-3">
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="secondary" className="text-xs py-0 px-2 h-5">
                          {home.propertyType.toUpperCase()}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="text-xs bg-green-600 text-white py-0 px-2 h-5"
                        >
                          {home.status.toUpperCase()}
                        </Badge>
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

          {cityHomes.length === 0 && (
            <div className="text-center py-8 md:py-12">
              <h3 className="text-xl sm:text-2xl font-semibold text-muted-foreground mb-3 md:mb-4">
                No health homes found in {city}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 md:mb-6">
                We're expanding to more locations. Stay tuned!
              </p>
            </div>
          )}
        </div>
      </section>
    );
  };

  // Skeletons
  const SkeletonLine = ({ className = '' }: { className?: string }) => (
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
  <div className="hidden md:block pt-6">
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
  <div className="md:hidden pt-4">
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
      {!hasSearched && !isLogedIn &&  (
        <section className="py-10 sm:py-16 md:py-20 bg-gradient-to-br from-background via-accent/5 to-primary/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-12 font-sans">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 md:mb-6">
                Find the perfect <span className="text-primary">health home</span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-6 md:mb-8 px-2">
                Discover the perfect health home for your medical needs with AI-powered matching.
                Recover comfortably in specialized facilities equipped with medical equipment and professional nursing care.
              </p>

              <div className="flex items-center justify-center text-xs sm:text-sm text-muted-foreground">
                <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                Starting in Bangalore, expanding across India
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Medical-Ready Accommodations: hide after search */}
      {!hasSearched && !isLogedIn && (
        <section className="py-8 md:py-12 bg-accent/20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-center">
              <div className="lg:col-span-2 order-2 lg:order-1">
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 md:mb-4">
                  Medical-Ready Accommodations
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground mb-4 md:mb-6">
                  Our health homes are specially designed for post-operative recovery and medical
                  treatments with essential medical equipment and qualified nursing staff.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground text-xs sm:text-sm">
                      Hospital integration for seamless care
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground text-xs sm:text-sm">
                      24/7 nursing staff availability
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground text-xs sm:text-sm">
                      Medical equipment and supplies
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground text-xs sm:text-sm">
                      Comfortable recovery environment
                    </span>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-1 order-1 lg:order-2">
                <img
                  src={healthHomesImage}
                  alt="Health Home Interior"
                  className="rounded-lg shadow-lg w-full h-40 sm:h-48 object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Anchor for auto-scroll */}
      <div ref={resultsRef} className="scroll-mt-[140px]" />

      {/* Health Homes by Cities */}
      {showSkeleton ? (
        citiesToRender.map((city) => <CityHealthHomesSectionSkeleton key={city} city={city} />)
      ) : isError ? (
        <section className="py-10">
          <div className="container mx-auto px-4">
            <p className="text-red-500">Failed to load properties</p>
          </div>
        </section>
      ) : (
        citiesToRender.map((city) => {
          const cityHomes = getHealthHomesByCity(city);
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
        })
      )}

      {/* Trust Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 md:mb-8">
              Trusted Health Home Network
            </h2>
            <div className="grid grid-cols-3 gap-4 md:gap-8">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-1 md:mb-2">
                  150+
                </div>
                <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
                  Verified Health Homes
                </p>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-1 md:mb-2">
                  24/7
                </div>
                <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
                  Nursing Support
                </p>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-1 md:mb-2">
                  100%
                </div>
                <p className="text-xs sm:text-sm md:text-base text-muted-foreground">Medical-Ready</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 md:py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <div className="bg-primary p-1.5 sm:p-2 rounded-lg">
                <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
              </div>
              <span className="text-lg sm:text-xl font-bold text-primary">Cure Cottage</span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-right">
              © 2024 Cure Cottage. Bringing healthcare closer to you.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
