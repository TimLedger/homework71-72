import { createSlice } from "@reduxjs/toolkit";
import { ordersAdd } from "./ordersThunk";
import {OrdersInBasket} from "../types";

interface OrdersSlice {
  orders: OrdersInBasket[];
  postLoading: boolean;
}

const initialState: OrdersSlice = {
  orders: [],
  postLoading: false,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(ordersAdd.pending, (state) => {
      state.postLoading = true;
    });
    builder.addCase(ordersAdd.fulfilled, (state) => {
      state.postLoading = false;
    });
    builder.addCase(ordersAdd.rejected, (state) => {
      state.postLoading = false;
    });
  },
});

export const ordersReducers = orderSlice.reducer;