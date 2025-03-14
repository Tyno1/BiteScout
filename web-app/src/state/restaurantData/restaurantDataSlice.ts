import { RestaurantDataState } from "@/types/restaurantData";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface RestaurantState {
  restaurantDatas: RestaurantDataState[];
  restaurantData: RestaurantDataState;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Define error type for consistency
interface ErrorResponse {
  message: string;
  status?: number;
}

const serverApi = import.meta.env.VITE_BACKEND_SERVER;
const DEFAULT_RESTAURANT_DATA = {
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
};

const initialState: RestaurantState = {
  restaurantDatas: [],
  restaurantData: DEFAULT_RESTAURANT_DATA,
  status: "idle",
  error: null,
};

// Helper function to handle Axios errors consistently
const handleAxiosError = (error: any): ErrorResponse => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      const status = error.response.status;
      const message =
        error.response.data?.message ||
        error.response.data?.error ||
        `Server error: ${status}`;
      return { message, status };
    } else if (error.request) {
      return {
        message: "No response from server. Please check your connection.",
      };
    }
  }
  return {
    message:
      error instanceof Error ? error.message : "An unknown error occurred",
  };
};

export const createRestaurantData = createAsyncThunk<
  RestaurantDataState,
  { restaurantData: RestaurantDataState; token: string },
  { rejectValue: ErrorResponse }
>(
  "restaurantData/createRestaurantData",
  async ({ restaurantData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${serverApi}/api/restaurants`,
        restaurantData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export const getRestaurantData = createAsyncThunk<
  RestaurantDataState,
  { id: string; token: string },
  { rejectValue: ErrorResponse }
>(
  "restaurantData/getRestaurantData",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${serverApi}/api/restaurants/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export const getRestaurantsByName = createAsyncThunk<
  RestaurantDataState[],
  { name: string; token: string },
  { rejectValue: ErrorResponse }
>(
  "restaurantData/getRestaurantsByName",
  async ({ name, token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${serverApi}/api/restaurants/search?name=${encodeURIComponent(name)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export const getRestaurantDataByOwnerId = createAsyncThunk<
  RestaurantDataState,
  { id: string; token: string },
  { rejectValue: ErrorResponse }
>(
  "restaurantData/getRestaurantDataByUserId",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${serverApi}/api/restaurants/owner?id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export const updateRestaurantData = createAsyncThunk<
  RestaurantDataState,
  { data: RestaurantDataState; id: string | undefined; token: string },
  { rejectValue: ErrorResponse }
>(
  "restaurantData/updateRestaurantData",
  async ({ data, id, token }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${serverApi}/api/restaurants/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

// Helper function to handle rejected actions consistently
const handleRejectedAction = (
  state: RestaurantState,
  action: any,
  entityName: string
) => {
  state.status = "failed";

  if (action.payload) {
    state.error = action.payload.message;

    // Handle specific error codes
    if (action.payload.status === 404) {
      state.error = `No ${entityName} found`;
    } else if (action.payload.status === 401 || action.payload.status === 403) {
      state.error = `You don't have permission to access this ${entityName}`;
    }
  } else {
    state.error = action.error.message || `Failed to process ${entityName}`;
  }
};

const restaurantDataSlice = createSlice({
  name: "restaurantData",
  initialState,
  reducers: {
    clearResults: (state) => {
      state.restaurantDatas = [];
      state.restaurantData = DEFAULT_RESTAURANT_DATA;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // createRestaurantData
      .addCase(createRestaurantData.pending, (state) => {
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
        handleRejectedAction(state, action, "restaurant");
      })

      // getRestaurantData
      .addCase(getRestaurantData.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        getRestaurantData.fulfilled,
        (state, action: PayloadAction<RestaurantDataState>) => {
          state.status = "succeeded";
          state.restaurantData = action.payload;
          state.error = null;
        }
      )
      .addCase(getRestaurantData.rejected, (state, action) => {
        handleRejectedAction(state, action, "restaurant");
      })

      // getRestaurantDataByOwnerId
      .addCase(getRestaurantDataByOwnerId.pending, (state) => {
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
        handleRejectedAction(state, action, "restaurant");
      })

      // updateRestaurantData
      .addCase(updateRestaurantData.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        updateRestaurantData.fulfilled,
        (state, action: PayloadAction<RestaurantDataState>) => {
          state.status = "succeeded";
          state.restaurantData = action.payload;
          state.error = null;
        }
      )
      .addCase(updateRestaurantData.rejected, (state, action) => {
        handleRejectedAction(state, action, "restaurant update");
      })

      // getRestaurantsByName
      .addCase(getRestaurantsByName.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        getRestaurantsByName.fulfilled,
        (state, action: PayloadAction<RestaurantDataState[]>) => {
          state.status = "succeeded";
          state.restaurantDatas = action.payload;
          state.error = null;
        }
      )
      .addCase(getRestaurantsByName.rejected, (state, action) => {
        handleRejectedAction(state, action, "restaurants");
        state.restaurantDatas = [];
      });
  },
});

export const { clearResults } = restaurantDataSlice.actions;

export default restaurantDataSlice.reducer;
