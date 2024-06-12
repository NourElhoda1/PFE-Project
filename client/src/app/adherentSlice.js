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
        password: adherent.password,
        created_at: adherent.created_at,
        valid_account: adherent.valid_account,
        active: adherent.active,
        number: adherent.number,
        country: adherent.country,
        city: adherent.city,
        last_login: adherent.last_login,
        profile_pic: adherent.profile_pic,
        careerStatus: adherent.careerStatus,
        about: adherent.about,
        resume: adherent.resume,
        education: adherent.education,
        experiences: adherent.experiences,
        skills: adherent.skills,
        languages: adherent.languages,
        projects: adherent.projects,
        
      }));
      state.isLoading = false;
    },

    createAdherent: (state, action) => {
      state.adherents.push(action.payload);
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
        active: action.payload.active,
        number: action.payload.number,
        country: action.payload.country,
        city: action.payload.city
      }
    },

    updateAdherentInfo: (state, action) => {
      const index = state.adherents.findIndex(x => x.id === action.payload.id);
      state.adherents[index] = action.payload;
    },

    updateAdherentAbout: (state, action) => {
      const index = state.adherents.findIndex(x => x.id === action.payload.id);
      state.adherents[index] = action.payload;
    },

    updateAdherentEducation: (state, action) => {
      const index = state.adherents.findIndex(x => x.id === action.payload.id);
      state.adherents[index] = action.payload;
    },

    updateAdherentExperience: (state, action) => {
      const index = state.adherents.findIndex(x => x.id === action.payload.id);
      state.adherents[index] = action.payload;
    },

    updateAdherentPortfolio: (state, action) => {
      const index = state.adherents.findIndex(x => x.id === action.payload.id);
      state.adherents[index] = action.payload;
    },


  },
});

export const { 
  getAllAdherents, 
  createAdherent,
  getAdherentById, 
  updateAdherent ,
  updateAdherentInfo,
  updateAdherentAbout,
  updateAdherentEducation,
  updateAdherentExperience,
  updateAdherentPortfolio
} = adherentSlice.actions;
export const isLoadingSelector = (state) => state.adherent.isLoading;
export const adherentsSelector = (state) => state.adherent.adherents;
export default adherentSlice.reducer;
