import { createSlice } from "@reduxjs/toolkit";

const serviceSlice = createSlice({
    name: "services",
    initialState: {
        services: [],
        isLoading: true,
    },
    reducers: {
        getAllServices: (state, action) => {
            state.services = action.payload.map((service) => ({
                id: service._id,
                service_name: service.service_name,
                category_name: service.categoryId.category_name, 
                subcategory_name: service.subcategoryId.subcategory_name, 
                first_name: service.sellerId.first_name,
                last_name: service.sellerId.last_name,
                images: service.images,
                price: service.price,
                short_description: service.short_description,
                long_description: service.long_description,
                created_at: service.created_at,
            }));
            state.isLoading = false;
        },

        getServicesById: (state, action) => {
            const service = state.services.find(x => x.id === action.payload);
            state.currentService = service;
        },
    },
});

export const { 
    getAllServices,
    getServicesById
} = serviceSlice.actions;
export const isLoadingSelector = (state) => state.service.isLoading;
export const servicesSelector = (state) => state.service.services;
export default serviceSlice.reducer;