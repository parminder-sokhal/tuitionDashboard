import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    areas: [],
    area:{},
    error: null,
};

const areaSlice = createSlice({
    name: 'area',
    initialState,
    reducers: {
        areaReaquest(state) {
            state.loading = true;
            state.error = null;
        },
        fetchAreasSuccess(state, action) {
            state.loading = false;
            state.areas = action.payload.areas;
        },
        areaFail(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        addArea(state, action) {
            state.loading = false;
            state.areas.push(action.payload.area);
        },
        removeArea(state, action) {
            state.loading = false;
            state.areas = state.areas.filter(area => area.id !== action.payload.area._id);
        },
        updateArea(state, action) {
            state.loading = false;
            const index = state.areas.findIndex(area => area._id === action.payload.area._id);
            if (index !== -1) {
                state.areas[index] = action.payload;
            }
        },

        toggleAreaLiveStatus(state, action) {
            const index = state.areas.findIndex(area => area._id === action.payload._id);
            if (index !== -1) {
                state.areas[index].isLive = !state.areas[index].isLive; // Toggle live status
            }
        },
    },
});

export const {
    areaReaquest,
    fetchAreasSuccess,
    areaFail,
    addArea,
    removeArea,
    updateArea,
} = areaSlice.actions;

export default areaSlice.reducer;