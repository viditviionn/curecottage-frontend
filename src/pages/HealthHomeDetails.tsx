import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Star, Users, Calendar, Phone, Heart, Wifi, Car, Utensils, Wind, Bed, Bath, Home, ChevronLeft, ChevronRight, Shield } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const HealthHomeDetails = () => {
  const { id } = useParams();
  
  // Health homes data - matching Index.tsx data structure
  const healthHomesData = {
    "1": {
      name: "Manipal Home Care Center",
      location: "Old Airport Road, Bangalore",
      city: "Bangalore",
      rating: 4.8,
      reviewCount: 156,
      pricePerDay: 2500,
      capacity: 15,
      availableFrom: "2025-01-20",
      image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=500&h=300&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=500&h=300&fit=crop",
        "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=500&h=300&fit=crop",
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=300&fit=crop",
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop",
        "https://images.unsplash.com/photo-1512678080530-7760d81faba6?w=500&h=300&fit=crop"
      ],
      services: ["Post-Operative Care", "24/7 Nursing", "Physiotherapy", "Medication Management", "Wound Dressing"],
      facilities: ["ICU Setup", "Medical Equipment", "Trained Nurses", "Doctor Visits", "Emergency Support"],
      description: "Premier health home affiliated with Manipal Hospital, offering comprehensive post-operative care with skilled nursing staff and modern medical facilities.",
      phone: "+91-80-2502-4444",
      specialties: ["Cardiac Recovery", "Orthopedic Care", "Neurological Rehabilitation"],
      distanceFromHospital: "1.2 km",
      nearestHospital: "Manipal Hospital Old Airport Road"
    },
    "2": {
      name: "Apollo Home Recovery Center",
      location: "Bannerghatta Road, Bangalore",
      city: "Bangalore",
      rating: 4.7,
      reviewCount: 203,
      pricePerDay: 2200,
      capacity: 20,
      availableFrom: "2025-01-18",
      image: "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?w=500&h=300&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?w=500&h=300&fit=crop",
        "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=500&h=300&fit=crop",
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=300&fit=crop",
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop",
        "https://images.unsplash.com/photo-1512678080530-7760d81faba6?w=500&h=300&fit=crop"
      ],
      services: ["Surgical Recovery", "Chronic Care", "Rehabilitation", "Nutrition Support", "Family Counseling"],
      facilities: ["Oxygen Support", "Mobility Aids", "Therapeutic Equipment", "Dining Services", "Wi-Fi"],
      description: "Associated with Apollo Hospital, providing specialized care for patients requiring extended recovery periods with family-like environment.",
      phone: "+91-80-2631-2345",
      specialties: ["Cancer Recovery", "Geriatric Care", "Post-Surgical Rehabilitation"],
      distanceFromHospital: "0.8 km",
      nearestHospital: "Apollo Hospital Bannerghatta"
    },
    "3": {
      name: "Fortis Wellness Home",
      location: "Whitefield, Bangalore",
      city: "Bangalore",
      rating: 4.6,
      reviewCount: 128,
      pricePerDay: 2800,
      capacity: 12,
      availableFrom: "2025-01-22",
      image: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?w=500&h=300&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1512678080530-7760d81faba6?w=500&h=300&fit=crop",
        "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=500&h=300&fit=crop",
        "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=500&h=300&fit=crop",
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h-300&fit=crop",
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=300&fit=crop"
      ],
      services: ["Critical Care", "Ventilator Support", "Dialysis", "Pain Management", "Mental Health Support"],
      facilities: ["Advanced Monitoring", "Backup Power", "Sanitized Environment", "Visitor Areas", "Pharmacy"],
      description: "High-end recovery facility with state-of-the-art equipment and round-the-clock medical supervision for complex medical conditions.",
      phone: "+91-80-4679-1000",
      specialties: ["Intensive Care", "Respiratory Care", "Renal Care"],
      distanceFromHospital: "2.1 km",
      nearestHospital: "Fortis Hospital Whitefield"
    },
    "7": {
      name: "Apollo Wellness Home Chennai",
      location: "Greams Road, Chennai",
      city: "Chennai",
      rating: 4.6,
      reviewCount: 134,
      pricePerDay: 2300,
      capacity: 18,
      availableFrom: "2025-01-19",
      image: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?w=500&h=300&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1512678080530-7760d81faba6?w=500&h=300&fit=crop",
        "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=500&h=300&fit=crop",
        "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=500&h=300&fit=crop",
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=300&fit=crop"
      ],
      services: ["Post-Operative Care", "Cardiac Recovery", "Physiotherapy", "Nursing Care", "Family Support"],
      facilities: ["ICU Setup", "Medical Equipment", "Doctor Visits", "Emergency Support", "Dining Services"],
      description: "Leading healthcare facility in Chennai with specialized cardiac recovery programs and 24/7 medical supervision.",
      phone: "+91-44-2829-3333",
      specialties: ["Cardiac Recovery", "Post-Surgical Care", "Rehabilitation"],
      distanceFromHospital: "0.5 km",
      nearestHospital: "Apollo Hospital Greams Road"
    },
    "8": {
      name: "Fortis Recovery Center Chennai",
      location: "Vadapalani, Chennai",
      city: "Chennai",
      rating: 4.5,
      reviewCount: 98,
      pricePerDay: 2100,
      capacity: 16,
      availableFrom: "2025-01-21",
      image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=500&h=300&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=500&h=300&fit=crop",
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=300&fit=crop",
        "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=500&h=300&fit=crop",
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop"
      ],
      services: ["Neurological Care", "Stroke Recovery", "Physical Therapy", "Speech Therapy", "Occupational Therapy"],
      facilities: ["Therapy Rooms", "Exercise Equipment", "Medical Supervision", "Nutritious Meals", "Wi-Fi"],
      description: "Specialized neurological recovery center with comprehensive rehabilitation programs and expert medical care.",
      phone: "+91-44-4289-4289",
      specialties: ["Neurological Recovery", "Stroke Rehabilitation", "Physical Therapy"],
      distanceFromHospital: "1.3 km",
      nearestHospital: "Fortis Malar Hospital"
    },
  };

  const healthHome = healthHomesData[id as keyof typeof healthHomesData] || healthHomesData["1"];
  
  const fullDescription = `${healthHome.name} is a state-of-the-art health home facility located in ${healthHome.location}. Our facility offers comprehensive care for individuals requiring assisted living, post-operative care, or long-term health management. With a team of experienced healthcare professionals and modern amenities, we ensure every resident receives personalized attention and the highest quality of care.`;

  const amenities = [
    { name: "WiFi", icon: Wifi },
    { name: "Parking", icon: Car },
    { name: "Meals Included", icon: Utensils },
    { name: "AC Rooms", icon: Wind },
    { name: "Private Rooms", icon: Bed },
    { name: "Attached Bath", icon: Bath },
    { name: "Common Areas", icon: Home }
  ];

  const features = [
    "24x7 Medical Staff",
    "Emergency Response System", 
    "Hygienic Environment",
    "Family Visiting Hours",
    "Regular Health Checkups",
    "Recreational Activities"
  ];

  const contact = {
    phone: healthHome.phone,
    email: `info@${healthHome.name.toLowerCase().replace(/\s+/g, '')}.com`,
    address: `${healthHome.location} - 560034`
  };

  return (
    <div className="min-h-screen bg-background">
      <Header activePage="health-homes" />

      {/* Hero Section with Image Carousel */}
      <section className="relative h-48 sm:h-64 md:h-96 overflow-hidden">
        <Carousel className="w-full h-full">
          <CarouselContent>
            {healthHome.images.map((image, index) => (
              <CarouselItem key={index}>
                <img 
                  src={image} 
                  alt={`${healthHome.name} - Image ${index + 1}`}
                  className="w-full h-48 sm:h-64 md:h-96 object-cover"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-black/50 border-white/20 text-white hover:bg-black/70 h-8 w-8 sm:h-10 sm:w-10" />
          <CarouselNext className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-black/50 border-white/20 text-white hover:bg-black/70 h-8 w-8 sm:h-10 sm:w-10" />
        </Carousel>
        
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />
        <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 text-white">
          <h1 className="text-lg sm:text-2xl md:text-4xl font-bold mb-1 sm:mb-2">{healthHome.name}</h1>
          <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-base">
            <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>{healthHome.location}</span>
          </div>
        </div>
        <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-white/90 backdrop-blur-sm rounded-lg px-2 sm:px-3 py-1 sm:py-2">
          <div className="flex items-center gap-0.5 sm:gap-1">
            <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm sm:text-base font-semibold">{healthHome.rating}</span>
            <span className="text-[10px] sm:text-sm text-muted-foreground">({healthHome.reviewCount})</span>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6 md:space-y-8">
            {/* Basic Info */}
            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-3 sm:mb-4 text-sm">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Users className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                    <span>{healthHome.capacity} beds available</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                    <span>Available from {new Date(healthHome.availableFrom).toLocaleDateString()}</span>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground">{fullDescription}</p>
              </CardContent>
            </Card>

            {/* Services */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Medical Services
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {healthHome.services.map(service => (
                    <Badge key={service} variant="secondary" className="justify-center">
                      {service}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Specialties */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Specialties
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {healthHome.specialties.map(specialty => (
                    <Badge key={specialty} variant="outline" className="justify-center">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {amenities.map(amenity => (
                    <div key={amenity.name} className="flex items-center gap-2 p-3 rounded-lg bg-accent/50">
                      <amenity.icon className="h-4 w-4 text-primary" />
                      <span className="text-sm">{amenity.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {features.map(feature => (
                    <div key={feature} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-primary mb-1">
                    ₹{healthHome.pricePerDay}
                  </div>
                  <div className="text-sm text-muted-foreground">per day</div>
                </div>
                
                <div className="space-y-4">
                  <Button className="w-full" size="lg">
                    Book Now
                  </Button>
                  
                  <Button variant="outline" className="w-full" size="lg">
                    <Phone className="h-4 w-4 mr-2" />
                    Call {contact.phone}
                  </Button>
                  
                  <Button variant="ghost" className="w-full">
                    Schedule Visit
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="font-medium">Phone</div>
                    <div className="text-muted-foreground">{contact.phone}</div>
                  </div>
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-muted-foreground">{contact.email}</div>
                  </div>
                  <div>
                    <div className="font-medium">Address</div>
                    <div className="text-muted-foreground">{contact.address}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthHomeDetails;