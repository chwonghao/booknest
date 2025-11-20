import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import NotificationDropdown from "./NotificationDropdown";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

export default function Header() {
  const [query, setQuery] = useState("");
  const [openNoti, setOpenNoti] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const { cartCount } = useContext(CartContext);
  const navigate = useNavigate();

  const onSearch = (e) => {
    e.preventDefault();
    navigate(`/products?search=${encodeURIComponent(query)}`);
  };

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="logo">E-Shop</Link>
        <form className="search" onSubmit={onSearch}>
          <input
            placeholder="Tìm kiếm sản phẩm..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
        <nav className="nav">
          <Link to="/products">Sản phẩm</Link>
          <Link to="/cart">Giỏ hàng <span className="badge">{cartCount}</span></Link>

          <div className="dropdown">
            <button className="btn" aria-label="Thông báo" onClick={() => setOpenNoti((v) => !v)}>
              🔔
            </button>
            {openNoti && <NotificationDropdown onClose={() => setOpenNoti(false)} />}
          </div>

          {user ? (
            <>
              <Link to="/profile">Xin chào, {user.name}</Link>
              <button className="btn" onClick={logout}>Đăng xuất</button>
            </>
          ) : (
            <Link to="/login">Đăng nhập</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
