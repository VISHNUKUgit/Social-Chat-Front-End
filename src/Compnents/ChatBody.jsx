import React from 'react'
import ChatHeader from './ChatPages/ChatHeader'
import ChatFooter from './ChatPages/ChatFooter'
import ChatContent from './ChatPages/ChatContent'


const ChatBody = () => {
  
  return (
    <div className='w-75' style={{height:'',backgroundColor: '#343f46'}}>
        <ChatHeader/>
        <ChatContent/>
        <ChatFooter/>
    </div>
  )
}

export default ChatBody