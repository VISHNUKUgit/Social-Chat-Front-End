import socketIO from 'socket.io-client'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './Pages/LandingPage'
import Home from "./Pages/Home";
import ChatPage from "./Pages/ChatPage";
import { useEffect, useState } from 'react';
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import { setSocket } from './Redux/slice';

function App() {
  const dispatch  = useDispatch()
  // mobile sreen
 
 const [screenSize, setScreenSize] = useState(window.innerWidth)
 window.addEventListener('resize', function () {

   const screenWidth = window.innerWidth;

   setScreenSize(screenWidth)
 });

 const socket = socketIO.connect('https://social-chat-server.onrender.com');
// const socket = socketIO.connect('http://localhost:4000');
 useEffect(() => {
  if (socket) {
    dispatch(setSocket(socket));
  }
}, [socket,dispatch]);

  return (
    <>
      <Routes>
      <Route path="/" element={<LandingPage  />}/>
      {/* <Route path="/" element={<LandingPage socket={socket} />}/> */}
      <Route path="/chat" element={<Home/>}/>
      {screenSize < 600 ? (
          // Render ChatPage when screenSize is greater than 600
          <Route path="/chat/id" element={<ChatPage />} />
        ) : null}
    </Routes>
    </>
  );
}

export default App;
