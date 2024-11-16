import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { CgClose } from 'react-icons/cg';
import { FaCircleCheck } from "react-icons/fa6";
import { userAuth } from '../utils/auth/userAuth';

const Login = () => {
    const [user, setUser] = useState({ email: "", password: "" });
    const [showErrorMsg, setShowErrorMsg] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const nav = useNavigate();
    const { login } = useContext(userAuth);

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        await login(user).then(function (res) {
            const response = res;
            console.log('res: ', response);
            if (response.error) {
                if (response.message === "Request body incomplete, both email and password are required") {
                    setErrorMsg("Both Email and Password are required")
                } else {
                    setErrorMsg(response.message);
                }
                setShowErrorMsg(true);
            } else {
                setShowSuccessModal(true);
                setTimeout(() => {
                    nav("/")
                }, 10000);
            }
        });
    };

    const handleSuccessModalClose = () => {
        setShowSuccessModal(false);
        nav("/");
    };

    const directRegisterPage = () => {
        nav("/register");
    }
    return (
        <>
            <div className='fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex justify-center items-center h-screen'>
                <div className='bg-[#FFFFFF] dark:bg-[#2C2C2C] p-10 rounded-lg shadow-md text-[#444444] dark:text-[#FFFFFF]'>
                    <h2 className='text-2xl mb-4 text-center font-bold'>Login</h2>
                    {/* Error Message */}
                    {showErrorMsg && (
                        <div className='text-[#FC5A5A] text-center font-medium mb-2'>{errorMsg}</div>
                    )}
                    <form onSubmit={handleLoginSubmit}>
                        <div className='mb-4'>
                            <label htmlFor='username' className='block mb-2'>
                                Email
                            </label>
                            <input
                                className='w-full px-3 py-2 border dark:border-[#FFFFFF5C] rounded text-black dark:text-[#FFFFFF] dark:bg-[#2C2C2C]'
                                id='email'
                                type='text'
                                value={user.email}
                                onChange={e => setUser({ ...user, email: e.target.value, error: '' })}
                                placeholder='Email'
                            />
                        </div>

                        <div className='mb-4'>
                            <label htmlFor='password' className='block mb-2'>
                                Password
                            </label>
                            <input
                                className='w-full px-3 py-2 border  dark:border-[#FFFFFF5C] rounded text-black dark:text-[#FFFFFF] dark:bg-[#2C2C2C]'
                                id='password'
                                type='password'
                                value={user.password}
                                onChange={e => setUser({ ...user, password: e.target.value, error: '' })}
                                placeholder='Password'
                            />
                        </div>
                        <button onClick={handleLoginSubmit} className='mt-2 w-full py-2 bg-[#17EBA0] dark:bg-[#008567] hover:bg-[#01A982] hover:ring hover:ring-[#01A9824D] hover:text-[#F7F7F7] text-[#444444] dark:text-white font-bold rounded-lg'>
                            Login
                        </button>
                    </form>

                    <p className='text-center mt-4'>
                        Don't have an account?{' '}
                        <button onClick={directRegisterPage} className='text-[#17EBA0] dark:text-[#008567] font-bold'>
                            Register
                        </button>
                    </p>
                </div>
            </div>
            {/* Success Modal */}
            {showSuccessModal && (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none" >
                        <div className="relative w-auto my-6 mx-auto">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white dark:bg-[#2C2C2C] outline-none focus:outline-none">
                                <div className="flex">
                                    <div className="flex-grow"></div>
                                    <button onClick={handleSuccessModalClose}>
                                        <CgClose className="text-[#444444] dark:text-[#FFFFFF] text-lg m-auto mr-4 mt-4" />
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="w-full flex flex-col items-center justify-center p-8">
                                    <FaCircleCheck className="animate-pulse text-9xl mx-auto mb-8 text-[#17EBA0] dark:text-[#008567]" />
                                    <h1 className="text-2xl font-semibold dark:text-[#FFFFFF] mb-4">Successfully Login!</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            )}
        </>
    );
}

export default Login;

