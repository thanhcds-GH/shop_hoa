import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import CartIcon from '../CartIcon/CartIcon';
import './Header.css';

function Header() {
  return (
    <header className="main-header">
      <div className="banner-section">
        <img 
          src="/images/webp/banner_nghe_thuat_ngang.webp" 
          alt="Shop Hoa Tươi - Quy Nhơn Fresh Flower" 
          className="banner-img" 
        />
        <div className="banner-top-controls">
          <div className="shop-branding">
            <span className="flower-icon">🌸</span>
            <span className="shop-name">Shop Hoa Tươi</span>
          </div>
          <div className="cart-wrapper">
            <CartIcon />
          </div>
        </div>
      </div>
      <nav className="nav-menu-bar">
        <div className="menu-flex">
          <ul className="main-menu">
            <li><NavLink to="/" end className="menu-item"><FaHome /> Trang chủ</NavLink></li>
            <li><NavLink to="/danh-muc" className="menu-item">Danh mục</NavLink></li>
            <li><NavLink to="/san-pham" className="menu-item">Sản phẩm</NavLink></li>
            <li><NavLink to="/gio-hang" className="menu-item">Giỏ hàng</NavLink></li>
            <li><NavLink to="/lien-he" className="menu-item">Liên hệ</NavLink></li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;