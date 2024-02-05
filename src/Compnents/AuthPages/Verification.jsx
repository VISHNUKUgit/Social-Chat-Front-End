import React from 'react'

const Verification = ({createNewPassword,setCreateNewPassword}) => {
    return (
        <>
            <h2>Verification</h2>
            <p>Verify your code.</p>
            <div className='mt-1 d-flex flex-column'>
                <label htmlFor="">Verification Code </label>
                <input style={{ outline: 'none' }} className='p-1 rounded border border-dark ' type="text" />
            </div>
            <div className='mt-4 d-flex flex-column'>
                <button className='btn btn-warning' onClick={()=>setCreateNewPassword(!createNewPassword)}>Verify Code</button>
            </div>
        </>
    )
}

export default Verification