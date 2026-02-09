import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SearchBar } from '@/components/SearchBar';
import { MapPin, Phone, Calendar, Users, Star, Leaf, Stethoscope, Home, User, Wrench, Shield, Heart } from 'lucide-react';
import { useSearchParams, Link } from 'react-router-dom';
import Header from '@/components/Header';

interface HomeConversionProvider {
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
  responseTime: string;
  specialties: string[];
  category: string;
}

const HomeConversion = () => {
  const [searchParams] = useSearchParams();
  const location = searchParams.get('location') || 'Bangalore';
  const fromDate = searchParams.get('fromDate') || '';
  const toDate = searchParams.get('toDate') || '';
  const service = searchParams.get('service') || 'Comprehensive Care';

  const homeConversionProviders: HomeConversionProvider[] = [
    {
      id: '1',
      name: 'Manipal Complete Home Care',
      location: 'Koramangala, Bangalore',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=300&fit=crop',
      rating: 4.9,
      reviewCount: 1250,
      pricePerDay: 5000,
      services: ['ICU Setup', 'Nursing Care', 'Physiotherapy', 'Medical Equipment', '24/7 Support'],
      facilities: ['Ventilator Support', 'Patient Monitoring', 'Skilled Nurses', 'Doctor Visits', 'Emergency Response'],
      description: 'Complete home healthcare transformation with medical equipment, nursing staff, physiotherapy, and 24/7 support for all medical needs.',
      phone: '+91-8296162568',
      availableFrom: '2025-01-20',
      responseTime: 'Within 2 hours',
      specialties: ['Complete Home Setup', 'Critical Care', 'Post-Surgery Recovery'],
      category: 'all-in-one'
    },
    {
      id: '2',
      name: 'Apollo Home Healthcare Plus',
      location: 'Indiranagar, Bangalore',
      image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=500&h=300&fit=crop',
      rating: 4.8,
      reviewCount: 980,
      pricePerDay: 4500,
      services: ['Cardiac Recovery', 'Neurological Care', 'Respiratory Support', 'Nursing', 'Equipment Setup'],
      facilities: ['Advanced Monitoring', 'Apollo Certified Staff', 'Medical Equipment', 'Physiotherapy', '24/7 Support'],
      description: 'Apollo\'s premium home transformation service with medical equipment, nursing, and therapy under one roof.',
      phone: '+91-9876543210',
      availableFrom: '2025-01-18',
      responseTime: 'Within 1 hour',
      specialties: ['Cardiac Recovery', 'Neurological Care', 'Post-Surgery', 'Critical Care'],
      category: 'all-in-one'
    },
    {
      id: '3',
      name: 'MedEquip Home Solutions',
      location: 'Whitefield, Bangalore',
      image: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=500&h=300&fit=crop',
      rating: 4.7,
      reviewCount: 850,
      pricePerDay: 2500,
      services: ['ICU Equipment', 'Oxygen Concentrator', 'Hospital Bed', 'Patient Monitor', 'Installation'],
      facilities: ['Professional Installation', 'Equipment Training', '24/7 Technical Support', 'Regular Maintenance'],
      description: 'Professional medical equipment installation and setup service with training and maintenance support.',
      phone: '+91-9123456789',
      availableFrom: '2025-01-19',
      responseTime: 'Same Day',
      specialties: ['ICU Equipment', 'Respiratory Devices', 'Monitoring Systems', 'Mobility Aids'],
      category: 'medical-equipment'
    },
    {
      id: '4',
      name: 'Florence Nursing Services',
      location: 'Electronic City, Bangalore',
      image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=500&h=300&fit=crop',
      rating: 4.8,
      reviewCount: 1150,
      pricePerDay: 3000,
      services: ['ICU Nursing', 'Post-Surgery Care', 'General Nursing', 'Elderly Care', 'Medication Management'],
      facilities: ['Qualified RN/GNM Nurses', 'Medication Management', 'Vital Monitoring', 'Family Training'],
      description: 'Professional nursing services with qualified RNs and specialty care nurses for home healthcare.',
      phone: '+91-8765432109',
      availableFrom: '2025-01-21',
      responseTime: 'Within 3 hours',
      specialties: ['Critical Care Nursing', 'Post-Surgery Care', 'Elderly Care', 'Pediatric Nursing'],
      category: 'nursing-services'
    },
    {
      id: '5',
      name: 'PhysioHome Rehabilitation',
      location: 'HSR Layout, Bangalore',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=500&h=300&fit=crop',
      rating: 4.9,
      reviewCount: 680,
      pricePerDay: 800,
      services: ['Post-Surgery Physiotherapy', 'Stroke Rehabilitation', 'Orthopedic Therapy', 'Mobility Training'],
      facilities: ['Qualified Physiotherapists', 'Exercise Equipment', 'Progress Assessment', 'Home Exercise Plans'],
      description: 'Expert physiotherapy services at home with qualified therapists and modern rehabilitation techniques.',
      phone: '+91-9988776655',
      availableFrom: '2025-01-22',
      responseTime: 'Within 24 hours',
      specialties: ['Orthopedic Rehabilitation', 'Neurological Physiotherapy', 'Sports Injury', 'Geriatric Care'],
      category: 'physiotherapy'
    },
    // Chennai providers
    {
      id: '6',
      name: 'Apollo HomeHealth Chennai',
      location: 'T. Nagar, Chennai',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=300&fit=crop',
      rating: 4.8,
      reviewCount: 920,
      pricePerDay: 4200,
      services: ['ICU Setup', 'Nursing Care', 'Physiotherapy', 'Medical Equipment', '24/7 Support'],
      facilities: ['Ventilator Support', 'Patient Monitoring', 'Skilled Nurses', 'Doctor Visits', 'Emergency Response'],
      description: 'Apollo\'s comprehensive home healthcare transformation with state-of-the-art medical equipment and nursing care.',
      phone: '+91-8296162569',
      availableFrom: '2025-01-20',
      responseTime: 'Within 2 hours',
      specialties: ['Complete Home Setup', 'Critical Care', 'Post-Surgery Recovery'],
      category: 'all-in-one'
    },
    {
      id: '7',
      name: 'Chennai Medical Equipment',
      location: 'Adyar, Chennai',
      image: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=500&h=300&fit=crop',
      rating: 4.6,
      reviewCount: 750,
      pricePerDay: 2300,
      services: ['ICU Equipment', 'Oxygen Concentrator', 'Hospital Bed', 'Patient Monitor', 'Installation'],
      facilities: ['Professional Installation', 'Equipment Training', '24/7 Technical Support', 'Regular Maintenance'],
      description: 'Professional medical equipment installation and setup service for Chennai residents.',
      phone: '+91-9123456790',
      availableFrom: '2025-01-19',
      responseTime: 'Same Day',
      specialties: ['ICU Equipment', 'Respiratory Devices', 'Monitoring Systems', 'Mobility Aids'],
      category: 'medical-equipment'
    },
    {
      id: '8',
      name: 'Chennai Care Nursing',
      location: 'Velachery, Chennai',
      image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=500&h=300&fit=crop',
      rating: 4.7,
      reviewCount: 680,
      pricePerDay: 2800,
      services: ['ICU Nursing', 'Post-Surgery Care', 'General Nursing', 'Elderly Care', 'Medication Management'],
      facilities: ['Qualified RN/GNM Nurses', 'Medication Management', 'Vital Monitoring', 'Family Training'],
      description: 'Professional nursing services with qualified RNs and specialty care nurses for Chennai homes.',
      phone: '+91-8765432111',
      availableFrom: '2025-01-21',
      responseTime: 'Within 3 hours',
      specialties: ['Critical Care Nursing', 'Post-Surgery Care', 'Elderly Care', 'Pediatric Nursing'],
      category: 'nursing-services'
    },
    {
      id: '9',
      name: 'Chennai Physio Home',
      location: 'Anna Nagar, Chennai',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=500&h=300&fit=crop',
      rating: 4.8,
      reviewCount: 590,
      pricePerDay: 900,
      services: ['Post-Surgery Physiotherapy', 'Stroke Rehabilitation', 'Orthopedic Therapy', 'Mobility Training'],
      facilities: ['Qualified Physiotherapists', 'Exercise Equipment', 'Progress Assessment', 'Home Exercise Plans'],
      description: 'Expert physiotherapy services at home with qualified therapists in Chennai.',
      phone: '+91-9988776656',
      availableFrom: '2025-01-22',
      responseTime: 'Within 24 hours',
      specialties: ['Orthopedic Rehabilitation', 'Neurological Physiotherapy', 'Sports Injury', 'Geriatric Care'],
      category: 'physiotherapy'
    },
    // Mumbai providers
    {
      id: '10',
      name: 'Fortis Home Healthcare Mumbai',
      location: 'Bandra, Mumbai',
      image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=500&h=300&fit=crop',
      rating: 4.9,
      reviewCount: 1150,
      pricePerDay: 5200,
      services: ['ICU Setup', 'Cardiac Care', 'Neurological Support', 'Nursing', '24/7 Monitoring'],
      facilities: ['Advanced Monitoring', 'Certified Staff', 'Medical Equipment', 'Physiotherapy', 'Emergency Response'],
      description: 'Premium home healthcare transformation with Fortis quality medical care and equipment.',
      phone: '+91-8296162570',
      availableFrom: '2025-01-18',
      responseTime: 'Within 1 hour',
      specialties: ['Cardiac Recovery', 'Neurological Care', 'Critical Care', 'Post-Surgery'],
      category: 'all-in-one'
    },
    {
      id: '11',
      name: 'Mumbai Medical Solutions',
      location: 'Andheri, Mumbai',
      image: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=500&h=300&fit=crop',
      rating: 4.7,
      reviewCount: 850,
      pricePerDay: 2700,
      services: ['ICU Equipment', 'Oxygen Concentrator', 'Hospital Bed', 'Patient Monitor', 'Installation'],
      facilities: ['Professional Installation', 'Equipment Training', '24/7 Technical Support', 'Regular Maintenance'],
      description: 'Mumbai\'s trusted medical equipment provider with comprehensive installation and support services.',
      phone: '+91-9123456791',
      availableFrom: '2025-01-19',
      responseTime: 'Same Day',
      specialties: ['ICU Equipment', 'Respiratory Devices', 'Monitoring Systems', 'Mobility Aids'],
      category: 'medical-equipment'
    },
    {
      id: '12',
      name: 'Mumbai Nursing Care',
      location: 'Powai, Mumbai',
      image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=500&h=300&fit=crop',
      rating: 4.8,
      reviewCount: 920,
      pricePerDay: 3200,
      services: ['ICU Nursing', 'Post-Surgery Care', 'General Nursing', 'Elderly Care', 'Medication Management'],
      facilities: ['Qualified RN/GNM Nurses', 'Medication Management', 'Vital Monitoring', 'Family Training'],
      description: 'Professional nursing services with experienced staff for Mumbai homes.',
      phone: '+91-8765432112',
      availableFrom: '2025-01-21',
      responseTime: 'Within 2 hours',
      specialties: ['Critical Care Nursing', 'Post-Surgery Care', 'Elderly Care', 'Pediatric Nursing'],
      category: 'nursing-services'
    },
    {
      id: '13',
      name: 'Mumbai Physio Plus',
      location: 'Juhu, Mumbai',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=500&h=300&fit=crop',
      rating: 4.9,
      reviewCount: 740,
      pricePerDay: 1100,
      services: ['Post-Surgery Physiotherapy', 'Stroke Rehabilitation', 'Orthopedic Therapy', 'Mobility Training'],
      facilities: ['Qualified Physiotherapists', 'Exercise Equipment', 'Progress Assessment', 'Home Exercise Plans'],
      description: 'Premium physiotherapy services at home with advanced rehabilitation techniques in Mumbai.',
      phone: '+91-9988776657',
      availableFrom: '2025-01-22',
      responseTime: 'Within 24 hours',
      specialties: ['Orthopedic Rehabilitation', 'Neurological Physiotherapy', 'Sports Injury', 'Geriatric Care'],
      category: 'physiotherapy'
    },
    // Delhi providers
    {
      id: '14',
      name: 'Max Home Healthcare Delhi',
      location: 'Saket, Delhi',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=300&fit=crop',
      rating: 4.8,
      reviewCount: 1080,
      pricePerDay: 4800,
      services: ['ICU Setup', 'Nursing Care', 'Physiotherapy', 'Medical Equipment', 'Doctor Visits'],
      facilities: ['Ventilator Support', 'Patient Monitoring', 'Skilled Nurses', 'Physiotherapy', 'Emergency Response'],
      description: 'Max Healthcare\'s comprehensive home conversion service with medical equipment and skilled nursing.',
      phone: '+91-8296162571',
      availableFrom: '2025-01-20',
      responseTime: 'Within 2 hours',
      specialties: ['Complete Home Setup', 'Critical Care', 'Rehabilitation'],
      category: 'all-in-one'
    },
    {
      id: '15',
      name: 'Delhi MedEquip Services',
      location: 'Gurgaon, Delhi NCR',
      image: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=500&h=300&fit=crop',
      rating: 4.6,
      reviewCount: 780,
      pricePerDay: 2600,
      services: ['ICU Equipment', 'Oxygen Concentrator', 'Hospital Bed', 'Patient Monitor', 'Installation'],
      facilities: ['Professional Installation', 'Equipment Training', '24/7 Technical Support', 'Regular Maintenance'],
      description: 'Delhi NCR\'s leading medical equipment provider with professional installation services.',
      phone: '+91-9123456792',
      availableFrom: '2025-01-19',
      responseTime: 'Same Day',
      specialties: ['ICU Equipment', 'Respiratory Devices', 'Monitoring Systems', 'Mobility Aids'],
      category: 'medical-equipment'
    },
    {
      id: '16',
      name: 'Delhi Care Nurses',
      location: 'Noida, Delhi NCR',
      image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=500&h=300&fit=crop',
      rating: 4.7,
      reviewCount: 890,
      pricePerDay: 3100,
      services: ['ICU Nursing', 'Post-Surgery Care', 'General Nursing', 'Elderly Care', 'Medication Management'],
      facilities: ['Qualified RN/GNM Nurses', 'Medication Management', 'Vital Monitoring', 'Family Training'],
      description: 'Professional nursing services with qualified staff for Delhi NCR homes.',
      phone: '+91-8765432113',
      availableFrom: '2025-01-21',
      responseTime: 'Within 3 hours',
      specialties: ['Critical Care Nursing', 'Post-Surgery Care', 'Elderly Care', 'Pediatric Nursing'],
      category: 'nursing-services'
    },
    {
      id: '17',
      name: 'Delhi Rehabilitation Home',
      location: 'Dwarka, Delhi',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=500&h=300&fit=crop',
      rating: 4.8,
      reviewCount: 650,
      pricePerDay: 1000,
      services: ['Post-Surgery Physiotherapy', 'Stroke Rehabilitation', 'Orthopedic Therapy', 'Mobility Training'],
      facilities: ['Qualified Physiotherapists', 'Exercise Equipment', 'Progress Assessment', 'Home Exercise Plans'],
      description: 'Expert physiotherapy and rehabilitation services at home in Delhi.',
      phone: '+91-9988776658',
      availableFrom: '2025-01-22',
      responseTime: 'Within 24 hours',
      specialties: ['Orthopedic Rehabilitation', 'Neurological Physiotherapy', 'Sports Injury', 'Geriatric Care'],
      category: 'physiotherapy'
    },
    // Hyderabad providers
    {
      id: '18',
      name: 'KIMS Home Healthcare',
      location: 'Banjara Hills, Hyderabad',
      image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=500&h=300&fit=crop',
      rating: 4.7,
      reviewCount: 890,
      pricePerDay: 4000,
      services: ['ICU Setup', 'Nursing Care', 'Physiotherapy', 'Medical Equipment', 'Monitoring'],
      facilities: ['Advanced Equipment', 'Qualified Staff', 'Patient Monitoring', 'Physiotherapy', '24/7 Support'],
      description: 'KIMS hospital\'s home healthcare transformation service with comprehensive medical support.',
      phone: '+91-8296162572',
      availableFrom: '2025-01-21',
      responseTime: 'Within 3 hours',
      specialties: ['Complete Home Setup', 'Critical Care', 'Post-Surgery Recovery'],
      category: 'all-in-one'
    },
    {
      id: '19',
      name: 'Hyderabad Medical Equipment',
      location: 'HITEC City, Hyderabad',
      image: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=500&h=300&fit=crop',
      rating: 4.5,
      reviewCount: 720,
      pricePerDay: 2400,
      services: ['ICU Equipment', 'Oxygen Concentrator', 'Hospital Bed', 'Patient Monitor', 'Installation'],
      facilities: ['Professional Installation', 'Equipment Training', '24/7 Technical Support', 'Regular Maintenance'],
      description: 'Hyderabad\'s trusted medical equipment provider with professional installation and support.',
      phone: '+91-9123456793',
      availableFrom: '2025-01-19',
      responseTime: 'Same Day',
      specialties: ['ICU Equipment', 'Respiratory Devices', 'Monitoring Systems', 'Mobility Aids'],
      category: 'medical-equipment'
    },
    {
      id: '20',
      name: 'Hyderabad Nursing Services',
      location: 'Jubilee Hills, Hyderabad',
      image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=500&h=300&fit=crop',
      rating: 4.6,
      reviewCount: 810,
      pricePerDay: 2900,
      services: ['ICU Nursing', 'Post-Surgery Care', 'General Nursing', 'Elderly Care', 'Medication Management'],
      facilities: ['Qualified RN/GNM Nurses', 'Medication Management', 'Vital Monitoring', 'Family Training'],
      description: 'Professional nursing services with experienced staff for Hyderabad homes.',
      phone: '+91-8765432114',
      availableFrom: '2025-01-21',
      responseTime: 'Within 3 hours',
      specialties: ['Critical Care Nursing', 'Post-Surgery Care', 'Elderly Care', 'Pediatric Nursing'],
      category: 'nursing-services'
    },
    {
      id: '21',
      name: 'Hyderabad Physio Care',
      location: 'Kondapur, Hyderabad',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=500&h=300&fit=crop',
      rating: 4.7,
      reviewCount: 560,
      pricePerDay: 850,
      services: ['Post-Surgery Physiotherapy', 'Stroke Rehabilitation', 'Orthopedic Therapy', 'Mobility Training'],
      facilities: ['Qualified Physiotherapists', 'Exercise Equipment', 'Progress Assessment', 'Home Exercise Plans'],
      description: 'Expert physiotherapy services at home with modern rehabilitation techniques in Hyderabad.',
      phone: '+91-9988776659',
      availableFrom: '2025-01-22',
      responseTime: 'Within 24 hours',
      specialties: ['Orthopedic Rehabilitation', 'Neurological Physiotherapy', 'Sports Injury', 'Geriatric Care'],
      category: 'physiotherapy'
    }
  ];

  // Group providers by city
  const groupProvidersByCity = () => {
    const cities = ['Bangalore', 'Chennai', 'Mumbai', 'Delhi', 'Hyderabad'];
    return cities.map(city => ({
      city,
      providers: homeConversionProviders.filter(provider => 
        provider.location.includes(city)
      )
    })).filter(group => group.providers.length > 0);
  };

  const cityGroups = groupProvidersByCity();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <Header activePage="home-conversion" />

      {/* Hero Section */}
      <section className="py-10 sm:py-16 md:py-20 bg-gradient-to-br from-background via-accent/5 to-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
          <p className="text-3xl sm:text-4xl md:text-2xl lg:text-3xl font-bold text-primary mb-4 md:mb-6">
              Coming Soon...
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 md:mb-6">
              Transform your home for
              <span className="text-primary"> medical care</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-6 md:mb-8 px-2">
              Professional home conversion services with medical equipment setup, skilled nursing, and rehabilitation support. 
              Bringing hospital-quality care to your home.
            </p>
            <div className="mb-6">
              <Link 
                to="/become-provider?serviceType=home-conversion"
                className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium text-sm sm:text-base"
              >
                <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
                Share your services
              </Link>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-4 text-muted-foreground justify-center mb-6 md:mb-8 text-xs sm:text-sm">
              {fromDate && (
                <div className="flex items-center gap-1 sm:gap-2">
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>From: {new Date(fromDate).toLocaleDateString()}</span>
                </div>
              )}
              {toDate && (
                <div className="flex items-center gap-1 sm:gap-2">
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>To: {new Date(toDate).toLocaleDateString()}</span>
                </div>
              )}
              <div className="flex items-center gap-1 sm:gap-2">
                <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>{location}</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <Home className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>{service}</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <Heart className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>{homeConversionProviders.length} providers</span>
              </div>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="max-w-4xl mx-auto mb-10 md:mb-16 px-2">
            <SearchBar />
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* City-based sections */}
        {cityGroups.map((cityGroup, index) => (
          <section key={cityGroup.city} className={`mb-10 md:mb-16 ${index > 0 ? 'mt-12 md:mt-20' : ''}`}>
            <div className="mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-4">
                Convert your home in <span className="text-primary">{cityGroup.city}</span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl">
                Professional home conversion services available in {cityGroup.city} with medical equipment setup and skilled care.
              </p>
            </div>

            {/* Providers Grid for this city */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
              {cityGroup.providers.map(provider => (
                <Card key={provider.id} className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/30 overflow-hidden">
                  <div className="relative h-36 sm:h-44 md:h-48 overflow-hidden">
                    <img 
                      src={provider.image} 
                      alt={provider.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-white/90 backdrop-blur-sm rounded-lg px-1.5 sm:px-2 py-0.5 sm:py-1">
                      <div className="flex items-center gap-0.5 sm:gap-1">
                        <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs sm:text-sm font-semibold">{provider.rating}</span>
                        <span className="text-[10px] sm:text-xs text-muted-foreground">({provider.reviewCount})</span>
                      </div>
                    </div>
                    <div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-primary text-primary-foreground rounded-lg px-2 sm:px-3 py-0.5 sm:py-1">
                      <span className="text-xs sm:text-sm font-semibold">₹{provider.pricePerDay}/day</span>
                    </div>
                  </div>

                  <CardContent className="p-4 sm:p-6">
                    <div className="mb-3 sm:mb-4">
                      <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-1.5 sm:mb-2 text-foreground group-hover:text-primary transition-colors line-clamp-1">
                        {provider.name}
                      </h3>
                      <div className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground mb-1.5 sm:mb-2">
                        <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="text-xs sm:text-sm line-clamp-1">{provider.location}</span>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span className="hidden sm:inline">Available from </span>
                          <span>{new Date(provider.availableFrom).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Services - Limited display */}
                    <div className="mb-3 sm:mb-4">
                      <h4 className="font-semibold text-xs sm:text-sm mb-1.5 sm:mb-2 flex items-center gap-1.5 sm:gap-2">
                        <Shield className="h-3 w-3 sm:h-4 sm:w-4" />
                        Key Services
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {provider.services.slice(0, 2).map(service => (
                          <Badge key={service} variant="secondary" className="text-[10px] sm:text-xs">
                            {service}
                          </Badge>
                        ))}
                        {provider.services.length > 2 && (
                          <Badge variant="outline" className="text-[10px] sm:text-xs">
                            +{provider.services.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Basic Info */}
                    <div className="mb-3 sm:mb-4 text-[10px] sm:text-xs text-muted-foreground space-y-0.5 sm:space-y-1">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <Heart className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                        <span>Response: {provider.responseTime}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Link to={`/home-conversion/${provider.id}`} className="flex-1">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="w-full text-xs sm:text-sm group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                        >
                          View Details
                        </Button>
                      </Link>
                      <Button 
                        size="sm" 
                        className="px-2 sm:px-3"
                      >
                        <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default HomeConversion;