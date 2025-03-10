import axios from "axios";

const server = import.meta.env.VITE_BACKEND_URL;

import {
  areaReaquest,
  fetchAreasSuccess,
  areaFail,
  addArea,
  removeArea,
  updateArea,
} from "../reducers/areaSlice";

//Get All Areas
export const getAreas = () => async (dispatch) => {
  try {
    dispatch(areaReaquest());

    const { data } = await axios.get(`${server}/getAreas`);

    dispatch(fetchAreasSuccess(data));
  } catch (error) {
    return async (dispatch) => {
      dispatch(
        areaFail(error.response?.data?.message || "Failed to fetch area")
      );
    };
  }
};

//create Area
export const createArea = (name) => async (dispatch) => {
  try {
    dispatch(areaReaquest());

    const { data } = await axios.post(`${server}/createArea`, 
        name,
        {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
        }
    );

    dispatch(addArea(data));
    dispatch(getAreas());
  } catch (error) {
    return async (dispatch) => {
      dispatch(
        areaFail(error.response?.data?.message || "Failed to create area")
      );
    };
  }
};

//update Area
export const editArea = (id, name) => async (dispatch) => {
  try {
    dispatch(areaReaquest());

    const { data } = await axios.put(`${server}/updateArea/${id}`,
        name,
        {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
        }
    );

    dispatch(updateArea(data));
    dispatch(getAreas());

  } catch (error) {
    return async (dispatch) => {
      dispatch(
        areaFail(error.response?.data?.message || "Failed to update area")
      );
    };
  }
};

// delete Area
export const deleteArea = (id) => async (dispatch) => {
  try {
    dispatch(areaReaquest());

    const {data} = await axios.delete(`${server}/deleteArea/${id}`, {
        withCredentials: true,
    });

    dispatch(removeArea(id, data));
  } catch (error) {
    return async (dispatch) => {
      dispatch(
        areaFail(error.response?.data?.message || "Failed to delete area")
      );
    };
  }
};


export const toggleAreaLiveStatus = (id) => async (dispatch) => {
  try {
    dispatch(areaReaquest());

    const { data } = await axios.patch(`${server}/updateLiveStatus/area/${id}`);

    dispatch(updateArea(data)); // Directly use 'data' if it's the area

    dispatch(getAreas());

  } catch (error) {
    dispatch(
      areaFail(error.response?.data?.message || 'Error updating area live status')
    );
  }
};

