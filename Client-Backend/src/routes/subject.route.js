import express from "express"

import {
    createSubject,
    getAllSubject,
    getSubjectById,
    updateSubject,
    deleteSubject,
    getSubjectLiveTrue,
    updateLiveStatus
} from "../controllers/subject.controller.js"

const router = express.Router();
//create subject
router.route("/subject").post(createSubject);

//get all subject
router.route("/subject").get(getAllSubject);

//get All Live subjects
router.route("/subject/live").get(getSubjectLiveTrue);

//get subject by id
router.route("/subject/:id").get(getSubjectById);

//update subject
router.route("/subject/:Id").put(updateSubject);

//delete subject
router.route("/subject/:subjectId").delete(deleteSubject);

//update live status
router.route("/subject/updatelive/:id").patch(updateLiveStatus);

export default router;