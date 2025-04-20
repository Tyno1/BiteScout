import type { RestaurantDataState } from "@/types/restaurantData"

export const DEFAULT_RESTAURANT_DATA: RestaurantDataState = {
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

