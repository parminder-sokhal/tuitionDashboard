import axios from "axios";

const server = import.meta.env.VITE_BACKEND_URL;

import {
    subjectRequest,
    fetchSubjectsSuccess,
    subjectFail,
    addSubject,
    removeSubject,
    updateSubject,
    getSubject,
} from "../reducers/subjectslice";

// Get all Subjects
export const getAllSubjects = () => async (dispatch) => {
    try {
        dispatch(subjectRequest());

        const { data } = await axios.get(`${server}/subject`);

        dispatch(fetchSubjectsSuccess(data));
    } catch (error) {
        dispatch(
            subjectFail(error.response?.data?.message || "Failed to fetch subjects")
        );
    }
};

// Get subject by ID
export const getSubjectById = (id) => async (dispatch) => {
    try {
        dispatch(subjectRequest());

        const { data } = await axios.get(`${server}/subject/${id}`);

        dispatch(getSubject(data));
    } catch (error) {
        dispatch(
            subjectFail(error.response?.data?.message || "Failed to fetch subject")
        );
    }
};

// Create Subject
export const createSubject = (subject) => async (dispatch) => {
    try {
        dispatch(subjectRequest());

        const { data } = await axios.post(
            `${server}/subject`,
            subject,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );

        dispatch(addSubject(data));
        dispatch(getAllSubjects());
    } catch (error) {
        dispatch(
            subjectFail(error.response?.data?.message || "Failed to create subject")
        );
    }
};

// Update Subject
export const updateSubjectById = (id, subject) => async (dispatch) => {
    try {
        dispatch(subjectRequest());

        const { data } = await axios.put(
            `${server}/subject/${id}`,
            subject,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );

        dispatch(updateSubject(data));
        dispatch(getAllSubjects());

    } catch (error) {
        dispatch(
            subjectFail(error.response?.data?.message || "Failed to update subject")
        );
    }
};

// Delete Subject
export const deleteSubjectById = (id) => async (dispatch) => {
    try {
        dispatch(subjectRequest());

        await axios.delete(`${server}/subject/${id}`);

        dispatch(removeSubject(id));
    } catch (error) {
        dispatch(
            subjectFail(error.response?.data?.message || "Failed to delete subject")
        );
    }
};

// Update Live Status of Subject
export const updateSubjectLiveStatus = (id) => async (dispatch) => {
    try {
        dispatch(subjectRequest());

        const { data } = await axios.patch(`${server}/subject/updatelive/${id}`);

        // Dispatch an updateSubject action to toggle the isLive property
        dispatch(updateSubject(data.subject));
        dispatch(getAllSubjects());
    } catch (error) {
        dispatch(
            subjectFail(error.response?.data?.message || "Failed to update live status")
        );
    }
};
