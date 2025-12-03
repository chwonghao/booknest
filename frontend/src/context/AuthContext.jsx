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
    const checkAdminView = () => {
      if (user && user.role !== 'ADMIN' && isAdminView) {
        setIsAdminView(false);
        localStorage.removeItem('adminView');
      }
    };

    const fetchUserProfile = async () => {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 < Date.now()) {
          console.log("Token has expired.");
          logout();
          return;
        }

        const userEmail = decodedToken.sub;
        const userData = await profileApi(userEmail);
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        checkAdminView();
      } catch (error) {
        console.error("Invalid token or failed to fetch user profile:", error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    if (token && !user) {
      fetchUserProfile();
    } else {
      checkAdminView();
      setLoading(false);
    }
  }, [token]); // chỉ phụ thuộc vào token

  const login = async (email, password) => {
    try {
      const data = await loginApi({ email, password });
      const newToken = data.accessToken;

      // Tạm thời đặt token vào header để gọi API lấy thông tin người dùng
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      const decodedToken = jwtDecode(newToken);
      const userEmail = decodedToken.sub;
      const userData = await profileApi(userEmail, newToken);
      // *** Bắt đầu: Kiểm tra trạng thái người dùng ***
      if (userData.status !== 'ACTIVE') {
        // Xóa token tạm thời khỏi header
        delete axios.defaults.headers.common['Authorization'];
        let message = 'Tài khoản của bạn không hoạt động.';
        if (userData.status === 'BANNED') {
          message = 'Tài khoản của bạn đã bị khóa. Vui lòng liên hệ quản trị viên.';
        } else if (userData.status === 'INACTIVE') {
          message = 'Tài khoản của bạn đã bị tạm ngưng hoặc chưa được kích hoạt.';
        }
        return { success: false, message };
      }
      // *** Kết thúc: Kiểm tra trạng thái người dùng ***

      // Nếu trạng thái là ACTIVE, tiếp tục quá trình đăng nhập
      localStorage.setItem('authToken', newToken);
      setToken(newToken);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);

      // Nếu người dùng là admin, mặc định chuyển sang chế độ xem của người dùng thường
      if (userData.role === 'ADMIN') {
        setIsAdminView(true);
        localStorage.setItem('adminView', 'true');
      }
      return { success: true, user: userData };
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
