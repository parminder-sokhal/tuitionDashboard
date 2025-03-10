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

} from "../reducers/teacherSlice";

//get All Teachers
export const getAllTeachers = () => async (dispatch) => {
    try {
        dispatch(teacherRequest());

        const { data } = await axios.get(`${server}/getTeachers`);

        dispatch(fetchTeachersSuccess(data));
    } catch (error) {
        return async (dispatch) => {
            dispatch(
                teacherFail(error.response?.data?.message || "Failed to fetch teacher")
            );
        };
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

//create Teacher
export const createTeacher = (teacher) => async (dispatch) => {
    try {
        dispatch(teacherRequest());

        const { data } = await axios.post(`${server}/createTeacher`,
            teacher,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );

        dispatch(addTeacher(data));
    } catch (error) {
        return async (dispatch) => {
            dispatch(
                teacherFail(error.response?.data?.message || "Failed to create teacher")
            );
        };
    }
};

//updae Teacher
export const updateTeacherById = (id, teacher) => async (dispatch) => {
    try {
        dispatch(teacherRequest());

        const { data } = await axios.put(`${server}/updateTeacher/${id}`,
            teacher,
            {
                headers: {
                    "Content-Type": "application/json",
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

        dispatch(removeTeacher({data, id}));
    } catch (error) {
        return async (dispatch) => {
            dispatch(
                teacherFail(error.response?.data?.message || "Failed to delete teacher")
            );
        };
    }
};