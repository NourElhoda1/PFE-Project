import { createSlice } from "@reduxjs/toolkit";

const reclamationSlice = createSlice({
  name: "reclamations",
  initialState: {
    reclamations: [],
    isLoading: true,
  },
  reducers: {
    getAllReclamations: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.reclamations = action.payload.map((reclamation) => ({
          id: reclamation?._id,
          name: reclamation?.reclamation_name,
          description: reclamation?.reclamation_description,
          buyer: reclamation?.buyerId?.first_name + " " + reclamation?.buyerId?.last_name,
          service: reclamation?.serviceId?.service_name,
          created_at: reclamation?.created_at,
        }));
      } else {
        // Handle empty payload or non-array payload gracefully
        console.warn("Invalid payload format for getAllReclamations action. Setting reclamations to empty array.");
        state.reclamations = [];
      }
      state.isLoading = false;
    },

    getReclamationById: (state, action) => {
      const reclamation = state.reclamations.find(x => x.id === action.payload);
      state.currentReclamation = reclamation;
    },
  },
});

export const {
  getAllReclamations,
  getReclamationById
} = reclamationSlice.actions;
export const isLoadingSelector = (state) => state.reclamation.isLoading;
export const reclamationsSelector = (state) => state.reclamation.reclamations;
export default reclamationSlice.reducer;
