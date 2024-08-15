import React from 'react'
import ChatHeader from './ChatPages/ChatHeader'
import ChatFooter from './ChatPages/ChatFooter'
import ChatContent from './ChatPages/ChatContent'
import { useSelector } from 'react-redux'


const ChatBody = () => {
  const userData = useSelector((state) => state.socialChat.selectedUser)
  console.log(userData);


  return (
    <div className='w-75' style={{ height: '', backgroundColor: '#343f46' }}>
      {!userData ?
        <div className='d-flex vh-100 align-items-center justify-content-center'>
          <h1>Start Chatting</h1>
        </div>
        :
        <>
          <ChatHeader />
          <ChatContent />
          <ChatFooter />
        </>}

    </div>
  )
}

export default ChatBody