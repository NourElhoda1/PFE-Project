import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import adherentSlice from './adherentSlice';
import categorySlice from './categorySlice';
import serviceSlice from './serviceSlice';
import orderSlice from './orderSlice';
import reclamationSlice from './reclamationSlice';



export const store = configureStore({
    reducer: {
        user : userReducer,
        adherent : adherentSlice,
        category : categorySlice,
        service : serviceSlice,
        order : orderSlice,
        reclamation : reclamationSlice
    }
});

export default store;
