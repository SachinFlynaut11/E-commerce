import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authApi } from '../axios/apiCall';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setUser(null);
  }, []);

  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await authApi.getMe();
      setUser(response.data);
    } catch {
      logout();
    } finally {
      setLoading(false);
    }
  }, [logout]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const login = async (credentials) => {
    const response = await authApi.login(credentials);
    localStorage.setItem('token', response.data.token);
    setUser(response.data.user);
    return response;
  };

  const register = async (userData) => {
    const response = await authApi.register(userData);
    localStorage.setItem('token', response.data.token);
    setUser(response.data.user);
    return response;
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
