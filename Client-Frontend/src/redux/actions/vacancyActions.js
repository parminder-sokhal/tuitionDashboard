import axios from "axios";

const server = import.meta.env.VITE_BACKEND_URL;

import {
  vacancyRequest,
  fetchVacanciesSuccess,
  vacancyFail,
  addVacancy,
  updateVacancy,
  getVacancy,
  removeVacancy,
  updateVacancyLiveStatus,
} from "../reducers/vacancySlice";

// Get All Vacancies
export const getAllVacancies = () => async (dispatch) => {
  try {
    dispatch(vacancyRequest());

    const { data } = await axios.get(`${server}/vacancy`);

    dispatch(fetchVacanciesSuccess(data));
  } catch (error) {
    dispatch(
      vacancyFail(error.response?.data?.message || "Failed to fetch vacancies")
    );
  }
};

// Get vacancy by id
export const getVacancyById = (id) => async (dispatch) => {
  try {
    dispatch(vacancyRequest());

    const { data } = await axios.get(`${server}/vacancy/${id}`);

    dispatch(getVacancy(data));
  } catch (error) {
    dispatch(
      vacancyFail(error.response?.data?.message || "Failed to fetch vacancy")
    );
  }
};

// Create a new vacancy
export const createVacancy = (vacancyData) => async (dispatch) => {
  try {
    dispatch(vacancyRequest());

    const { data } = await axios.post(`${server}/vacancy`, vacancyData);

    dispatch(addVacancy(data));
  } catch (error) {
    dispatch(
      vacancyFail(error.response?.data?.message || "Failed to create vacancy")
    );
  }
};

// Update a vacancy
export const updateVacancyById = (id, vacancyData) => async (dispatch) => {
  try {
    dispatch(vacancyRequest());

    const { data } = await axios.put(`${server}/vacancy/${id}`, vacancyData);

    dispatch(updateVacancy(data));
  } catch (error) {
    dispatch(
      vacancyFail(error.response?.data?.message || "Failed to update vacancy")
    );
  }
};

// Delete a vacancy
export const deleteVacancyById = (id) => async (dispatch) => {
  try {
    dispatch(vacancyRequest());

    const { data } = await axios.delete(`${server}/vacancy/${id}`);

    dispatch(removeVacancy(id));
  } catch (error) {
    dispatch(
      vacancyFail(error.response?.data?.message || "Failed to delete vacancy")
    );
  }
};

// Update live status
export const updateVacancyLiveStatusById = (id) => async (dispatch) => {
  try {
    dispatch(vacancyRequest());

    const { data } = await axios.patch(`${server}/vacancy/updatelive/${id}`);

    dispatch(updateVacancyLiveStatus(data));
  } catch (error) {
    dispatch(
      vacancyFail(
        error.response?.data?.message || "Failed to update live status"
      )
    );
  }
};
