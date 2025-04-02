import axios from "axios";

const server = import.meta.env.VITE_BACKEND_URL;

import {
  feedbackRequest,
  fetchFeedbacksSuccess,
  feedbackFail,
  addFeedback,
  removeFeedback,
  updateFeedback,
  toggleFeedbackLiveStatus,
  setFeedback,
} from "../reducers/feedbackSlice";

// Get All Feedbacks
export const getAllFeedbacks = () => async (dispatch) => {
  try {
    dispatch(feedbackRequest());

    const { data } = await axios.get(`${server}/feedback`);
    dispatch(fetchFeedbacksSuccess(data));
  } catch (error) {
    dispatch(
      feedbackFail(error.response?.data?.message || "Failed to fetch feedbacks")
    );
  }
};

// Get All Live Feedbacks
export const getLiveFeedbacks = () => async (dispatch) => {
  try {
    dispatch(feedbackRequest());

    const { data } = await axios.get(`${server}/feedback/live`);
    dispatch(fetchFeedbacksSuccess(data));
  } catch (error) {
    dispatch(
      feedbackFail(
        error.response?.data?.message || "Failed to fetch live feedbacks"
      )
    );
  }
};

// Get Feedback by ID
export const getFeedbackById = (id) => async (dispatch) => {
  try {
    dispatch(feedbackRequest());

    const { data } = await axios.get(`${server}/feedback/${id}`);
    dispatch(setFeedback(data.feedbacks));
  } catch (error) {
    dispatch(
      feedbackFail(
        error.response?.data?.message || "Failed to fetch feedback by ID"
      )
    );
  }
};

// Create a new Feedback
export const createFeedback = (feedbackData) => async (dispatch) => {
  try {
    dispatch(feedbackRequest());

    const { data } = await axios.post(`${server}/feedback`, feedbackData);
    dispatch(addFeedback(data.feedback));
  } catch (error) {
    dispatch(
      feedbackFail(error.response?.data?.message || "Failed to create feedback")
    );
  }
};

// Update Feedback
export const updateFeedbackAction = (id, feedbackData) => async (dispatch) => {
  try {
    dispatch(feedbackRequest());

    const { data } = await axios.put(`${server}/feedback/${id}`, feedbackData);
    dispatch(updateFeedback(data.feedback));
  } catch (error) {
    dispatch(
      feedbackFail(error.response?.data?.message || "Failed to update feedback")
    );
  }
};

// Delete Feedback
export const deleteFeedback = (id) => async (dispatch) => {
  try {
    dispatch(feedbackRequest());

    await axios.delete(`${server}/feedback/${id}`);
    dispatch(removeFeedback(id));
  } catch (error) {
    dispatch(
      feedbackFail(error.response?.data?.message || "Failed to delete feedback")
    );
  }
};

// Toggle Feedback live status
export const updateFeedbackLiveStatus = (id) => async (dispatch) => {
  try {
    dispatch(feedbackRequest());

    const { data } = await axios.patch(`${server}/feedback/updatelive/${id}`);
    dispatch(toggleFeedbackLiveStatus(data.feedback));
  } catch (error) {
    dispatch(
      feedbackFail(
        error.response?.data?.message || "Failed to update feedback live status"
      )
    );
  }
};
