import { createSlice } from "@reduxjs/toolkit";

const adherentSlice = createSlice({
    name: "adherents",
    initialState: {
        adherents: [],
        isLoading: true,
    },
    reducers: {
        getAllAdherents: (state, action) => {
            state.adherents = action.payload.map((adherent) => ({
                id: adherent._id,
                first_name: adherent.first_name,
                last_name: adherent.last_name,
                email: adherent.email,
                active: adherent.active
            }));
            state.isLoading = false;
    },
},});

export const { getAllAdherents } = adherentSlice.actions;
export const isLoadingSelector = (state) => state.adherent.isLoading;
export const adherentsSelector = (state) => state.adherent.adherents;
export default adherentSlice.reducer