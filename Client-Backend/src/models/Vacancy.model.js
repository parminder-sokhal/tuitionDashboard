import { Schema , model } from 'mongoose';
import BaseModelSchema from './Base.model.js';


const VacancySchema = new Schema({
    studentName: {
        type: String,
        required: true
    },
    area: {
        type: Schema.Types.ObjectId,
        ref: "Area",
        required: [true, "Area are Required"]
    },
    subject: {
        type: Schema.Types.ObjectId,
        ref: "Subject",
    },

    ...BaseModelSchema.obj
    
});

export default model('Vacancy', VacancySchema);