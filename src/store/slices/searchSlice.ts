import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type SearchState = {
  search: string
}

const initialState: SearchState = {
  search: ''
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload
    },
    clearSearch(state) {
      state = initialState
    }
  }
})


export default searchSlice.reducer

export const {setSearch, clearSearch} = searchSlice.actions