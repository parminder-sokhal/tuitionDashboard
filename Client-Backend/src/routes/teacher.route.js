import express from "express";
import {
  createTeacher,
  deleteTeacher,
  getAllTeachers,
  updateTeacher,
    getTeacherById,
    updateLiveTeacher,
    getTeacherBySubjectAndArea,
    FindTeacherBySubjectAndArea,
    getTeacherLiveTrue
} from "../controllers/teacher.controller.js";

import singleUpload from "../middlewares/multer.js";

const router = express.Router();
//GEt all teacher
router.get("/getTeachers", getAllTeachers);

//Get All Live Teacher
router.get("/teacher/live", getTeacherLiveTrue);

//create area
router.route("/createTeacher").post(singleUpload, createTeacher);

//update teacher
router.put("/updateTeacher/:teacherId", singleUpload, updateTeacher);
// router.put("/updateTeacher/:teacherId", updateTeacher);

//delete teacher
router.delete("/deleteTeacher/:teacherId", deleteTeacher);

//get teacher by id
router.get("/getTeacherById/:teacherId", getTeacherById);

//update live
router.patch("/teacher/updatelive/:teacherId", updateLiveTeacher);

//find teacher by subject and area
router.get("/admin/teacher", getTeacherBySubjectAndArea);

//find teacher by subject and area
// router.post("/findteacher", FindTeacherBySubjectAndArea);

export default router;
