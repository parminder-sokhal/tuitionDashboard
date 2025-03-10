import axios from "axios";

const server = import.meta.env.VITE_BACKEND_URL;
import {
    contactRequest,
    fetchContactsSuccess,
    contactFail,
    addContact,
    removeContact,
    updateContact,
    getContact,
} from "../reducers/contactSlice";

//get All Contacts
export const getAllContactForms = () => async (dispatch) => {
    try {
        dispatch(contactRequest());

        const { data } = await axios.get(`${server}/getAllContactForms`);
        dispatch(fetchContactsSuccess(data));
    } catch (error) {
        return async (dispatch) => {
            dispatch(
                contactFail(error.response?.data?.message || "Failed to fetch contact")
            );
        };
    }
};

//get Contact by id
export const getContactById = (id) => async (dispatch) => {
    try {
        dispatch(contactRequest());

        const { data } = await axios.get(`${server}/getContactFromById/${id}`);

        dispatch(getContact(data));
    } catch (error) {
        return async (dispatch) => {
            dispatch(
                contactFail(error.response?.data?.message || "Failed to fetch contact")
            );
        };
    }
};

//create Contact
export const createContact = (contactFrom) => async (dispatch) => {
    try {
        dispatch(contactRequest());

        const { data } = await axios.post(`${server}/createContactForm`,
            contactFrom,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            }
        );

        dispatch(addContact(data));
    } catch (error) {
        return async (dispatch) => {
            dispatch(
                contactFail(error.response?.data?.message || "Failed to create contact")
            );
        };
    }
};

//update Contact
export const updateContactById = (id, contactFrom) => async (dispatch) => {
    try {
        dispatch(contactRequest());

        const { data } = await axios.put(`${server}/updateContactForm/${id}`,
            contactFrom,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            }
        );

        dispatch(updateContact(data));
    } catch (error) {
        return async (dispatch) => {
            dispatch(
                contactFail(error.response?.data?.message || "Failed to update contact")
            );
        };
    }
};

//delete Contact
export const deleteContact = (id) => async (dispatch) => {
    try {
        dispatch(contactRequest());

        const { data } = await axios.delete(`${server}/deleteContactForm/${id}`, {
            withCredentials: true,
        });

        dispatch(removeContact(id, data));
    } catch (error) {
        return async (dispatch) => {
            dispatch(
                contactFail(error.response?.data?.message || "Failed to delete contact")
            );
        };
    }
};