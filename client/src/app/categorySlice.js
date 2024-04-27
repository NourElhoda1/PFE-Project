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

        getCategoryById: (state, action) => {
            const category = state.categories.find(x => x.id === action.payload);
            state.currentCategory = category;
        },

        createCategory: (state, action) => {
            state.categories.push(action.payload);
        },

        updateCategory: (state, action) => {
            const index = state.categories.findIndex(x => x.id === action.payload.id);
            state.categories[index] = {
                id: action.payload.id,
                category_name: action.payload.category_name,
                active: action.payload.active,
            }
        },

        deleteCategorySuccess: (state, action) => {
            state.categories = state.categories.filter(category => category.id !== action.payload);
        },
      
        deleteCategoryFailure: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { 
    getAllCategories, 
    getCategoryById,
    createCategory, 
    updateCategory, 
    deleteCategorySuccess,
    deleteCategoryFailure
} = categorySlice.actions;
export const isLoadingSelector = (state) => state.category.isLoading;
export const categoriesSelector = (state) => state.category.categories;
export default categorySlice.reducer;
