import { Dish, Dishes } from "../types";
import { createSlice } from "@reduxjs/toolkit";
import { dishAdd, dishOne, dishEdit, dishList, dishDelete } from "./dishesThunk";

interface DishesState {
    dishes: Dishes[] | [];
    dish: Dish | null;
    postLoading: boolean;
    getLoading: boolean;
    editLoading: boolean;
    deleteLoading: boolean;
}

const initialState: DishesState = {
    dishes: [],
    dish: null,
    postLoading: false,
    getLoading: false,
    editLoading: false,
    deleteLoading: false,
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

        builder.addCase(dishList.pending, state => {
            state.getLoading = true;
        });
        builder.addCase(dishList.fulfilled, (state, {payload}) => {
            state.getLoading = false;
            state.dishes = payload;
        });
        builder.addCase(dishList.rejected, state => {
            state.getLoading = false;
        });

        builder.addCase(dishDelete.pending, state => {
            state.deleteLoading = true;
        });
        builder.addCase(dishDelete.fulfilled, (state) => {
            state.deleteLoading = false;
        });
        builder.addCase(dishDelete.rejected, state => {
            state.deleteLoading = false;
        });
    },
});

export const dishesReducers = dishesSlice.reducer;
