import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import adherentSlice from './adherentSlice';
import categorySlice from './categorySlice';
import subcategorySlice from './subcategorySlice';


export const store = configureStore({
    reducer: {
        user : userReducer,
        adherent : adherentSlice,
        category : categorySlice,
        subcategory : subcategorySlice
    },
});

export default store;
