import React, {useState} from 'react';
import {editContacts} from "../store/slices/contactsSlice";
import {useAuth} from "../hook/useAuth";
import {useAppSelector} from "../hook/useAppSelector";
import {useAppDispatch} from "../hook/useAppDispatch";

const AddContactForm: React.FC = () => {


  const dispatch = useAppDispatch()
  const contacts = useAppSelector(state => state.contacts.contacts)
  const {user} = useAuth()
  const userId = user ? user.id : null

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const handleAddContact = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const id = Date.now();
    const editedUserContacts = [...contacts, {id, name: name.trim(), phone: phone.trim()}]

    dispatch(editContacts({editedUserContacts, userId}));
    setName('')
    setPhone('')
  }
  return (
    <>

      <form action="" onSubmit={handleAddContact} className='add-contact-form'>
        <h2>Add contact</h2>
        <input
          name="name"
          type='text'
          placeholder='name'
          autoComplete='off'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          name="phone"
          type='tel'
          autoComplete='off'
          placeholder='phone'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button type='submit'>Add</button>

      </form>
    </>
  );
};

export default AddContactForm;