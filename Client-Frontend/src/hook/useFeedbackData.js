import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllFeedbacks,
  createFeedback,
  updateFeedbackAction,
  deleteFeedback,
  updateFeedbackLiveStatus,
} from "../redux/actions/feedbackActions";

export const useFeedbackData = () => {
  const { feedbacks } = useSelector((state) => state.feedback);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllFeedbacks());
  }, [dispatch]);

  const addFeedback = (newFeedback) => {
    dispatch(createFeedback(newFeedback));
  };

  const updateFeedbackById = (id, updatedFeedback) => {
    dispatch(updateFeedbackAction(id, updatedFeedback));
  };

  const deleteFeedbackById = (id) => {
    dispatch(deleteFeedback(id));
  };

  const toggleLiveStatus = (id) => {
    dispatch(updateFeedbackLiveStatus(id));
  };

  return {
    feedbacks,
    addFeedback,
    updateFeedbackById,
    deleteFeedbackById,
    toggleLiveStatus,
  };
};
