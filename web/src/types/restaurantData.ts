type BusinessHours = {
  day: string;
  open: string;
  close: string;
  closed: boolean;
};

export type RestaurantData = {
  _id?: string;
  name: string;
  logo: string;
  description: string;
  cuisine: string[];
  priceRange: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  businessHours: BusinessHours[];
  features: string[];
  gallery: string[];
  meta: any;
  owner: boolean;
  ownerId?: string;
};
