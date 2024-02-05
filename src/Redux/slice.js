import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  socket:'',
  selectedUser:''
}

export const chatSlice = createSlice({
  name: 'social-chat',
  initialState,
  reducers: {
    setSocket: (state,action) => {
       state.socket = action.payload
    },
    setSelectedUser:(state,action) => {
      state.selectedUser = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setSocket,setSelectedUser } = chatSlice.actions

export default chatSlice.reducer