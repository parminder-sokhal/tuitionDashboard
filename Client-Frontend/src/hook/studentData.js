import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllStudents,
  createStudent,
  updateStudentById,
  deleteStudentById,
} from "../redux/actions/studentAction";

export const useStudentData = () => {
  const { students } = useSelector((state) => state.student); // Access students from the state
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllStudents()); // Fetch all students when the component mounts
  }, [dispatch]);

  // Add student function
  const addStudent = async (formData) => {
    dispatch(createStudent(formData)); // Dispatch action to create a new student
  };

  // Update student function
  const updateStudent = (id, formData) => {
    dispatch(updateStudentById(id, formData)); // Dispatch action to update student data by id
  };

  // Delete student function
  const deleteStudentHook = (id) => {
    dispatch(deleteStudentById(id)); // Dispatch action to delete a student by id
  };

  return {
    students, // Return the list of students from the Redux state
    addStudent, // Function to add a new student
    updateStudent, // Function to update student data
    deleteStudentHook, // Function to delete a student
  };
};
