import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  vacancies: [],
  vacancy: {},
  loading: false,
  error: null,
};

const vacancySlice = createSlice({
  name: "vacancy",
  initialState,
  reducers: {
    vacancyRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchVacanciesSuccess: (state, action) => {
      state.loading = false;
      state.vacancies = action.payload.vacancies;
    },
    vacancyFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    getVacancy: (state, action) => {
      state.loading = false;
      state.vacancy = action.payload.vacancy;
    },
    addVacancy: (state, action) => {
      state.loading = false;
      state.vacancies.push(action.payload.vacancy);
    },
    updateVacancy: (state, action) => {
      state.loading = false;
      const index = state.vacancies.findIndex(
        (vacancy) => vacancy._id === action.payload.vacancy._id
      );
      if (index !== -1) {
        state.vacancies[index] = action.payload.vacancy;
      }
    },
    updateVacancyLiveStatus: (state, action) => {
      state.loading = false;
      const index = state.vacancies.findIndex(
        (vacancy) => vacancy._id === action.payload.vacancy._id
      );
      if (index !== -1) {
        state.vacancies[index] = action.payload.vacancy;
      }
    },
    removeVacancy: (state, action) => {
      state.loading = false;
      state.vacancies = state.vacancies.filter(
        (vacancy) => vacancy._id !== action.payload
      );
    },
  },
});

export const {
  vacancyRequest,
  fetchVacanciesSuccess,
  vacancyFail,
  addVacancy,
  updateVacancy,
  getVacancy,
  removeVacancy,
  updateVacancyLiveStatus,
} = vacancySlice.actions;

export default vacancySlice.reducer;
