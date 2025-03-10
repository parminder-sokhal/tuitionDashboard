import express from "express";
import {
  deleteContactForm,
  getAllContactForms,
  submitContactForm,
  updateContactForm,
  getContactFormById,
  updateLiveFrom,
  updateIncomplete,
} from "../controllers/contactForm.controller.js";

const router = express.Router();
router.get("/getAllContactForms", getAllContactForms);
router.post("/submitContactForm", submitContactForm);
router.put("/updateContactForm/:formId", updateContactForm);
router.delete("/deleteContactForm/:formId", deleteContactForm);

//contact form by id
router.get("/getContactFormById/:formId", getContactFormById);

//update Live
router.patch("/updateLivefrom/:formId", updateLiveFrom);

//update incomplete
router.patch("/updateIncomplete/:formId", updateIncomplete);

export default router;
