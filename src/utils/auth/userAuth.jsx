import React, { createContext, useState } from 'react';

export const userAuth = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [response, setResonse] = useState(null);
    
    // Handle the user login process and store the token in the local Storage
    const login = async (user) => {
        return fetch('http://4.237.58.241:3000/user/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: user.email, password: user.password }),
        })
            .then((res) =>
                res.json().then((res) => {
                    console.log('response: ', res);
                    setResonse(res);
                    if (res.error) {
                        console.log(res.error);
                    } else {
                        localStorage.setItem("token", res.token);
                        setIsLoggedIn(true);
                    }
                    return res;
                })
            )
            .catch((error) => console.log(error));
    };

    const logout = () => {
        // Set isLoggeIn to false and clear the token in the local storage
        localStorage.clear();
        setIsLoggedIn(false);
    };

    return (
        <userAuth.Provider value={{ response, isLoggedIn, login, logout }}>
            {children}
        </userAuth.Provider>
    );
};
