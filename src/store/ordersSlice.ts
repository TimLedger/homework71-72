import { createSlice } from "@reduxjs/toolkit";
import { ordersAdd, orderList } from "./ordersThunk";
import {OrdersInBasket} from "../types";

interface OrdersSlice {
  orders: OrdersInBasket[];
  postLoading: boolean;
  getLoading: boolean;
}

const initialState: OrdersSlice = {
  orders: [],
  postLoading: false,
  getLoading: false,
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

    builder.addCase(orderList.pending, (state) => {
      state.getLoading = true;
    });
    builder.addCase(orderList.fulfilled, (state, { payload }) => {
      state.getLoading = false;
      state.orders = payload;
    });
    builder.addCase(orderList.rejected, (state) => {
      state.getLoading = false;
    });
  },
});

export const ordersReducers = orderSlice.reducer;