import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Products from "./pages/admin/Products";
import Orders from "./pages/admin/Orders";
import Payments from "./pages/admin/Payments";
import Settings from "./pages/admin/Settings";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <>
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={
            <ProtectedRoute><Checkout /></ProtectedRoute>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={
            <ProtectedRoute><Profile /></ProtectedRoute>
          } />
          {/* Admin */}
          <Route path="/admin" element={
            <ProtectedRoute role="ADMIN"><Dashboard /></ProtectedRoute>
          } />
          <Route path="/admin/users" element={
            <ProtectedRoute role="ADMIN"><Users /></ProtectedRoute>
          } />
          <Route path="/admin/products" element={
            <ProtectedRoute role="ADMIN"><Products /></ProtectedRoute>
          } />
          <Route path="/admin/orders" element={
            <ProtectedRoute role="ADMIN"><Orders /></ProtectedRoute>
          } />
          <Route path="/admin/payments" element={
            <ProtectedRoute role="ADMIN"><Payments /></ProtectedRoute>
          } />
          <Route path="/admin/settings" element={
            <ProtectedRoute role="ADMIN"><Settings /></ProtectedRoute>
          } />
        </Routes>
      </main>
    </>
  );
}
