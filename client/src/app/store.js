import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import adherentReducer from './adherentSlice';
import categoryReducer from './categorySlice';
import subcategoryReducer from './subcategorySlice';
import serviceReducer from './serviceSlice';
import orderReducer from './orderSlice';
import reclamationReducer from './reclamationSlice';



export const store = configureStore({
    reducer: {
        user : userReducer,
        adherent : adherentReducer,
        category : categoryReducer,
        subcategory : subcategoryReducer,
        service : serviceReducer,
        order : orderReducer,
        reclamation : reclamationReducer
    }
});

export default store;
