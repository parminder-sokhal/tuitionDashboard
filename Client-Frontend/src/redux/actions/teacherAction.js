import axios from "axios";

const server = import.meta.env.VITE_BACKEND_URL;

import {
  teacherRequest,
  fetchTeachersSuccess,
  teacherFail,
  addTeacher,
  removeTeacher,
  updateTeacher,
  getTeacher,
  updateTeacherLiveStatus,
} from "../reducers/teacherSlice";

//get All Teachers
export const getAllTeachers = () => async (dispatch) => {
  try {
    dispatch(teacherRequest());

    const { data } = await axios.get(`${server}/getTeachers`);

    dispatch(fetchTeachersSuccess(data));
  } catch (error) {
    dispatch(
      teacherFail(error.response?.data?.message || "Failed to fetch teachers")
    );
  }
};

//get teacher by id
export const getTeacherById = (id) => async (dispatch) => {
  try {
    dispatch(teacherRequest());

    const { data } = await axios.get(`${server}/getTeacherById/${id}`);

    dispatch(getTeacher(data));
  } catch (error) {
    return async (dispatch) => {
      dispatch(
        teacherFail(error.response?.data?.message || "Failed to fetch teacher")
      );
    };
  }
};

export const createTeacher = (formData) => async (dispatch) => {
  try {
    dispatch(teacherRequest());

    const { data } = await axios.post(`${server}/createTeacher`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });

    dispatch(addTeacher(data));
  } catch (error) {
    dispatch(
      teacherFail(
        error.response?.data?.message ||
          "Failed to create the Teacher. Please try again."
      )
    );
  }
};

//updae Teacher
export const updateTeacherById = (id, formData) => async (dispatch) => {
  try {
    dispatch(teacherRequest());

    const { data } = await axios.put(
      `${server}/updateTeacher/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );

    dispatch(updateTeacher(data));
  } catch (error) {
    return async (dispatch) => {
      dispatch(
        teacherFail(error.response?.data?.message || "Failed to update teacher")
      );
    };
  }
};

//delete Teacher
export const deleteTeacher = (id) => async (dispatch) => {
  try {
    dispatch(teacherRequest());

    await axios.delete(`${server}/deleteTeacher/${id}`);

    dispatch(removeTeacher({ data, id }));
  } catch (error) {
    return async (dispatch) => {
      dispatch(
        teacherFail(error.response?.data?.message || "Failed to delete teacher")
      );
    };
  }
};

export const updateTeacherLiveStatusById = (id) => async (dispatch) => {
  try {
    dispatch(teacherRequest());

    const { data } = await axios.patch(`${server}/teacher/updatelive/${id}`);

    dispatch(updateTeacherLiveStatus(data.teacher));
  } catch (error) {
    dispatch(
      teacherFail(
        error.response?.data?.message || "Failed to update teacher live status"
      )
    );
  }
};
