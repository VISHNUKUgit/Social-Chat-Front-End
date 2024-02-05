import React from 'react'

const ForgetPassword = ({forgetPassword, setForgetPassword,verificationState,setVerificationState}) => {
    return (
        <>
            <h2>Reset Your Password</h2>
            <p>Enter your email and we'll send you a link to reset your password.</p>
            <div className='mt-1 d-flex flex-column'>
                <label htmlFor="">Email Address</label>
                <input style={{ outline: 'none' }} className='p-1 rounded border border-dark ' type="text" />
            </div>
            <div className='mt-4 d-flex flex-column'>
                <button className='w-25 btn btn-warning' onClick={()=>{setVerificationState(!verificationState)}}>Send</button>
                <label>Back to <span className='text-primary pe-auto' onClick={() => setForgetPassword(!forgetPassword)} style={{ cursor: 'pointer' }}>Log in</span></label>
            </div>

        </>
    )
}

export default ForgetPassword