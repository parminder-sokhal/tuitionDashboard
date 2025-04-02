import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";

import Vacancy from "../models/Vacancy.model.js";

// create Vacancy
export const createVacancy = catchAsyncError(async (req, res, next) => {
  const { studentName, areaId, subjectId } = req.body;

  // Check if studentName already exists
//   const existingVacancy = await Vacancy.findOne({ studentName, isdeleted: false });
//   if (existingVacancy) {
//     return next(new ErrorHandler(400, "Student Name already exists"));
//   }

  // Create new vacancy
  const newVacancy = new Vacancy({
    studentName,
    area: areaId,
    subject: subjectId,
  });

  await newVacancy.save();

  res.status(201).json({
    success: true,
    message: "Vacancy created successfully",
    vacancy: newVacancy,
  });
});

//get All vacancies
export const getAllVacancies = catchAsyncError(async (req, res, next) => {
  const vacancies = await Vacancy.find({ isdeleted: false })
    .populate({
        path: "area",
        select: "name",
    })
    .populate({
        path: "subject",
        select: "name",
    });

  res.status(200).json({
    success: true,
    message: "All vacancies fetched successfully",
    vacancies,
  });
});

//get All live vacancies
export const getAllLiveVacancies = catchAsyncError(async (req, res, next) => {
  const vacancies = await Vacancy.find({ isdeleted: false, isLive: true })
    .populate({
        path: "area",
        select: "name",
    })
    .populate({
        path: "subject",
        select: "name",
    });

  res.status(200).json({
    success: true,
    message: "All live vacancies fetched successfully",
    vacancies,
  });
});

//get by id vacancy
export const getVacancyById = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const vacancy = await Vacancy.findOne({_id:id, isdeleted: false})
    .populate({
        path: "area",
        select: "name",
    })
    .populate({
        path: "subject",
        select: "name",
    });

  if (!vacancy) {
    return next(new ErrorHandler(404, "Vacancy not found"));
  }

  res.status(200).json({
    success: true,
    message: "Vacancy fetched successfully",
    vacancy,
  });
});

//update vacancy
export const updateVacancy = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { studentName, areaId, subjectId } = req.body;

  const vacancy = await Vacancy.findOne({_id:id, isdeleted:false });

  if (!vacancy) {
    return next(new ErrorHandler(404, "Vacancy not found"));
  }

  // Check if studentName already exists
//   const existingVacancy = await Vacancy.findOne({
//     studentName,
//     isdeleted: false,
//     _id: { $ne: id },
//   });
//   if (existingVacancy) {
//     return next(new ErrorHandler(400, "Student Name already exists"));
//   }

  // Update vacancy
  vacancy.studentName = studentName || vacancy.studentName ;
  vacancy.area = areaId || vacancy.area;
  vacancy.subject = subjectId || vacancy.subject;

  await vacancy.save();

  res.status(200).json({
    success: true,
    message: "Vacancy updated successfully",
    vacancy,
  });
});

//delete vacancy
export const deleteVacancy = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const vacancy = await Vacancy.findOne({_id:id, isdeleted:false});

  if (!vacancy) {
    return next(new ErrorHandler(404, "Vacancy not found"));
  }

  vacancy.isdeleted = true;

  await vacancy.save();

  res.status(200).json({
    success: true,
    message: "Vacancy deleted successfully",
  });
});

//update live status
export const updateLiveStatus = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const vacancy = await Vacancy.findOne({_id:id, isdeleted: false})
    .populate({
        path: "area",
        select: "name",
    })
    .populate({
        path: "subject",
        select: "name",
    });


  if (!vacancy) {
    return next(new ErrorHandler(404, "Vacancy not found"));
  }

  vacancy.isLive = !vacancy.isLive;

  await vacancy.save();

  res.status(200).json({
    success: true,
    message: "Live status updated successfully",
    vacancy,
  });
});