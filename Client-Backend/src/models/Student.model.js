import mongoose, {Schema} from "mongoose";
import BaseModelSchema from "./Base.model.js";

const studentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, "email are required"],
        unique: true
    },
    phone: { type: Number },
    image: {
        public_id: {
          type: String,
        },
        url: {
          type: String,
        },
      },
    class: {
        type: String,
    },
    area: {
        type: Schema.Types.ObjectId,
        ref: 'Area',
        required: [true, "Area are required"]
    },
    subject: [
        {
          type: Schema.Types.ObjectId,
          ref: "Subject",
        },
      ],
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
    },
    aboutUs: { type: String },
    chargeRate: { type: String },
   
    ...BaseModelSchema.obj,
});

const Student = mongoose.model('Student', studentSchema);

export default Student;