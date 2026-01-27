import React, { useState, useRef } from 'react';
import { Heart, MapPin, Star, Clock, Users, CheckCircle, Calendar, Phone, Hospital, Shield } from 'lucide-react';
import Autoplay from 'embla-carousel-autoplay';
import Header from '@/components/Header';
import { SearchBar } from '@/components/SearchBar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Link, useNavigate } from 'react-router-dom';
import healthHomesImage from '@/assets/health-homes.jpg';
import medicalTourismDiagram from '@/assets/medical-tourism-diagram.png';

const Index = () => {
  const navigate = useNavigate();
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState('Bangalore');

  const healthHomes = [
    // Bangalore
    {
      id: '1',
      name: 'Manipal Home Care Center',
      location: 'Old Airport Road, Bangalore',
      city: 'Bangalore',
      image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=500&h=300&fit=crop',
      rating: 4.8,
      reviewCount: 156,
      pricePerDay: 2500,
      services: ['Post-Operative Care', '24/7 Nursing', 'Physiotherapy', 'Medication Management', 'Wound Dressing'],
      facilities: ['ICU Setup', 'Medical Equipment', 'Trained Nurses', 'Doctor Visits', 'Emergency Support'],
      description: 'Premier health home affiliated with Manipal Hospital, offering comprehensive post-operative care with skilled nursing staff and modern medical facilities.',
      phone: '+91-80-2502-4444',
      availableFrom: '2025-01-20',
      capacity: 15,
      specialties: ['Cardiac Recovery', 'Orthopedic Care', 'Neurological Rehabilitation'],
      distanceFromHospital: '1.2 km',
      nearestHospital: 'Manipal Hospital Old Airport Road'
    },
    {
      id: '2',
      name: 'Apollo Home Recovery Center',
      location: 'Bannerghatta Road, Bangalore',
      city: 'Bangalore',
      image: 'https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?w=500&h=300&fit=crop',
      rating: 4.7,
      reviewCount: 203,
      pricePerDay: 2200,
      services: ['Surgical Recovery', 'Chronic Care', 'Rehabilitation', 'Nutrition Support', 'Family Counseling'],
      facilities: ['Oxygen Support', 'Mobility Aids', 'Therapeutic Equipment', 'Dining Services', 'Wi-Fi'],
      description: 'Associated with Apollo Hospital, providing specialized care for patients requiring extended recovery periods with family-like environment.',
      phone: '+91-80-2631-2345',
      availableFrom: '2025-01-18',
      capacity: 20,
      specialties: ['Cancer Recovery', 'Geriatric Care', 'Post-Surgical Rehabilitation'],
      distanceFromHospital: '0.8 km',
      nearestHospital: 'Apollo Hospital Bannerghatta'
    },
    {
      id: '3',
      name: 'Fortis Wellness Home',
      location: 'Whitefield, Bangalore',
      city: 'Bangalore',
      image: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?w=500&h=300&fit=crop',
      rating: 4.6,
      reviewCount: 128,
      pricePerDay: 2800,
      services: ['Critical Care', 'Ventilator Support', 'Dialysis', 'Pain Management', 'Mental Health Support'],
      facilities: ['Advanced Monitoring', 'Backup Power', 'Sanitized Environment', 'Visitor Areas', 'Pharmacy'],
      description: 'High-end recovery facility with state-of-the-art equipment and round-the-clock medical supervision for complex medical conditions.',
      phone: '+91-80-4679-1000',
      availableFrom: '2025-01-22',
      capacity: 12,
      specialties: ['Intensive Care', 'Respiratory Care', 'Renal Care'],
      distanceFromHospital: '2.1 km',
      nearestHospital: 'Fortis Hospital Whitefield'
    },
    
    // Chennai
    {
      id: '7',
      name: 'Apollo Wellness Home Chennai',
      location: 'Greams Road, Chennai',
      city: 'Chennai',
      image: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?w=500&h=300&fit=crop',
      rating: 4.6,
      reviewCount: 134,
      pricePerDay: 2300,
      services: ['Post-Operative Care', 'Cardiac Recovery', 'Physiotherapy', 'Nursing Care', 'Family Support'],
      facilities: ['ICU Setup', 'Medical Equipment', 'Doctor Visits', 'Emergency Support', 'Dining Services'],
      description: 'Leading healthcare facility in Chennai with specialized cardiac recovery programs and 24/7 medical supervision.',
      phone: '+91-44-2829-3333',
      availableFrom: '2025-01-19',
      capacity: 18,
      specialties: ['Cardiac Recovery', 'Post-Surgical Care', 'Rehabilitation'],
      distanceFromHospital: '0.5 km',
      nearestHospital: 'Apollo Hospital Greams Road'
    },
    {
      id: '8',
      name: 'Fortis Recovery Center Chennai',
      location: 'Vadapalani, Chennai',
      city: 'Chennai',
      image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=500&h=300&fit=crop',
      rating: 4.5,
      reviewCount: 98,
      pricePerDay: 2100,
      services: ['Neurological Care', 'Stroke Recovery', 'Physical Therapy', 'Speech Therapy', 'Occupational Therapy'],
      facilities: ['Therapy Rooms', 'Exercise Equipment', 'Medical Supervision', 'Nutritious Meals', 'Wi-Fi'],
      description: 'Specialized neurological recovery center with comprehensive rehabilitation programs and expert medical care.',
      phone: '+91-44-4289-4289',
      availableFrom: '2025-01-21',
      capacity: 16,
      specialties: ['Neurological Recovery', 'Stroke Rehabilitation', 'Physical Therapy'],
      distanceFromHospital: '1.3 km',
      nearestHospital: 'Fortis Malar Hospital'
    },
    {
      id: '15',
      name: 'Global Health City Recovery',
      location: 'Perumbakkam, Chennai',
      city: 'Chennai',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=500&h=300&fit=crop',
      rating: 4.3,
      reviewCount: 89,
      pricePerDay: 1900,
      services: ['Elderly Care', 'Post-Operative Support', 'Medication Reminders', 'Physical Therapy', 'Social Activities'],
      facilities: ['Garden Area', 'Common Rooms', 'Medical Supervision', 'Nutritious Meals', 'Entertainment'],
      description: 'Comprehensive healthcare facility with specialized elderly care and post-operative recovery programs.',
      phone: '+91-44-4747-4747',
      availableFrom: '2025-01-20',
      capacity: 20,
      specialties: ['Elderly Care', 'Post-Surgical Care', 'Chronic Disease Management']
    },
    
    // Delhi
    {
      id: '9',
      name: 'Max Healthcare Recovery Home',
      location: 'Saket, New Delhi',
      city: 'Delhi',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=500&h=300&fit=crop',
      rating: 4.7,
      reviewCount: 187,
      pricePerDay: 2800,
      services: ['Critical Care', 'Post-Operative Support', 'Ventilator Support', 'Pain Management', 'Family Counseling'],
      facilities: ['Advanced Monitoring', 'ICU Setup', 'Backup Power', 'Pharmacy', 'Visitor Areas'],
      description: 'Premium healthcare facility in Delhi offering critical care support with state-of-the-art medical equipment.',
      phone: '+91-11-2651-5050',
      availableFrom: '2025-01-18',
      capacity: 20,
      specialties: ['Critical Care', 'Intensive Care', 'Post-Surgical Recovery']
    },
    {
      id: '10',
      name: 'Medanta Home Care Delhi',
      location: 'Sector 38, Gurgaon',
      city: 'Delhi',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=300&fit=crop',
      rating: 4.6,
      reviewCount: 156,
      pricePerDay: 2600,
      services: ['Cardiac Care', 'Dialysis', 'Physiotherapy', 'Nursing Support', 'Medication Management'],
      facilities: ['Cardiac Monitoring', 'Dialysis Unit', 'Therapy Rooms', 'Medical Equipment', 'Emergency Support'],
      description: 'Advanced cardiac care facility with specialized equipment for heart patients and comprehensive medical support.',
      phone: '+91-124-4141-414',
      availableFrom: '2025-01-20',
      capacity: 14,
      specialties: ['Cardiac Care', 'Renal Care', 'Cardiac Rehabilitation']
    },
    {
      id: '16',
      name: 'AIIMS Wellness Center',
      location: 'South Delhi, New Delhi',
      city: 'Delhi',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=300&fit=crop',
      rating: 4.9,
      reviewCount: 234,
      pricePerDay: 3000,
      services: ['Research-Based Care', 'Advanced Treatments', 'Experimental Therapies', 'Academic Support', 'Medical Training'],
      facilities: ['Research Labs', 'Teaching Facilities', 'Advanced Equipment', 'Medical Library', 'Conference Rooms'],
      description: 'Premier academic medical facility offering cutting-edge treatments and research-based recovery programs.',
      phone: '+91-11-2659-3000',
      availableFrom: '2025-01-17',
      capacity: 8,
      specialties: ['Research Medicine', 'Advanced Care', 'Teaching Hospital Programs']
    },
    
    // Mumbai
    {
      id: '11',
      name: 'Kokilaben Recovery Center',
      location: 'Andheri West, Mumbai',
      city: 'Mumbai',
      image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=500&h=300&fit=crop',
      rating: 4.8,
      reviewCount: 203,
      pricePerDay: 3200,
      services: ['Cancer Recovery', 'Chemotherapy Support', 'Radiation Recovery', 'Palliative Care', 'Family Support'],
      facilities: ['Oncology Setup', 'Isolation Rooms', 'Medical Equipment', 'Nutrition Support', 'Counseling Rooms'],
      description: 'Specialized cancer recovery facility with comprehensive oncology support and compassionate care programs.',
      phone: '+91-22-4296-9999',
      availableFrom: '2025-01-17',
      capacity: 12,
      specialties: ['Cancer Recovery', 'Oncology Care', 'Palliative Care']
    },
    {
      id: '12',
      name: 'Hinduja Healthcare Home',
      location: 'Mahim, Mumbai',
      city: 'Mumbai',
      image: 'https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?w=500&h=300&fit=crop',
      rating: 4.5,
      reviewCount: 167,
      pricePerDay: 2900,
      services: ['Orthopedic Recovery', 'Joint Replacement Care', 'Physical Therapy', 'Pain Management', 'Mobility Support'],
      facilities: ['Orthopedic Equipment', 'Physiotherapy Room', 'Medical Supervision', 'Exercise Area', 'Dining Services'],
      description: 'Leading orthopedic recovery center with specialized care for joint replacement and bone surgery patients.',
      phone: '+91-22-2445-1515',
      availableFrom: '2025-01-22',
      capacity: 16,
      specialties: ['Orthopedic Care', 'Joint Replacement Recovery', 'Bone Surgery Rehabilitation']
    },
    {
      id: '17',
      name: 'Tata Memorial Recovery Wing',
      location: 'Parel, Mumbai',
      city: 'Mumbai',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=500&h=300&fit=crop',
      rating: 4.9,
      reviewCount: 298,
      pricePerDay: 3500,
      services: ['Cancer Rehabilitation', 'Post-Treatment Care', 'Immunotherapy Support', 'Research Programs', 'Psychological Support'],
      facilities: ['Oncology Research', 'Isolation Wards', 'Advanced Imaging', 'Rehabilitation Center', 'Support Groups'],
      description: 'World-class cancer recovery facility with cutting-edge research and comprehensive rehabilitation programs.',
      phone: '+91-22-2414-6750',
      availableFrom: '2025-01-16',
      capacity: 15,
      specialties: ['Cancer Research', 'Oncology Rehabilitation', 'Clinical Trials']
    },
    
    // Hyderabad
    {
      id: '13',
      name: 'Apollo Health City Recovery',
      location: 'Jubilee Hills, Hyderabad',
      city: 'Hyderabad',
      image: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?w=500&h=300&fit=crop',
      rating: 4.7,
      reviewCount: 145,
      pricePerDay: 2400,
      services: ['Transplant Recovery', 'Post-Surgical Care', 'Immunosuppressive Care', 'Infection Control', 'Nutrition Support'],
      facilities: ['Sterile Environment', 'Advanced Monitoring', 'Isolation Rooms', 'Medical Equipment', 'Pharmacy'],
      description: 'Premier transplant recovery facility with specialized care for organ transplant patients and strict infection control.',
      phone: '+91-40-2301-3333',
      availableFrom: '2025-01-19',
      capacity: 10,
      specialties: ['Transplant Recovery', 'Immunosuppressive Care', 'Post-Surgical Care']
    },
    {
      id: '14',
      name: 'KIMS Wellness Home',
      location: 'Secunderabad, Hyderabad',
      city: 'Hyderabad',
      image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=500&h=300&fit=crop',
      rating: 4.4,
      reviewCount: 112,
      pricePerDay: 2000,
      services: ['Geriatric Care', 'Dementia Support', 'Chronic Disease Management', 'Physical Therapy', 'Mental Health Support'],
      facilities: ['Elderly-Friendly Design', 'Safety Features', 'Medical Supervision', 'Activity Rooms', 'Garden Area'],
      description: 'Specialized elderly care facility with comprehensive geriatric services and dementia support programs.',
      phone: '+91-40-4488-5555',
      availableFrom: '2025-01-21',
      capacity: 22,
      specialties: ['Geriatric Care', 'Dementia Care', 'Chronic Disease Management']
    },
    {
      id: '18',
      name: 'Yashoda Hospital Recovery',
      location: 'Malakpet, Hyderabad',
      city: 'Hyderabad',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=300&fit=crop',
      rating: 4.5,
      reviewCount: 178,
      pricePerDay: 2200,
      services: ['Multi-Specialty Care', 'Emergency Response', 'Critical Care', 'Rehabilitation', 'Family Support'],
      facilities: ['Multi-Specialty Setup', '24/7 Emergency', 'ICU Facilities', 'Diagnostic Center', 'Family Accommodation'],
      description: 'Comprehensive multi-specialty recovery facility with 24/7 emergency support and advanced medical care.',
      phone: '+91-40-6830-1000',
      availableFrom: '2025-01-18',
      capacity: 25,
      specialties: ['Multi-Specialty Care', 'Emergency Medicine', 'Critical Care Recovery']
    }
  ];

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const cities = ['Bangalore', 'Chennai', 'Delhi', 'Mumbai', 'Hyderabad'];
  
  const getHealthHomesByCity = (city: string) => {
    return healthHomes.filter(home => home.city === city);
  };

  const allServices = Array.from(new Set([
    ...healthHomes.flatMap(home => home.services),
    ...healthHomes.flatMap(home => home.specialties)
  ]));

  // City Health Homes Section Component
  const CityHealthHomesSection = ({ city, cityHomes, displayedHomes, hasMoreHomes }: { 
    city: string; 
    cityHomes: typeof healthHomes; 
    displayedHomes: typeof healthHomes; 
    hasMoreHomes: boolean;
  }) => {
    const autoplayPlugin = useRef(
      Autoplay({ delay: 3000, stopOnInteraction: true })
    );

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
                <span>{displayedHomes.length} of {cityHomes.length} health homes</span>
              </div>
            </div>
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden">
            <Carousel
              plugins={[autoplayPlugin.current]}
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
              onMouseEnter={autoplayPlugin.current.stop}
              onMouseLeave={autoplayPlugin.current.reset}
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {displayedHomes.map(home => (
                  <CarouselItem key={home.id} className="pl-2 md:pl-4 basis-[85%] sm:basis-[75%]">
                    <Card 
                      className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/30 overflow-hidden"
                      onClick={() => navigate(`/health-home/${home.id}`)}
                    >
                      <div className="relative h-28 sm:h-32 overflow-hidden">
                        <img 
                          src={home.image} 
                          alt={home.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-1.5 sm:top-2 right-1.5 sm:right-2 bg-white/90 backdrop-blur-sm rounded-lg px-1.5 sm:px-2 py-0.5 sm:py-1">
                          <div className="flex items-center gap-0.5 sm:gap-1">
                            <Star className="h-2.5 w-2.5 sm:h-3 sm:w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-[10px] sm:text-xs font-semibold">{home.rating}</span>
                          </div>
                        </div>
                        <div className="absolute top-1.5 sm:top-2 left-1.5 sm:left-2 bg-primary text-primary-foreground rounded-lg px-1.5 sm:px-2 py-0.5 sm:py-1">
                          <span className="text-[10px] sm:text-xs font-semibold">₹{home.pricePerDay}/day</span>
                        </div>
                      </div>

                      <CardContent className="p-3 sm:p-4">
                        <div className="mb-2 sm:mb-3">
                          <h3 className="text-sm sm:text-base font-semibold mb-1 text-foreground group-hover:text-primary transition-colors line-clamp-1">
                            {home.name}
                          </h3>
                          <div className="flex items-center gap-1 text-muted-foreground mb-1.5 sm:mb-2">
                            <MapPin className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                            <span className="text-[10px] sm:text-xs line-clamp-1">{home.location}</span>
                          </div>
                          <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-muted-foreground">
                            <div className="flex items-center gap-0.5 sm:gap-1">
                              <Users className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                              <span>{home.capacity} beds</span>
                            </div>
                            {home.distanceFromHospital && (
                              <div className="flex items-center gap-0.5 sm:gap-1">
                                <Hospital className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                                <span>{home.distanceFromHospital}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Compact Services */}
                        <div className="mb-2 sm:mb-3">
                          <div className="flex flex-wrap gap-1">
                            {home.services.slice(0, 2).map(service => (
                              <Badge key={service} variant="secondary" className="text-[10px] sm:text-xs py-0 px-1.5 sm:px-2 h-4 sm:h-5">
                                {service}
                              </Badge>
                            ))}
                            {home.services.length > 2 && (
                              <Badge variant="outline" className="text-[10px] sm:text-xs py-0 px-1.5 sm:px-2 h-4 sm:h-5">
                                +{home.services.length - 2}
                              </Badge>
                            )}
                          </div>
                        </div>

                        <Button 
                          variant="outline" 
                          size="sm"
                          className="w-full text-xs sm:text-sm group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                          onClick={() => navigate(`/health-home/${home.id}`)}
                        >
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2 h-8 w-8" />
              <CarouselNext className="right-2 h-8 w-8" />
            </Carousel>
          </div>

          {/* Desktop Horizontal Scroll */}
          <div className="hidden md:block overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
            <div className="flex gap-3 sm:gap-20 w-max">
              {displayedHomes.map(home => (
               <Card 
                 key={home.id} 
                 className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/30 overflow-hidden w-64 md:w-96 flex-shrink-0"
                 onClick={() => navigate(`/health-home/${home.id}`)}
               >
                <div className="relative h-32 md:h-40 overflow-hidden">
                  <img 
                    src={home.image} 
                    alt={home.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-semibold">{home.rating}</span>
                    </div>
                  </div>
                  <div className="absolute top-2 left-2 bg-primary text-primary-foreground rounded-lg px-2 py-1">
                    <span className="text-xs font-semibold">₹{home.pricePerDay}/day</span>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="mb-3">
                    <h3 className="text-base md:text-lg font-semibold mb-1 text-foreground group-hover:text-primary transition-colors line-clamp-1">
                      {home.name}
                    </h3>
                    <div className="flex items-center gap-1 text-muted-foreground mb-2">
                      <MapPin className="h-3 w-3" />
                      <span className="text-xs line-clamp-1">{home.location}</span>
                    </div>
                     <div className="flex items-center gap-3 text-xs text-muted-foreground">
                       <div className="flex items-center gap-1">
                         <Users className="h-3 w-3" />
                         <span>{home.capacity} beds</span>
                       </div>
                       {home.distanceFromHospital && (
                         <div className="flex items-center gap-1">
                           <Hospital className="h-3 w-3" />
                           <span>{home.distanceFromHospital}</span>
                         </div>
                       )}
                     </div>
                  </div>

                  {/* Compact Services */}
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-1">
                      {home.services.slice(0, 2).map(service => (
                        <Badge key={service} variant="secondary" className="text-xs py-0 px-2 h-5">
                          {service}
                        </Badge>
                      ))}
                      {home.services.length > 2 && (
                        <Badge variant="outline" className="text-xs py-0 px-2 h-5">
                          +{home.services.length - 2}
                        </Badge>
                      )}
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
           </div>

          {/* View All Button */}
          {hasMoreHomes && (
            <div className="text-center mt-6 md:mt-8">
              <Button variant="outline" size="default" className="px-4 sm:px-8 text-sm sm:text-base">
                View All {cityHomes.length} Health Homes in {city}
              </Button>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <Header activePage="health-homes" />

      {/* Hero Section */}
      <section className="py-10 sm:py-16 md:py-20 bg-gradient-to-br from-background via-accent/5 to-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 md:mb-6">
              Find the perfect
              <span className="text-primary"> health home</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-6 md:mb-8 px-2">
              Discover the perfect health home for your medical needs with AI-powered matching. Recover comfortably in specialized facilities equipped with medical equipment and professional nursing care. 
              Your healing journey deserves the best environment.
            </p>
            <div className="flex items-center justify-center text-xs sm:text-sm text-muted-foreground mb-6 md:mb-8">
              <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              Starting in Bangalore, expanding across India
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="max-w-4xl mx-auto mb-10 md:mb-16 px-2">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Medical-Ready Accommodations Section */}
      <section className="py-8 md:py-12 bg-accent/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-center">
            <div className="lg:col-span-2 order-2 lg:order-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 md:mb-4">
                Medical-Ready Accommodations
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 md:mb-6">
                Our health homes are specially designed for post-operative recovery and medical treatments with essential medical equipment and qualified nursing staff.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                  <span className="text-foreground text-xs sm:text-sm">Hospital integration for seamless care</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                  <span className="text-foreground text-xs sm:text-sm">24/7 nursing staff availability</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                  <span className="text-foreground text-xs sm:text-sm">Medical equipment and supplies</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                  <span className="text-foreground text-xs sm:text-sm">Comfortable recovery environment</span>
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

      {/* Health Homes by Cities */}
      {cities.map((city) => {
        const cityHomes = getHealthHomesByCity(city);
        const displayedHomes = cityHomes.slice(0, 3); // Show only first 3 homes
        const hasMoreHomes = cityHomes.length > 3;
        return (
          <CityHealthHomesSection
            key={city}
            city={city}
            cityHomes={cityHomes}
            displayedHomes={displayedHomes}
            hasMoreHomes={hasMoreHomes}
          />
        );
      })}

      {/* Trust Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 md:mb-8">
              Trusted Health Home Network
            </h2>
            <div className="grid grid-cols-3 gap-4 md:gap-8">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-1 md:mb-2">150+</div>
                <p className="text-xs sm:text-sm md:text-base text-muted-foreground">Verified Health Homes</p>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-1 md:mb-2">24/7</div>
                <p className="text-xs sm:text-sm md:text-base text-muted-foreground">Nursing Support</p>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-1 md:mb-2">100%</div>
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
