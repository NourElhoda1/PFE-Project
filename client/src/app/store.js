import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import adherentSlice from './adherentSlice';
import categorySlice from './categorySlice';



export const store = configureStore({
    reducer: {
        user : userReducer,
        adherent : adherentSlice,
        category : categorySlice
    },
});

export default store;
