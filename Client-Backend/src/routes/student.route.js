import express from "express"
import {
    getAllStudents,
    getStudentLiveTrue,
    createStudent,
    getStudentById,
    updateStudent,
    deleteStudent,
    getStudentBySubjectAndArea
} from "../controllers/student.controller.js"

import singleUpload from "../middlewares/multer.js" 


const router = express.Router();

//GEt All Students
router.route("/student").get( getAllStudents);

//Get All Live SStudents
router.route("/student/live").get(getStudentLiveTrue);

//create student
router.route("/student").post(singleUpload, createStudent);

//get Student by id
router.route("/student/:Id").get(getStudentById);

//update student
router.route("/student/:Id").put(singleUpload, updateStudent);

//delete student
router.route("/student/:Id").delete(deleteStudent);

//update live status
router.route("/student/updatelive/:Id").patch(updateStudent);

//find student areaid and subjectid
router.route("/admin/student").get(getStudentBySubjectAndArea);



export default router;