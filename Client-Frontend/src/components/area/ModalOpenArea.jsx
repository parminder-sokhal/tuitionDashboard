import React, { useState, useEffect } from "react";

const ModalOpenArea = ({
  open,
  handleClose,
  handleSave,
  formData,
  setFormData,
  isEditing,
}) => {
  const [nameError, setNameError] = useState("");

  const handleNameChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, name: value });

    if (value.trim() === "") {
      setNameError("Area name is required");
    } else {
      setNameError("");
    }
  };

  const handleSubmit = () => {
    if (formData.name.trim() === "") {
      setNameError("Area name is required");
    } else {
      setNameError("");
    }
    handleSave();
  };

  useEffect(() => {
    setNameError("");
  }, [open, formData]);

  return (
    open && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg w-full max-w-lg">
          <h2 className="text-2xl mb-4">
            {isEditing ? "Edit Area" : "Add Area"}
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Area Name
              </label>
              <input
                className={`w-full p-2 border rounded ${
                  nameError ? "border-red-500" : ""
                }`}
                value={formData.name}
                onChange={handleNameChange}
                placeholder="Enter area name"
              />
              {nameError && <p className="text-red-500 text-sm">{nameError}</p>}
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <button
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={handleSubmit}
            >
              {isEditing ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ModalOpenArea;
