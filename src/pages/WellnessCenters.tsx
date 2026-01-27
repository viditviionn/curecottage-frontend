import React, { useState } from 'react';
import { SearchBar } from '@/components/SearchBar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MapPin, Phone, Mail, Clock, Star, Leaf, Heart, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

interface WellnessCenter {
  id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  rating: number;
  priceRange: string;
  image: string;
  services: string[];
  specialties: string[];
  timings: string;
  website?: string;
}

const WellnessCenters = () => {
  const [filteredCenters, setFilteredCenters] = useState<WellnessCenter[]>([]);

  const wellnessCenters: WellnessCenter[] = [
    {
      id: "1",
      name: "Shreyas Retreat",
      description: "Luxury wellness retreat offering authentic Ayurveda, yoga, and meditation in a serene, nature-rich setting. Experience holistic healing and transformation.",
      address: "Nelamangala, Bangalore Rural District, Karnataka",
      phone: "+91 80 2846 5000",
      email: "info@shreyasretreat.com",
      rating: 4.8,
      priceRange: "₹15,000 - ₹35,000 per day",
      image: "https://images.unsplash.com/photo-1545389336-cf090694435e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      services: ["Ayurveda Treatments", "Yoga Classes", "Meditation Sessions", "Detox Programs", "Spa Treatments", "Wellness Consultations"],
      specialties: ["Panchakarma", "Yoga Therapy", "Stress Management", "Weight Management"],
      timings: "24/7 Residential Programs",
      website: "www.shreyasretreat.com"
    },
    {
      id: "2",
      name: "J Wellness Circle - Taj West End",
      description: "Luxury spa and wellness center offering world-class treatments in an elegant setting. Experience rejuvenation with premium amenities.",
      address: "Race Course Road, Bangalore 560001",
      phone: "+91 80 6660 5660",
      email: "jwellness.bengaluru@tajhotels.com",
      rating: 4.7,
      priceRange: "₹3,000 - ₹12,000 per treatment",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      services: ["Spa Treatments", "Aromatherapy", "Body Wraps", "Facial Treatments", "Massage Therapy", "Beauty Services"],
      specialties: ["Swedish Massage", "Hot Stone Therapy", "Anti-aging Facials", "Couple Spa"],
      timings: "6:00 AM - 10:00 PM",
      website: "www.tajhotels.com"
    },
    {
      id: "3",
      name: "The Leela Palace Spa",
      description: "Nestled in lush tropical gardens, this luxury spa offers traditional and contemporary wellness treatments in a serene environment.",
      address: "23, HAL Airport Road, Bangalore 560008",
      phone: "+91 80 2521 1234",
      email: "spa.bengaluru@theleela.com",
      rating: 4.6,
      priceRange: "₹4,000 - ₹15,000 per treatment",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      services: ["Therapeutic Massages", "Ayurvedic Treatments", "Body Scrubs", "Facials", "Reflexology", "Wellness Packages"],
      specialties: ["Abhyanga", "Shirodhara", "Deep Tissue Massage", "Signature Rituals"],
      timings: "7:00 AM - 9:00 PM"
    },
    {
      id: "4",
      name: "Kshemavana Wellness Centre",
      description: "Traditional naturopathy and wellness center focusing on natural healing methods and holistic health solutions for modern lifestyle issues.",
      address: "Bagalur Cross, Yelahanka, Bangalore 560063",
      phone: "+91 80 2856 9090",
      email: "info@kshemavana.com",
      rating: 4.5,
      priceRange: "₹2,000 - ₹8,000 per treatment",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      services: ["Naturopathy", "Acupuncture", "Yoga Therapy", "Diet Counseling", "Mud Therapy", "Hydrotherapy"],
      specialties: ["Detoxification", "Chronic Disease Management", "Stress Relief", "Weight Management"],
      timings: "6:00 AM - 8:00 PM",
      website: "www.kshemavana.com"
    },
    {
      id: "5",
      name: "Ananda Spa",
      description: "Holistic wellness center combining ancient healing traditions with modern techniques. Offers personalized wellness programs and treatments.",
      address: "Palace Road, Bangalore 560052",
      phone: "+91 80 4112 9999",
      email: "info@anandaspa.com",
      rating: 4.4,
      priceRange: "₹2,500 - ₹10,000 per treatment",
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      services: ["Ayurveda", "Yoga", "Meditation", "Spa Treatments", "Wellness Consultations", "Lifestyle Coaching"],
      specialties: ["Panchakarma", "Marma Therapy", "Prenatal Massage", "Corporate Wellness"],
      timings: "7:00 AM - 9:00 PM"
    },
    {
      id: "6",
      name: "Soukya International Holistic Health Centre",
      description: "Integrated holistic health center offering multiple healing systems including Ayurveda, Homeopathy, Yoga, and Naturopathy under one roof.",
      address: "Samethanahalli, Whitefield, Bangalore 560067",
      phone: "+91 80 2844 9000",
      email: "info@soukya.com",
      rating: 4.6,
      priceRange: "₹5,000 - ₹20,000 per day",
      image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      services: ["Ayurveda", "Homeopathy", "Naturopathy", "Yoga", "Unani Medicine", "Acupuncture"],
      specialties: ["Chronic Diseases", "Preventive Healthcare", "Rehabilitation", "Anti-aging"],
      timings: "24/7 Residential Programs",
      website: "www.soukya.com"
    }
  ];

  const handleSearch = (service: string, location: string) => {
    const filtered = wellnessCenters.filter(center =>
      center.services.some(s => s.toLowerCase().includes(service.toLowerCase())) ||
      center.name.toLowerCase().includes(service.toLowerCase()) ||
      center.address.toLowerCase().includes(location.toLowerCase())
    );
    setFilteredCenters(filtered);
  };

  const centersToShow = filteredCenters.length > 0 ? filteredCenters : wellnessCenters;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-primary p-2 rounded-lg">
                <Leaf className="h-6 w-6 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-primary">Swasth</h1>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link to="/health-homes" className="text-foreground hover:text-primary transition-colors">Health Homes</Link>
              <Link to="/home-conversion" className="text-foreground hover:text-primary transition-colors">Home Conversion</Link>
              <a href="#" className="text-primary font-medium">Wellness Centers</a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">Senior Care</a>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="ghost">Sign In</Button>
              <Button>Get Started</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-background via-accent/5 to-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Wellness Centers in
              <span className="text-primary"> Bangalore</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Discover holistic wellness centers offering spa treatments, yoga, meditation, Ayurveda, and natural healing therapies for complete well-being.
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="max-w-4xl mx-auto mb-12">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </section>

      {/* Wellness Centers Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">
              Available Wellness Centers ({centersToShow.length})
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {centersToShow.map((center) => (
              <Card key={center.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/30">
                <div className="grid md:grid-cols-5 gap-0">
                  <div className="md:col-span-2 relative h-64 md:h-auto">
                    <img 
                      src={center.image} 
                      alt={center.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{center.rating}</span>
                    </div>
                  </div>
                  
                  <div className="md:col-span-3">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl text-foreground mb-2">{center.name}</CardTitle>
                          <CardDescription className="text-sm">{center.description}</CardDescription>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                        <MapPin className="h-4 w-4" />
                        <span>{center.address}</span>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0 space-y-4">
                      <div>
                        <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                          <Heart className="h-4 w-4 text-primary" />
                          Services Offered
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {center.services.map((service, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                          <Users className="h-4 w-4 text-primary" />
                          Specialties
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {center.specialties.map((specialty, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{center.timings}</span>
                        </div>
                        <div className="font-semibold text-primary">
                          {center.priceRange}
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-2 pt-2">
                        <Button className="flex-1 flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          Call Now
                        </Button>
                        <Button variant="outline" className="flex-1 flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          Enquire
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="bg-primary p-2 rounded-lg">
                <Leaf className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-primary">Swasth</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 Swasth. Bringing wellness closer to you.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WellnessCenters;