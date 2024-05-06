import { createSlice } from "@reduxjs/toolkit";

const subcategorySlice = createSlice({
  name: "subcategories",
  initialState: {
    subcategories: [],
    isLoading: true,
  },
  reducers: {
    getAllSubcategories: (state, action) => {
      state.subcategories = action.payload.map((subcategory) => ({
        id: subcategory._id,
        subcategory_name: subcategory.subcategory_name,
        categoryId: subcategory.category_id
          ? subcategory.category_id
          : subcategory.categoryId._id,
        active: subcategory.active,
      }));
      state.isLoading = false;
    },
  },
});
export const { getAllSubcategories } = subcategorySlice.actions;
export const isLoadingSelector = (state) => state.subcategory.isLoading;
export const subcategoriesSelector = (state) => state.subcategory.subcategories;
export default subcategorySlice.reducer;
