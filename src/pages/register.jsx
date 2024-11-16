import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { CgClose } from 'react-icons/cg';
import { FaCircleCheck } from "react-icons/fa6";

const Register = () => {
    const [user, setUser] = useState({
        email: null,
        password: null,
    })

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const nav = useNavigate();

    const onSubmit = (event) => {
        // Form validation
        event.preventDefault();
        fetch('http://4.237.58.241:3000/user/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: user.email, password: user.password }),
        })
            .then((res) =>
                res.json().then((res) => {
                    console.log('response: ', res);
                    if (res.error && res.error === true) {
                        if (res.message === "Request body incomplete, both email and password are required") {
                            setErrorMsg("Both Email and Password are required");
                            setShowErrorModal(true);
                        }
                        else {
                            setErrorMsg(res.message);
                            setShowErrorModal(true);
                        }
                    } else {
                        setShowSuccessModal(true);
                    }
                })
            )
            .catch((error) => console.log(error));
    }

    const directLoginPage = () => {
        nav("/login");
    }

    const handleSuccessModalClose = () => {
        setShowSuccessModal(false);
        nav("/login");
    };

    return (
        <>
            <div className='flex flex-col items-center'>
                <div className='fixed top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] p-10 bg-[#FFFFFF] dark:bg-[#2C2C2C] rounded-lg shadow-md max-w-[30%]'>
                    <h2 className='text-2xl mb-4 text-center font-bold dark:text-white'>Sign Up</h2>
                    {/* Error Message */}
                    {showErrorModal && (
                        <div className='text-[#FC5A5A] text-center'>{errorMsg}</div>
                    )}
                    <div className='mb-4'>
                        <label htmlFor='username' className='block mb-2 dark:text-white'>
                            Email
                        </label>
                        <input
                            type='text'
                            className='w-full px-3 py-2 border dark:border-[#FFFFFF5C] rounded text-black dark:text-[#FFFFFF] dark:bg-[#2C2C2C]'
                            name='email'
                            id='email'
                            value={user.username}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            placeholder='Email'
                        />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='password' className='block mb-2 dark:text-white'>
                            Password
                        </label>
                        <input
                            type='password'
                            className='w-full px-3 py-2 border dark:border-[#FFFFFF5C] rounded text-black dark:text-[#FFFFFF] dark:bg-[#2C2C2C]'
                            name='password'
                            id='password'
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            placeholder='Password'
                        />
                    </div>
                    <button
                        className='mt-2 w-full py-2 bg-[#17EBA0] dark:bg-[#008567] hover:bg-[#01A982] hover:ring hover:ring-[#01A9824D] hover:text-[#F7F7F7] text-[#444444] dark:text-white font-bold rounded-lg'
                        onClick={onSubmit}
                    >
                        Sign Up
                    </button>

                    <p className='mt-4 text-center dark:text-white'>
                        Already have an account?{' '}
                        <button onClick={directLoginPage} className='text-[#17EBA0] dark:text-[#008567] font-bold'>
                            Login
                        </button>
                    </p>
                </div>

                {/* Success Modal */}
                {showSuccessModal && (
                    <div className='fixed top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] bg-gray-100 p-4 rounded-md'>
                        <p className='text-center text-black'>You have been signed up successfully.</p>
                        <p className='text-center text-black'>You will be redirected to the login page.</p>
                    </div>
                )}
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
                                        <h1 className="text-2xl font-semibold dark:text-[#FFFFFF] mb-4">Successfully Created User Account</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                )}
            </div>
        </>
    )
}

export default Register;