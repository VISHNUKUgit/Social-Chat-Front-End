import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUsersMessagesAPI } from '../../Axios-Service/allRequset'


const ChatContent = () => {
    const socket = useSelector((state) => state.socialChat.socket)
    const [allMessages, setAllMessages] = useState('')
    const userData = useSelector((state) => state.socialChat.selectedUser)
    const currentUserString = sessionStorage.getItem("currentUser");
    const currentUser = currentUserString ? JSON.parse(currentUserString) : null;
    const lastMessageRef = useRef(null);
    const [update, setUpdate] = useState(true)


    useEffect(() => {
        // scroll to bottom every time messages change
        lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [allMessages]);

    const getMessages = async () => {
        // Check if userData exists
        if (!userData) {
            console.error("UserData is missing. Cannot fetch messages.");
            return; // Stops the execution here if userData is missing
        }

        const token = sessionStorage.getItem("token");

        // Check if token exists
        if (!token) {
            console.error("Token is missing. Please authenticate.");
            return; // Stops the execution here if the token is missing
        }
        try {
            const reqHeader = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            };

            const result = await getUsersMessagesAPI(currentUser._id, userData._id, reqHeader)
            console.log(result);
            if (result.status === 200) {
                setAllMessages(result.data)
            } else {
                setAllMessages("")
                console.log(result);
            }
            // Further code after successful API request (will not be executed if the token is missing)
        } catch (error) {
            console.log("Error fetching users:", error);
            // Code to handle errors during the API request
        }

    }

    // const updateMessageStatus = async (recipientUserId) => {
    //     try {
    //         // Update the status of messages in the database
    //         await apiCallToUpdateMessageStatus(recipientUserId);

    //         // Trigger a re-render or update state in your React component
    //         // Example: setMessages([...updatedMessages]);
    //     } catch (error) {
    //         console.error('Error updating messages:', error);
    //     }
    // };
    socket && socket.on('messageResponse', () => setUpdate(!update));

    useEffect(() => {
        getMessages()
    }, [userData, update])

    const formatDateHeader = (timestamp) => {
        const currentDate = new Date(timestamp);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
    
        if (
          currentDate.getFullYear() === today.getFullYear() &&
          currentDate.getMonth() === today.getMonth() &&
          currentDate.getDate() === today.getDate()
        ) {
          return 'Today';
        } else if (
          currentDate.getFullYear() === yesterday.getFullYear() &&
          currentDate.getMonth() === yesterday.getMonth() &&
          currentDate.getDate() === yesterday.getDate()
        ) {
          return 'Yesterday';
        } else {
          // Format the date as needed for other days
          return currentDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });
        }
      };

    return (
        <>
            <div className='w-100 p-2' style={{ backgroundColor: '#343f46', overflowY: 'scroll', height: '80%' }}>

                {/* {allMessages && allMessages.map((message,index) =>
                    message.sender === currentUser._id ? (
                        <div className="mt-2" key={message._id}>

                            <p className="text-end text-light mb-0">You</p>
                            <div className="message__sender " style={{wordWrap: 'break-word'}}>
                                <p>{message.content}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="mt-2" key={message._id}>
                            <p className='text-light mb-0'>{userData.username}</p>
                            <div className="message__recipient" style={{wordWrap: 'break-word'}}>
                                <p>{message.content}</p>
                            </div>
                        </div>
                    )
                )} */}
                {allMessages && allMessages.map((message, index) => (
                    <div className='mt-2' key={message._id}>
                        {index === 0 || formatDateHeader(message.timestamp) !== formatDateHeader(allMessages[index - 1].timestamp) ? (
                            <div className='d-flex justify-content-center'><p className='rounded px-2 text-light mb-1 bg-dark' >{formatDateHeader(message.timestamp)}</p></div>
                        ) : null}
                        {message.sender === currentUser._id ? (
                            <div className="mt-2" key={message._id}>

                            <p className="text-end text-light mb-0">You</p>
                            <div className="message__sender " style={{wordWrap: 'break-word'}}>
                                <p style={{fontWeight:'600'}}>{message.content}</p>
                                <div className='d-flex justify-content-end'>
                                    <span style={{fontSize:'11px'}}>{new Date(message.timestamp).toLocaleTimeString('en-US', { hour12: true, hour: 'numeric', minute: 'numeric' })}</span>
                                </div>
                            </div>
                        </div>
                        ) : (
                            <div className="mt-2" key={message._id}>
                            <p className='text-light mb-0'>{userData.username}</p>
                            <div className="message__recipient" style={{wordWrap: 'break-word'}}>
                                <p style={{fontWeight:'600'}}>{message.content}</p>
                                <div className='d-flex justify-content-end'>
                                    <span style={{fontSize:'11px'}}>{new Date(message.timestamp).toLocaleTimeString('en-US', { hour12: true, hour: 'numeric', minute: 'numeric' })}</span>
                                </div>
                            </div>
                        </div>
                        )}
                    </div>
                ))}
                <div ref={lastMessageRef}></div>
            </div>
        </>
    )
}

export default ChatContent