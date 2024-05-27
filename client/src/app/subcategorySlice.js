import { createSlice } from "@reduxjs/toolkit";

const subcategorySlice = createSlice({
  name: "subcategories",
  initialState: {
    subcategories: [],
    isLoading: true,
  },
  reducers: {
    getAllSubcategories: (state, action) => {
      state.subcategories = action.payload.map((subcategory) => {
        console.log(subcategory);
        return {
          id: subcategory._id,
          subcategory_name: subcategory.subcategory_name,
          category_name: subcategory?.categoryId?.category_name,
          active: subcategory.active,
        };
      });
      state.isLoading = false;
    },
    
    getSubcategoryById: (state, action) => {
      const subcategory = state.subcategories.find(
        (x) => x.id === action.payload
      );
      state.currentSubcategory = subcategory;
    },

    createSubcategory: (state, action) => {
      state.subcategories.push(action.payload);
    },

    updateSubcategory: (state, action) => {
      const index = state.subcategories.findIndex(
        (x) => x.id === action.payload.id
      );
      state.subcategories[index] = {
        id: action.payload.id,
        subcategory_name: action.payload.subcategory_name,
        category_name: action.payload.category_name,
        active: action.payload.active,
      };
    },
  },
});
export const { 
  getAllSubcategories,
  getSubcategoryById,
  createSubcategory,
  updateSubcategory
} = subcategorySlice.actions;
export const isLoadingSelector = (state) => state.subcategory.isLoading;
export const subcategoriesSelector = (state) => state.subcategory.subcategories;
export default subcategorySlice.reducer;
