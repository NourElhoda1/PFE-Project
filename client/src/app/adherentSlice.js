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
        created_at: adherent.created_at,
        valid_account: adherent.valid_account,
        active: adherent.active
      }));
      state.isLoading = false;
    },

    getAdherentById: (state, action) => {
      const adherent = state.adherents.find(x => x.id === action.payload);
      state.currentAdherent = adherent;
    },

    updateAdherent: (state, action) => {
      const index = state.adherents.findIndex(x => x.id === action.payload.id);
      state.adherents[index] = {
        id: action.payload.id,
        first_name: action.payload.first_name,
        last_name: action.payload.last_name,
        email: action.payload.email,
        password: action.payload.password,
        valid_account: action.payload.valid_account,
        active: action.payload.active
      }
    },
  },
});

export const { 
  getAllAdherents, 
  getAdherentById, 
  updateAdherent 
} = adherentSlice.actions;
export const isLoadingSelector = (state) => state.adherent.isLoading;
export const adherentsSelector = (state) => state.adherent.adherents;
export default adherentSlice.reducer;
