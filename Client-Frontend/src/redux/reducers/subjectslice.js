import { createSlice } from "@reduxjs/toolkit";
import { ListVideo } from "lucide-react";

const initialState = {
  subjects: [],
  liveSubjects: [],
  subject: {},
  loading: false,
  error: null,
};
const subjectSlice = createSlice({
  name: "subject",
  initialState,
  reducers: {
    subjectRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSubjectsSuccess(state, action) {
      state.loading = false;
      state.subjects = action.payload.subjects;
    },
    getAllLiveSubjects(state, action) {
      state.loading = false;
      state.liveSubjects = action.payload.subjects;
    },
    subjectFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    getSubject(state, action) {
      state.loading = false;
      state.subject = action.payload;
    },
    addSubject(state, action) {
      state.loading = false;
      state.subjects.push(action.payload);
    },
    updateSubject(state, action) {
      state.loading = false;
      const updatedSubject = action.payload;
      const index = state.subjects.findIndex(
        (subject) => subject._id === updatedSubject._id
      );
      if (index !== -1) {
        state.subjects[index] = updatedSubject;
      }
    },
    removeSubject(state, action) {
      state.loading = false;
      state.subjects = state.subjects.filter(
        (subject) => subject._id !== action.payload
      );
    },
    resetSubjectState(state) {
      state.subject = {};
      state.error = null;
    },
  },
});

export const {
  subjectRequest,
  fetchSubjectsSuccess,
  subjectFail,
  getSubject,
  addSubject,
  updateSubject,
  removeSubject,
  resetSubjectState,
  getAllLiveSubjects,
} = subjectSlice.actions;

export default subjectSlice.reducer;
