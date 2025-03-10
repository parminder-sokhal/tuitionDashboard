import mongoose, { Schema } from "mongoose";
import BaseModelSchema from "./Base.model.js";

const ContactFormSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: {
    type: Number,
    default: null,
    maxLength: [10, "Mobile number cannot exceed 10 digits"],
    required: [true, "Please enter your Mobile No"],
    validate: {
      validator: function (number) {
        return /^[6-9][\d]{9}$/.test(number);
      },
      message: "Mobile number must be 10 digits and Indian",
    },
  },
  whatsappNumber: { 
    type: Number,
    default: null,
    maxLength: [10, "Mobile number cannot exceed 10 digits"],
    required: [true, "Please enter your Mobile No"],
    validate: {
      validator: function (number) {
        return /^[6-9][\d]{9}$/.test(number);
      },
      message: "Mobile number must be 10 digits and Indian",
    },
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    trim: true,
    unique: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email address",
    ],
  },
  role: { type: String, required: true },
  class: { type: String, required: true },
  subjectList: [{ type: String }],
  timeslot: { type: String, required: true },
  feeRange: { type: String },
  incomplete: { type: Boolean, default: false },
  ...BaseModelSchema.obj, // Inherit from BaseModel
});

const ContactForm = mongoose.model("ContactForm", ContactFormSchema);
export default ContactForm;
