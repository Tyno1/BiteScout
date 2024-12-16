import { createSlice } from "@reduxjs/toolkit";

interface businessHours {
  day: string;
  open: string;
  close: string;
  closed: boolean;
}

interface RestaurantDataState {
  name: string;
  logo: string;
  description: string;
  cuisine: string[];
  priceRange: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  businessHours: businessHours[];
  features: string[];
  gallery: string[];
  meta: any;
}

const initialState: RestaurantDataState = {
  name: "",
  logo: "",
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
};

const RestaurantDataSlice = createSlice({
  name: "restaurantData",
  initialState,
  reducers: {
    updateRestaurantData: (state, action: any) => {
      state = action.payload;
    },
  },
});

export const { updateRestaurantData } = RestaurantDataSlice.actions;

export default RestaurantDataSlice.reducer;
