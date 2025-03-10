import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTeachers } from "../redux/actions/teacherAction";

export const useTeacherData = () => {
  const { teachers } = useSelector((state) => state.teacher);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTeachers());
  }, [dispatch]);

  return teachers;
};
