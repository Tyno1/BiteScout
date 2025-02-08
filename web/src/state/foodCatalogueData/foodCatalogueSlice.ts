import { FoodCatalogue } from "@/types/foodCatalogue";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface FoodCatalogueState {
  foodData: FoodCatalogue;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const initialState: FoodCatalogueState = {
  foodData: {
    id: "",
    name: "",
    ingredients: [],
    cuisineType: "",
    course: "",
    price: "",
    allergens: [],
    images: [],
  },
  status: "idle",
  error: null,
};

export const createFoodCatalogue = createAsyncThunk(
  "foodCatalogue/createFoodCatalogue",
  async (FoodCatalogue: FoodCatalogue) => {
    const response = await axios.post(
      `${API_URL}/api/food-catalogue`,
      FoodCatalogue
    );
    return response.data;
  }
);

const foodCatalogueSlice = createSlice({
  name: "foodCatalogue",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createFoodCatalogue.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        createFoodCatalogue.fulfilled,
        (state, action: PayloadAction<FoodCatalogue>) => {
          state.foodData = action.payload;
          state.status = "succeeded";
          state.error = null;
        }
      )
      .addCase(createFoodCatalogue.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "An error has occurred";
      });
  },
});

export default foodCatalogueSlice.reducer;
