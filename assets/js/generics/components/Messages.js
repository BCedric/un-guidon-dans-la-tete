import React, { useEffect, useState } from 'react'

import { Alert, Button } from '@mui/material'

import { useDispatch, useSelector } from 'react-redux'

import { getMessages, addMessage, removeMessage } from 'store/messagesSlice'

import './Messages.scss'

const Messages = () => {
  const messages = useSelector(getMessages)
  const dispatch = useDispatch()
  const [timeoutRef, setTimeoutRef] = useState(null)

  useEffect(() => {
    if (messages.length > 0) {
      if (timeoutRef != null) {
        clearTimeout(timeoutRef)
      }
      setTimeoutRef(
        setTimeout(() => {
          dispatch(removeMessage(0))
        }, 5000)
      )
    }
  }, [messages])

  return (
    <div className="messages-area">
      {messages.map((message, index) => (
        <Alert
          className="info-message"
          key={index}
          onClose={() => dispatch(removeMessage(index))}
          severity={message.severity}
        >
          {message.content}
        </Alert>
      ))}
    </div>
  )
}

export default Messages
