import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { IoMenuSharp } from "react-icons/io5";
import { userAuth } from '../utils/auth/userAuth';
import getUserToken from '../utils/auth/getUserToken';

const Navbar = () => {
    const [showMenu, setShowMenu] = useState(true);
    const { isLoggedIn, logout } = useContext(userAuth);
    const [ userLoginStatus, setUserLoginStatus] = useState(getUserToken() === null ? false : true);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
        setUserLoginStatus(getUserToken() === null ? false : true);
        console.log('status: ', userLoginStatus);
    };

    const handleLogout = () => {
        setUserLoginStatus(false);
        logout();
    }

    return (
        <nav className="lg:h-[10vh] flex items-center justify-between flex-wrap bg-[#FFFFFF] dark:bg-[#2C2C2C] px-6 py-4 drop-shadow-md">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <span className="font-bold text-2xl text-[#01A982] tracking-tight">CAB203 Assignment 2</span>
            </div>
            <div className="block lg:hidden">
                <button
                    className="flex items-center px-3 py-2 border-2 rounded text-[#17EBA0] border-[#17EBA0] hover:text-[#01A982] hover:border-[#01A982]"
                    onClick={toggleMenu}
                >
                    <IoMenuSharp />
                </button>
            </div>
            <div id="toggle-menu" className={`w-full block lg:flex lg:items-center lg:w-auto ${showMenu ? 'hidden' : ''}`}>
                <div className="text-sm lg:flex-grow">
                    <NavLink to="/"
                        className={({ isActive }) =>
                            isActive ? "block mt-4 lg:inline-block lg:mt-0 font-medium text-[#151515] dark:text-white text-xl mr-4" : "block mt-4 lg:inline-block lg:mt-0 font-medium text-[#757575] dark:text-[#FFFFFF80] text-xl hover:text-[#151515] dark:hover:text-white mr-4"
                        }>
                        Home
                    </NavLink>
                    <NavLink to="/volcano_list"
                        className={({ isActive }) =>
                            isActive ? "block mt-4 lg:inline-block lg:mt-0 font-medium text-[#151515] dark:text-white text-xl mr-4" : "block mt-4 lg:inline-block lg:mt-0 font-medium text-[#757575] dark:text-[#FFFFFF80] text-xl hover:text-[#151515] dark:hover:text-white mr-4"
                        }>
                        Volcano List
                    </NavLink>
                    {/* Check if the user log in or not and disply the corresponding button */}
                    {(isLoggedIn || userLoginStatus) ? (
                        <button onClick={handleLogout} className="mt-6 lg:mt-0 px-6 py-1 bg-[#17EBA0] dark:bg-[#008567] hover:bg-[#01A982] hover:ring hover:ring-[#01A9824D] hover:text-[#F7F7F7] text-[#444444] dark:text-white font-semibold text-xl rounded-lg ">Logout</button>
                    ) :
                        <NavLink to="/login"
                            className={({ isActive }) =>
                                isActive ? "block mt-4 lg:inline-block lg:mt-0 font-medium text-[#151515] dark:text-white text-xl mr-4" : "block mt-4 lg:inline-block lg:mt-0 font-medium text-[#757575] dark:text-[#FFFFFF80] text-xl hover:text-[#151515] dark:hover:text-white mr-4"
                            }>
                            Login
                        </NavLink>
                    }
                </div>
            </div>
        </nav>
    );
};

export default Navbar;