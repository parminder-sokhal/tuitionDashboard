import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAreas,createArea,editArea,deleteArea,toggleAreaLiveStatus } from "../redux/actions/areaAction";

export const useAreaData = () => {
  const { areas } = useSelector((state) => state.area);
  const dispatch = useDispatch();
 
  useEffect(() => {
    dispatch(getAreas());
  }, [dispatch]);

  const addArea = (newArea) => {
      dispatch(createArea(newArea));
    };
  
    const updateAreaById = (id, updatedArea) => {
      dispatch(editArea(id, updatedArea));
    };
    const deleteAreaById = (id, deletedArea) => {
      dispatch(deleteArea(id, deletedArea));
    };

    const toggleLiveStatus = (id) => {
      dispatch(toggleAreaLiveStatus(id));
    };

  return {areas, addArea, updateAreaById, deleteAreaById, toggleLiveStatus};
};