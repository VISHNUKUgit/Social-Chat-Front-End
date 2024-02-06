import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import { getExistingUsersAPI } from '../../Axios-Service/allRequset';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../../Redux/slice';
import { useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';

const ChatList = ({ screenSize }) => {
  const socket = useSelector((state) => state.socialChat.socket)
  const [update, setUpdate] = useState(true)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [userData, setUserData] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const currentUserString = sessionStorage.getItem("currentUser");
  const currentUser = currentUserString ? JSON.parse(currentUserString) : null;

  socket && socket.on('messageResponse', () => setUpdate(!update));

  const getUsers = async () => {
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

      const result = await getExistingUsersAPI(searchValue, reqHeader);
      // console.log(result);
      if (result.status === 200) {
        setUserData(result.data)
      } else {
        console.log(result);
      }
      // Further code after successful API request (will not be executed if the token is missing)
    } catch (error) {
      console.log("Error fetching users:", error);
      // Code to handle errors during the API request
    }
  };



  const handleUserClick = (user) => {
    if (screenSize > 600) {
      setUpdate(!update)
      dispatch(setSelectedUser(user));
    } else {
      setUpdate(!update)
      navigate('/chat/id');
      dispatch(setSelectedUser(user));
    }
  };
  useEffect(() => {
    getUsers()

  }, [searchValue, update])
  console.log(userData);

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
      return new Date(timestamp).toLocaleTimeString('en-US', { hour12: true, hour: 'numeric', minute: 'numeric' });

    } else if (
      currentDate.getFullYear() === yesterday.getFullYear() &&
      currentDate.getMonth() === yesterday.getMonth() &&
      currentDate.getDate() === yesterday.getDate()
    ) {
      return 'Yesterday';
    } else {
      // Format the date as needed for other days
      return currentDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      });
    }
  };

  return (
    <div className={`bg-dark py-2 px-3 ${screenSize > 600 ? 'w-25' : 'w-100'}`} style={{ height: '', overflowX: 'auto' }}  >
      <h4 className='text-light'>userName</h4>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Sreach or start new Chat"
          value={searchValue || ""}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Button variant="outline-secondary" >
          Search
        </Button>
      </InputGroup>
      <ListGroup>
        {userData &&
          userData.map((user) => (
            // Check if _id is a particular number, and exclude it
            user._id !== currentUser._id && (
              <ListGroup.Item
                as="li"
                key={user._id}
                onClick={() => handleUserClick(user)}
                style={{ cursor: 'pointer' }}
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto w-100">
                  <div className="fw-bold"> {user.username}</div>
                  <div className='d-flex justify-content-between w-100 align-items-center'>
                    {user.lastMessage && user.lastMessage.content.length > 20

                      ? `${user.lastMessage.content.slice(0, 20)}...`

                      : user.lastMessage && user.lastMessage.content}
                      <span style={{fontSize:'11px'}}>{user.lastMessage === null ? '' : formatDateHeader(user.lastMessage.timestamp)}</span>
                  </div>

                </div>
                <Badge bg="primary" pill>
                  {user.unreadMessageCount > 0 && user.unreadMessageCount}
                </Badge>
              </ListGroup.Item>
            )
          ))}
      </ListGroup>


    </div>
  )
}

export default ChatList