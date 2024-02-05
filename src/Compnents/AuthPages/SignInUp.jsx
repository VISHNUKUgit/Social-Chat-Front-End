import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import g from '../assets/Google.jpg';
import { login, register } from '../../Axios-Service/allRequset';
import { toast, ToastContainer } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { useSelector } from 'react-redux';


const SignInUp = ({ setForgetPassword, forgetPassword, forSignIn, setForSignIn }) => {
    const socket = useSelector((state)=>state.socialChat.socket)


    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [userDetails, setUserDetails] = useState({ username: '', email: '', password: '' });
    const navigate = useNavigate();

    const clearData = () => {
        setUserDetails({ username: '', email: '', password: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, email, password } = userDetails;
        setIsLoading(true);

        if (forSignIn) {

            if (!username || !email || !password) {
                toast.error("Please fill in all fields for registration. !");
                setIsLoading(false);
            } else {
                try {
                    const result = await register(userDetails);

                    if (result.status === 200) {
                        toast.success("Registration was successful, please login", { position: "top-center", autoClose: false });
                        setForSignIn(!forSignIn);
                    } else {
                        toast.error(`Error: ${result.response.data}`, { position: "top-center" });
                    }
                } catch (error) {
                    console.error('An error occurred during registration:', error);
                    // Handle different types of errors if needed
                    if (error.response) {
                        console.error('Server responded with an error:', error.response.data);
                    } else if (error.request) {
                        console.error('No response received from the server');
                    } else {
                        console.error('Error setting up the request:', error.message);
                    }
                    toast.error('An error occurred during registration. Please try again.', { position: "top-center" });
                } finally {
                    setIsLoading(false);
                }
            }
        } else {

            if (!email || !password) {
                toast.info("Please fill in all fields");
                setIsLoading(false);
            } else {
                try {
                    const result = await login(userDetails);

                    if (result.status === 200) {
                        sessionStorage.setItem("currentUser", JSON.stringify(result.data.existingUser));
                        sessionStorage.setItem("token", JSON.stringify(result.data.token));
                        // console.log(socket);
                        sessionStorage.setItem("id", socket.id);
                        // sends the username and socket ID to the Node.js server
                        socket.emit('newUser', { userName:result.data.existingUser.username,
                                                 socketID: socket.id
                                                });
                        toast.success("Login successful!");
                        navigate('/chat');
                    } else {
                        toast.error(`Login failed: ${result}`);
                    }
                } catch (error) {
                    console.log("Error during login:", error);
                    toast.error(`Login failed: ${error}`);
                } finally {
                    setIsLoading(false);
                }
            }
        }
        clearData();
    };

    return (
        <>
            <div className='w-100'>
                <h2 className='text-center'>{forSignIn ? 'Sign Up' : 'Sign In'}</h2>
                <p className='text-center'>{forSignIn && 'Sign up for free to access to any of our products'}</p>
                <div className='d-flex flex-column'>
                    <button className='w-100 mt-4 btn  border border-dark'>
                        <img src={g} alt="" /> Continue With Google
                    </button>
                </div>
                <hr />
                <form onSubmit={handleSubmit}>
                    {forSignIn && (
                        <div className='mt-1 d-flex flex-column'>
                            <label htmlFor="">UserName</label>
                            <input
                                style={{ outline: 'none' }}
                                className='p-1 rounded border border-dark '
                                type="text"
                                value={userDetails.username || ""}
                                onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })}
                            />
                        </div>
                    )}
                    <div className='mt-1 d-flex flex-column'>
                        <label htmlFor="">Email Address</label>
                        <input
                            style={{ outline: 'none' }}
                            className='p-1 rounded border border-dark '
                            type="email"
                            value={userDetails.email || ""}
                            onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                        />
                    </div>
                    <div className='mt-2 d-flex flex-column'>
                        <div className='d-flex justify-content-between'>
                            <label htmlFor="">Password</label>
                            <label onClick={() => setShowPassword(!showPassword)} className='text-primary' style={{ cursor: 'pointer' }}>
                                {showPassword ? 'hide' : 'show'}
                            </label>
                        </div>
                        <input
                            style={{ outline: 'none' }}
                            type={showPassword ? 'text' : 'password'}
                            className='p-1 rounded border border-dark'
                            value={userDetails.password || ""}
                            onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
                        />
                        {forSignIn ? (
                            <label htmlFor="">Use 8 or more characters with a mix of letters, numbers & symbols</label>
                        ) : (
                            <div style={{ cursor: 'pointer' }} onClick={() => setForgetPassword(!forgetPassword)} className='text-decoration-underline d-flex justify-content-end'>
                                Forget your password
                            </div>
                        )}
                    </div>
                    <div>
                    </div>
                    <div className='mt-4 d-flex flex-column'>
                        {isLoading ? (
                            <Button variant="warning" disabled>
                                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                Loading...
                            </Button>
                        ) : (
                            <button className='d-block btn btn-warning' type="submit">
                                {forSignIn ? 'Sign Up' : 'Sign In'}
                            </button>
                        )}
                        <label>
                            {forSignIn ? 'Already' : `Don't`} have an account?{' '}
                            <span className='text-primary pe-auto' onClick={() => setForSignIn(!forSignIn)} style={{ cursor: 'pointer' }}>
                                {!forSignIn ? 'Sign Up' : 'Sign In'}
                            </span>
                        </label>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </>
    );
};

export default SignInUp;
