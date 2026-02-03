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
  basePricePerNight: number;
  currency: string;
  isActive: boolean;
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
  data: {
    properties: Property[];
    pagination: Pagination;
  };
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

  // search filters (optional)
  checkInDate?: string;     // "2026-02-11"
  checkOutDate?: string;    // "2026-02-26"
  minPrice?: number;
  maxPrice?: number;

  // NOTE: backend may not support this yet
  city?: string;
};

export const propertyApi = authApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ GET /properties/available with filters
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

        if (args?.city) params.set("city", args.city);

        return `/properties/available?${params.toString()}`;
      },
      transformResponse: (res: AvailablePropertiesResponse) => res.data,
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
  useGetPropertyByIdQuery,
} = propertyApi;
