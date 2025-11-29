import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import i18n from "../i18n"; // Đường dẫn này bây giờ đã đúng vì i18n.js nằm ở src/
import { loginApi, registerApi, profileApi } from "../api/authApi";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem('authToken'));
  const [loading, setLoading] = useState(true);
  const [isAdminView, setIsAdminView] = useState(() => {
    return localStorage.getItem('adminView') === 'true';
  });

  useEffect(() => {
    // Nếu user không phải admin, luôn tắt chế độ xem admin
    if (user && user.role !== 'ADMIN') {
      if (isAdminView) {
        setIsAdminView(false);
        localStorage.removeItem('adminView');
      }
    }

    if (token && !user) {
      const fetchUserProfile = async () => {
        try {
          const decodedToken = jwtDecode(token);
          if (decodedToken.exp * 1000 < Date.now()) {
            console.log("Token has expired.");
            logout();
            return;
          }

          const userEmail = decodedToken.sub;
          const userData = await profileApi({ email: userEmail });

          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
        } catch (error) {
          console.error("Invalid token or failed to fetch user profile:", error);
          logout();
        } finally {
          setLoading(false); // Chỉ kết thúc loading sau khi xử lý xong
        }
      };

      fetchUserProfile();
    } else {
      setLoading(false); // Nếu không cần fetch thì kết thúc luôn
    }
  }, [token, user]);


  const login = async (email, password) => {
    try {
      const data = await loginApi({ email, password });
      const newToken = data.accessToken;
      const decodedToken = jwtDecode(newToken);
      const userEmail = decodedToken.sub;

      localStorage.setItem('authToken', newToken);
      setToken(newToken);
      const userData = await profileApi({ email: userEmail });
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);

      // Nếu người dùng là admin, bật chế độ xem admin theo mặc định
      if (userData.role === 'ADMIN') {
        setIsAdminView(false);
        localStorage.setItem('adminView', 'false');
      }
      return { success: true };
    } catch (error) {
      console.error('Login failed:', error);
      const message = error.response?.data?.message || i18n.t('auth.loginFailed');
      return { success: false, message };
    }
  };

  const register = async (userData) => {
    try {
      await registerApi(userData);
      return { success: true };
    } catch (error) {
      console.error('Registration failed:', error);
      const message = error.response?.data?.message || i18n.t('auth.registerFailed');
      return { success: false, message };
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('adminView');
    setUser(null);
    setToken(null);
    setIsAdminView(false);
    delete axios.defaults.headers.common['Authorization'];
  };

  if (loading) {
    return <div>Loading Application...</div>; // Hoặc một component spinner đẹp hơn
  }

  const updateUser = (updatedData) => {
    const newUser = { ...user, ...updatedData };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const toggleAdminView = () => {
    if (user?.role === 'ADMIN') {
      const newAdminView = !isAdminView;
      setIsAdminView(newAdminView);
      localStorage.setItem('adminView', newAdminView);
    }
  };

  return (
    <AuthContext.Provider value={{ user, updateUser, login, logout, register, isAuthenticated: !!token, isAdminView, toggleAdminView, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
