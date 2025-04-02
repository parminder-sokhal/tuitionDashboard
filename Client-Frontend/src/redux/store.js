import { configureStore } from "@reduxjs/toolkit";
import areaSlice from "./reducers/areaSlice.js";
import citySlice from "./reducers/citySlice";
import teacherSlice from "./reducers/teacherSlice.js";
import contactSlice from "./reducers/contactSlice";
import subjectSlice from "./reducers/subjectslice.js";
import faqSlice from "./reducers/faqSlice.js";
import studentSlice from "./reducers/studentSlice.js";
import feedbackSlice from "./reducers/feedbackSlice.js";
import vacancySlice from "./reducers/vacancySlice.js";

const store = configureStore({
  reducer: {
    area: areaSlice,
    city: citySlice,
    student: studentSlice,
    teacher: teacherSlice,
    contact: contactSlice,
    subject: subjectSlice,
    faq: faqSlice,
    feedback: feedbackSlice,
    vacancy: vacancySlice,
  },
});

export default store;
