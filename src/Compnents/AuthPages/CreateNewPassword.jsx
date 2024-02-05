import React, { useState } from 'react'

const CreateNewPassword = ({forgetPassword, setForgetPassword}) => {

    const [showPassword, setShowPassword] = useState(false)
    const handleResetPassword = () =>{
        setForgetPassword(!forgetPassword)
        
    }
    return (
        <>
            <h2>Create New Password</h2>
            <p>Your new password must be different from previous used passwords.</p>
            <div className='mt-4 d-flex flex-column'>
                <div className='d-flex justify-content-between'>
                    <label htmlFor="">Password</label>
                    <label onClick={() => setShowPassword(!showPassword)} className='text-primary' style={{ cursor: 'pointer' }}>{showPassword ? 'hide' : 'show'}</label>
                </div>
                <input style={{ outline: 'none' }} type={!showPassword && 'password'} className='p-1 rounded border border-dark' />
                <label htmlFor="">Must be at least 8 characters.</label>
            </div>
            <div className='mt-4 d-flex flex-column'>
                <form>
                    <label htmlFor="">Confirm Password</label>
                    <div>
                        <input style={{ outline: 'none' }} type='password' className='p-1 w-100 rounded border border-dark' />
                        <label htmlFor="">New password and comfirm new password do not match</label>
                    </div>
                    <br />
                    <button type='submit' className='btn btn-warning' onClick={handleResetPassword}>Reset Password</button>
                </form>
            </div>
        </>
    )
}

export default CreateNewPassword