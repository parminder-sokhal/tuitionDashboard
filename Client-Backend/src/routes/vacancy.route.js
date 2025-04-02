import express from "express"
import {
    createVacancy,
    getAllVacancies,
    getAllLiveVacancies,
    getVacancyById,
    updateVacancy,
    deleteVacancy,
    updateLiveStatus
} from "../controllers/vacancy.controller.js"

const router = express.Router();

//create vacancy
router.route("/vacancy").post(createVacancy);

//get All vacancies
router.route("/vacancy").get(getAllVacancies);

//get All live vacancies
router.route("/vacancy/live").get(getAllLiveVacancies);

//get by id vacancy
router.route("/vacancy/:id").get(getVacancyById);

//updare vacancy
router.route("/vacancy/:id").put(updateVacancy);

//delete vacancy
router.route("/vacancy/:id").delete(deleteVacancy);

//update live status
router.route("/vacancy/updatelive/:id").patch(updateLiveStatus);

export default router;