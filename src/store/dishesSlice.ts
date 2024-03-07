import { Dish } from "../types";
import { createSlice } from "@reduxjs/toolkit";
import { dishAdd, dishOne, dishEdit } from "./dishesThunk";

interface DishesState {
    dish: Dish | null;
    postLoading: boolean;
    getLoading: boolean;
    editLoading: boolean;
}

const initialState: DishesState = {
    dish: null,
    postLoading: false,
    getLoading: false,
    editLoading: false,
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

        builder.addCase(dishOne.pending, state => {
            state.getLoading = true;
        });
        builder.addCase(dishOne.fulfilled, (state, {payload}) => {
            state.getLoading = false;
            state.dish = payload;
        });
        builder.addCase(dishOne.rejected, state => {
            state.getLoading = false;
        });

        builder.addCase(dishEdit.pending, state => {
            state.editLoading = true;
        });
        builder.addCase(dishEdit.fulfilled, (state) => {
            state.editLoading = false;
        });
        builder.addCase(dishEdit.rejected, state => {
            state.editLoading = false;
        });
    },
});

export const dishesReducers = dishesSlice.reducer;
