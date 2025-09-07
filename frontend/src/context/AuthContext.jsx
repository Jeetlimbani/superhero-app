import React, { createContext, useState, useEffect } from 'react';
import { loginUser, registerUser, logoutUser } from '../api/authService.js';
import { getSuperheroes } from '../api/superheroService.js'; // Import a protected route service
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await getSuperheroes();
        // The backend responds with a cookie, and the user's role is in localStorage.
        // We can reconstruct the user object from the role.
        setUser({ role: localStorage.getItem('role') || 'user' });
      } catch (err) {
        setUser(null);
        localStorage.removeItem('role');
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (data) => {
    const response = await loginUser(data);
    // The backend's login response now returns 'user' object in the body
    setUser(response.data.user); // Store the full user object
    localStorage.setItem("role", response.data.user.role);
    navigate('/superheroes');
  };

  const register = async (data) => {
    await registerUser(data);
    navigate('/login');
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
    localStorage.removeItem('role');
    localStorage.removeItem('superheroes'); 
    localStorage.removeItem('favourites')
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;