import React from "react";

const ModalOpenForm = ({
  open,
  handleClose,
  handleSave,
  formData,
  setFormData,
  isEditing,
}) => {
  // CSS styles for modal positioning
  const styles = `
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .modal-content {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      width: 90%;
      max-width: 500px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
  `;

  const handleSubmit = () => {
    handleSave();
  };

  return (
    <>
      <style>{styles}</style>
      {open && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="text-2xl mb-4">
              {isEditing ? "Edit Form" : "Add Form"}
            </h2>

            <div className="space-y-4">
              <div>
                <label>Name</label>
                <input
                  className="w-full p-2 border rounded"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div>
                <label>Email</label>
                <input
                  className="w-full p-2 border rounded"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div>
                <label>Phone Number</label>
                <input
                  className="w-full p-2 border rounded"
                  value={formData.number}
                  onChange={(e) =>
                    setFormData({ ...formData, number: e.target.value })
                  }
                />
              </div>

              <div>
                <label>Whatsapp Number</label>
                <input
                  className="w-full p-2 border rounded"
                  value={formData.whatsappNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, whatsappNumber: e.target.value })
                  }
                />
              </div>

              <div>
                <label>Class</label>
                <input
                  className="w-full p-2 border rounded"
                  value={formData.class}
                  onChange={(e) =>
                    setFormData({ ...formData, class: e.target.value })
                  }
                />
              </div>

              <div>
                <label>Subject List (comma separated)</label>
                <input
                  className="w-full p-2 border rounded"
                  value={formData.subjectList.join(", ")}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      subjectList: e.target.value.split(","),
                    })
                  }
                />
              </div>

              <div>
                <label>Timeslot</label>
                <input
                  className="w-full p-2 border rounded"
                  value={formData.timeslot}
                  onChange={(e) =>
                    setFormData({ ...formData, timeslot: e.target.value })
                  }
                />
              </div>

              <div>
                <label>Fee Range</label>
                <input
                  className="w-full p-2 border rounded"
                  value={formData.feeRange}
                  onChange={(e) =>
                    setFormData({ ...formData, feeRange: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
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
      )}
    </>
  );
};

export default ModalOpenForm;
