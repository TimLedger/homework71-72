import { createAsyncThunk } from "@reduxjs/toolkit";
import { CounterBasket, OrderDish, ApiDish, Dishes, OrdersInBasket } from "../types";
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

export const orderList = createAsyncThunk<OrdersInBasket[], undefined>(
  "orders/list",
  async () => {
    const { data: orders } = await axiosApi<OrderDish>("/orders.json");
    const { data: dishes } = await axiosApi<ApiDish>("/dishes.json");

    if (!orders) return [];

    let newDishes: Dishes[] = [];

    if (dishes) {
      newDishes = Object.keys(dishes).map((key) => {
        return {
          ...dishes[key],
          id: key,
        };
      });
    }

    const ordersDishId = Object.keys(orders).map((key) => {
      return Object.keys(orders[key]);
    });

    const ordersDishAmount = Object.keys(orders).map((key) => {
      return Object.values(orders[key]);
    });

    const dishesId = newDishes.map((item) => {
      return item.id;
    });

    const ordersId = Object.keys(orders);

    const newOrders: OrdersInBasket[] = ordersDishId.map((item, i) => {
      const basketDishes: CounterBasket[] = item.map((id, j) => {
        return {
          ...newDishes[dishesId.findIndex((dishId) => dishId === id)],
          amount: ordersDishAmount[i][j],
        };
      });

      return {
        id: ordersId[i],
        dishes: basketDishes,
      };
    });

    return newOrders;
  },
);
