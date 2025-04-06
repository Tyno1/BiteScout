import { RestaurantDataState } from "@/types/restaurantData";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface RestaurantState {
  restaurantData: RestaurantDataState;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const initialState: RestaurantState = {
  restaurantData: {
    _id: "",
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
    owner: false,
    ownerId: "",
  },
  status: "idle",
  error: null,
};

export const createRestaurantData = createAsyncThunk(
  "restaurantData/createRestaurantData",
  async (restaurantData: RestaurantDataState) => {
    const response = await axios.post(
      `${API_URL}/restaurants`,
      restaurantData
    );
    return response.data;
  }
);

export const getRestaurantData = createAsyncThunk(
  "restaurantData/getRestaurantData",
  async (id: string) => {
    const response = await axios.get(`${API_URL}/restaurant?id=${id}`);
    return response.data;
  }
);

export const getRestaurantDataByOwnerId = createAsyncThunk(
  "restaurantData/getRestaurantDataByUserId",
  async (id: string) => {
    const response = await axios.get(
      `${API_URL}/restaurant/owner?id=${id}`
    );
    return response.data;
  }
);

export const updateRestaurantData = createAsyncThunk(
  "restaurantData/updateRestaurantData",
  async ({
    data,
    id,
  }: {
    data: RestaurantDataState;
    id: string | undefined;
  }) => {
    const response = await axios.put(
      `${API_URL}/restaurant/?id=${id}`,
      data
    );
    return response.data;
  }
);

const restaurantDataSlice = createSlice({
  name: "restaurantData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createRestaurantData.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        createRestaurantData.fulfilled,
        (state, action: PayloadAction<RestaurantDataState>) => {
          state.restaurantData = action.payload;
          state.status = "succeeded";
          state.error = null;
        }
      )
      .addCase(createRestaurantData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "An error has occurred";
      })

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

      .addCase(getRestaurantDataByOwnerId.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        getRestaurantDataByOwnerId.fulfilled,
        (state, action: PayloadAction<RestaurantDataState>) => {
          state.status = "succeeded";
          state.restaurantData = action.payload;
          state.error = null;
        }
      )
      .addCase(getRestaurantDataByOwnerId.rejected, (state, action) => {
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
