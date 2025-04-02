import React, { useState, useEffect } from "react";

const ModalOpenSubject = ({
  open,
  handleClose,
  handleSave,
  formData,
  setFormData,
  isEditing,
}) => {
  const [nameError, setNameError] = useState(""); // State for error message

  // Handle input change and validate field
  const handleNameChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, name: value });

    // Set error message if the field is empty
    if (value.trim() === "") {
      setNameError("Subject name is required");
    } else {
      setNameError(""); // Clear error if the field is not empty
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    if (formData.name.trim() === "") {
      setNameError("Subject name is required"); // Show error if the field is empty
    } else {
      setNameError(""); // Clear error if the field is not empty
      handleSave(); // Save the data if the name is valid
    }
  };

  useEffect(() => {
    // Reset error message when modal is opened or formData changes
    setNameError("");
  }, [open, formData]);

  return (
    open && (
      <div className="modal-overlay fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
        <div className="modal-content p-6 bg-white rounded-lg max-w-lg w-full">
          <h2 className="text-2xl mb-4">
            {isEditing ? "Edit Subject" : "Add New Subject"}
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Subject Name
              </label>
              <input
                className={`w-full p-2 border rounded ${
                  nameError ? "border-red-500" : ""
                }`}
                value={formData.name}
                onChange={handleNameChange}
                placeholder="Enter Subject name"
              />
              {nameError && <p className="text-red-500 text-sm">{nameError}</p>}
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
              onClick={handleSubmit} // Trigger validation and save
            >
              {isEditing ? "Save Changes" : "Add Subject"}
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ModalOpenSubject;
