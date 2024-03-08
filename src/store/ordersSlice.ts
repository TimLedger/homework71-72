import { createSlice } from "@reduxjs/toolkit";
import { ordersAdd, orderList, orderDelete } from "./ordersThunk";
import {OrdersInBasket} from "../types";

interface OrdersSlice {
  orders: OrdersInBasket[];
  postLoading: boolean;
  getLoading: boolean;
  deleteLoading: boolean;
}

const initialState: OrdersSlice = {
  orders: [],
  postLoading: false,
  getLoading: false,
  deleteLoading: false,
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

    builder.addCase(orderDelete.pending, (state) => {
      state.deleteLoading = true;
    });
    builder.addCase(orderDelete.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(orderDelete.rejected, (state) => {
      state.deleteLoading = false;
    });
  },
});

export const ordersReducers = orderSlice.reducer;