import { configureStore } from '@reduxjs/toolkit';
import areaSlice  from './reducers/areaSlice';
import citySlice from './reducers/citySlice';
import teacherSlice from './reducers/teacherSlice';
import contactSlice from './reducers/contactSlice';
import subjectSlice from './reducers/subjectslice';




const store = configureStore({
    reducer: {
        // Add your reducers here
        area: areaSlice,
        city: citySlice,
        teacher: teacherSlice,
        contact: contactSlice,
        subject: subjectSlice
    },
});

export default store;