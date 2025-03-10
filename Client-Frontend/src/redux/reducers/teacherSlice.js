import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    teachers: [],
    teacher: {},
    loading: false,
    error: null,
};

const teacherSlice = createSlice({
    name: 'teacher',
    initialState,
    reducers: {
        teacherRequest(state) {
            state.loading = true;
            state.error = null;
        },
        fetchTeachersSuccess(state, action) {
            state.loading = false;
            state.teachers = action.payload.teachers;
        },
        teacherFail(state, action) {
            state.loading = false;
            state.error = action.payload.teacher;
        },
        getTeacher(state, action) {
            state.loading = false;
            state.teacher = action.payload.teacher;
        },
        addTeacher(state, action) {
            state.loading = false;
            state.teachers.push(action.payload.teacher);
        },
        updateTeacher(state, action) {
            state.loading = false;
            const index = state.teachers.findIndex(teacher => teacher._id === action.payload.teacher._id);
            if (index !== -1) {
                state.teachers[index] = action.payload;
            }
        },
        removeTeacher(state, action) {
            state.loading = false;
            state.teachers = state.teachers.filter(teacher => teacher._id !== action.payload.teacher._id);
        }
    },
});

export const {
    fetchTeachersSuccess,
    getTeacher,
    teacherRequest,
    teacherFail,
    addTeacher,
    updateTeacher,
    removeTeacher,
} = teacherSlice.actions;

export default teacherSlice.reducer;