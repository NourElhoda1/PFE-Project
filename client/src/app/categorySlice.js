import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
    name: "categories",
    initialState: {
        categories: [],
        isLoading: true,
    },
    reducers: {
        getAllCategories: (state, action) => {
            state.categories = action.payload.map((category) => ({
                id: category._id, 
                category_name: category.category_name,
                active: category.active
            }));
            state.isLoading = false;
        },
        createCategory: (state, action) => {
            state.categories.push(action.payload);
        }
    },
});

export const { getAllCategories, createCategory } = categorySlice.actions;
export const isLoadingSelector = (state) => state.category.isLoading;
export const categoriesSelector = (state) => state.category.categories;
export default categorySlice.reducer;
