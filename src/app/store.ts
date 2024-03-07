import { configureStore } from "@reduxjs/toolkit";
import { dishesReducers } from "../store/dishesSlice";
import { ordersReducers } from "../store/ordersSlice";

export const store = configureStore({
  reducer: {
    dishes: dishesReducers,
    orders: ordersReducers,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
