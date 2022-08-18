import React from 'react';
import Row from "./Row";
import {selectSearchedContacts} from "../store/slices/contactsSlice";
import {useAppSelector} from "../hook/useAppSelector";
import ListHeader from "./ListHeader";

const ContactsList: React.FC = () => {

  const search = useAppSelector(state => state.search.search)
  const searchedContacts = useAppSelector(state => selectSearchedContacts(state.contacts, search))

  return (
    <div className='list'>


      <ListHeader/>
      {
        searchedContacts.map((contact, index, array) => {

          return (
            <Row
              key={contact.id}
              contact={contact}
              index={index}
            />
          );
        })
      }
    </div>
  );
};

export default ContactsList;