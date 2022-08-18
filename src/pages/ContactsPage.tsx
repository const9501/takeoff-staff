import React, {useEffect} from 'react';
import {useAuth} from "../hook/useAuth";
import {useNavigate} from "react-router-dom";
import {logout} from "../store/slices/userSlice";
import {fetchContacts} from "../store/slices/contactsSlice";
import SearchBar from "../components/SearchBar";
import AddContactForm from "../components/AddContactForm";
import ContactsList from "../components/ContactsList";
import {useAppDispatch} from "../hook/useAppDispatch";
import {useAppSelector} from "../hook/useAppSelector";

const ContactsPage: React.FC = () => {

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const contacts = useAppSelector(state => state.contacts.contacts)
  const contactsStatus = useAppSelector(state => state.contacts.status)
  const {user} = useAuth()


  useEffect(() => {
    if (user) {
      dispatch(fetchContacts({userId: user.id}));
    }
  }, [dispatch, user])


  return (
    <div className='contacts-page'>

      {!contacts.length && contactsStatus === 'fulfilled' ? <h1>No contacts yet</h1> : <h1>contacts</h1>}


      <div className='actions-container'>

        {!!contacts.length && <SearchBar/>}

        <AddContactForm/>

        <button
          className='logout-button'
          onClick={() => {
            dispatch(logout())
            navigate('/')
          }}>
          Logout
        </button>

      </div>


      {!!contacts.length && <ContactsList/>}


    </div>
  );
};

export default ContactsPage;