import express from "express"
import {
    createFeedback,
    getAllFeedbacks,
    getAllLiveFeedbacks,
    getByIdFeedback,
    updateFeedback,
    deleteFeedback,
    updateLiveStatus
} from "../controllers/feedback.controller.js"

const router = express.Router();

//creaet feedback
router.route("/feedback").post(createFeedback);

//get all feedback
router.route("/feedback").get(getAllFeedbacks);

//get all live feedback
router.route("/feedback/live").get(getAllLiveFeedbacks);

//get by id
router.route("/feedback/:id").get(getByIdFeedback);

//update feedback
router.route("/feedback/:id").put(updateFeedback);

//delete feedback
router.route("/feedback/:id").delete(deleteFeedback);

//update live status
router.route("/feedback/updatelive/:id").patch(updateLiveStatus);

export default router;