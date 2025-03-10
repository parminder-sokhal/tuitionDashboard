import mongoose,{Schema} from "mongoose";
import BaseModelSchema from "./Base.model.js";

const SubjectSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    ...BaseModelSchema.obj,
   
},
    
);

const Subject = mongoose.model('Subject', SubjectSchema);

export default Subject;