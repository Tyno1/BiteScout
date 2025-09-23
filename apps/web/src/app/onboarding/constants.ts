import type { BusinessHour, Restaurant } from "shared/types/api/schemas";

export const DEFAULT_BUSINESS_HOURS: BusinessHour[] = [
  { day: "monday", open: "09:00", close: "17:00", isClosed: false },
  { day: "tuesday", open: "09:00", close: "17:00", isClosed: false },
  { day: "wednesday", open: "09:00", close: "17:00", isClosed: false },
  { day: "thursday", open: "09:00", close: "17:00", isClosed: false },
  { day: "friday", open: "09:00", close: "17:00", isClosed: false },
  { day: "saturday", open: "09:00", close: "17:00", isClosed: false },
  { day: "sunday", open: "09:00", close: "17:00", isClosed: false },
];

export const DEFAULT_RESTAURANT_DATA: Restaurant = {
  _id: "",
  name: "",
  description: "",
  cuisine: [],
  priceRange: "$",
  address: "",
  phone: "",
  email: "",
  website: "",
  businessHours: DEFAULT_BUSINESS_HOURS,
  features: [],
  gallery: [],
  assignedImages: undefined,
  meta: {},
  owner: false,
  ownerId: "",
};
