import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const ChatFooter = () => {
    const userData = useSelector((state) => state.socialChat.selectedUser)
    const socket = useSelector((state) => state.socialChat.socket)
    const [message, setMessage] = useState('');
    const currentUserString = sessionStorage.getItem("currentUser");
    const currentUser = currentUserString ? JSON.parse(currentUserString) : null;
    const sendMessage = async () => {
        console.log(currentUser._id);
        console.log(userData._id);
        if (message.trim() && currentUser.username) {
            // Emit a 'message' event to the server using the socket
            socket.emit('message', {
                text: message,
                sender: currentUser._id,
                recipient: userData._id,
                name: currentUser.username,
                id: `${currentUser._id}-${Date.now()}`,  // Unique message ID
                socketID: socket.id,  // Socket ID of the sender
            });
        }
        setMessage('');
    }
    return (
        <div className='w-100 bg-dark  d-flex align-items-center' style={{ height: '10%' }}>
            <div className='px-3 w-75'>
                <form className='d-flex' onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage();
                
                }}>
                    <input
                        style={{ outline: 'none'}}
                        placeholder="Write message"
                        className='form-control no-outline'
                        type="text"
                        value={message || ""}
                        onChange={(e) => setMessage(e.target.value)}
                        aria-label="Type your message"
                    />
                    <button  className='ms-1 btn btn-success ' type="submit" disabled={!message.trim()}>Enter</button>
                </form>
            </div>

        </div>
    )
}

export default ChatFooter