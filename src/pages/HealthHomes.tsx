import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Calendar, Users, Star, Leaf, Hospital, Shield, Heart } from 'lucide-react';
import { useSearchParams, Link } from 'react-router-dom';
import Header from '@/components/Header';

interface HealthHome {
  id: string;
  name: string;
  location: string;
  image: string;
  rating: number;
  reviewCount: number;
  pricePerDay: number;
  services: string[];
  facilities: string[];
  description: string;
  phone: string;
  availableFrom: string;
  capacity: number;
  specialties: string[];
  distanceFromHospital: string;
  nearestHospital: string;
}

const HealthHomes = () => {
  const [searchParams] = useSearchParams();
  const location = searchParams.get('location') || 'Bangalore';
  const checkIn = searchParams.get('checkIn') || '';
  const service = searchParams.get('service') || 'Health Homes';

  const healthHomes: HealthHome[] = [
    {
      id: '1',
      name: 'Manipal Home Care Center',
      location: 'Old Airport Road, Bangalore',
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
    {
      id: '4',
      name: 'Health First Senior Care',
      location: 'Whitefield, Bangalore',
      image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=500&h=300&fit=crop',
      rating: 4.5,
      reviewCount: 89,
      pricePerDay: 1800,
      services: ['Elderly Care', 'Post-Operative Support', 'Medication Reminders', 'Physical Therapy', 'Social Activities'],
      facilities: ['Garden Area', 'Common Rooms', 'Medical Supervision', 'Nutritious Meals', 'Entertainment'],
      description: 'Specialized in senior care with compassionate nursing staff and facilities designed for elderly comfort and recovery.',
      phone: '+91-80-4234-5678',
      availableFrom: '2025-01-19',
      capacity: 18,
      specialties: ['Elderly Care', 'Dementia Care', 'Stroke Recovery'],
      distanceFromHospital: '1.8 km',
      nearestHospital: 'Columbia Asia Hospital Whitefield'
    },
    {
      id: '5',
      name: 'Sukino Healthcare Recovery',
      location: 'Koramangala, Bangalore',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=500&h=300&fit=crop',
      rating: 4.4,
      reviewCount: 167,
      pricePerDay: 2100,
      services: ['Rehabilitation', 'Speech Therapy', 'Occupational Therapy', 'Nutritional Counseling', 'Family Support'],
      facilities: ['Therapy Rooms', 'Exercise Equipment', 'Recreational Areas', 'Library', 'Chapel'],
      description: 'Comprehensive rehabilitation center focusing on holistic recovery with specialized therapy programs and modern amenities.',
      phone: '+91-80-4567-8900',
      availableFrom: '2025-01-21',
      capacity: 25,
      specialties: ['Neurological Rehabilitation', 'Physical Therapy', 'Speech Therapy'],
      distanceFromHospital: '1.5 km',
      nearestHospital: 'Sakra World Hospital'
    },
    {
      id: '6',
      name: 'Navachaithanya Health Care',
      location: 'JP Nagar, Bangalore',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=300&fit=crop',
      rating: 4.3,
      reviewCount: 94,
      pricePerDay: 1600,
      services: ['Home Nursing', 'Medical Equipment Rental', 'Caregiver Training', 'Emergency Response', 'Medication Delivery'],
      facilities: ['24/7 Support', 'Medical Supplies', 'Transportation', 'Insurance Support', 'Family Rooms'],
      description: 'Community-focused health home providing affordable quality care with emphasis on family involvement and patient comfort.',
      phone: '+91-97312-56246',
      availableFrom: '2025-01-17',
      capacity: 22,
      specialties: ['Community Care', 'Affordable Healthcare', 'Family Support'],
      distanceFromHospital: '1.0 km',
      nearestHospital: 'BGS Global Hospital JP Nagar'
    }
  ];

  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const filteredHomes = selectedFilters.length > 0 
    ? healthHomes.filter(home => 
        selectedFilters.some(filter => 
          home.services.includes(filter) || home.specialties.includes(filter)
        )
      )
    : healthHomes;

  const allServices = Array.from(new Set([
    ...healthHomes.flatMap(home => home.services),
    ...healthHomes.flatMap(home => home.specialties)
  ]));

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <Header activePage="health-homes" />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background via-accent/5 to-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Health Homes in
              <span className="text-primary"> {location}</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Professional health home services with skilled nursing, rehabilitation support, and medical care. 
              Comfortable recovery environment with family-like atmosphere.
            </p>
            <div className="mb-6">
              <Link 
                to="/become-provider?serviceType=health-homes"
                className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors px-6 py-3 rounded-lg font-medium"
              >
                <Heart className="h-5 w-5" />
                Be the Host hii
              </Link>
            </div>
            <div className="flex flex-wrap gap-4 text-muted-foreground justify-center mb-8">
              {checkIn && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Check-in: {new Date(checkIn).toLocaleDateString()}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                <span>{filteredHomes.length} health homes available</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">

        {/* Filters */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Filter by Services & Specialties</h3>
          <div className="flex flex-wrap gap-2">
            {allServices.slice(0, 12).map(service => (
              <Badge
                key={service}
                variant={selectedFilters.includes(service) ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={() => toggleFilter(service)}
              >
                {service}
              </Badge>
            ))}
          </div>
        </div>

        {/* Health Homes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredHomes.map(home => (
            <Card key={home.id} className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/30 overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={home.image} 
                  alt={home.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-semibold">{home.rating}</span>
                    <span className="text-xs text-muted-foreground">({home.reviewCount})</span>
                  </div>
                </div>
                <div className="absolute top-4 left-4 bg-primary text-primary-foreground rounded-lg px-3 py-1">
                  <span className="text-sm font-semibold">₹{home.pricePerDay}/day</span>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                    {home.name}
                  </h3>
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{home.location}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{home.capacity} beds</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Hospital className="h-4 w-4" />
                      <span>{home.distanceFromHospital} to {home.nearestHospital}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                    <Calendar className="h-4 w-4" />
                    <span>Available from {new Date(home.availableFrom).toLocaleDateString()}</span>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4 text-sm line-clamp-3">
                  {home.description}
                </p>

                {/* Services */}
                <div className="mb-4">
                  <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Key Services
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {home.services.slice(0, 3).map(service => (
                      <Badge key={service} variant="secondary" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                    {home.services.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{home.services.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Specialties */}
                <div className="mb-4">
                  <h4 className="font-semibold text-sm mb-2">Specialties</h4>
                  <div className="flex flex-wrap gap-1">
                    {home.specialties.map(specialty => (
                      <Badge key={specialty} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    className="flex-1 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                  >
                    View Details
                  </Button>
                  <Button 
                    size="sm" 
                    className="px-3"
                  >
                    <Phone className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredHomes.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-2xl font-semibold text-muted-foreground mb-4">
              No health homes found
            </h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your filters to see more options.
            </p>
            <Button onClick={() => setSelectedFilters([])}>
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthHomes;