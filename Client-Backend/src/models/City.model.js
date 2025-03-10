import mongoose from "mongoose";
import BaseModelSchema from "./Base.model.js";

const CitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  ...BaseModelSchema.obj, 
});

const City = mongoose.model("City", CitySchema);
export default City;
