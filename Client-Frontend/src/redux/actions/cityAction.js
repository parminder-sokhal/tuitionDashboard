import axios from "axios";

const server = import.meta.env.VITE_BACKEND_URL;

import {
    cityRequest,
    fetchCitiesSuccess,
    cityFail,
    addCity,
    removeCity,
    updateCity,
    getCity,

} from "../reducers/citySlice";

//get All Cities
export const getAllCities = () => async (dispatch) => {
    try {
        dispatch(cityRequest());

        const { data } = await axios.get(`${server}/getAllCities`);

        dispatch(fetchCitiesSuccess(data));
    } catch (error) {
        return async (dispatch) => {
            dispatch(
                cityFail(error.response?.data?.message || "Failed to fetch city")
            );
        };
    }
};

//get city by id
export const getCityById = (id) => async (dispatch) => {
    try {
        dispatch(cityRequest());

        const { data } = await axios.get(`${server}/city/${id}`);

        dispatch(getCity(data));
    } catch (error) {
        return async (dispatch) => {
            dispatch(
                cityFail(error.response?.data?.message || "Failed to fetch city")
            );
        };
    }
};

//create City
export const createCity = (AreaId,name) => async (dispatch) => {
    try {
        dispatch(cityRequest());

        const { data } = await axios.post(`${server}/createCity/${AreaId}`,
            name,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );

        dispatch(addCity(data));
    } catch (error) {
        return async (dispatch) => {
            dispatch(
                cityFail(error.response?.data?.message || "Failed to create city")
            );
        };
    }
};

//update City
export const editCity = (cityId , name) => async (dispatch) => {
    try {
        dispatch(cityRequest());

        const { data } = await axios.put(`${server}/updateCity/${cityId}`,
            name,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );

        dispatch(updateCity(data));
    } catch (error) {
        return async (dispatch) => {
            dispatch(
                cityFail(error.response?.data?.message || "Failed to update city")
            );
        };
    }
};

//delete City
export const deleteCity = (cityId ) => async (dispatch) => {
    try {
        dispatch(cityRequest());

        const {data} = await axios.delete(`${server}/deleteCity/${cityId}`, {
            withCredentials: true,
        });

        dispatch(removeCity(id, data));
    } catch (error) {
        return async (dispatch) => {
            dispatch(
                cityFail(error.response?.data?.message || "Failed to delete city")
            );
        };
    }
};