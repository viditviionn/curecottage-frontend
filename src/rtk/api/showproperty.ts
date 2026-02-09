import { authApi } from "./authApi";

// ---------- Types ----------
export type PropertyImage = {
  id: string;
  propertyId: string;
  imageUrl: string;
  caption: string | null;
  displayOrder: number;
  isPrimary: boolean;
  uploadedAt: string;
};

export type AmenityObj = {
  id: string;
  name: string;
  category: string;
  iconUrl: string | null;
  description: string | null;
};

export type PropertyAmenity = {
  propertyId: string;
  amenityId: string;
  amenity: AmenityObj;
};

export type MedicalAmenityObj = {
  id: string;
  type: string;
  title: string;
  description: string | null;
};

export type PropertyMedicalAmenity = {
  propertyId: string;
  medicalAmenityId: string;
  quantity: number;
  notes: string | null;
  isAvailable: boolean;
  medicalAmenity: MedicalAmenityObj;
};

export type Host = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
};

export type PropertyPricing = {
    id?: string;
    propertyId?: string;
  
    basePricePerNight: number;
    currency: string;
  
    weekendMultiplier?: number;
    seasonMultiplier?: number;
    cleaningFee?: number;
    serviceFeePercentage?: number;
    taxPercentage?: number;
    minStayNights?: number;
  
    isActive: boolean;
    effectiveFrom?: string;
    effectiveTo?: string | null;
  };

export type Property = {
  id: string;
  hostId: string;
  name: string;
  description: string;
  propertyType: string;
  status: string;
  totalRooms: number;
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  checkInTime: string;
  checkOutTime: string;
  minStayNights: number;
  maxStayNights: number | null;
  cancellationPolicyDays: number;
  createdAt: string;
  updatedAt: string;
  images: PropertyImage[];
};

export type PropertyDetails = Property & {
  host?: Host;
  amenities?: PropertyAmenity[];
  medicalAmenities?: PropertyMedicalAmenity[];
  pricing?: PropertyPricing[];
  _count?: { bookings: number; reviews: number };
};

// ---------- Responses ----------
export type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

type AvailablePropertiesResponse = {
  success: boolean;
  message: string;
  data: { properties: Property[]; pagination: Pagination };
};

type MyPropertiesResponse = {
  success: boolean;
  message: string;
  data: { properties: Property[]; pagination?: Pagination };
};

type PropertyByIdResponse = {
  success: boolean;
  message: string;
  data: { property: PropertyDetails };
};

// ✅ args (filters)
export type GetAvailablePropertiesArgs = {
  page?: number;
  limit?: number;
  checkInDate?: string;
  checkOutDate?: string;
  minPrice?: number;
  maxPrice?: number;
  city?: string; 
};

// ✅ args for my properties (optional)
export type GetMyPropertiesArgs = {
  page?: number;
  limit?: number;
};

export const propertyApi = authApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ GET /properties/available
    getAvailableProperties: builder.query<
      { properties: Property[]; pagination: Pagination },
      GetAvailablePropertiesArgs | undefined
    >({
      query: (args) => {
        const params = new URLSearchParams();
        params.set("page", String(args?.page ?? 1));
        params.set("limit", String(args?.limit ?? 100));

        if (args?.checkInDate) params.set("checkInDate", args.checkInDate);
        if (args?.checkOutDate) params.set("checkOutDate", args.checkOutDate);
        if (typeof args?.minPrice === "number") params.set("minPrice", String(args.minPrice));
        if (typeof args?.maxPrice === "number") params.set("maxPrice", String(args.maxPrice));

        // if (args?.city) params.set("city", args.city); // only if backend supports

        return `/properties/available?${params.toString()}`;
      },
      transformResponse: (res: AvailablePropertiesResponse) => res.data,
    }),

    // ✅ GET /properties/my-properties  (AUTH REQUIRED)
    getMyProperties: builder.query<
      { properties: Property[]; pagination?: Pagination },
      GetMyPropertiesArgs | undefined
    >({
      query: (args) => {
        const params = new URLSearchParams();
        if (args?.page) params.set("page", String(args.page));
        if (args?.limit) params.set("limit", String(args.limit));
        const qs = params.toString();
        return qs ? `/properties/my-properties?${qs}` : "/properties/my-properties";
      },
      transformResponse: (res: MyPropertiesResponse) => res.data,
    }),

    // ✅ GET /properties/:id
    getPropertyById: builder.query<PropertyDetails, string>({
      query: (id) => `/properties/${id}`,
      transformResponse: (res: PropertyByIdResponse) => res.data.property,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAvailablePropertiesQuery,
  useLazyGetAvailablePropertiesQuery,
  useGetMyPropertiesQuery,
  useGetPropertyByIdQuery,
} = propertyApi;
