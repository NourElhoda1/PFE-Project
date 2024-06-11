import { createSlice } from "@reduxjs/toolkit";

const serviceSlice = createSlice({
  name: "service",
  initialState: {
    services: [],
    isLoading: true,
  },
  reducers: {
    getAllServices: (state, action) => {
      state.services = action.payload.map((service) => ({
        id: service._id,
        service_name: service.service_name,
        category_name: service.categoryId?.category_name || "N/A",
        subcategory_name: service.subcategoryId?.subcategory_name || "N/A",
        first_name: service.sellerId?.first_name || "N/A",
        last_name: service.sellerId?.last_name || "N/A",
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

    getServiceBySellerId: (state, action) => {
      state.services = action.payload;
    },

    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    addService: (state, action) => {
      state.services.push(action.payload);
    },
  },
});

export const {
  getAllServices,
  getServicesById,
  getServiceBySellerId,
  addService,
  setLoading
} = serviceSlice.actions;

export const isLoadingSelector = (state) => state.service.isLoading;
export const servicesSelector = (state) => state.service.services;

export default serviceSlice.reducer;