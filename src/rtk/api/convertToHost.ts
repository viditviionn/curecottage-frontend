import { authApi, type User } from "./authApi";

// ---------- Convert to Host ----------
export type ConvertToHostResponse = {
  success: boolean;
  message: string;
  data: { user: User };
};

export type ConvertToHostRequest = {
  userId: string;
  body?: Record<string, unknown>;
};

// ---------- Create Property ----------
export type CreatePropertyRequest = {
  name: string;
  description: string;
  propertyType: string;
  totalRooms: number;
  addressLine1: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  checkInTime: string;
  checkOutTime: string;
  minStayNights: number;
  cancellationPolicyDays: number;
};

export type Property = {
  id: string;
  name?: string;
};

export type CreatePropertyResponse = {
  success: boolean;
  message: string;
  data: {
    property: Property;
  };
};

// ---------- Get Amenities ----------
export type Amenity = {
  id: string;
  name: string;
  category: string; // "basic" etc
  iconUrl: string | null;
  description: string | null;
};

export type GetAmenitiesResponse = {
  success: boolean;
  message: string;
  data: {
    amenities: Amenity[];
  };
};
export type MedicalAmenity = {
  id: string;
  type: string;        
  title: string;      
  description: string | null;
};

export type GetMedicalAmenitiesResponse = {
  success: boolean;
  message: string;
  data: {
    medicalAmenities: MedicalAmenity[];
  };
};
export type UploadPropertyImagesResponse = {
  success: boolean;
  message: string;
  data?: {
    images: string[];
  };
};

export type UploadPropertyImagesRequest = {
  propertyId: string;
  images: File[];
};
export type AddAmenitiesToPropertyRequest = {
  propertyId: string;
  amenityIds: string[];
};

export type AddAmenitiesToPropertyResponse = {
  success: boolean;
  message: string;
  data?: {
    amenities: Amenity[];
  };
};
export type AddMedicalAmenitiesToPropertyRequest = {
  propertyId: string;
  medicalAmenityIds: string[];
};

export type AddMedicalAmenitiesToPropertyResponse = {
  success: boolean;
  message: string;
  data?: {
    medicalAmenities: MedicalAmenity[];
  };
};

// ---- Get Property Images ----
export type PropertyImage = {
  id: string;
  propertyId: string;
  imageUrl: string;
  caption: string | null;
  displayOrder: number;
  isPrimary: boolean;
  uploadedAt: string;
};

export type GetPropertyImagesResponse = {
  success: boolean;
  message: string;
  data: {
    images: PropertyImage[];
  };
};
// ---- Add Property Pricing ----
export type AddPropertyPricingRequest = {
  propertyId: string;
  body: {
    basePricePerNight: number;
    currency: string;
    weekendMultiplier: number;
    seasonMultiplier: number;
    cleaningFee: number;
    serviceFeePercentage: number;
    taxPercentage: number;
    minStayNights: number;
    isActive: boolean;
  };
};

export type AddPropertyPricingResponse = {
  success: boolean;
  message: string;
  data?: {
    pricing: {
      id: string;
      propertyId: string;
      basePricePerNight: number;
      currency: string;
      weekendMultiplier: number;
      seasonMultiplier: number;
      cleaningFee: number;
    };
    serviceFeePercentage: number;
    taxPercentage: number;
    minStayNights: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  };
};
export type SetPrimaryImageRequest = {
  propertyId: string;
  imageId: string;
};

export type SetPrimaryImageResponse = {
  success: boolean;
  message: string;
  data?: {
    image: PropertyImage;
  };
};
export type UpdatePropertyStatusRequest = {
  propertyId: string;
  status: "active" | "inactive";
};

export type UpdatePropertyStatusResponse = {
  success: boolean;
  message: string;
  data?: {
    property: Property;
  };
};
export type PropertyFull = {
  id: string;
  name: string;
  description: string;
  propertyType: string;
  totalRooms: number;
  addressLine1: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  checkInTime: string;
  checkOutTime: string;
  minStayNights: number;
  cancellationPolicyDays: number;
};
export type GetPropertyByIdResponse = {
  success: boolean;
  message: string;
  data: {
    property: PropertyFull;
  };
};
export type UpdatePropertyRequest = {
  propertyId: string;
  body: {
    name: string;
    description: string;
    propertyType: string;
    totalRooms: number;
    addressLine1: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    latitude: number;
    longitude: number;
    checkInTime: string;
    checkOutTime: string;
    minStayNights: number;
    cancellationPolicyDays: number;
  };
};
export type UpdatePropertyResponse = {
  success: boolean;
  message: string;
  data?: {
    property: PropertyFull;
  };
};

export const convertToHostApi = authApi.injectEndpoints({
  endpoints: (builder) => ({
    convertToHost: builder.mutation<ConvertToHostResponse, ConvertToHostRequest>({
      query: ({ userId, body }) => ({
        url: `/users/${userId}/convert-to-host`,
        method: "POST",
        body: body ?? {},
      }),
    }),

    createProperty: builder.mutation<CreatePropertyResponse, CreatePropertyRequest>({
      query: (payload) => ({
        url: `/properties`,
        method: "POST",
        body: payload,
      }),
    }),

    getAmenities: builder.query<Amenity[], void>({
      query: () => `/properties/amenities`,
      transformResponse: (res: GetAmenitiesResponse) => res.data.amenities,
    }),
    getMedicalAmenities: builder.query<MedicalAmenity[], void>({
      query: () => `/properties/medical-amenities`,
      transformResponse: (res: GetMedicalAmenitiesResponse) => res.data.medicalAmenities,
    }),
    uploadPropertyImages: builder.mutation<
  UploadPropertyImagesResponse,
  { propertyId: string; files: File[] }
>({
  query: ({ propertyId, files }) => {
    const formData = new FormData();

    // backend expects key: "images"
    files.forEach((f) => formData.append("images", f));

    return {
      url: `/properties/${propertyId}/images`,
      method: "POST",
      body: formData,
    };
  },
}),
addAmenitiesToProperty: builder.mutation<
  AddAmenitiesToPropertyResponse,
  AddAmenitiesToPropertyRequest
>({
  query: ({ propertyId, amenityIds }) => ({
    url: `/properties/${propertyId}/amenities`,
    method: "POST",
    body: { amenityIds },
  }),
}),
addMedicalAmenitiesToProperty: builder.mutation<
  AddMedicalAmenitiesToPropertyResponse,
  AddMedicalAmenitiesToPropertyRequest
>({
  query: ({ propertyId, medicalAmenityIds }) => ({
    url: `/properties/${propertyId}/medical-amenities`,
    method: "POST",
    body: {
      medicalAmenities: medicalAmenityIds.map((id) => ({
        medicalAmenityId: id,
        quantity: 2,
        notes: "Available 24/7",
        isAvailable: true,
      })),
    },
  }),
}),
getPropertyImages: builder.query<PropertyImage[], string>({
  query: (propertyId) => `/properties/${propertyId}/images`,
  transformResponse: (res: GetPropertyImagesResponse) => res.data.images,
}),
addPropertyPricing: builder.mutation<AddPropertyPricingResponse, AddPropertyPricingRequest>({
  query: ({ propertyId, body }) => ({
    url: `/properties/${propertyId}/pricing`,
    method: "POST",
    body,
  }),
}),
setPrimaryPropertyImage: builder.mutation<SetPrimaryImageResponse, SetPrimaryImageRequest>({
  query: ({ propertyId, imageId }) => ({
    url: `/properties/${propertyId}/images/${imageId}`,
    method: "PUT",
    body: {
      caption: "XYZ",     
      isPrimary: true,
    },
  }),
}),
updatePropertyStatus: builder.mutation<
  UpdatePropertyStatusResponse,
  UpdatePropertyStatusRequest
>({
  query: ({ propertyId, status }) => ({
    url: `/properties/${propertyId}/status`,
    method: "PATCH",
    body: { status },
  }),
}),
getPropertyById: builder.query<PropertyFull, string>({
  query: (propertyId) => `/properties/${propertyId}`,
  transformResponse: (res: GetPropertyByIdResponse) => res.data.property,
}),

updateProperty: builder.mutation<UpdatePropertyResponse, UpdatePropertyRequest>({
  query: ({ propertyId, body }) => ({
    url: `/properties/${propertyId}`,
    method: "PUT",
    body,
  }),
}),
  }),
  overrideExisting: false,
});

export const {
  useConvertToHostMutation,
  useCreatePropertyMutation,
  useGetAmenitiesQuery,
  useGetMedicalAmenitiesQuery,
  useUploadPropertyImagesMutation,
  useAddAmenitiesToPropertyMutation,
  useAddMedicalAmenitiesToPropertyMutation,
  useGetPropertyImagesQuery,
  useAddPropertyPricingMutation,
  useSetPrimaryPropertyImageMutation,
  useUpdatePropertyStatusMutation,
  useGetPropertyByIdQuery,
  useUpdatePropertyMutation
} = convertToHostApi;
