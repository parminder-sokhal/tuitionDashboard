import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllContactForms } from "../redux/actions/contactAction";

export const useFormsData = () => {
  const { contacts } = useSelector((state) => state.contact);
  const dispatch = useDispatch();
 
  useEffect(() => {
    dispatch(getAllContactForms());
  }, [dispatch]);

  return contacts;
};