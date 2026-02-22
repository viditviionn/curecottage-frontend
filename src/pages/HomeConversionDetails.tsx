import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Star, Users, Calendar, Phone, Shield, Heart, Clock, CheckCircle, Award, Stethoscope, Home, User, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const HomeConversionDetails = () => {
  const { id } = useParams();
  
  // Home conversion providers data - matching HomeConversion.tsx data structure
  const homeConversionData = {
    "1": {
      name: 'Manipal Complete Home Care',
      location: 'Koramangala, Bangalore',
      city: 'Bangalore',
      rating: 4.9,
      reviewCount: 1250,
      pricePerDay: 5000,
      availableFrom: '2025-01-20',
      responseTime: 'Within 2 hours',
      category: 'all-in-one',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=300&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=500&h=300&fit=crop'
      ],
      services: ['ICU Setup', 'Nursing Care', 'Physiotherapy', 'Medical Equipment', '24/7 Support'],
      facilities: ['Ventilator Support', 'Patient Monitoring', 'Skilled Nurses', 'Doctor Visits', 'Emergency Response'],
      description: 'Complete home healthcare transformation with medical equipment, nursing staff, physiotherapy, and 24/7 support for all medical needs.',
      phone: '+91-8296162568',
      specialties: ['Complete Home Setup', 'Critical Care', 'Post-Surgery Recovery'],
      detailedDescription: 'Manipal Complete Home Care offers the most comprehensive home healthcare transformation service in Bangalore. Our expert team converts your home into a fully functional medical facility with state-of-the-art equipment, certified nursing staff, and 24/7 medical support. We provide complete ICU setup, advanced patient monitoring systems, ventilator support, and skilled nursing care. Our physiotherapy team ensures proper rehabilitation and recovery. With over 15 years of experience and partnerships with leading hospitals, we guarantee the highest quality of care in the comfort of your home.',
      certifications: ['NABH Accredited', 'ISO 9001:2015 Certified', 'NABL Approved Lab'],
      equipmentIncluded: ['Ventilator', 'Patient Monitor', 'Oxygen Concentrator', 'Hospital Bed', 'Suction Machine', 'Infusion Pump', 'Defibrillator'],
      staffingDetails: {
        nurses: '24/7 Certified RN/GNM Nurses',
        doctors: 'Daily Doctor Visits',
        physiotherapists: 'Certified Physiotherapists',
        attendants: 'Trained Patient Attendants'
      },
      serviceCoverage: ['ICU Setup & Management', 'Post-Surgery Recovery', 'Chronic Disease Management', 'Elderly Care', 'Pediatric Care', 'Palliative Care'],
      emergencySupport: '24/7 Emergency Response Team with Direct Hospital Connectivity'
    },
    "2": {
      name: 'Apollo Home Healthcare Plus',
      location: 'Indiranagar, Bangalore',
      city: 'Bangalore',
      rating: 4.8,
      reviewCount: 980,
      pricePerDay: 4500,
      availableFrom: '2025-01-18',
      responseTime: 'Within 1 hour',
      category: 'all-in-one',
      image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=500&h=300&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=500&h=300&fit=crop'
      ],
      services: ['Cardiac Recovery', 'Neurological Care', 'Respiratory Support', 'Nursing', 'Equipment Setup'],
      facilities: ['Advanced Monitoring', 'Apollo Certified Staff', 'Medical Equipment', 'Physiotherapy', '24/7 Support'],
      description: 'Apollo\'s premium home transformation service with medical equipment, nursing, and therapy under one roof.',
      phone: '+91-9876543210',
      specialties: ['Cardiac Recovery', 'Neurological Care', 'Post-Surgery', 'Critical Care'],
      detailedDescription: 'Apollo Home Healthcare Plus brings the renowned Apollo hospital standards to your home. Our comprehensive home transformation service specializes in cardiac recovery, neurological care, and respiratory support. We provide advanced monitoring systems, Apollo-certified medical staff, and complete equipment setup. Our team includes cardiologists, neurologists, and specialized nurses who ensure hospital-level care at home.',
      certifications: ['Apollo Hospital Certified', 'NABH Standards', 'ISO 13485 Medical Devices'],
      equipmentIncluded: ['Cardiac Monitor', 'Ventilator', 'Oxygen Concentrator', 'Hospital Bed', 'Nebulizer', 'Blood Pressure Monitor'],
      staffingDetails: {
        nurses: 'Apollo Certified ICU Nurses',
        doctors: 'Specialist Doctor Visits',
        physiotherapists: 'Apollo Physiotherapy Team',
        attendants: 'Trained Medical Attendants'
      },
      serviceCoverage: ['Cardiac Recovery', 'Neurological Rehabilitation', 'Respiratory Care', 'Post-Surgery Care', 'Critical Care'],
      emergencySupport: '24/7 Apollo Emergency Network with Ambulance Service'
    },
    "3": {
      name: 'MedEquip Home Solutions',
      location: 'Whitefield, Bangalore',
      city: 'Bangalore',
      rating: 4.7,
      reviewCount: 850,
      pricePerDay: 2500,
      availableFrom: '2025-01-19',
      responseTime: 'Same Day',
      category: 'medical-equipment',
      image: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=500&h=300&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=500&h=300&fit=crop'
      ],
      services: ['ICU Equipment', 'Oxygen Concentrator', 'Hospital Bed', 'Patient Monitor', 'Installation'],
      facilities: ['Professional Installation', 'Equipment Training', '24/7 Technical Support', 'Regular Maintenance'],
      description: 'Professional medical equipment installation and setup service with training and maintenance support.',
      phone: '+91-9123456789',
      specialties: ['ICU Equipment', 'Respiratory Devices', 'Monitoring Systems', 'Mobility Aids'],
      detailedDescription: 'MedEquip Home Solutions is Bangalore\'s leading medical equipment provider specializing in home healthcare setups. We offer comprehensive medical equipment installation, training, and maintenance services. Our team of certified technicians ensures proper installation and operation of all medical devices. We provide ongoing technical support and regular maintenance to ensure optimal equipment performance.',
      certifications: ['CE Certified Equipment', 'FDA Approved Devices', 'ISO 13485 Quality Management'],
      equipmentIncluded: ['ICU Ventilator', 'Patient Monitor', 'Oxygen Concentrator', 'Hospital Bed', 'Suction Machine', 'Infusion Pump'],
      staffingDetails: {
        technicians: 'Certified Medical Equipment Technicians',
        support: '24/7 Technical Support Team',
        training: 'Equipment Operation Training',
        maintenance: 'Regular Maintenance Specialists'
      },
      serviceCoverage: ['ICU Equipment Setup', 'Respiratory Device Installation', 'Patient Monitoring Systems', 'Mobility Aid Setup'],
      emergencySupport: '24/7 Technical Support with Emergency Equipment Backup'
    },
    "4": {
      name: 'Florence Nursing Services',
      location: 'Electronic City, Bangalore',
      city: 'Bangalore',
      rating: 4.8,
      reviewCount: 1150,
      pricePerDay: 3000,
      availableFrom: '2025-01-21',
      responseTime: 'Within 3 hours',
      category: 'nursing-services',
      image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=500&h=300&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=500&h=300&fit=crop'
      ],
      services: ['ICU Nursing', 'Post-Surgery Care', 'General Nursing', 'Elderly Care', 'Medication Management'],
      facilities: ['Qualified RN/GNM Nurses', 'Medication Management', 'Vital Monitoring', 'Family Training'],
      description: 'Professional nursing services with qualified RNs and specialty care nurses for home healthcare.',
      phone: '+91-8765432109',
      specialties: ['Critical Care Nursing', 'Post-Surgery Care', 'Elderly Care', 'Pediatric Nursing'],
      detailedDescription: 'Florence Nursing Services brings hospital-quality nursing care to your home with our team of qualified RN and GNM nurses. We specialize in ICU nursing, post-surgery care, and comprehensive elderly care. Our nurses are trained in medication management, vital monitoring, and family education to ensure optimal patient outcomes.',
      certifications: ['Nursing Council Registered', 'CPR Certified', 'First Aid Certified'],
      equipmentIncluded: ['Blood Pressure Monitor', 'Pulse Oximeter', 'Thermometer', 'Glucometer', 'First Aid Kit'],
      staffingDetails: {
        nurses: 'Qualified RN/GNM Nurses',
        shifts: '8/12/24 Hour Shifts Available',
        supervision: 'Senior Nurse Supervision',
        training: 'Regular Skills Training'
      },
      serviceCoverage: ['ICU Nursing', 'Post-Surgery Care', 'General Nursing', 'Elderly Care', 'Medication Management'],
      emergencySupport: '24/7 Nursing Support with Direct Doctor Consultation'
    },
    "5": {
      name: 'PhysioHome Rehabilitation',
      location: 'HSR Layout, Bangalore',
      city: 'Bangalore',
      rating: 4.9,
      reviewCount: 680,
      pricePerDay: 800,
      availableFrom: '2025-01-22',
      responseTime: 'Within 24 hours',
      category: 'physiotherapy',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=500&h=300&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=500&h=300&fit=crop'
      ],
      services: ['Post-Surgery Physiotherapy', 'Stroke Rehabilitation', 'Orthopedic Therapy', 'Mobility Training'],
      facilities: ['Qualified Physiotherapists', 'Exercise Equipment', 'Progress Assessment', 'Home Exercise Plans'],
      description: 'Expert physiotherapy services at home with qualified therapists and modern rehabilitation techniques.',
      phone: '+91-9988776655',
      specialties: ['Orthopedic Rehabilitation', 'Neurological Physiotherapy', 'Sports Injury', 'Geriatric Care'],
      detailedDescription: 'PhysioHome Rehabilitation provides expert physiotherapy services in the comfort of your home. Our qualified physiotherapists specialize in post-surgery rehabilitation, stroke recovery, and orthopedic therapy. We use modern rehabilitation techniques and provide customized exercise plans for optimal recovery.',
      certifications: ['BPT Certified', 'Neuro Rehabilitation Certified', 'Orthopedic Specialist'],
      equipmentIncluded: ['Exercise Equipment', 'Mobility Aids', 'Balance Training Tools', 'Resistance Bands'],
      staffingDetails: {
        physiotherapists: 'Qualified BPT Physiotherapists',
        sessions: 'Daily/Alternate Day Sessions',
        assessment: 'Regular Progress Assessment',
        plans: 'Customized Exercise Plans'
      },
      serviceCoverage: ['Post-Surgery Physiotherapy', 'Stroke Rehabilitation', 'Orthopedic Therapy', 'Mobility Training'],
      emergencySupport: '24/7 Physiotherapist Consultation Support'
    },
    "6": {
      name: 'Apollo HomeHealth Chennai',
      location: 'T. Nagar, Chennai',
      city: 'Chennai',
      rating: 4.8,
      reviewCount: 920,
      pricePerDay: 4200,
      availableFrom: '2025-01-20',
      responseTime: 'Within 2 hours',
      category: 'all-in-one',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=300&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=500&h=300&fit=crop'
      ],
      services: ['ICU Setup', 'Nursing Care', 'Physiotherapy', 'Medical Equipment', '24/7 Support'],
      facilities: ['Ventilator Support', 'Patient Monitoring', 'Skilled Nurses', 'Doctor Visits', 'Emergency Response'],
      description: 'Apollo\'s comprehensive home healthcare transformation with state-of-the-art medical equipment and nursing care.',
      phone: '+91-8296162569',
      specialties: ['Complete Home Setup', 'Critical Care', 'Post-Surgery Recovery'],
      detailedDescription: 'Apollo HomeHealth Chennai brings the trusted Apollo healthcare standards to Chennai homes. Our comprehensive service includes complete ICU setup, advanced medical equipment, Apollo-certified nursing staff, and 24/7 medical support. We ensure hospital-level care in the comfort of your home.',
      certifications: ['Apollo Hospital Certified', 'NABH Standards', 'JCI Accredited'],
      equipmentIncluded: ['Ventilator', 'Patient Monitor', 'Oxygen Concentrator', 'Hospital Bed', 'Suction Machine', 'Infusion Pump'],
      staffingDetails: {
        nurses: 'Apollo Certified ICU Nurses',
        doctors: 'Apollo Doctor Visits',
        physiotherapists: 'Apollo Physiotherapy Team',
        attendants: 'Trained Medical Attendants'
      },
      serviceCoverage: ['ICU Setup & Management', 'Post-Surgery Recovery', 'Critical Care', 'Elderly Care'],
      emergencySupport: '24/7 Apollo Emergency Network with Ambulance Service'
    },
    "7": {
      name: 'Chennai Medical Equipment',
      location: 'Adyar, Chennai',
      city: 'Chennai',
      rating: 4.6,
      reviewCount: 750,
      pricePerDay: 2300,
      availableFrom: '2025-01-19',
      responseTime: 'Same Day',
      category: 'medical-equipment',
      image: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=500&h=300&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=500&h=300&fit=crop'
      ],
      services: ['ICU Equipment', 'Oxygen Concentrator', 'Hospital Bed', 'Patient Monitor', 'Installation'],
      facilities: ['Professional Installation', 'Equipment Training', '24/7 Technical Support', 'Regular Maintenance'],
      description: 'Professional medical equipment installation and setup service for Chennai residents.',
      phone: '+91-9123456790',
      specialties: ['ICU Equipment', 'Respiratory Devices', 'Monitoring Systems', 'Mobility Aids'],
      detailedDescription: 'Chennai Medical Equipment is the leading provider of medical equipment installation services in Chennai. We offer comprehensive equipment setup, professional installation, and ongoing technical support. Our certified technicians ensure proper installation and operation of all medical devices.',
      certifications: ['CE Certified Equipment', 'FDA Approved Devices', 'ISO 13485 Quality Management'],
      equipmentIncluded: ['ICU Ventilator', 'Patient Monitor', 'Oxygen Concentrator', 'Hospital Bed', 'Suction Machine'],
      staffingDetails: {
        technicians: 'Certified Medical Equipment Technicians',
        support: '24/7 Technical Support Team',
        training: 'Equipment Operation Training',
        maintenance: 'Regular Maintenance Specialists'
      },
      serviceCoverage: ['ICU Equipment Setup', 'Respiratory Device Installation', 'Patient Monitoring Systems'],
      emergencySupport: '24/7 Technical Support with Emergency Equipment Backup'
    },
    "8": {
      name: 'Chennai Care Nursing',
      location: 'Velachery, Chennai',
      city: 'Chennai',
      rating: 4.7,
      reviewCount: 680,
      pricePerDay: 2800,
      availableFrom: '2025-01-21',
      responseTime: 'Within 3 hours',
      category: 'nursing-services',
      image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=500&h=300&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=500&h=300&fit=crop'
      ],
      services: ['ICU Nursing', 'Post-Surgery Care', 'General Nursing', 'Elderly Care', 'Medication Management'],
      facilities: ['Qualified RN/GNM Nurses', 'Medication Management', 'Vital Monitoring', 'Family Training'],
      description: 'Professional nursing services with qualified RNs and specialty care nurses for Chennai homes.',
      phone: '+91-8765432111',
      specialties: ['Critical Care Nursing', 'Post-Surgery Care', 'Elderly Care', 'Pediatric Nursing'],
      detailedDescription: 'Chennai Care Nursing provides professional nursing services with qualified RN and GNM nurses for Chennai residents. We specialize in critical care nursing, post-surgery care, and comprehensive elderly care with medication management and vital monitoring.',
      certifications: ['Nursing Council Registered', 'CPR Certified', 'ICU Training Certified'],
      equipmentIncluded: ['Blood Pressure Monitor', 'Pulse Oximeter', 'Thermometer', 'Glucometer', 'First Aid Kit'],
      staffingDetails: {
        nurses: 'Qualified RN/GNM Nurses',
        shifts: '8/12/24 Hour Shifts Available',
        supervision: 'Senior Nurse Supervision',
        training: 'Regular Skills Training'
      },
      serviceCoverage: ['ICU Nursing', 'Post-Surgery Care', 'General Nursing', 'Elderly Care'],
      emergencySupport: '24/7 Nursing Support with Direct Doctor Consultation'
    },
    "9": {
      name: 'Chennai Physio Home',
      location: 'Anna Nagar, Chennai',
      city: 'Chennai',
      rating: 4.8,
      reviewCount: 590,
      pricePerDay: 900,
      availableFrom: '2025-01-22',
      responseTime: 'Within 24 hours',
      category: 'physiotherapy',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=500&h=300&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=500&h=300&fit=crop'
      ],
      services: ['Post-Surgery Physiotherapy', 'Stroke Rehabilitation', 'Orthopedic Therapy', 'Mobility Training'],
      facilities: ['Qualified Physiotherapists', 'Exercise Equipment', 'Progress Assessment', 'Home Exercise Plans'],
      description: 'Expert physiotherapy services at home with qualified therapists in Chennai.',
      phone: '+91-9988776656',
      specialties: ['Orthopedic Rehabilitation', 'Neurological Physiotherapy', 'Sports Injury', 'Geriatric Care'],
      detailedDescription: 'Chennai Physio Home provides expert physiotherapy services in Chennai with qualified BPT physiotherapists. We specialize in post-surgery rehabilitation, stroke recovery, and orthopedic therapy using modern rehabilitation techniques.',
      certifications: ['BPT Certified', 'Neuro Rehabilitation Certified', 'Orthopedic Specialist'],
      equipmentIncluded: ['Exercise Equipment', 'Mobility Aids', 'Balance Training Tools', 'Resistance Bands'],
      staffingDetails: {
        physiotherapists: 'Qualified BPT Physiotherapists',
        sessions: 'Daily/Alternate Day Sessions',
        assessment: 'Regular Progress Assessment',
        plans: 'Customized Exercise Plans'
      },
      serviceCoverage: ['Post-Surgery Physiotherapy', 'Stroke Rehabilitation', 'Orthopedic Therapy'],
      emergencySupport: '24/7 Physiotherapist Consultation Support'
    },
    "10": {
      name: 'Fortis Home Healthcare Mumbai',
      location: 'Bandra, Mumbai',
      city: 'Mumbai',
      rating: 4.9,
      reviewCount: 1150,
      pricePerDay: 5200,
      availableFrom: '2025-01-18',
      responseTime: 'Within 1 hour',
      category: 'all-in-one',
      image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=500&h=300&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=500&h=300&fit=crop'
      ],
      services: ['ICU Setup', 'Cardiac Care', 'Neurological Support', 'Nursing', '24/7 Monitoring'],
      facilities: ['Advanced Monitoring', 'Certified Staff', 'Medical Equipment', 'Physiotherapy', 'Emergency Response'],
      description: 'Premium home healthcare transformation with Fortis quality medical care and equipment.',
      phone: '+91-8296162570',
      specialties: ['Cardiac Recovery', 'Neurological Care', 'Critical Care', 'Post-Surgery'],
      detailedDescription: 'Fortis Home Healthcare Mumbai brings premium healthcare transformation to Mumbai homes with Fortis quality standards. We provide complete ICU setup, cardiac care, neurological support, and 24/7 monitoring with certified medical staff.',
      certifications: ['Fortis Hospital Certified', 'NABH Accredited', 'JCI Standards'],
      equipmentIncluded: ['Cardiac Monitor', 'Ventilator', 'Oxygen Concentrator', 'Hospital Bed', 'Defibrillator'],
      staffingDetails: {
        nurses: 'Fortis Certified ICU Nurses',
        doctors: 'Fortis Specialist Doctor Visits',
        physiotherapists: 'Fortis Physiotherapy Team',
        attendants: 'Trained Medical Attendants'
      },
      serviceCoverage: ['ICU Setup & Management', 'Cardiac Recovery', 'Neurological Care', 'Critical Care'],
      emergencySupport: '24/7 Fortis Emergency Network with Ambulance Service'
    },
    "11": {
      name: 'Mumbai Medical Solutions',
      location: 'Andheri, Mumbai',
      city: 'Mumbai',
      rating: 4.7,
      reviewCount: 850,
      pricePerDay: 2700,
      availableFrom: '2025-01-19',
      responseTime: 'Same Day',
      category: 'medical-equipment',
      image: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=500&h=300&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=500&h=300&fit=crop'
      ],
      services: ['ICU Equipment', 'Oxygen Concentrator', 'Hospital Bed', 'Patient Monitor', 'Installation'],
      facilities: ['Professional Installation', 'Equipment Training', '24/7 Technical Support', 'Regular Maintenance'],
      description: 'Mumbai\'s trusted medical equipment provider with comprehensive installation and support services.',
      phone: '+91-9123456791',
      specialties: ['ICU Equipment', 'Respiratory Devices', 'Monitoring Systems', 'Mobility Aids'],
      detailedDescription: 'Mumbai Medical Solutions is Mumbai\'s trusted medical equipment provider offering comprehensive installation and support services. Our certified technicians ensure proper equipment setup and provide ongoing technical support.',
      certifications: ['CE Certified Equipment', 'FDA Approved Devices', 'ISO 13485 Quality Management'],
      equipmentIncluded: ['ICU Ventilator', 'Patient Monitor', 'Oxygen Concentrator', 'Hospital Bed', 'Suction Machine'],
      staffingDetails: {
        technicians: 'Certified Medical Equipment Technicians',
        support: '24/7 Technical Support Team',
        training: 'Equipment Operation Training',
        maintenance: 'Regular Maintenance Specialists'
      },
      serviceCoverage: ['ICU Equipment Setup', 'Respiratory Device Installation', 'Patient Monitoring Systems'],
      emergencySupport: '24/7 Technical Support with Emergency Equipment Backup'
    },
    "12": {
      name: 'Mumbai Nursing Care',
      location: 'Powai, Mumbai',
      city: 'Mumbai',
      rating: 4.8,
      reviewCount: 920,
      pricePerDay: 3200,
      availableFrom: '2025-01-21',
      responseTime: 'Within 2 hours',
      category: 'nursing-services',
      image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=500&h=300&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=500&h=300&fit=crop'
      ],
      services: ['ICU Nursing', 'Post-Surgery Care', 'General Nursing', 'Elderly Care', 'Medication Management'],
      facilities: ['Qualified RN/GNM Nurses', 'Medication Management', 'Vital Monitoring', 'Family Training'],
      description: 'Professional nursing services with experienced staff for Mumbai homes.',
      phone: '+91-8765432112',
      specialties: ['Critical Care Nursing', 'Post-Surgery Care', 'Elderly Care', 'Pediatric Nursing'],
      detailedDescription: 'Mumbai Nursing Care provides professional nursing services with experienced RN and GNM nurses for Mumbai residents. We offer comprehensive nursing care including ICU nursing, post-surgery care, and elderly care with medication management.',
      certifications: ['Nursing Council Registered', 'CPR Certified', 'ICU Training Certified'],
      equipmentIncluded: ['Blood Pressure Monitor', 'Pulse Oximeter', 'Thermometer', 'Glucometer', 'First Aid Kit'],
      staffingDetails: {
        nurses: 'Qualified RN/GNM Nurses',
        shifts: '8/12/24 Hour Shifts Available',
        supervision: 'Senior Nurse Supervision',
        training: 'Regular Skills Training'
      },
      serviceCoverage: ['ICU Nursing', 'Post-Surgery Care', 'General Nursing', 'Elderly Care'],
      emergencySupport: '24/7 Nursing Support with Direct Doctor Consultation'
    },
    "13": {
      name: 'Mumbai Physio Plus',
      location: 'Juhu, Mumbai',
      city: 'Mumbai',
      rating: 4.9,
      reviewCount: 740,
      pricePerDay: 1100,
      availableFrom: '2025-01-22',
      responseTime: 'Within 24 hours',
      category: 'physiotherapy',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=500&h=300&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=500&h=300&fit=crop'
      ],
      services: ['Post-Surgery Physiotherapy', 'Stroke Rehabilitation', 'Orthopedic Therapy', 'Mobility Training'],
      facilities: ['Qualified Physiotherapists', 'Exercise Equipment', 'Progress Assessment', 'Home Exercise Plans'],
      description: 'Premium physiotherapy services at home with advanced rehabilitation techniques in Mumbai.',
      phone: '+91-9988776657',
      specialties: ['Orthopedic Rehabilitation', 'Neurological Physiotherapy', 'Sports Injury', 'Geriatric Care'],
      detailedDescription: 'Mumbai Physio Plus provides premium physiotherapy services in Mumbai with qualified BPT physiotherapists. We offer advanced rehabilitation techniques for post-surgery recovery, stroke rehabilitation, and orthopedic therapy.',
      certifications: ['BPT Certified', 'Neuro Rehabilitation Certified', 'Sports Medicine Certified'],
      equipmentIncluded: ['Exercise Equipment', 'Mobility Aids', 'Balance Training Tools', 'Resistance Bands'],
      staffingDetails: {
        physiotherapists: 'Qualified BPT Physiotherapists',
        sessions: 'Daily/Alternate Day Sessions',
        assessment: 'Regular Progress Assessment',
        plans: 'Customized Exercise Plans'
      },
      serviceCoverage: ['Post-Surgery Physiotherapy', 'Stroke Rehabilitation', 'Orthopedic Therapy'],
      emergencySupport: '24/7 Physiotherapist Consultation Support'
    },
    "14": {
      name: 'Max Home Healthcare Delhi',
      location: 'Saket, Delhi',
      city: 'Delhi',
      rating: 4.8,
      reviewCount: 1080,
      pricePerDay: 4800,
      availableFrom: '2025-01-20',
      responseTime: 'Within 2 hours',
      category: 'all-in-one',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=300&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=500&h=300&fit=crop'
      ],
      services: ['ICU Setup', 'Nursing Care', 'Physiotherapy', 'Medical Equipment', 'Doctor Visits'],
      facilities: ['Ventilator Support', 'Patient Monitoring', 'Skilled Nurses', 'Physiotherapy', 'Emergency Response'],
      description: 'Max Healthcare\'s comprehensive home conversion service with medical equipment and skilled nursing.',
      phone: '+91-8296162571',
      specialties: ['Complete Home Setup', 'Critical Care', 'Rehabilitation'],
      detailedDescription: 'Max Home Healthcare Delhi brings Max Healthcare\'s renowned medical standards to Delhi homes. Our comprehensive service includes complete ICU setup, advanced medical equipment, Max-certified nursing staff, and specialized physiotherapy services.',
      certifications: ['Max Healthcare Certified', 'NABH Accredited', 'JCI Standards'],
      equipmentIncluded: ['Ventilator', 'Patient Monitor', 'Oxygen Concentrator', 'Hospital Bed', 'Suction Machine'],
      staffingDetails: {
        nurses: 'Max Certified ICU Nurses',
        doctors: 'Max Specialist Doctor Visits',
        physiotherapists: 'Max Physiotherapy Team',
        attendants: 'Trained Medical Attendants'
      },
      serviceCoverage: ['ICU Setup & Management', 'Critical Care', 'Rehabilitation', 'Post-Surgery Recovery'],
      emergencySupport: '24/7 Max Emergency Network with Ambulance Service'
    },
    "15": {
      name: 'Delhi MedEquip Services',
      location: 'Gurgaon, Delhi NCR',
      city: 'Delhi',
      rating: 4.6,
      reviewCount: 780,
      pricePerDay: 2600,
      availableFrom: '2025-01-19',
      responseTime: 'Same Day',
      category: 'medical-equipment',
      image: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=500&h=300&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=500&h=300&fit=crop'
      ],
      services: ['ICU Equipment', 'Oxygen Concentrator', 'Hospital Bed', 'Patient Monitor', 'Installation'],
      facilities: ['Professional Installation', 'Equipment Training', '24/7 Technical Support', 'Regular Maintenance'],
      description: 'Delhi NCR\'s leading medical equipment provider with professional installation services.',
      phone: '+91-9123456792',
      specialties: ['ICU Equipment', 'Respiratory Devices', 'Monitoring Systems', 'Mobility Aids'],
      detailedDescription: 'Delhi MedEquip Services is the leading medical equipment provider in Delhi NCR, offering professional installation and comprehensive support services. Our certified technicians ensure proper equipment setup and provide ongoing technical support.',
      certifications: ['CE Certified Equipment', 'FDA Approved Devices', 'ISO 13485 Quality Management'],
      equipmentIncluded: ['ICU Ventilator', 'Patient Monitor', 'Oxygen Concentrator', 'Hospital Bed', 'Suction Machine'],
      staffingDetails: {
        technicians: 'Certified Medical Equipment Technicians',
        support: '24/7 Technical Support Team',
        training: 'Equipment Operation Training',
        maintenance: 'Regular Maintenance Specialists'
      },
      serviceCoverage: ['ICU Equipment Setup', 'Respiratory Device Installation', 'Patient Monitoring Systems'],
      emergencySupport: '24/7 Technical Support with Emergency Equipment Backup'
    },
    "16": {
      name: 'Delhi Care Nurses',
      location: 'Noida, Delhi NCR',
      city: 'Delhi',
      rating: 4.7,
      reviewCount: 890,
      pricePerDay: 3100,
      availableFrom: '2025-01-21',
      responseTime: 'Within 3 hours',
      category: 'nursing-services',
      image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=500&h=300&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=500&h=300&fit=crop'
      ],
      services: ['ICU Nursing', 'Post-Surgery Care', 'General Nursing', 'Elderly Care', 'Medication Management'],
      facilities: ['Qualified RN/GNM Nurses', 'Medication Management', 'Vital Monitoring', 'Family Training'],
      description: 'Professional nursing services with qualified staff for Delhi NCR homes.',
      phone: '+91-8765432113',
      specialties: ['Critical Care Nursing', 'Post-Surgery Care', 'Elderly Care', 'Pediatric Nursing'],
      detailedDescription: 'Delhi Care Nurses provides professional nursing services with qualified RN and GNM nurses for Delhi NCR residents. We offer comprehensive nursing care including ICU nursing, post-surgery care, and elderly care with medication management.',
      certifications: ['Nursing Council Registered', 'CPR Certified', 'ICU Training Certified'],
      equipmentIncluded: ['Blood Pressure Monitor', 'Pulse Oximeter', 'Thermometer', 'Glucometer', 'First Aid Kit'],
      staffingDetails: {
        nurses: 'Qualified RN/GNM Nurses',
        shifts: '8/12/24 Hour Shifts Available',
        supervision: 'Senior Nurse Supervision',
        training: 'Regular Skills Training'
      },
      serviceCoverage: ['ICU Nursing', 'Post-Surgery Care', 'General Nursing', 'Elderly Care'],
      emergencySupport: '24/7 Nursing Support with Direct Doctor Consultation'
    },
    "17": {
      name: 'Delhi Rehabilitation Home',
      location: 'Dwarka, Delhi',
      city: 'Delhi',
      rating: 4.8,
      reviewCount: 650,
      pricePerDay: 1000,
      availableFrom: '2025-01-22',
      responseTime: 'Within 24 hours',
      category: 'physiotherapy',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=500&h=300&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=500&h=300&fit=crop'
      ],
      services: ['Post-Surgery Physiotherapy', 'Stroke Rehabilitation', 'Orthopedic Therapy', 'Mobility Training'],
      facilities: ['Qualified Physiotherapists', 'Exercise Equipment', 'Progress Assessment', 'Home Exercise Plans'],
      description: 'Expert physiotherapy and rehabilitation services at home in Delhi.',
      phone: '+91-9988776658',
      specialties: ['Orthopedic Rehabilitation', 'Neurological Physiotherapy', 'Sports Injury', 'Geriatric Care'],
      detailedDescription: 'Delhi Rehabilitation Home provides expert physiotherapy and rehabilitation services in Delhi with qualified BPT physiotherapists. We specialize in post-surgery recovery, stroke rehabilitation, and orthopedic therapy using modern techniques.',
      certifications: ['BPT Certified', 'Neuro Rehabilitation Certified', 'Orthopedic Specialist'],
      equipmentIncluded: ['Exercise Equipment', 'Mobility Aids', 'Balance Training Tools', 'Resistance Bands'],
      staffingDetails: {
        physiotherapists: 'Qualified BPT Physiotherapists',
        sessions: 'Daily/Alternate Day Sessions',
        assessment: 'Regular Progress Assessment',
        plans: 'Customized Exercise Plans'
      },
      serviceCoverage: ['Post-Surgery Physiotherapy', 'Stroke Rehabilitation', 'Orthopedic Therapy'],
      emergencySupport: '24/7 Physiotherapist Consultation Support'
    },
    "18": {
      name: 'KIMS Home Healthcare',
      location: 'Banjara Hills, Hyderabad',
      city: 'Hyderabad',
      rating: 4.7,
      reviewCount: 890,
      pricePerDay: 4000,
      availableFrom: '2025-01-21',
      responseTime: 'Within 3 hours',
      category: 'all-in-one',
      image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=500&h=300&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=500&h=300&fit=crop'
      ],
      services: ['ICU Setup', 'Nursing Care', 'Physiotherapy', 'Medical Equipment', 'Monitoring'],
      facilities: ['Advanced Equipment', 'Qualified Staff', 'Patient Monitoring', 'Physiotherapy', '24/7 Support'],
      description: 'KIMS hospital\'s home healthcare transformation service with comprehensive medical support.',
      phone: '+91-8296162572',
      specialties: ['Complete Home Setup', 'Critical Care', 'Post-Surgery Recovery'],
      detailedDescription: 'KIMS Home Healthcare brings the trusted KIMS hospital standards to Hyderabad homes. Our comprehensive service includes complete ICU setup, advanced medical equipment, KIMS-certified nursing staff, and 24/7 medical support.',
      certifications: ['KIMS Hospital Certified', 'NABH Accredited', 'ISO 9001:2015 Certified'],
      equipmentIncluded: ['Ventilator', 'Patient Monitor', 'Oxygen Concentrator', 'Hospital Bed', 'Suction Machine'],
      staffingDetails: {
        nurses: 'KIMS Certified ICU Nurses',
        doctors: 'KIMS Doctor Visits',
        physiotherapists: 'KIMS Physiotherapy Team',
        attendants: 'Trained Medical Attendants'
      },
      serviceCoverage: ['ICU Setup & Management', 'Critical Care', 'Post-Surgery Recovery', 'Elderly Care'],
      emergencySupport: '24/7 KIMS Emergency Network with Ambulance Service'
    },
    "19": {
      name: 'Hyderabad Medical Equipment',
      location: 'HITEC City, Hyderabad',
      city: 'Hyderabad',
      rating: 4.5,
      reviewCount: 720,
      pricePerDay: 2400,
      availableFrom: '2025-01-19',
      responseTime: 'Same Day',
      category: 'medical-equipment',
      image: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=500&h=300&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=500&h=300&fit=crop'
      ],
      services: ['ICU Equipment', 'Oxygen Concentrator', 'Hospital Bed', 'Patient Monitor', 'Installation'],
      facilities: ['Professional Installation', 'Equipment Training', '24/7 Technical Support', 'Regular Maintenance'],
      description: 'Hyderabad\'s trusted medical equipment provider with professional installation and support.',
      phone: '+91-9123456793',
      specialties: ['ICU Equipment', 'Respiratory Devices', 'Monitoring Systems', 'Mobility Aids'],
      detailedDescription: 'Hyderabad Medical Equipment is the trusted medical equipment provider in Hyderabad, offering professional installation and comprehensive support services. Our certified technicians ensure proper equipment setup and provide ongoing technical support.',
      certifications: ['CE Certified Equipment', 'FDA Approved Devices', 'ISO 13485 Quality Management'],
      equipmentIncluded: ['ICU Ventilator', 'Patient Monitor', 'Oxygen Concentrator', 'Hospital Bed', 'Suction Machine'],
      staffingDetails: {
        technicians: 'Certified Medical Equipment Technicians',
        support: '24/7 Technical Support Team',
        training: 'Equipment Operation Training',
        maintenance: 'Regular Maintenance Specialists'
      },
      serviceCoverage: ['ICU Equipment Setup', 'Respiratory Device Installation', 'Patient Monitoring Systems'],
      emergencySupport: '24/7 Technical Support with Emergency Equipment Backup'
    },
    "20": {
      name: 'Hyderabad Nursing Services',
      location: 'Jubilee Hills, Hyderabad',
      city: 'Hyderabad',
      rating: 4.6,
      reviewCount: 810,
      pricePerDay: 2900,
      availableFrom: '2025-01-21',
      responseTime: 'Within 3 hours',
      category: 'nursing-services',
      image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=500&h=300&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=500&h=300&fit=crop'
      ],
      services: ['ICU Nursing', 'Post-Surgery Care', 'General Nursing', 'Elderly Care', 'Medication Management'],
      facilities: ['Qualified RN/GNM Nurses', 'Medication Management', 'Vital Monitoring', 'Family Training'],
      description: 'Professional nursing services with experienced staff for Hyderabad homes.',
      phone: '+91-8765432114',
      specialties: ['Critical Care Nursing', 'Post-Surgery Care', 'Elderly Care', 'Pediatric Nursing'],
      detailedDescription: 'Hyderabad Nursing Services provides professional nursing services with qualified RN and GNM nurses for Hyderabad residents. We offer comprehensive nursing care including ICU nursing, post-surgery care, and elderly care with medication management.',
      certifications: ['Nursing Council Registered', 'CPR Certified', 'ICU Training Certified'],
      equipmentIncluded: ['Blood Pressure Monitor', 'Pulse Oximeter', 'Thermometer', 'Glucometer', 'First Aid Kit'],
      staffingDetails: {
        nurses: 'Qualified RN/GNM Nurses',
        shifts: '8/12/24 Hour Shifts Available',
        supervision: 'Senior Nurse Supervision',
        training: 'Regular Skills Training'
      },
      serviceCoverage: ['ICU Nursing', 'Post-Surgery Care', 'General Nursing', 'Elderly Care'],
      emergencySupport: '24/7 Nursing Support with Direct Doctor Consultation'
    },
    "21": {
      name: 'Hyderabad Physio Care',
      location: 'Gachibowli, Hyderabad',
      city: 'Hyderabad',
      rating: 4.7,
      reviewCount: 580,
      pricePerDay: 950,
      availableFrom: '2025-01-22',
      responseTime: 'Within 24 hours',
      category: 'physiotherapy',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=500&h=300&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=500&h=300&fit=crop'
      ],
      services: ['Post-Surgery Physiotherapy', 'Stroke Rehabilitation', 'Orthopedic Therapy', 'Mobility Training'],
      facilities: ['Qualified Physiotherapists', 'Exercise Equipment', 'Progress Assessment', 'Home Exercise Plans'],
      description: 'Expert physiotherapy and rehabilitation services at home in Hyderabad.',
      phone: '+91-9988776659',
      specialties: ['Orthopedic Rehabilitation', 'Neurological Physiotherapy', 'Sports Injury', 'Geriatric Care'],
      detailedDescription: 'Hyderabad Physio Care provides expert physiotherapy and rehabilitation services in Hyderabad with qualified BPT physiotherapists. We specialize in post-surgery recovery, stroke rehabilitation, and orthopedic therapy using modern techniques.',
      certifications: ['BPT Certified', 'Neuro Rehabilitation Certified', 'Orthopedic Specialist'],
      equipmentIncluded: ['Exercise Equipment', 'Mobility Aids', 'Balance Training Tools', 'Resistance Bands'],
      staffingDetails: {
        physiotherapists: 'Qualified BPT Physiotherapists',
        sessions: 'Daily/Alternate Day Sessions',
        assessment: 'Regular Progress Assessment',
        plans: 'Customized Exercise Plans'
      },
      serviceCoverage: ['Post-Surgery Physiotherapy', 'Stroke Rehabilitation', 'Orthopedic Therapy'],
      emergencySupport: '24/7 Physiotherapist Consultation Support'
    }
  };

  const provider = homeConversionData[id as keyof typeof homeConversionData];

  if (!provider) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-accent/5 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Provider Not Found</h1>
          <p className="text-muted-foreground mb-6">The home conversion provider you're looking for doesn't exist.</p>
          <Link to="/home-conversion">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home Conversion
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'all-in-one':
        return <Home className="h-5 w-5" />;
      case 'medical-equipment':
        return <Stethoscope className="h-5 w-5" />;
      case 'nursing-services':
        return <User className="h-5 w-5" />;
      case 'physiotherapy':
        return <Heart className="h-5 w-5" />;
      default:
        return <Wrench className="h-5 w-5" />;
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'all-in-one':
        return 'Complete Home Conversion';
      case 'medical-equipment':
        return 'Medical Equipment Provider';
      case 'nursing-services':
        return 'Nursing Services';
      case 'physiotherapy':
        return 'Physiotherapy Services';
      default:
        return 'Healthcare Services';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/5">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/home-conversion" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home Conversion</span>
            </Link>
            
            <div className="flex items-center space-x-2">
              <div className="bg-primary p-2 rounded-lg">
                <Shield className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold text-primary leading-tight">QureHome</h1>
                <p className="text-xs text-muted-foreground">Heal faster. Save more. Feel at home.</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost">Sign In</Button>
              <Button>Get Started</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Image Carousel */}
        <div className="mb-8">
          <Carousel className="w-full">
            <CarouselContent>
              {provider.images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="relative h-96 md:h-[500px] overflow-hidden rounded-xl">
                    <img 
                      src={image} 
                      alt={`${provider.name} - Image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">{provider.name}</h1>
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <MapPin className="h-4 w-4" />
                      <span>{provider.location}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      {getCategoryIcon(provider.category)}
                      <span className="text-sm font-medium text-primary">{getCategoryName(provider.category)}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-xl font-bold">{provider.rating}</span>
                      <span className="text-muted-foreground">({provider.reviewCount} reviews)</span>
                    </div>
                    <div className="text-2xl font-bold text-primary">₹{provider.pricePerDay}/day</div>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6">{provider.detailedDescription}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-3 bg-accent/20 rounded-lg">
                    <Clock className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <div className="text-sm font-medium">Response Time</div>
                    <div className="text-xs text-muted-foreground">{provider.responseTime}</div>
                  </div>
                  <div className="text-center p-3 bg-accent/20 rounded-lg">
                    <Calendar className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <div className="text-sm font-medium">Available From</div>
                    <div className="text-xs text-muted-foreground">{new Date(provider.availableFrom).toLocaleDateString()}</div>
                  </div>
                  <div className="text-center p-3 bg-accent/20 rounded-lg">
                    <CheckCircle className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <div className="text-sm font-medium">24/7 Support</div>
                    <div className="text-xs text-muted-foreground">Always Available</div>
                  </div>
                  <div className="text-center p-3 bg-accent/20 rounded-lg">
                    <Award className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <div className="text-sm font-medium">Certified</div>
                    <div className="text-xs text-muted-foreground">Quality Assured</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Services */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Services Provided
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {provider.services.map(service => (
                    <div key={service} className="flex items-center gap-2 p-3 bg-accent/10 rounded-lg">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>{service}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Service Coverage */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Service Coverage</h3>
                <div className="space-y-2">
                  {provider.serviceCoverage.map(coverage => (
                    <div key={coverage} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>{coverage}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Equipment Included */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Stethoscope className="h-5 w-5 text-primary" />
                  Equipment Included
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {provider.equipmentIncluded.map(equipment => (
                    <div key={equipment} className="flex items-center gap-2 p-2 bg-accent/10 rounded">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span className="text-sm">{equipment}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Staffing Details */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Staffing & Support
                </h3>
                <div className="space-y-3">
                  {Object.entries(provider.staffingDetails).map(([role, description]) => (
                    <div key={role} className="flex justify-between items-center p-3 bg-accent/10 rounded-lg">
                      <span className="font-medium capitalize">{role}:</span>
                      <span className="text-muted-foreground">{description}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Certifications & Standards
                </h3>
                <div className="flex flex-wrap gap-2">
                  {provider.certifications.map(cert => (
                    <Badge key={cert} variant="secondary" className="px-3 py-1">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Contact Provider</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-primary" />
                    <span className="font-medium">{provider.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{provider.location}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button className="w-full" size="lg">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now
                  </Button>
                  <Button variant="outline" className="w-full" size="lg">
                    Request Quote
                  </Button>
                  <Button variant="ghost" className="w-full" size="lg">
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Specialties */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Specialties</h3>
                <div className="space-y-2">
                  {provider.specialties.map(specialty => (
                    <Badge key={specialty} variant="outline" className="w-full justify-start">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Emergency Support */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-red-500" />
                  Emergency Support
                </h3>
                <p className="text-sm text-muted-foreground">{provider.emergencySupport}</p>
              </CardContent>
            </Card>

            {/* Facilities */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Facilities</h3>
                <div className="space-y-2">
                  {provider.facilities.map(facility => (
                    <div key={facility} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">{facility}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeConversionDetails;