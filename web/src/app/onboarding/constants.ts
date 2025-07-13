import type { Restaurant } from "@shared/types/api/schemas"

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
  businessHours: [
    {
      day: "Monday",
      open: "",
      close: "",
      closed: false,
    },
  ],
  features: [],
  gallery: [],
  meta: {},
  owner: false,
  ownerId: "",
}

