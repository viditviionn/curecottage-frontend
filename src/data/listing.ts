import { LucideIcon, Bed, Wifi, Accessibility, HeartPulse, Stethoscope, Utensils, Car, Languages, UserPlus, ShieldPlus } from "lucide-react";

export interface Listing {
  id: string;
  title: string;
  slug: string;
  type: "Standard" | "Premium" | "Family";
  description: string;
  shortDescription: string;
  priceLabel: string;
  rating: number;
  reviews: number;
  guests: number;
  bedrooms: number;
  bathrooms: number;
  beds: number;
  image: string;
  images: string[];
  features: string[];
  amenities: string[];
  isGuestFavorite?: boolean;
  isPopular?: boolean;
  minStay: string;
  recommendedFor: string[];
  coordinates: { lat: number; lng: number };
}

export const listings: Listing[] = [
  {
    id: "1",
    title: "Premium Recovery Suite",
    slug: "premium-recovery",
    type: "Premium",
    shortDescription: "Our most popular choice for international patients.",
    description: "Designed for patients requiring extended recovery time (7-21 days). This premium suite includes an adjustable patient bed plus a comfortable attendant bed, ensuring your loved ones can stay by your side. Includes dedicated medical concierge and hospital liaison services.",
    priceLabel: "Contact for rates",
    rating: 4.95,
    reviews: 124,
    guests: 2,
    bedrooms: 1,
    beds: 2,
    bathrooms: 1,
    image: "/images/room-premium.jpg",
    images: ["/images/room-premium.jpg", "/images/room-standard.jpg", "/images/service-food.jpg"],
    features: [
      "Adjustable bed + attendant bed",
      "Oxygen concentrator & grab rails",
      "Dedicated medical concierge",
      "Hospital liaison services"
    ],
    amenities: [
      "Therapeutic meals",
      "Physiotherapy available",
      "Medical-grade cleaning",
      "Wi-Fi",
      "Wheelchair accessible",
      "Air conditioning",
      "Smart TV"
    ],
    isGuestFavorite: true,
    isPopular: true,
    minStay: "7-21 days",
    recommendedFor: ["International patients", "Post-surgical recovery"],
    coordinates: { lat: 12.895, lng: 77.595 }
  },
  {
    id: "2",
    title: "Standard Recovery Room",
    slug: "standard-recovery",
    type: "Standard",
    shortDescription: "Ideal for short stays (3-7 days).",
    description: "A comfortable, medically-equipped 1BHK unit designed for short-term recovery. Features a hospital-style adjustable bed and wheelchair-accessible layout, located just minutes from Apollo and Fortis hospitals.",
    priceLabel: "Contact for rates",
    rating: 4.82,
    reviews: 86,
    guests: 1,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    image: "/images/room-standard.jpg",
    images: ["/images/room-standard.jpg", "/images/service-care.jpg"],
    features: [
      "1BHK with adjustable bed",
      "Medical-grade cleaning",
      "Near hospitals",
      "Emergency call button"
    ],
    amenities: [
      "Wi-Fi",
      "Wheelchair accessible",
      "Kitchenette",
      "Grab rails",
      "Elevator access"
    ],
    isGuestFavorite: false,
    minStay: "3-7 days",
    recommendedFor: ["Short stays", "Outpatient recovery"],
    coordinates: { lat: 12.898, lng: 77.599 }
  },
  {
    id: "3",
    title: "Family Recovery Suite",
    slug: "family-recovery",
    type: "Family",
    shortDescription: "For extended stays & families.",
    description: "A spacious 2BHK suite with a separate patient room, perfect for families accompanying a patient for long-term treatment (14-45 days). Includes a full kitchen, washing machine, and our premium medical concierge service.",
    priceLabel: "Contact for rates",
    rating: 4.98,
    reviews: 54,
    guests: 4,
    bedrooms: 2,
    beds: 3,
    bathrooms: 2,
    image: "/images/room-family.jpg",
    images: ["/images/room-family.jpg", "/images/room-premium.jpg", "/images/service-food.jpg"],
    features: [
      "2BHK with separate patient room",
      "Full kitchen & washing machine",
      "Premium concierge",
      "All medical services included"
    ],
    amenities: [
      "Full Kitchen",
      "Washing Machine",
      "Living Room",
      "Dining Area",
      "Therapeutic meals",
      "Translator support"
    ],
    isGuestFavorite: true,
    minStay: "14-45 days",
    recommendedFor: ["Families", "Extended treatment", "Transplant recovery"],
    coordinates: { lat: 12.892, lng: 77.592 }
  }
];

export const features = [
  {
    title: "Medical-Grade Infrastructure",
    items: ["Hospital-style adjustable beds", "Grab rails & wheelchair-accessible", "Oxygen concentrators on request", "Emergency call buttons"],
    icon: Bed
  },
  {
    title: "Dedicated Medical Concierge",
    items: ["Single point of contact", "Support in English, Arabic, Bangla", "Hospital appointment scheduling", "Pharmacy & lab coordination"],
    icon: UserPlus
  },
  {
    title: "Therapeutic Meal Programs",
    items: ["Nutritionist-designed meal plans", "Post-surgery & cardiac diets", "Halal, Jain & veg options", "Home-style cooking"],
    icon: Utensils
  },
  {
    title: "Hospital Shuttle Service",
    items: ["Transport to hospital", "Wheelchair-accessible vehicles", "Airport pickup included (packages)"],
    icon: Car
  }
];