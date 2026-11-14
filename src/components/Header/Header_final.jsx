import { useState } from "react";
import "./Header_final.css";
import slogan  from "../../assets/slogan_shophoa.jpg";

const Header_final = () => {
  return (
    <header className="header">
      {/* ===== Menu bên trái ===== */}
      <nav className="menu">
        <ul>
          <li>Trang chủ</li>

          {/* Dropdown hover */}
          <li className="dropdown">
            Sản Phẩm
            <ul className="submenu">
              <li>Hoa tươi</li>
              <li>Hoa khô</li>
              <li>Quà tặng</li>
            </ul>
          </li>

          <li>Giới thiệu</li>
          <li>Liên hệ</li>
        </ul>
      </nav>

      {/* ===== Logo + Slogan ===== */}
<div className="logo-wrapper">
  <img
    src={slogan}
    alt="Slogan SHOP HOA"
    className="logo-slogan"
  />
  <div className="logo">🌸 Shop Hoa</div>
  <p className="site-desc">
    Website bán hoa tươi – giao nhanh – thiết kế đẹp
  </p>
</div>
    </header>
  );
};
export default Header_final;

//export default Header;


