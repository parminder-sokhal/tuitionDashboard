import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  feedbacks: [], // Stores all feedbacks
  feedback: {}, // Stores a single feedback when fetched by ID
  error: null,
};

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    feedbackRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchFeedbacksSuccess(state, action) {
      state.loading = false;
      state.feedbacks = action.payload.feedbacks;
    },
    feedbackFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addFeedback(state, action) {
      state.loading = false;
      state.feedbacks.push(action.payload); // Add the new feedback to the array
    },
    removeFeedback(state, action) {
      state.loading = false;
      state.feedbacks = state.feedbacks.filter(
        (feedback) => feedback._id !== action.payload
      ); // Remove the feedback by ID
    },
    updateFeedback(state, action) {
      state.loading = false;
      const index = state.feedbacks.findIndex(
        (feedback) => feedback._id === action.payload._id
      );
      if (index !== -1) {
        state.feedbacks[index] = action.payload; // Update the feedback in the array
      }
    },
    toggleFeedbackLiveStatus(state, action) {
      const index = state.feedbacks.findIndex(
        (feedback) => feedback._id === action.payload._id
      );
      if (index !== -1) {
        state.feedbacks[index].isLive = !state.feedbacks[index].isLive; // Toggle the live status
      }
    },
    setFeedback(state, action) {
      state.loading = false;
      state.feedback = action.payload; // Set the single feedback
    },
  },
});

export const {
  feedbackRequest,
  fetchFeedbacksSuccess,
  feedbackFail,
  addFeedback,
  removeFeedback,
  updateFeedback,
  toggleFeedbackLiveStatus,
  setFeedback,
} = feedbackSlice.actions;

export default feedbackSlice.reducer;
