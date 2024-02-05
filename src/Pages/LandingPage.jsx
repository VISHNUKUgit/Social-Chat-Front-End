import React, { useEffect, useState } from 'react'
import img from '../Compnents/assets/signup.jpg'
import Authenticate from '../Compnents/Authenticate'
// import { useDispatch } from 'react-redux'
// import { setSocket } from '../Redux/slice'


const LandingPage = ({socket}) => {
  // const dispatch  = useDispatch()
  // const socket = useSelector((state)=>state.socialChat.socket)
 
  
  // useEffect(() => {
  //   if (socket) {
  //     dispatch(setSocket(socket));
  //     console.log(socket);
      
  //   }
  // }, [socket,dispatch]);
  

  // mobile sreen

  const [screenSize, setScreenSize] = useState(window.innerWidth)
  window.addEventListener('resize', function () {

    const screenWidth = window.innerWidth;

    setScreenSize(screenWidth)
  });


  return (
    <div className='d-flex w-100 vh-100'>
      <div className={`w-50 overflow-hidden  ${screenSize < 600 && 'd-none'}`}>
        <img className='' src={img} alt="" /></div>
      <div className={screenSize > 600 ? 'w-50' : 'w-100'}> <Authenticate /></div>
    </div>
  )
}

export default LandingPage