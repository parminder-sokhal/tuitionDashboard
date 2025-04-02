import express from "express";
import {
    createFaq,
    getAllFaq,
    getAllLiveFaq,
    getFaqById,
    updateFaq,
    deleteFaq,
    updateLiveStatus,
    deleteAllFaq

} from "../controllers/Faq.controller.js"

const router = express.Router();

//create faq
router.route("/faq").post(createFaq);

//get all faq
router.route("/faq").get(getAllFaq);

//get all live faq
router.route("/faq/live").get(getAllLiveFaq);

//get by id
router.route("/faq/:id").get(getFaqById);

//update faq
router.route("/faq/:id").put(updateFaq);

//delete faq
router.route("/faq/:id").delete(deleteFaq);

//update live status
router.route("/faq/updatelive/:id").patch(updateLiveStatus);

//delete all faq  -->NO Use
// router.route("/faq/deleteall").delete(deleteAllFaq);

export default router;