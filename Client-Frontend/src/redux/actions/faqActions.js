import axios from "axios";

const server = import.meta.env.VITE_BACKEND_URL;

import {
  faqRequest,
  fetchFaqsSuccess,
  faqFail,
  addFaq,
  removeFaq,
  updateFaq,
  toggleFaqLiveStatus,
} from "../reducers/faqSlice";

// Get All FAQs
export const getAllFaqs = () => async (dispatch) => {
  try {
    dispatch(faqRequest());

    const { data } = await axios.get(`${server}/faq`);
    dispatch(fetchFaqsSuccess(data));
  } catch (error) {
    dispatch(faqFail(error.response?.data?.message || "Failed to fetch FAQs"));
  }
};

// Get All Live FAQs
export const getLiveFaqs = () => async (dispatch) => {
  try {
    dispatch(faqRequest());

    const { data } = await axios.get(`${server}/faq/live`);
    dispatch(fetchFaqsSuccess(data));
  } catch (error) {
    dispatch(
      faqFail(error.response?.data?.message || "Failed to fetch live FAQs")
    );
  }
};

// Add a new FAQ
export const createFaq = (faqData) => async (dispatch) => {
  try {
    dispatch(faqRequest());

    const { data } = await axios.post(`${server}/faq`, faqData);
    dispatch(addFaq(data.faq));
  } catch (error) {
    dispatch(faqFail(error.response?.data?.message || "Failed to create FAQ"));
  }
};

// Update FAQ
export const updateFaqAction = (id, faqData) => async (dispatch) => {
  try {
    dispatch(faqRequest());

    const { data } = await axios.put(`${server}/faq/${id}`, faqData);
    dispatch(updateFaq(data.faq));
  } catch (error) {
    dispatch(faqFail(error.response?.data?.message || "Failed to update FAQ"));
  }
};

// Delete FAQ
export const deleteFaq = (id) => async (dispatch) => {
  try {
    dispatch(faqRequest());

    await axios.delete(`${server}/faq/${id}`);
    dispatch(removeFaq(id));
  } catch (error) {
    dispatch(faqFail(error.response?.data?.message || "Failed to delete FAQ"));
  }
};

// Toggle FAQ live status
export const updateFaqLiveStatus = (id) => async (dispatch) => {
  try {
    dispatch(faqRequest());

    const { data } = await axios.patch(`${server}/faq/updatelive/${id}`);
    dispatch(toggleFaqLiveStatus(data.faq));
  } catch (error) {
    dispatch(
      faqFail(
        error.response?.data?.message || "Failed to update FAQ live status"
      )
    );
  }
};
