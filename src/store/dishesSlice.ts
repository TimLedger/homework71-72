import { Dish } from "../types";
import { createSlice } from "@reduxjs/toolkit";
import { dishAdd } from "./dishesThunk";

interface DishesState {
    dish: Dish | null;
    postLoading: boolean;
}

const initialState: DishesState = {
    dish: null,
    postLoading: false,
};

const dishesSlice = createSlice({
    name: "dishes",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(dishAdd.pending, state => {
            state.postLoading = true;
        });
        builder.addCase(dishAdd.fulfilled, state => {
            state.postLoading = false;
        });
        builder.addCase(dishAdd.rejected, state => {
            state.postLoading = false;
        });
    },
});

export const dishesReducers = dishesSlice.reducer;
