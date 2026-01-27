import React, { useState } from 'react';
import { Heart, MapPin, Phone, Clock, Shield, Users, Activity, Utensils, Car, Wifi, Dumbbell, BookOpen, Calendar, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SearchBar } from '@/components/SearchBar';

interface SeniorCareCenter {
  id: number;
  name: string;
  type: string;
  location: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  rating: number;
  priceRange: string;
  image: string;
  description: string;
  services: string[];
  facilities: string[];
  careTypes: string[];
  highlights: string[];
  visitingHours: string;
  established: string;
}

const SeniorCare = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');

  const seniorCareCenters: SeniorCareCenter[] = [
    {
      id: 1,
      name: "Sri Mahalakshmi Old Age Home",
      type: "Premium Old Age Home",
      location: "Basaveshwara Nagar",
      address: "Basaveshwara Nagar, Bangalore - 560079",
      phone: "+91 9740165969",
      email: "info@srimahalakshmioldagehome.in",
      website: "www.srimahalakshmioldagehome.in",
      rating: 4.8,
      priceRange: "₹25,000 - ₹45,000/month",
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Premium old age home offering comfort, care, and dignity in a luxurious and homely environment designed specifically for senior citizens.",
      services: ["24/7 Medical Care", "Physiotherapy", "Nursing Care", "Emergency Services", "Medication Management"],
      facilities: ["Private Rooms", "Common Areas", "Garden", "Dining Hall", "Medical Room", "Recreation Room"],
      careTypes: ["Independent Living", "Assisted Living", "Memory Care"],
      highlights: ["Qualified Nursing Staff", "Homely Environment", "Premium Facilities", "24/7 Security"],
      visitingHours: "9:00 AM - 6:00 PM",
      established: "2015"
    },
    {
      id: 2,
      name: "Aasha Kiran Old Age Home",
      type: "Senior Living Community",
      location: "Anjanapura",
      address: "#770, 6th Cross, BDA Further Extension of Anjanapura Layout, 11th Block, Bangalore",
      phone: "+91 9731154604",
      email: "contact@aashakiranoldagehome.com",
      website: "www.aashakiranoldagehome.com",
      rating: 4.6,
      priceRange: "₹18,000 - ₹35,000/month",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Renowned old age home providing comprehensive care and companionship for senior citizens in a peaceful environment.",
      services: ["Daily Health Checkups", "Physiotherapy", "Counseling", "Social Activities", "Nutritious Meals"],
      facilities: ["Spacious Rooms", "Prayer Hall", "Library", "Garden Area", "Dining Hall", "Medical Facility"],
      careTypes: ["Independent Living", "Assisted Living", "Dementia Care"],
      highlights: ["Experienced Staff", "Peaceful Environment", "Regular Health Monitoring", "Social Engagement"],
      visitingHours: "8:00 AM - 7:00 PM",
      established: "2012"
    },
    {
      id: 3,
      name: "Aaraike Old Age Home",
      type: "Affordable Senior Care",
      location: "Bangalore",
      address: "Bangalore, Karnataka",
      phone: "+91 9876543210",
      email: "info@aaraikeorg.com",
      website: "aaraikeorg.com",
      rating: 4.4,
      priceRange: "₹12,000 - ₹25,000/month",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Elder-centric care facility providing warmth, companionship, and compassion at affordable rates with comprehensive COVID-19 safety measures.",
      services: ["Basic Medical Care", "Daily Activities", "Meal Services", "Companionship", "Health Monitoring"],
      facilities: ["Shared Rooms", "Common Areas", "Dining Space", "Basic Medical Room", "Outdoor Area"],
      careTypes: ["Assisted Living", "Basic Care", "Bedridden Care"],
      highlights: ["Affordable Pricing", "COVID-19 Safety", "Daily Staff Thermal Scans", "Warm Environment"],
      visitingHours: "9:00 AM - 5:00 PM",
      established: "2018"
    },
    {
      id: 4,
      name: "Darshan Medicore",
      type: "Luxury Senior Living",
      location: "Bangalore",
      address: "Bangalore, Karnataka",
      phone: "+91 9123456789",
      email: "info@darshanmedicare.in",
      website: "www.darshanmedicare.in",
      rating: 4.9,
      priceRange: "₹40,000 - ₹80,000/month",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Luxury old age home designed to combat loneliness and provide premium living arrangements for the elderly with personalized care.",
      services: ["Comprehensive Medical Care", "Specialist Consultations", "Rehabilitation", "Wellness Programs", "Gourmet Dining"],
      facilities: ["Luxury Suites", "Wellness Center", "Swimming Pool", "Spa", "Fine Dining", "Entertainment Lounge"],
      careTypes: ["Independent Living", "Assisted Living", "Luxury Care", "Medical Care"],
      highlights: ["Luxury Accommodations", "Personalized Care", "Premium Amenities", "Professional Staff"],
      visitingHours: "24/7 Access",
      established: "2010"
    },
    {
      id: 5,
      name: "Manasum Avighna",
      type: "Luxury Retirement Community",
      location: "Soppahalli",
      address: "30 Feet Rd Number 1, Soppahalli, Karnataka 562106",
      phone: "+91 8765432109",
      email: "info@manasum.com",
      website: "www.manasum.com",
      rating: 4.7,
      priceRange: "₹35,000 - ₹65,000/month",
      image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Premium luxury retirement homes designed for seniors over 50 years with comprehensive care and modern amenities.",
      services: ["24/7 Medical Support", "Therapy Services", "Recreational Activities", "Wellness Programs", "Transportation"],
      facilities: ["Premium Apartments", "Club House", "Fitness Center", "Multi-cuisine Restaurant", "Medical Center", "Gardens"],
      careTypes: ["Independent Living", "Assisted Living", "Premium Care"],
      highlights: ["Modern Amenities", "Age 50+ Community", "Comprehensive Care", "Luxury Living"],
      visitingHours: "9:00 AM - 7:00 PM",
      established: "2020"
    },
    {
      id: 6,
      name: "Athulya Senior Care",
      type: "Assisted Living Facility",
      location: "Multiple Locations",
      address: "Various locations across Bangalore",
      phone: "+91 7654321098",
      email: "info@athulyaseniorcare.com",
      website: "www.athulyaseniorcare.com",
      rating: 4.5,
      priceRange: "₹20,000 - ₹40,000/month",
      image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Comprehensive assisted living services with over 30,000 seniors served across multiple locations, focusing on maintaining independence with necessary support.",
      services: ["Assisted Living Services", "Daily Living Support", "Health Monitoring", "Social Activities", "Meal Assistance"],
      facilities: ["Assisted Living Units", "Common Areas", "Activity Rooms", "Dining Areas", "Medical Support", "Transportation"],
      careTypes: ["Assisted Living", "Independent Support", "Daily Living Assistance"],
      highlights: ["30,000+ Seniors Served", "10 Locations", "8 Years Experience", "Professional Staff"],
      visitingHours: "8:00 AM - 8:00 PM",
      established: "2016"
    }
  ];

  const careTypes = ['All', 'Premium Old Age Home', 'Senior Living Community', 'Affordable Senior Care', 'Luxury Senior Living', 'Luxury Retirement Community', 'Assisted Living Facility'];

  const filteredCenters = seniorCareCenters.filter(center => {
    const matchesSearch = center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         center.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         center.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType === 'All' || center.type === selectedType;
    return matchesSearch && matchesType;
  });

  const handleSearch = (query: string, location: string) => {
    setSearchTerm(query || location);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="bg-primary p-2 rounded-lg">
                <Shield className="h-6 w-6 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-primary">Swasth</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="/" className="text-foreground hover:text-primary transition-colors">Home</a>
              <a href="/health-homes" className="text-foreground hover:text-primary transition-colors">Health Homes</a>
              <a href="/home-conversion" className="text-foreground hover:text-primary transition-colors">Home Conversion</a>
              <a href="/wellness-centers" className="text-foreground hover:text-primary transition-colors">Wellness</a>
              <a href="/senior-care" className="text-primary font-medium">Senior Care</a>
            </nav>
            <Button variant="ghost">Sign In</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-background via-accent/5 to-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Senior Care Centers in
              <span className="text-primary"> Bangalore</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6">
              Find the perfect care environment for your loved ones. From luxury retirement communities to affordable assisted living, 
              discover quality senior care facilities across Bangalore.
            </p>
            <div className="flex items-center justify-center text-sm text-muted-foreground mb-6">
              <Users className="h-4 w-4 mr-1" />
              Over 50+ verified senior care providers in Bangalore
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="max-w-4xl mx-auto">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2">
            {careTypes.map((type) => (
              <Button
                key={type}
                variant={selectedType === type ? "default" : "outline"}
                onClick={() => setSelectedType(type)}
                className="text-sm"
              >
                {type}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {filteredCenters.length} Senior Care Centers Found
            </h2>
            <p className="text-muted-foreground">
              Choose from verified senior care facilities with comprehensive services
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredCenters.map((center) => (
              <Card key={center.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-64">
                  <img 
                    src={center.image} 
                    alt={center.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-background/90 text-foreground">
                      {center.type}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4 bg-background/90 rounded-full px-2 py-1 flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{center.rating}</span>
                  </div>
                </div>
                
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl mb-2">{center.name}</CardTitle>
                      <div className="flex items-center text-muted-foreground text-sm mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        {center.location}
                      </div>
                      <div className="text-lg font-semibold text-primary">
                        {center.priceRange}
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {center.description}
                  </p>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Care Types */}
                  <div>
                    <h4 className="font-medium text-foreground mb-2 flex items-center">
                      <Heart className="h-4 w-4 mr-2 text-primary" />
                      Care Types
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {center.careTypes.slice(0, 3).map((type, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Key Services */}
                  <div>
                    <h4 className="font-medium text-foreground mb-2 flex items-center">
                      <Activity className="h-4 w-4 mr-2 text-primary" />
                      Key Services
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {center.services.slice(0, 4).map((service, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Facilities */}
                  <div>
                    <h4 className="font-medium text-foreground mb-2 flex items-center">
                      <Shield className="h-4 w-4 mr-2 text-primary" />
                      Facilities
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {center.facilities.slice(0, 4).map((facility, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {facility}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Phone className="h-4 w-4 mr-2" />
                      <span className="truncate">{center.phone}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-2" />
                      <span className="truncate">{center.visitingHours}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button className="flex-1">
                      <Phone className="h-4 w-4 mr-2" />
                      Contact Now
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Visit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCenters.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No senior care centers found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-accent/20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground mb-8">
              Why Choose Our Senior Care Partners
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">50+</div>
                <p className="text-muted-foreground">Verified Care Centers</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                <p className="text-muted-foreground">Medical Support</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">1000+</div>
                <p className="text-muted-foreground">Happy Families</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">100%</div>
                <p className="text-muted-foreground">Verified & Safe</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="bg-primary p-2 rounded-lg">
                <Shield className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-primary">Swasth</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 Swasth. Caring for your loved ones.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SeniorCare;