import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
const url = import.meta.env.VITE_URL
export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const [token, setToken] = useState(() => {
        return localStorage.getItem('token') || null;
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);

    const login = async (email, password) => {
        try {
            const res = await axios.post(`${url}/auth/login`, { email, password });
    
            const loggedInUser = { 
                id: res.data.payload.user.id
            };
    
            setUser(loggedInUser);
            setToken(res.data.token);
            return loggedInUser;
        } catch (error) {
            console.error("Login Error:", error.response?.data?.error || error.message);
            throw new Error(error.response?.data?.error || "Login failed");
        }
    };

    const signup = async (username, email, password) => {
        try {
            const res = await axios.post(`${url}/auth/signup`, { username, email, password });
    
            return res.data;
        } catch (error) {
            console.error("Signup Error:", error.response?.data?.error || error.message);
            throw new Error(error.response?.data?.error || "Signup failed");
        }
    };
    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };  

    

    return (
        <AuthContext.Provider value={{ user, token, login, signup,logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;