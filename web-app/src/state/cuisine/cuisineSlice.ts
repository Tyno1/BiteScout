import { Cuisine } from "@/types/foodCatalogue";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface CuisineState {
  cuisineData: Cuisine[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const initialState: CuisineState = {
  cuisineData: [{ _id: "", name: "", description: "" }],
  status: "idle",
  error: null,
};

export const createCuisine = createAsyncThunk(
  "cuisine/createCuisine",
  async (cuisineData: Cuisine) => {
    const response = await axios.post(
      `${API_URL}/api/food-catalogue/cuisine`,
      cuisineData
    );
    return response.data;
  }
);
export const getCuisine = createAsyncThunk(
  "cuisine/getCuisine",
  async () => {
    const response = await axios.get(`${API_URL}/api/food-catalogue/cuisine`);
    return response.data;
  }
);

const CuisineSlice = createSlice({
  name: "cuisine",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCuisine.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createCuisine.fulfilled, (state, action) => {
        state.cuisineData = action.payload;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(createCuisine.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "An error has occurred";
      })

      .addCase(getCuisine.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getCuisine.fulfilled, (state, action) => {
        state.cuisineData = action.payload;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(getCuisine.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "An error has occurred";
      });
  },
});

export default CuisineSlice.reducer;
