import React, { useState } from 'react'
import Nav from '../Compnents/NavComponent'
import ChatList from '../Compnents/ChatPages/ChatList'
import ChatBody from '../Compnents/ChatBody'

const Home = () => {
  // mobile sreen

  const [screenSize, setScreenSize] = useState(window.innerWidth)
  window.addEventListener('resize', function () {

    const screenWidth = window.innerWidth;

    setScreenSize(screenWidth)
  });

  return (

    <div className='vh-100 overflow-hidden'>
        <Nav />
      <div className='d-flex' style={{height:'92%'}}>
        <ChatList screenSize={screenSize} />
        {screenSize > 600 && <ChatBody />}
      </div>
    </div>
  )
}

export default Home