import React, { useState, useEffect } from "react";

const ModalOpenFaq = ({
  open,
  handleClose,
  handleSave,
  formData,
  setFormData,
  isEditing,
}) => {
  const [questionError, setQuestionError] = useState(""); // Error for question field
  const [answerError, setAnswerError] = useState(""); // Error for answer field

  // Handle input change for question and validate
  const handleQuestionChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, question: value });

    // Set error message if the field is empty
    if (value.trim() === "") {
      setQuestionError("Question is required");
    } else {
      setQuestionError(""); // Clear error if the field is not empty
    }
  };

  // Handle input change for answer and validate
  const handleAnswerChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, answer: value });

    // Set error message if the field is empty
    if (value.trim() === "") {
      setAnswerError("Answer is required");
    } else {
      setAnswerError(""); // Clear error if the field is not empty
    }
  };

  // Submit handler
  const handleSubmit = () => {
    // Check if fields are valid before calling handleSave
    if (formData.question.trim() === "") {
      setQuestionError("Question is required");
    }
    if (formData.answer.trim() === "") {
      setAnswerError("Answer is required");
    }

    // If both fields are valid, call handleSave
    if (formData.question.trim() !== "" && formData.answer.trim() !== "") {
      handleSave();
    }
  };

  useEffect(() => {
    // Reset error messages when modal is opened or formData changes
    setQuestionError("");
    setAnswerError("");
  }, [open, formData]);

  return (
    open && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg w-full max-w-lg">
          <h2 className="text-2xl mb-4">
            {isEditing ? "Edit FAQ" : "Add FAQ"}
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Question
              </label>
              <input
                className={`w-full p-2 border rounded ${
                  questionError ? "border-red-500" : ""
                }`}
                value={formData.question}
                onChange={handleQuestionChange}
                placeholder="Enter question"
              />
              {questionError && (
                <p className="text-red-500 text-sm">{questionError}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900">
                Answer
              </label>
              <textarea
                className={`w-full p-2 border rounded ${
                  answerError ? "border-red-500" : ""
                }`}
                value={formData.answer}
                onChange={handleAnswerChange}
                placeholder="Enter answer"
                rows="4"
              />
              {answerError && (
                <p className="text-red-500 text-sm">{answerError}</p>
              )}
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

export default ModalOpenFaq;
