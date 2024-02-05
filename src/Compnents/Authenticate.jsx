import React, { useEffect, useState } from 'react'
import SignInUp from './AuthPages/SignInUp'
import ForgetPassword from './AuthPages/ForgetPassword'
import Verification from './AuthPages/Verification'
import CreateNewPassword from './AuthPages/CreateNewPassword'


const Authenticate = () => {
    
    const [forSignIn, setForSignIn] = useState(true)
    const [forgetPassword, setForgetPassword] = useState(true)
    const [verificationState, setVerificationState] = useState(false)
    const [createNewPassword, setCreateNewPassword] = useState(false)

    useEffect(() => {
        setCreateNewPassword(false)
        setVerificationState(false)
    }, [forgetPassword])
    // console.log(socket);
    return (
        <div className='d-flex w-100 justify-content-center align-items-center'>
            <div className='p-5 w-75 '>
                {forgetPassword ?
                    <SignInUp forSignIn={forSignIn} setForSignIn={setForSignIn} setForgetPassword={setForgetPassword} forgetPassword={forgetPassword} />
                    :
                    (verificationState ?
                        (createNewPassword ? <CreateNewPassword forSignIn={forSignIn} setForSignIn={setForSignIn} forgetPassword={forgetPassword} setForgetPassword={setForgetPassword} /> : <Verification createNewPassword={createNewPassword} setCreateNewPassword={setCreateNewPassword} />)
                        :
                        <ForgetPassword setVerificationState={setVerificationState} verificationState={verificationState} forgetPassword={forgetPassword} setForgetPassword={setForgetPassword} />)
                }
            </div>
        </div>

    )
}

export default Authenticate