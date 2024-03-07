import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../axiosApi";
import { Dish, Dishes, ApiDish } from "../types";

export const dishAdd = createAsyncThunk<void, { id: string; data: Dish }>(
    "dish/add",
    async ({id, data}) => {
        await axiosApi.put('/dishes/' + id + '.json', data);
    },
);

export const dishOne = createAsyncThunk<Dish | null, string>(
    "dish/one",
    async (id) => {
        const response = await axiosApi.get('/dishes/' + id + '.json');
        if (response.data) {
            return response.data;
        }

        return null;
    },
);

export const dishEdit = createAsyncThunk<void, { id: string; data: Dish }>(
    "dish/edit",
    async ({ id, data }) => {
        await axiosApi.put('/dishes/' + id + '.json', data);
    },
);

export const dishList = createAsyncThunk<Dishes[], undefined>(
    "dish/list",
    async () => {
        const response = await axiosApi.get<ApiDish | null>('/dishes.json');
        const responseData = response.data;
        let newDish: Dishes[] = [];

        if (responseData) {
            newDish = Object.keys(responseData).map((key) => {
                return {
                    ...responseData[key],
                    id: key,
                };
            });
        }

        return newDish;
    },
);

export const dishDelete = createAsyncThunk(
    "dish/delete",
    async (id: string) => {
        await axiosApi.delete('/dishes/' + id + '.json');
    },
);

