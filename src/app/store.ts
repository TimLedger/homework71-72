import { configureStore } from "@reduxjs/toolkit";
import { dishesReducers } from "../store/dishesSlice";

export const store = configureStore({
  reducer: {
    dishes: dishesReducers,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
