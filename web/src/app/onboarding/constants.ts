import type { RestaurantData } from "@/types/restaurantData"

export const DEFAULT_RESTAURANT_DATA: RestaurantData= {
  name: "",
  logo: "ttt",
  description: "",
  cuisine: [],
  priceRange: "",
  address: "",
  phone: "",
  email: "",
  website: "",
  businessHours: [
    {
      day: "",
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

