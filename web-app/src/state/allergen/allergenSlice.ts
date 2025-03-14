import { Allergen } from "@/types/foodCatalogue";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface AllergenState {
  allergenData: Allergen[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const serverApi = import.meta.env.VITE_BACKEND_SERVER;

const initialState: AllergenState = {
  allergenData: [{ _id: "", name: "", description: "" }],
  status: "idle",
  error: null,
};

export const createAllergen = createAsyncThunk(
  "allergen/createAllergen",
  async (allergenData: Allergen) => {
    const response = await axios.post(
      `${serverApi}/api/food-catalogue/allergens`,
      allergenData
    );
    return response.data;
  }
);
export const getAllergens = createAsyncThunk(
  "allergen/getAllergen",
  async () => {
    const response = await axios.get(`${serverApi}/api/food-catalogue/allergens`);
    return response.data;
  }
);

const AllergenSlice = createSlice({
  name: "allergen",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAllergen.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createAllergen.fulfilled, (state, action) => {
        state.allergenData = action.payload;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(createAllergen.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "An error has occurred";
      })

      .addCase(getAllergens.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAllergens.fulfilled, (state, action) => {
        state.allergenData = action.payload;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(getAllergens.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "An error has occurred";
      });
  },
});


export default AllergenSlice.reducer;