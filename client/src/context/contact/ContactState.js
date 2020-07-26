import React, { useReducer } from 'react';
import { v4 as uuid} from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from '../types';

export const ContactState = props => {
    const initialState = {
        contacts: [
            {
                "type": "personal",
                "id": "5f1b2741d099925600d23aca",
                "name": "Godofredo",
                "email": "gordo@gmail.com",
                "phone": "222222222",
                "user": "5f007aeb4818ad43845cf2e0",
                "date": "2020-07-24T18:24:01.307Z",
                "__v": 0
            },
            {
                "type": "personal",
                "id": "5f1b232c40da90737823e61d",
                "name": "Super Godzilla",
                "email": "godzilla@gmail.com",
                "phone": "11111116",
                "user": "5f007aeb4818ad43845cf2e0",
                "date": "2020-07-24T18:06:36.473Z",
                "__v": 0
            },
            {
                "type": "professional",
                "id": "5f1b230e40da90737823e61c",
                "name": "Banana de Pijama",
                "email": "bananadepijama@gmail.com",
                "phone": "66666666",
                "user": "5f007aeb4818ad43845cf2e0",
                "date": "2020-07-24T18:06:06.711Z",
                "__v": 0
            }
        ],
        current: null,
        filtered: null
    };

    const [state, dispatch] = useReducer(contactReducer, initialState);

    // Add contact
    const addContact = contact => {
        contact.id = uuid();
        dispatch({
            type: ADD_CONTACT, 
            payload: contact
        })
    }

    // Delete contact
    const deleteContact = id => {
        dispatch({
            type: DELETE_CONTACT, 
            payload: id
        })
    }

    // Set Current Contact
    const editContact = contact => {
        dispatch({
            type: SET_CURRENT, 
            payload: contact
        })
    }

    // Clear Current Contact
    const clearContact = () => {
        dispatch({
            type: CLEAR_CURRENT
        })
    }

    // Update Contact
    const updateContact = contact => {
        dispatch({
            type: UPDATE_CONTACT, 
            payload: contact
        })
    }

    // Filter Contacts
    const filterContacts = text => {
        dispatch({
            type: FILTER_CONTACTS, 
            payload: text
        })
    }

    // Clear Filter
    const clearFilter = () => {
        dispatch({
            type: CLEAR_FILTER
        })
    }

    return (
        <ContactContext.Provider 
            value={{
                contacts: state.contacts,
                current: state.current,
                filtered: state.filtered,
                addContact,
                deleteContact,
                editContact,
                clearContact,
                updateContact,
                filterContacts,
                clearFilter
            }}
        >
            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactState;