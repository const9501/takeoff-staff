import React, {useState} from 'react';
import {useAuth} from "../hook/useAuth";
import {editContacts} from "../store/slices/contactsSlice";
import {useAppDispatch} from "../hook/useAppDispatch";
import {useAppSelector} from "../hook/useAppSelector";


interface IContact {
  id: number,
  name: string,
  phone: string
}

interface IRowProps {
  contact: IContact,
  index: number
}

const Row: React.FC<IRowProps> = ({contact, index}) => {
  const contacts = useAppSelector(state => state.contacts.contacts)

  const id = contact.id
  const [name, setName] = useState(contact.name);
  const [phone, setPhone] = useState(contact.phone);

  const [cantEdit, setCantEdit] = useState(true)
  const [editButton, setEditButton] = useState('Edit');

  const {user} = useAuth()

  const userId = user ? user.id : null
  const dispatch = useAppDispatch()


  const handleDeleteContact = () => {
    const editedUserContacts = contacts.filter(contact => contact.id !== id)
    dispatch(editContacts({editedUserContacts, userId}))
  }



  const handleEditContact = () => {
    const editedUserContacts = contacts.map((contact) => {
      return contact.id === id ? {id, name, phone} : contact
    })
    dispatch(editContacts({editedUserContacts, userId}))
  }


  return (
    <div className='list__row'>

      <div className='id-col'>{index+1}</div>

      <div className='col'>
        <input
          value={name}
          onChange={event => setName(event.target.value)}
          readOnly={cantEdit}
        />
      </div>

      <div className='col'>
      <input
        value={phone}
        onChange={event => setPhone(event.target.value)}
        readOnly={cantEdit}
      />
    </div>


      <div className='action-col button-container'>
        <button
          onClick={() => {
            if (cantEdit) {
              setEditButton('Save')
              setCantEdit(false)
            } else {
              setEditButton('Edit')
              handleEditContact()
              setCantEdit(true)
            }
          }}
        >
          {editButton}
        </button>


        <button onClick={handleDeleteContact}>Delete</button>
      </div>


    </div>
  );
};

export default Row;