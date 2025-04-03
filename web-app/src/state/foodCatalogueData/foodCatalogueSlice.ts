import { FoodDataReceived, FoodDataSent } from "@/types/foodCatalogue";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface FoodCatalogueState {
  foodData: FoodDataReceived | FoodDataSent;
  foodDatas: FoodDataReceived[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const serverApi = import.meta.env.VITE_BACKEND_SERVER;

const initialState: FoodCatalogueState = {
  foodData: {
    _id: "",
    name: "",
    ingredients: [],
    cuisineType: "",
    course: "",
    price: {
      currency: "",
      amount: 0,
    },
    allergens: [],
    images: [],
    restaurant: "",
  },
  foodDatas: [],
  status: "idle",
  error: null,
};

export const createFoodCatalogue = createAsyncThunk(
  "foodCatalogueData/createFoodCatalogue",
  async (FoodCatalogue: FoodDataSent) => {
    const response = await axios.post(
      `${serverApi}/api/food-catalogue`,
      FoodCatalogue
    );
    console.log(response.data);

    return response.data;
  }
);

// get food catalogue by restaurant Id
export const getFoodCatalogue = createAsyncThunk(
  "foodCatalogueData/getFoodCatalogue",
  async (restaurantId: string) => {
    const response = await axios.get(
      `${serverApi}/api/food-catalogue/restaurant/?id=${restaurantId}`
    );
    return response.data;
  }
);

// get food catalogue by id
export const getFoodCatalogueById = createAsyncThunk(
  "foodCatalogueData/getFoodCatalogueById",
  async (id: string) => {
    const response = await axios.get(`${serverApi}/api/food-catalogue/${id}`);
    return response.data;
  }
);

const foodCatalogueSlice = createSlice({
  name: "foodCatalogue",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createFoodCatalogue.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        createFoodCatalogue.fulfilled,
        (state, action: PayloadAction<FoodDataReceived>) => {
          state.foodData = action.payload;
          state.status = "succeeded";
          state.error = null;
        }
      )
      .addCase(createFoodCatalogue.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "An error has occurred";
      })
      .addCase(getFoodCatalogue.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        getFoodCatalogue.fulfilled,
        (state, action: PayloadAction<FoodDataReceived[]>) => {
          state.foodDatas = action.payload;
          state.status = "succeeded";
          state.error = null;
        }
      )
      .addCase(getFoodCatalogue.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "An error has occurred";
      })
      .addCase(getFoodCatalogueById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        getFoodCatalogueById.fulfilled,
        (state, action: PayloadAction<FoodDataReceived>) => {
          state.foodData = action.payload;
          state.status = "succeeded";
          state.error = null;
        }
      )
      .addCase(getFoodCatalogueById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "An error has occurred";
      });
  },
});

export default foodCatalogueSlice.reducer;
