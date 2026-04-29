import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const savedUser = localStorage.getItem('user_info');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user_info', JSON.stringify(userData));

        if (userData.type === "agency") {
            const existingAgencies = JSON.parse(localStorage.getItem("all_agency")) || [];
            const isExist = existingAgencies.find(a => a.email === userData.email);
            if (!isExist) {
                const updatedAgencies = [...existingAgencies, userData];
                localStorage.setItem('all_agency', JSON.stringify(updatedAgencies));
            }
        }

        if (userData.type !== "agency") {
            const existingUsers = JSON.parse(localStorage.getItem("all_users")) || [];
            const isExist = existingUsers.find(u => u.email === userData.email);
            if (!isExist) {
                const updatedUsers = [...existingUsers, userData];
                localStorage.setItem('all_users', JSON.stringify(updatedUsers));
            }
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user_info');
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};