import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  faqs: [], 
  faq: {}, 
  error: null,
};

const faqSlice = createSlice({
  name: "faq",
  initialState,
  reducers: {
    faqRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchFaqsSuccess(state, action) {
      state.loading = false;
      state.faqs = action.payload.faqs;
    },
    faqFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addFaq(state, action) {
      state.loading = false;
      state.faqs.push(action.payload); 
    },
    removeFaq(state, action) {
      state.loading = false;
      state.faqs = state.faqs.filter((faq) => faq._id !== action.payload); // Remove the FAQ by ID
    },
    updateFaq(state, action) {
      state.loading = false;
      const index = state.faqs.findIndex(
        (faq) => faq._id === action.payload._id
      );
      if (index !== -1) {
        state.faqs[index] = action.payload; 
      }
    },
    toggleFaqLiveStatus(state, action) {
      const index = state.faqs.findIndex(
        (faq) => faq._id === action.payload._id
      );
      if (index !== -1) {
        state.faqs[index].isLive = !state.faqs[index].isLive; 
      }
    },
  },
});

export const {
  faqRequest,
  fetchFaqsSuccess,
  faqFail,
  addFaq,
  removeFaq,
  updateFaq,
  toggleFaqLiveStatus,
} = faqSlice.actions;

export default faqSlice.reducer;
