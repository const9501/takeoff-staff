import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

type Contact = {
  id: number,
  name: string,
  phone: string
}


type ContactState = {
  contacts: Contact[],
  status: string,
  error: null | string
}

const initialState: ContactState = {
  contacts: [],
  status: 'idle',
  error: null
}

type EditContactsData = {
  editedUserContacts: Contact[],
  userId: string | null
}
type GetContactsData = {
  userId: string | null
}

export const fetchContacts = createAsyncThunk<Contact[], GetContactsData>(
  'contacts/fetchContacts',
  async ({userId}) => {
    return fetch(`http://localhost:3001/users/${userId}`)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else throw new Error('error')
      })
      .then(data => data.contacts)
  }
)

export const editContacts = createAsyncThunk<Contact[], EditContactsData>(
  'contacts/editContacts',
  async ({editedUserContacts, userId}) => {
    return fetch(`http://localhost:3001/users/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        contacts: editedUserContacts
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else throw new Error('error')
      })
      .then(data => data.contacts)
  }
)


const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: (builder => {
    builder
      .addCase(editContacts.pending, (state) => {
        state.status = 'loading'
        state.error = null
      }).addCase(editContacts.rejected, (state) => {
      state.status = 'rejected'
      state.error = 'произошла ошибка'
    })
      .addCase(editContacts.fulfilled, (state, action: PayloadAction<Contact[]>) => {
        state.contacts = action.payload
        state.status = 'fulfilled'
      })

      .addCase(fetchContacts.pending, (state) => {
        state.status = 'loading'
        state.error = null
      }).addCase(fetchContacts.rejected, (state) => {
      state.status = 'rejected'
      state.error = 'произошла ошибка'
    })
      .addCase(fetchContacts.fulfilled, (state, action: PayloadAction<Contact[]>) => {
        state.contacts = action.payload
        state.status = 'fulfilled'
      })

  })
})

export default contactsSlice.reducer

export const selectSearchedContacts = (state: ContactState, search: string): Contact[] => {

  return state.contacts.filter(
    contact =>
      contact.name.toLowerCase().includes(search.toLowerCase()) ||
      contact.phone.includes(search)
  )
}