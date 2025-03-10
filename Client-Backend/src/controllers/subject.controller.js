import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js"

import Subject from "../models/Subject.model.js";

//create Subject
export const createSubject = catchAsyncError(async (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return next(new ErrorHandler(400, "Subject name is required"));
  }

 
    const existingSubject = await Subject.findOne({ name, isdeleted: false });
    if (existingSubject) {
      return next(new ErrorHandler(400, "Subject already exists"));
    }

    const newSubject = await Subject.create({
      name,
    });

    res.status(201).json({
      success: true,
      message: "Subject created successfully",
      subject: newSubject,
    });
});

//get all Subject
export const getAllSubject = catchAsyncError(async (req, res, next) => {
  const subjects = await Subject.find({ isdeleted: false });

  res.status(200).json({
    success: true,
    message: "All Subject Found",
    subjects,
  });
});

// get All live subject
export const getSubjectLiveTrue = catchAsyncError(async (req, res, next) => {
  const subjects = await Subject.find({isLive: true, isdeleted: false });

  res.status(200).json({
    success: true,
    message: "All Live Subject Found",
    subjects,
  });
});

//get Subject by id
export const getSubjectById = catchAsyncError(async (req, res, next) => {

  const { id } = req.params;
  
  const subject = await Subject.findById({ _id: id, isdeleted: false });

  if (!subject) {
    return next(new ErrorHandler(404, "Subject not found"));
  }

  res.status(200).json({
    success: true,
    subject,
  });
});
// update Subject
export const updateSubject = catchAsyncError(async (req, res, next) => {
  const { Id } = req.params;
  const { name } = req.body;

  const subject = await Subject.findById({ _id: Id, isdeleted:false});

  if (!subject) {
    return next(new ErrorHandler(404, "Subject not found"));
  }

  subject.name = name || subject.name;
  // subject.updatedBy = 1;

  await subject.save();

  res.status(200).json({
    success: true,
    message: "Subject updated successfully",
    subject,
  });
});
//delete Subject
export const deleteSubject = catchAsyncError(async (req, res, next) => {
  const { subjectId } = req.params;

  const subject = await Subject.findById({_id:subjectId, isdeleted: false});

  if (!subject) {
    return next(new ErrorHandler(404, "Subject not found"));
  }

  subject.isdeleted = true;
  // subject.deletedBy = 1;
  subject.deletedAt = new Date();

  await subject.save();
  res.status(200).json({
    success: true,
    message: "Subject marked as deleted"
  });
});

//update live status
export const updateLiveStatus = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const subject = await Subject.findOne({_id:id, isdeleted: false});

  if (!subject) return next(new ErrorHandler(404, "Subject not found"));

  subject.isLive = !subject.isLive;
  await subject.save();

  res.status(200).json({
    success: true,
    message: "Subject live status updated",
    subject,
  });
});
