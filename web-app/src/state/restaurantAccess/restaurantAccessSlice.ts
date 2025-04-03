import { IRestaurantAccess } from "@/types/restaurantAccess";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface RestaurantAccessState {
  restaurantAccess: IRestaurantAccess;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const serverApi = import.meta.env.VITE_BACKEND_SERVER;

const initialState: RestaurantAccessState = {
  restaurantAccess: {
    _id: "",
    userId: "",
    restaurantId: "",
    role: "",
  },
  status: "idle",
  error: null,
};

export const createRestaurantAccess = createAsyncThunk(
  "restaurantAccess/createRestaurantAccess",
  async ({
    restaurantId,
    userId,
    token,
  }: {
    restaurantId: string;
    userId: string;
    token: string;
  }) => {
    console.log(userId, restaurantId);

    const response = await axios.post(
      `${serverApi}/api/restaurant-access/${restaurantId}`,
      { userId: userId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log(response.data);

    return response.data;
  }
);

const restaurantAccessSlice = createSlice({
  name: "foodCatalogue",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createRestaurantAccess.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        createRestaurantAccess.fulfilled,
        (state, action: PayloadAction<IRestaurantAccess>) => {
          state.restaurantAccess = action.payload;
          state.status = "succeeded";
          state.error = null;
        }
      )
      .addCase(createRestaurantAccess.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "An error has occurred";
      });
  },
});

export default restaurantAccessSlice.reducer;
