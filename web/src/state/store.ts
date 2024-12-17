import { configureStore } from "@reduxjs/toolkit";
import restaurantDataReducer from "@/state/restaurantData/restaurantDataSlice";

export const store = configureStore({
  reducer: {
    restaurantData: restaurantDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
