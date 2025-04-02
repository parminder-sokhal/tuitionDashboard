import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";

import Faq from "../models/Faq.model.js";

//create faq
export const createFaq = catchAsyncError(async (req, res, next) => {
  const { question, answer } = req.body;

  if (!question || !answer) {
    return next(new ErrorHandler(400, "Question and answer are required"));
  }

  const newFaq = await Faq.create({
    question,
    answer,
  });

  res.status(201).json({
    success: true,
    message: "Faq created successfully",
    faq: newFaq,
  });
});

//get all faq
export const getAllFaq = catchAsyncError(async (req, res, next) => {
  const faqs = await Faq.find({ isdeleted: false });

  res.status(200).json({
    success: true,
    message: "All Faq Found",
    faqs,
  });
});

//get all live faq
export const getAllLiveFaq = catchAsyncError(async (req, res, next) => {
  const faqs = await Faq.find({ isdeleted: false, isLive: true });

  res.status(200).json({
    success: true,
    message: "All Live Faq Found",
    faqs,
  });
});

//get faq by id
export const getFaqById = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const faq = await Faq.findOne({ _id: id, isdeleted: false });

  if (!faq) {
    return next(new ErrorHandler(404, "Faq not found"));
  }

  res.status(200).json({
    success: true,
    faq,
  });
});

//update faq
export const updateFaq = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { question, answer } = req.body;

  const faq = await Faq.findOne({ _id: id, isdeleted: false });

  if (!faq) {
    return next(new ErrorHandler(404, "Faq not found"));
  }

  faq.question = question || faq.question;
  faq.answer = answer || faq.answer;

  await faq.save();

  res.status(200).json({
    success: true,
    message: "Faq updated successfully",
    faq,
  });
});

//delete faq
export const deleteFaq = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const faq = await Faq.findOne({ _id: id, isdeleted: false });

  if (!faq) {
    return next(new ErrorHandler(404, "Faq not found"));
  }

  faq.isdeleted = true;

  await faq.save();

  res.status(200).json({
    success: true,
    message: "Faq deleted successfully",
  });
});


//update live status faq
export const updateLiveStatus = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const faq = await Faq.findOne({_id:id, isdeleted: false});

  if (!faq) return next(new ErrorHandler(404, "Faq not found"));

  faq.isLive = !faq.isLive;
  await faq.save();

  res.status(200).json({
    success: true,
    message: "Faq live status updated",
    faq,
  });
});

//delete all faq
export const deleteAllFaq = catchAsyncError(async (req, res, next) => {
  const faqs = await Faq.find({ isdeleted: false });

  if (!faqs) {
    return next(new ErrorHandler(404, "Faq not found"));
  }

  faqs.forEach(async (faq) => {
    faq.isdeleted = true;
    await faq.save();
  });

  res.status(200).json({
    success: true,
    message: "All Faq deleted successfully",
  });
});

