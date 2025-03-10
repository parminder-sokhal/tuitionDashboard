import React from "react";

const ModalOpenArea = ({
  open,
  handleClose,
  handleSave,
  formData,
  setFormData,
  isEditing,
}) => {
  const handleSubmit = () => {
    handleSave();
  };

  return (
    open && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
          <h2 className="text-2xl mb-4">
            {isEditing ? "Edit Area" : "Add Area"}
          </h2>

          <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-900">
                Area Name</label>
              <input
                className="w-full p-2 border rounded"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Enter area name"
              />
            </div>

            {/* <div>
              <label className="block text-sm font-medium">Status</label>
              <select
                className="w-full p-2 border rounded"
                value={formData.isLive ? "online" : "offline"}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    isLive: e.target.value === "online",
                  })
                }
              >
                <option value="online">Online</option>
                <option value="offline">Offline</option>
              </select>
            </div> */}

            {/* Add other fields here, such as cityId, if needed */}
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
              onClick={handleSave}
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
