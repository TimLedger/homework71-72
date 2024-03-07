import { createAsyncThunk } from "@reduxjs/toolkit";
import { CounterBasket, OrderDish } from "../types";
import axiosApi from "../axiosApi";

export const ordersAdd = createAsyncThunk<void, CounterBasket[]>(
  "orders/add",
  async (data) => {
    const dishesId = data.map((item) => {
      return item.id;
    });
    const dishesAmount = data.map((item) => {
      return item.amount;
    });
    const order: OrderDish = {};
    dishesId.forEach((every, i) => {
      order[every] = dishesAmount[i];
    });

    await axiosApi.post("/orders.json", order);
  },
);