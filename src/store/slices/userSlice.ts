import {AnyAction, createAsyncThunk, createSlice} from "@reduxjs/toolkit";


type Contact = {
  id: number,
  name: string,
  phone: string
}

type User = {
  id: string,
  userName: string,
  email: string,
  password: string,
  contacts: Contact[]
}

type UserState = {
  user: User | null,
  status: string,
  error: null | string
}

const initialState: UserState = {
  user: null,
  status: 'idle',
  error: null
}

type LoginData = {
  email: string,
  password: string
}


export const fetchUser = createAsyncThunk<User, LoginData>(
  'users/fetch-user',
  async ({email, password}) => {
    return fetch(`http://localhost:3001/users/?email=${email}&password=${password}`)
      .then(res => {
        if (res.ok) {
          return res.json()
        } else throw new Error('Failed to fetch')
      })
      .then(data => {
        if (data.length) {
          return data[0]
        } else throw new Error('Invalid username or password')
      })
  }
)


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      return initialState
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchUser.rejected, (state, action: AnyAction) => {
        state.status = 'rejected'
        state.error = action.error.message
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        state.user = action.payload
      })
  }
})


export const {logout} = userSlice.actions


export default userSlice.reducer
