import React, { useState, useEffect } from "react";

const ModalOpenTeacher = ({
  open,
  handleClose,
  handleSave,
  formData,
  setFormData,
  isEditing,
}) => {
  const [subjectsInput, setSubjectsInput] = useState(formData.subject || "");

  const areas = ["chandigarh", "delhi", "mumbai", "pune"];

  const handleSubjectChange = (e) => {
    setSubjectsInput(e.target.value); // Update the local state for subjects input
  };

  const handleSubmit = () => {
    setFormData({
      ...formData,
      subject: subjectsInput.split(",").map((sub) => sub.trim()),
    });
    handleSave();
  };

  useEffect(() => {
    setSubjectsInput(formData.subject ? formData.subject.join(", ") : "");
  }, [formData.subject]);

  return (
    <>
      {open && (
        <div className="modal-overlay">
          <div className="modal-content fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 bg-white rounded-lg shadow-lg max-h-[80vh] w-full sm:w-4/5 md:w-2/3 overflow-auto">
            <h2 className="text-2xl mb-4">
              {isEditing ? "Edit Teacher" : "Add Teacher"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  type="email"
                  className="w-full p-2 border rounded"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div>
                <label>Mobile No</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>

              <div>
                <label>About Us</label>
                <textarea
                  className="w-full p-2 border rounded"
                  value={formData.aboutUs}
                  onChange={(e) =>
                    setFormData({ ...formData, aboutUs: e.target.value })
                  }
                />
              </div>

              <div>
                <label>Area</label>
                <select
                  className="w-full p-2 border rounded"
                  value={formData.area || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, area: e.target.value })
                  }
                >
                  <option value="">Select Area</option>
                  {areas.map((area, index) => (
                    <option key={index} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label>Subjects</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={subjectsInput}
                  onChange={handleSubjectChange}
                  placeholder="Enter subjects separated by commas (e.g., Math, Physics)"
                />
              </div>

              <div>
                <label>Charge Rate</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded"
                  value={formData.chargeRate}
                  onChange={(e) =>
                    setFormData({ ...formData, chargeRate: e.target.value })
                  }
                />
              </div>

              <div>
                <label>Image URL</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
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

export default ModalOpenTeacher;
