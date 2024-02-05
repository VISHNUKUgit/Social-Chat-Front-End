import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ChatHeader = () => {
  const navigate = useNavigate()
  const userData = useSelector((state) => state.socialChat.selectedUser)
  
  // mobile sreen
 
 const [screenSize, setScreenSize] = useState(window.innerWidth)
 window.addEventListener('resize', function () {

   const screenWidth = window.innerWidth;

   setScreenSize(screenWidth)
 });
 const handleNav = ()=>{
  navigate('/chat')
 }

  return (
    <div className='w-100 bg-dark d-flex align-items-center' style={{height: '10%'}}>
      { screenSize < 600 && <div>
      <i class="fa-solid fa-angles-left" onClick={handleNav} style={{color: '#ffffff',paddingLeft:'9px', cursor:'pointer'}}></i>
      </div>}
        <div className='bg-light ms-2 d-flex justify-content-center align-items-center' style={{width:'45px',height:'45px', borderRadius:'50%'}}>{userData.username && userData.username[0].toUpperCase()}</div>
        <h5 className='text-light ms-2 '>{userData.username}</h5>
    </div>
  )
}

export default ChatHeader