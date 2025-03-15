import { configureStore } from "@reduxjs/toolkit";

import restaurantDataReducer from "@/state/restaurantData/restaurantDataSlice";
import courseReducer from "@/state/course/courseSlice";
import cuisineReducer from "@/state/cuisine/cuisineSlice";
import allergenReducer from "@/state/allergen/allergenSlice";
import foodCatalogueReducer from "@/state/foodCatalogueData/foodCatalogueSlice";
import restaurantAccessReducer from "@/state/restaurantAccess/restaurantAccessSlice";

import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";

const createNoopStorage = () => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: string) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  restaurantData: restaurantDataReducer,
  restaurantAccess: restaurantAccessReducer,
  course: courseReducer,
  cuisine: cuisineReducer,
  allergen: allergenReducer,
  foodCatalogue: foodCatalogueReducer,
});
const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
