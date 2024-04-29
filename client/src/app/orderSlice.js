import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: "orders",
    initialState: {
        orders: [],
        isLoading: true,
    },
    reducers: {
        getAllOrders: (state, action) => {
            state.orders = action.payload.map((order) => ({
                id: order._id,
                service_name: order.serviceId.service_name,
                first_name: order.buyerId.first_name,
                last_name: order.buyerId.last_name,
                price: order.price,
                status: order.status,
                images: order.images,
                created_at: order.created_at,
            }));
            state.isLoading = false;
        },
    },
});

export const { getAllOrders } = orderSlice.actions;
export const isLoadingSelector = (state) => state.order.isLoading;
export const ordersSelector = (state) => state.order.orders;
export default orderSlice.reducer;