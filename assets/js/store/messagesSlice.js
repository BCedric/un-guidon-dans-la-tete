import { createSlice } from '@reduxjs/toolkit'

export const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: []
  },
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload)
    },
    removeFirstMessage: (state) => {
      state.messages.shift()
    },
    removeMessage: (state, action) => {
      state.messages.splice(action.payload, 1)
    }
  }
})

export default messagesSlice.reducer

export const { setMessages, addMessage, removeFirstMessage, removeMessage } =
  messagesSlice.actions

export const getMessages = ({ messages }) => messages.messages
