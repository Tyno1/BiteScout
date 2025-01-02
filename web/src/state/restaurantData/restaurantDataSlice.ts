import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface BusinessHours {
  day: string;
  open: string;
  close: string;
  closed: boolean;
}

export interface RestaurantDataState {
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
}

interface RestaurantState {
  restaurantData: RestaurantDataState;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const initialState: RestaurantState = {
  restaurantData: {
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
  },
  status: "idle",
  error: null,
};

export const getRestaurantData = createAsyncThunk(
  "restaurantData/getRestaurantData",
  async () => {
    const response = await axios.get(`${API_URL}/api/restaurant`);
    return response.data;
  }
);
export const updateRestaurantData = createAsyncThunk(
  "restaurantData/updateRestaurantData",
  async ({ data, id }: { data: RestaurantDataState; id: string }) => {
    const response = await axios.put(`${API_URL}/api/restaurant/?id=${id}`, data);
    return response.data;
  }
);

const restaurantDataSlice = createSlice({
  name: "restaurantData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRestaurantData.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        getRestaurantData.fulfilled,
        (state, action: PayloadAction<RestaurantDataState>) => {
          state.status = "succeeded";
          state.restaurantData = action.payload;
        }
      )
      .addCase(getRestaurantData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "An error has occurred";
      })
      .addCase(updateRestaurantData.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        updateRestaurantData.fulfilled,
        (state, action: PayloadAction<RestaurantDataState>) => {
          state.status = "succeeded";
          state.restaurantData = action.payload;
        }
      )
      .addCase(updateRestaurantData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "An error has occurred";
      });
  },
});

export default restaurantDataSlice.reducer;
