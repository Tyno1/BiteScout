import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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


// finish setting up async fetch
export const getRestaurantData = createAsyncThunk(
  "restaurantData/getRestaurantData",
  async () => {
    const response = await axios.get(`${process.env.NEXTAUTH_URL}/api/restaurant`);
    return response.data;
  }
);

const restaurantDataSlice = createSlice({
  name: "restaurantData",
  initialState,
  reducers: {
    updateRestaurantData: (state, action: any) => {
      state = action.payload;
    },
  },
});

export const { updateRestaurantData } = restaurantDataSlice.actions;
export default restaurantDataSlice.reducer;
