import mongoose from 'mongoose';
import BaseModelSchema from './Base.model.js';

const Schema = mongoose.Schema;

const faqSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    ...BaseModelSchema.obj,
    
});



const Faq = mongoose.model('Faq', faqSchema);

export default Faq;