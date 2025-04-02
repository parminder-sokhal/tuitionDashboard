import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  students: [],
  student: {},
  loading: false,
  error: null,
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    studentRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchStudentsSuccess: (state, action) => {
      state.loading = false;
      state.students = action.payload.students;
    },
    studentFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },
    getStudent: (state, action) => {
      state.loading = false;
      state.student = action.payload.student;
    },
    addStudent: (state, action) => {
      state.loading = false;
      state.students.push(action.payload.student);
    },
    updateStudent: (state, action) => {
      state.loading = false;
      const index = state.students.findIndex(
        (student) => student._id === action.payload.student._id
      );
      if (index !== -1) {
        state.students[index] = action.payload.student;
      }
    },
    updateStudentLiveStatus: (state, action) => {
      state.loading = false;
      const index = state.students.findIndex(
        (student) => student._id === action.payload._id
      );
      if (index !== -1) {
        state.students[index] = action.payload; // Update the student with the new isLive status
      }
    },

    removeStudent: (state, action) => {
      state.loading = false;
      state.student = state.student.filter(
        (student) => student._id !== action.payload.student._id
      );
    },
  },
});

export const {
  fetchStudentsSuccess,
  getStudent,
  studentRequest,
  studentFail,
  addStudent,
  updateStudent,
  removeStudent,
  updateStudentLiveStatus,
} = studentSlice.actions;

export default studentSlice.reducer;
