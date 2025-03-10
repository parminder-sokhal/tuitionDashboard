import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";

import Student from "../models/Student.model.js";
import getDataUri from "../utils/dataUri.js";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";

export const getAllStudents = catchAsyncError(async (req, res, next) => {
 
    const students = await Student.find({isdeleted:false}).sort({createdAt: 1})
    .populate({
      path: "area",
      select: "name",
      match: { isdeleted: false }, 
    })
    .populate({
      path: "subject",
      select: "name",
      match: { isdeleted: false }, 
    });
    

    if (!students) {
      return next(new ErrorHandler(404, "Students Not Found"));
    }

    res.status(200).json({
      success: true,
      message: "All students found successfully",
      students,
    });
    
  
});

//Get all Live Student
export const getStudentLiveTrue = catchAsyncError(async (req, res, next) => {
 
  const students = await Student.find({isdeleted:false, isLive: true}).sort({createdAt: 1})
  .populate({
    path: "area",
    select: "name",
    match: { isdeleted: false }, 
  })
  .populate({
    path: "subject",
    select: "name",
    match: { isdeleted: false }, 
  });
  

  if (!students) {
    return next(new ErrorHandler(404, "Students Not Found"));
  }

  res.status(200).json({
    success: true,
    message: "All Live students found successfully",
    students,
  });

});

//create student

export const createStudent = catchAsyncError(async (req, res, next) => {
  
    const { name, email, phone, className, areaId, gender, subjectId, aboutUs, chargeRate } = req.body;

    // Check if email already exists
    const existingStudent = await Student.findOne({ email, isdeleted: false });
    if (existingStudent) {
      return next(new ErrorHandler(400, "Email already exists"));
    }

    // Handle subjectId (single/multiple)
    let subjects = [];
    if (subjectId) {
      if (Array.isArray(subjectId)) {
        subjects = subjectId.map((id) => new mongoose.Types.ObjectId(id.trim()));
      } else if (typeof subjectId === "string") {
        subjects = subjectId.split(",").map((id) => new mongoose.Types.ObjectId(id.trim()));
      }
      else {
        return next(new ErrorHandler(400, "Invalid subjectId format"));
      }
    }

    // Handle Image Upload (if file is provided)
    let mycloud = null;
    if (req.file) {
      const fileUri = getDataUri(req.file);
      mycloud = await cloudinary.uploader.upload(fileUri.content, {
        folder: "students",
      });
    }

    // Create new student
    const newStudent = new Student({
      name,
      email,
      phone,
      class: className,
      area: areaId,
      gender,
      subject: subjects,
      aboutUs,
      chargeRate,
      image: mycloud
        ? {
            public_id: mycloud.public_id,
            url: mycloud.secure_url,
          }
        : null, // Keep undefined if no image uploaded
    });

    // Save student to database
    await newStudent.save();

    res.status(201).json({
      success: true,
      message: "Student created successfully",
      student: newStudent,
    });

});



  // get student by id
  export const getStudentById = catchAsyncError(async (req, res, next) => {

    const { Id } = req.params;

    const student = await Student.findById({_id:Id, isdeleted:false})
    .populate({
      path: "area",
      select: "name",
      match: { isdeleted: false }, // Filter areas where isdeleted is false
    });

    if (!student) {
      return next(new ErrorHandler(404, "Student not found"));
    }

    res.status(200).json({
      success: true,
      message: "Student found successfully",
      student,
    });

  });

  //update student
export const updateStudent = catchAsyncError(async (req, res, next) => {
 
    const { Id } = req.params;
    const { name, email, phone, className, areaId, gender, subjectId, aboutUs, chargeRate } = req.body;

    const student = await Student.findOne({ _id: Id, isdeleted: false })
    .populate({
      path: "area",
      select: "name",
      match: { isdeleted: false },
    })
    .populate({
      path: "subject",
      select: "name",
      match: { isdeleted: false },
    });
    

    if (!student) {
      return next(new ErrorHandler(404, "Student not found"));
    }

    // Handle subjectId (Supports multiple subjects)
    let subjects = student.subject; // Default to existing subjects
    if (subjectId) {
      if (Array.isArray(subjectId)) {
        subjects = subjectId.map((id) => new mongoose.Types.ObjectId(id.trim()));
      } else if (typeof subjectId === "string") {
        subjects = subjectId.split(",").map((id) => new mongoose.Types.ObjectId(id.trim()));
      }
    }

    // Handle Image Upload (If file is provided)
    let mycloud = null;
    if (req.file) {
      const fileUri = getDataUri(req.file);

      // Delete old image from Cloudinary
      if (student.image && student.image.public_id) {
        await cloudinary.uploader.destroy(student.image.public_id);
      }

      // Upload new image
      mycloud = await cloudinary.uploader.upload(fileUri.content, {
        folder: "students",
      });
    }

    // Update student fields
    student.name = name || student.name;
    student.email = email || student.email;
    student.phone = phone || student.phone;
    student.class = className || student.class;
    student.area = areaId || student.area;
    student.gender = gender || student.gender;
    student.aboutUs = aboutUs || student.aboutUs;
    student.chargeRate = chargeRate || student.chargeRate;
    student.subject = subjects;

    // Update image if uploaded
    if (mycloud) {
      student.image = {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      };
    }

    // Save updated student
    await student.save();

    res.status(200).json({
      success: true,
      message: "Student updated successfully",
      student,
    });
 
});


  //delete student
  export const deleteStudent = catchAsyncError(async (req, res, next) => {

    const { Id } = req.params;

    const student = await Student.findById({_id:Id, isdeleted:false})
    .populate({
      path: "area",
      select: "name",
      match: { isdeleted: false }, // Filter areas where isdeleted is false
    });

    if (!student) {
      return next(new ErrorHandler(404, "Student not found"));
    }

    student.isdeleted = true;

    await student.save();

    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
      student,
    });

  });

  //update Live Status
  export const updateLiveStudent = catchAsyncError(async (req, res, next) => {

    const { Id } = req.params;

    const student = await Student.findById({_id:Id, isdeleted:false})
    .populate({
      path: "area",
      select: "name",
      match: { isdeleted: false }, // Filter areas where isdeleted is false
    })
    .populate({
      path: "subject",
      select: "name",
      match: { isdeleted: false }, // Filter areas where isdeleted is false
    });
    

    if (!student) {
      return next(new ErrorHandler(404, "Student not found"));
    }

    student.isLive = !student.isLive;

    await student.save();

    res.status(200).json({
      success: true,
      message: "Student updated Live Status successfully",
      student,
    });

  });

  // find Student areaid and subjectid
  export const getStudentBySubjectAndArea = catchAsyncError(async (req, res, next) => {
    const { subjectId, areaId } = req.query;
  
    if (!subjectId || !areaId) {
      return next(new ErrorHandler(400, "SubjectId and AreaId must be provided."));
    }
  
    const students = await Student.find({
      $and: [
        { subject: subjectId },
        { area: areaId },
        { isdeleted: false },
      ],
    })
      .populate({
        path: "area",
        select: "name",
        match: { isdeleted: false },
      })
      .populate({
        path: "subject",
        select: "name",
        match: { isdeleted: false },
      });
  
    if (!students.length) {
      return next(new ErrorHandler(404, "No students found for the given subject and area."));
    }
  
    res.status(200).json({
      success: true,
      message: "All students found for the given subject and area successfully",
      students,
    });
  });
  