import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../axiosApi";
import { Dish } from "../types";

export const dishAdd = createAsyncThunk<void, Dish>(
    "dish/add",
    async (data) => {
        await axiosApi.post('/dishes.json', data);
    },
);
