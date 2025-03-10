import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    cities: [],
    city:{},
    error: null,
};

const citySlice = createSlice({
    name: 'city',
    initialState,
    reducers: {
        cityRequest(state) {
            state.loading = true;
            state.error = null;
        },
        fetchCitiesSuccess(state, action) {
            state.loading = false;
            state.cities = action.payload.cities;
        },
        cityFail(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        getCity(state, action) {
            state.loading = false;
            state.city = action.payload.city;
        },
        addCity(state, action) {
            state.loading = false;
            state.cities.push(action.payload.city);
        },
        updateCity(state, action) {
            state.loading = false;
            const index = state.cities.findIndex(city => city._id === action.payload.city._id);
            if (index !== -1) {
                state.cities[index] = action.payload.city;
            }
        },
        removeCity(state, action) {
            state.loading = false;
            state.cities = state.cities.filter(city => city._id !== action.payload.city._id);
        },
    },
});

export const {
    fetchCitiesSuccess,
    getCity,
    cityRequest,
    cityFail,
    addCity,
    updateCity,
    removeCity,
} = citySlice.actions;

export default citySlice.reducer;