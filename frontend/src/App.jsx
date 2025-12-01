import React, { Suspense, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { ThemeProvider, CssBaseline, Box, CircularProgress } from '@mui/material';
import theme from './theme';
import { CartProvider } from "./context/CartContext";
import { AuthContext, AuthProvider } from "./context/AuthContext";

// Layouts
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";

// Pages
const HomePage = React.lazy(() => import('./pages/HomePage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const RegisterPage = React.lazy(() => import('./pages/RegisterPage'));
const ProductPage = React.lazy(() => import('./pages/ProductPage'));
const ProductsListPage = React.lazy(() => import('./pages/ProductsListPage.jsx'));
const CartPage = React.lazy(() => import('./pages/CartPage'));
const ProfilePage = React.lazy(() => import('./pages/ProfilePage'));
const CheckoutPage = React.lazy(() => import('./pages/CheckoutPage.jsx'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage.jsx'));

// Admin Pages
const DashboardPage = React.lazy(() => import('./pages/admin/DashboardPage'));
const ProductManagementPage = React.lazy(() => import('./pages/admin/ProductManagementPage'));
const OrderManagementPage = React.lazy(() => import('./pages/admin/OrderManagementPage'));
const UserManagementPage = React.lazy(() => import('./pages/admin/UserManagementPage'));
 
const AdminRoutesWrapper = () => {
  const { isAdminView } = useContext(AuthContext);
  return isAdminView ? <AdminLayout /> : <Navigate to="/" replace />;
};

const IndexPage = () => {
  const { isAdminView } = useContext(AuthContext);
  return isAdminView ? <Navigate to="/admin/dashboard" replace /> : <HomePage />;
};

const AppRoutes = () => {
  const { loading } = useContext(AuthContext);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Suspense fallback={<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress /></Box>}>
      <Routes>
        <Route element={<MainLayout />}>
        <Route index path="/" element={<IndexPage />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/products" element={<ProductsListPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
        <Route path="*" element={<NotFoundPage />} /></Route>
        <Route path="/admin" element={<AdminRoutesWrapper />}>
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="products" element={<ProductManagementPage />} />
        <Route path="orders" element={<OrderManagementPage />} />
        <Route path="users" element={<UserManagementPage />} /></Route>
      </Routes>
    </Suspense>
  );
};


export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <CartProvider>
          <AppRoutes />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}