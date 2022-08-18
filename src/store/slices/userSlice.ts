import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

// @ts-ignore
// @ts-ignore
// @ts-ignore
type loginData = {
  email: string,
  password: string
}

export const fetchUser = createAsyncThunk(
  'users/fetch-user',
  async ({email, password}: loginData) => {
    return fetch(`http://localhost:3001/users/?email=${email}&password=${password}`)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        else throw new Error('Произошла ошибка')
      })
      .then(data => {
        if (data.length) {
          return data
        } else throw new Error('Неверный логин или пароль')
      })
  }
)

const initialState = {
  user: {},
  status: 'idle',
  error: null
}

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logout(state) {
      state.user = {}
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'rejected'
        // @ts-ignore
        state.error = action.error.message

      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        const [user] = action.payload
        state.user = user
      })
  }
})


export const {logout} = userSlice.actions


export default userSlice.reducer

// @ts-ignore
// export const selectUser = (state: unknown) => state.users