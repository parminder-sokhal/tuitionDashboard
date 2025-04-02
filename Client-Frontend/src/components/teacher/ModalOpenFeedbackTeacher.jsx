import React, { useState, useEffect } from "react";
import { Textarea } from "@material-tailwind/react";
import Select from "react-select";
import { useDispatch } from "react-redux";
import {
  createFeedback,
  updateFeedbackAction,
  getAllFeedbacks,
} from "../../redux/actions/feedbackActions.js";
import { useTeacherData } from "../../hook/teacherData.js";

const ModalOpenFeedbackTeacher = ({
  open,
  handleClose,
  handleSave,
  isEditing,
  data,
}) => {
  const { teachers } = useTeacherData();
  const dispatch = useDispatch();

  const [userId, setUserId] = useState("");
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(2);

  // Error handling state
  const [userIdError, setUserIdError] = useState("");
  const [feedbackError, setFeedbackError] = useState("");

  useEffect(() => {
    if (!open) return;

    if (isEditing && data) {
      setUserId(data?.user?._id || "");
      setFeedback(data?.feedback || "");
      setRating(data?.rating || 2);
    } else {
      setUserId("");
      setFeedback("");
      setRating(2);
    }
  }, [open, isEditing, data]);

  // Teacher select change handler
  const handleTeacherChange = (selectedOption) => {
    setUserId(selectedOption ? selectedOption.value : "");
    setUserIdError(""); // Clear the error when user selects a teacher
  };

  // Handle feedback change
  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
    setFeedbackError(""); // Clear the error when user types feedback
  };

  // Form validation
  const validateForm = () => {
    let valid = true;

    if (!userId) {
      setUserIdError("Teacher is required");
      valid = false;
    }

    if (!feedback.trim()) {
      setFeedbackError("Feedback is required");
      valid = false;
    }

    return valid;
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // Stop submission if validation fails

    const formData = {
      userId,
      feedback,
      rating,
    };

    try {
      await dispatch(createFeedback(formData)).then(() => {
        dispatch(getAllFeedbacks());
      });
      handleSave();
    } catch (error) {
      console.error("Error adding feedback:", error);
      alert("Failed to add feedback.");
    }
  };

  // Edit feedback handler
  const handleEditFeedback = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // Stop submission if validation fails

    const formData = {
      userId,
      feedback,
      rating,
    };

    try {
      await dispatch(updateFeedbackAction(data._id, formData)).then(() => {
        dispatch(getAllFeedbacks());
      });
      handleSave();
    } catch (error) {
      console.error("Error updating feedback:", error);
      alert("Failed to update feedback.");
    }
  };

  const teacherOptions = teachers.map((teacher) => ({
    value: teacher._id,
    label: teacher.name,
  }));

  const selectedTeacher = teacherOptions.find(
    (option) => option.value === userId
  );

  return (
    <>
      {open && (
        <div className="modal-overlay fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="modal-content p-6 bg-white rounded-lg max-w-4xl w-full">
            <h2 className="text-2xl mb-4">
              {isEditing ? "Edit Teacher Feedback" : "Add Teacher Feedback"}
            </h2>

            <div className="grid grid-cols-1 gap-4">
              <div className="col-span-1">
                <label className="block text-sm font-medium">Select teacher</label>
                <div className="relative">
                  <Select
                    value={selectedTeacher || null} // Ensure it can be null if no teacher is selected
                    onChange={handleTeacherChange}
                    options={teacherOptions}
                    getOptionLabel={(e) => e.label}
                    getOptionValue={(e) => e.value}
                    className="w-full border rounded-lg text-sm"
                    isClearable={true}
                  />
                  {userIdError && <p className="text-red-500 text-sm">{userIdError}</p>}
                </div>
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium mb-2">Teacher's Feedback</label>
                <textarea
                  value={feedback}
                  onChange={handleFeedbackChange}
                  placeholder="Write your feedback here"
                  className="w-full min-h-[100px] bg-transparent text-blue-gray-700 font-sans font-normal resize-none disabled:bg-blue-gray-50 disabled:border-0 disabled:resize-none disabled:cursor-not-allowed transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                />
                {feedbackError && <p className="text-red-500 text-sm">{feedbackError}</p>}
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
                onClick={isEditing ? handleEditFeedback : handleSubmit}
              >
                {isEditing ? "Save Changes" : "Add Feedback"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalOpenFeedbackTeacher;
