import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js"

import Feedback from "../models/Feedback.model.js";
import Teacher from "../models/Teacher.model.js";
import Student from "../models/Student.model.js";

//create feedback
export const createFeedback = catchAsyncError(async (req, res, next) => {
  const { userId, feedback, rating } = req.body;

  // Identify if userId belongs to Teacher or Student
  const isTeacher = await Teacher.findById(userId);
  const isStudent = await Student.findById(userId);

  if (!isTeacher && !isStudent) {
    return next(new ErrorHandler(400, "Invalid user ID" ));
  }

  const userType = isTeacher ? "Teacher" : "Student";

  //2nd method
  // let userType = "";

  // if (isTeacher) {
  //   userType = "Teacher";
  // } else if (isStudent) {
  //   userType = "Student";
  // } else {
  //   return next(new ErrorHandler(400, "Invalid user ID"));
  // }

  // Save feedback
  const newFeedback = new Feedback({
    user: userId,
    userType,
    feedback,
    rating,
  });

  await newFeedback.save();
  res.status(201).json({
    success: true,
    message: "Feedback submitted successfully",
    feedback: newFeedback,
  });
});
//get all feedbacks
export const getAllFeedbacks = catchAsyncError(async (req, res, next) => {
  const feedbacks = await Feedback.find({ isdeleted:false }).sort({ createdAt: -1})
  .populate("user")
  ;
  res.status(200).json({
    success: true,
    message:"All Feedback Fetch Successfull",
    feedbacks,
  });
});

//get All Live Feedbacks
export const getAllLiveFeedbacks = catchAsyncError(async (req, res, next) => {

  const feedbacks = await Feedback.find({ isdeleted:false, isLive:true }).sort({ createdAt: -1})
  .populate("user")
  ;
  res.status(200).json({
    success: true,
    message:"All Live Feedback Fetch Successfull",
    feedbacks,
  });
});

//get feedback by id
export const getByIdFeedback = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  // Find feedback and populate user details
  const feedbacks = await Feedback.findOne({ _id: id, isdeleted:false }).populate("user");

  if (!feedbacks) {
    return next(new ErrorHandler(404, "Feedback not found" ));
  }

  res.status(200).json({
    success: true,
    message: "Feedbacks fetched successfully",
    feedbacks,
  });
});


//update feedback
export const updateFeedback = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { feedback, rating } = req.body;

  const updatedFeedback = await Feedback.findByIdAndUpdate(
    {_id:id, isdeleted:false },
    { feedback, rating },
    { new: true }
  );

  if (!updatedFeedback) {
    return next(new ErrorHandler(404,"Feedback not found" ));
  }

  res.status(200).json({
    success: true,
    message: "Feedback updated successfully",
    feedback: updatedFeedback,
  });
});

//delete feedback
export const deleteFeedback = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const deletedFeedback = await Feedback.findByIdAndUpdate(
    id,
    { isdeleted: true },
    { new: true }
  );

  if (!deletedFeedback) {
    return next(new ErrorHandler(404, "Feedback not found" ));
  }

  res.status(200).json({
    success: true,
    message: "Feedback deleted successfully",
    feedback: deletedFeedback,
  });
});

//update live status
export const updateLiveStatus = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  // Use findOne instead of find to get a single document
  const feedback = await Feedback.findOne({ _id: id, isdeleted: false });

  if (!feedback) {
    return next(new ErrorHandler(404, "Feedback not found" ));
  }

  // Toggle isLive
  feedback.isLive = !feedback.isLive;

  // Save the updated document
  await feedback.save();

  res.status(200).json({
    success: true,
    message: "Live status updated successfully",
    feedback,
  });
});
