import mongoose, { Schema } from "mongoose";
import BaseModelSchema from "./Base.model.js";

const TeacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: Number },
  image: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  area: { type: Schema.Types.ObjectId, ref: "Area", required: true },
  aboutUs: { type: String },
  subject: [
    {
      type: Schema.Types.ObjectId,
      ref: "Subject",
    },
  ],
  chargeRate: { type: String },
  ...BaseModelSchema.obj, // Inherit from BaseModel
});

const Teacher = mongoose.model("Teacher", TeacherSchema);
export default Teacher;
