import React, { useState, useEffect } from "react";
import { Input } from "@material-tailwind/react";
import Select from "react-select"; // Import react-select
import { useAreaData } from "../../hook/areaData";
import { useSubjectData } from "../../hook/subjectData";
import { useDispatch } from "react-redux";
import {
  createVacancy,
  updateVacancyById,
  getAllVacancies,
} from "../../redux/actions/vacancyActions.js";

const ModalOpenVacancy = ({
  open,
  handleClose,
  handleSave,
  isEditing,
  data,
}) => {
  const { liveAreas: areas } = useAreaData();
  const { liveSubjects: subjects } = useSubjectData();
  const dispatch = useDispatch();

  const [studentName, setStudentName] = useState("");
  const [selectedSubject, setSelectedSubject] = useState(""); // single subject
  const [areaId, setAreaId] = useState(""); // single area

  // Error handling state
  const [studentNameError, setStudentNameError] = useState("");
  const [subjectError, setSubjectError] = useState("");
  const [areaError, setAreaError] = useState("");

  useEffect(() => {
    if (!open) return;

    if (isEditing && data) {
      setStudentName(data?.studentName || "");
      setSelectedSubject(data?.subject?._id || "");
      setAreaId(data?.area?._id || "");
    } else {
      setStudentName("");
      setSelectedSubject("");
      setAreaId("");
    }
  }, [open, isEditing, data]);

  // Handle student name change and clear error if any
  const handleStudentNameChange = (e) => {
    setStudentName(e.target.value);
    setStudentNameError(""); // Clear the error when the user types
  };

  // Subject and area change handlers
  const handleSubjectChange = (selectedOption) => {
    setSelectedSubject(selectedOption ? selectedOption.value : "");
    setSubjectError(""); // Clear error on subject change
  };

  const handleAreaChange = (selectedOption) => {
    setAreaId(selectedOption ? selectedOption.value : "");
    setAreaError(""); // Clear error on area change
  };

  // Validate form fields
  const validateForm = () => {
    let valid = true;

    if (!studentName.trim()) {
      setStudentNameError("Student Name is required");
      valid = false;
    }

    if (!selectedSubject) {
      setSubjectError("Subject is required");
      valid = false;
    }

    if (!areaId) {
      setAreaError("Area is required");
      valid = false;
    }

    return valid;
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // Stop submission if validation fails

    const data = {
      studentName,
      subjectId: selectedSubject,
      areaId,
    };

    try {
      await dispatch(createVacancy(data)).then(() => {
        dispatch(getAllVacancies());
      });
      handleSave();
    } catch (error) {
      console.error("Error adding vacancy:", error);
      alert("Failed to add vacancy.");
    }
  };

  // Edit handler
  const handleEditVacancy = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // Stop submission if validation fails

    const dataToSend = {
      studentName,
      subjectId: selectedSubject,
      areaId,
    };

    try {
      await dispatch(updateVacancyById(data._id, dataToSend)).then(() => {
        dispatch(getAllVacancies());
      });
      handleSave();
    } catch (error) {
      console.error("Error updating vacancy:", error);
      alert("Failed to update vacancy.");
    }
  };

  // Prepare options for react-select
  const subjectOptions = subjects.map((subject) => ({
    value: subject._id,
    label: subject.name,
  }));

  const areaOptions = areas.map((area) => ({
    value: area._id,
    label: area.name,
  }));

  return (
    <>
      {open && (
        <div className="modal-overlay fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="modal-content p-6 bg-white rounded-lg max-w-4xl w-full">
            <h2 className="text-2xl mb-4">
              {isEditing ? "Edit Vacancy" : "Add Vacancy"}
            </h2>

            <div className="grid grid-cols-1 gap-4">
              <div className="col-span-1">
                <label className="block text-sm font-medium">
                  Student Name
                </label>
                <Input
                  value={studentName}
                  onChange={handleStudentNameChange} // Use this function to clear error
                  placeholder="Enter Student Name"
                />
                {studentNameError && (
                  <p className="text-red-500 text-sm">{studentNameError}</p>
                )}
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium">Subject</label>
                <div className="relative z-10">
                  <Select
                    menuPortalTarget={document.body}
                    menuPosition="fixed"
                    value={subjectOptions.find(
                      (option) => option.value === selectedSubject
                    )}
                    onChange={handleSubjectChange}
                    options={subjectOptions}
                    className="w-full border rounded-lg text-sm"
                    isClearable={true}
                  />
                  {subjectError && (
                    <p className="text-red-500 text-sm">{subjectError}</p>
                  )}
                </div>
              </div>

              {/* Area Selection using react-select */}
              <div className="col-span-1">
                <label className="block text-sm font-medium">Area</label>
                <div className="relative">
                  <Select
                    value={areaOptions.find(
                      (option) => option.value === areaId
                    )}
                    onChange={handleAreaChange}
                    options={areaOptions}
                    className="w-full border rounded-lg text-sm"
                    isClearable={true}
                  />
                  {areaError && (
                    <p className="text-red-500 text-sm">{areaError}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-between">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md"
                onClick={isEditing ? handleEditVacancy : handleSubmit}
              >
                {isEditing ? "Save Changes" : "Add Vacancy"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalOpenVacancy;
