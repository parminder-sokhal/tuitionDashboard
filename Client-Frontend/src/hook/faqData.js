import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllFaqs,
  createFaq,
  updateFaqAction,
  deleteFaq,
  updateFaqLiveStatus,
} from "../redux/actions/faqActions";

export const useFaqData = () => {
  const { faqs } = useSelector((state) => state.faq);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllFaqs());
  }, [dispatch]);

  const addFaq = (newFaq) => {
    dispatch(createFaq(newFaq));
  };

  const updateFaqById = (id, updatedFaq) => {
    dispatch(updateFaqAction(id, updatedFaq));
  };

  const deleteFaqById = (id) => {
    dispatch(deleteFaq(id));
  };

  const toggleLiveStatus = (id) => {
    dispatch(updateFaqLiveStatus(id));
  };

  return { faqs, addFaq, updateFaqById, deleteFaqById, toggleLiveStatus };
};
