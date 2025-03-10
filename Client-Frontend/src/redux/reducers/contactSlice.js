import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  contacts: [],
  contact: {},
  status: "idle",
  error: null,
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    //common request and fail
    contactRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    contactFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchContactsSuccess: (state, action) => {
      state.loading = false;
      state.contacts = action.payload.contactForms || action.payload;
    },
    getContact: (state, action) => {
      state.loading = false;
      state.contact = action.payload.contactForm;
    },
    addContact: (state, action) => {
      state.loading = false;
      state.contacts.push(action.payload);
    },
    removeContact: (state, action) => {
      state.loading = false;
      state.contacts = state.contacts.filter(
        (contact) => contact._id !== action.payload.contactForm._id
      );
    },
    updateContact: (state, action) => {
      state.loading = false;
      const index = state.contacts.findIndex(
        (contact) => contact._id === action.payload.contactForm._id
      );
      if (index !== -1) {
        state.contacts[index] = action.payload;
      }
    },
  },
});

export const { addContact, removeContact, updateContact,
    contactRequest,
    contactFail,
    fetchContactsSuccess,
    getContact
 } =
  contactSlice.actions;

export default contactSlice.reducer;
