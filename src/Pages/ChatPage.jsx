import React from 'react'
import NavComponent from '../Compnents/NavComponent'
import ChatHeader from '../Compnents/ChatPages/ChatHeader'
import ChatContent from '../Compnents/ChatPages/ChatContent'
import ChatFooter from '../Compnents/ChatPages/ChatFooter'


const ChatPage = () => {
    return (
        <div style={{height:'92vh'}}>
            <NavComponent />
            <ChatHeader />
            <ChatContent />
            <ChatFooter />
        </div>
    )
}

export default ChatPage