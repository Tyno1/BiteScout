import type { BusinessHour, Restaurant } from "@shared/types/api/schemas"

export const DEFAULT_BUSINESS_HOURS: BusinessHour[] = [
  { day: "Monday", open: "09:00", close: "17:00", closed: false },
  { day: "Tuesday", open: "09:00", close: "17:00", closed: false },
  { day: "Wednesday", open: "09:00", close: "17:00", closed: false },
  { day: "Thursday", open: "09:00", close: "17:00", closed: false },
  { day: "Friday", open: "09:00", close: "17:00", closed: false },
  { day: "Saturday", open: "09:00", close: "17:00", closed: false },
  { day: "Sunday", open: "09:00", close: "17:00", closed: false },
];

export const DEFAULT_RESTAURANT_DATA: Restaurant = {
  _id: "",
  name: "",
  logo: undefined,
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
  meta: {},
  owner: false,
  ownerId: "",
}

