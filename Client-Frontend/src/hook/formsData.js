import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllContactForms,
  deleteContact,
} from "../redux/actions/contactAction";

export const useFormsData = () => {
  const { contacts } = useSelector((state) => state.contact);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllContactForms());
  }, [dispatch]);

  const deleteAreaById = (id, deletedForm) => {
    dispatch(deleteContact(id, deletedForm));
  };

  return { contacts, deleteAreaById };
};
