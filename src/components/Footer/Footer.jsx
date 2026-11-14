        import React from 'react';
import { contact } from '../../data/contact';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Cột 1: Giới thiệu */}
        <div className="footer-column">
          <h3 className="footer-logo">🌸 Shop Hoa Tươi</h3>
          <p>Sắc hoa cho ngày mới - Chuyên cung cấp các loại hoa tươi thiết kế cao cấp cho mọi dịp lễ.</p>
        </div>

        {/* Cột 2: Danh mục */}
        <div className="footer-column">
          <h4>Danh mục</h4>
          <ul>
            <li><a href="#products">Hoa Cưới</a></li>
            <li><a href="#products">Hoa Sinh Nhật</a></li>
            <li><a href="#products">Hoa Khai Trương</a></li>
          </ul>
        </div>

        {/* Cột 3: Hỗ trợ */}
        <div className="footer-column">
          <h4>Hỗ trợ</h4>
          <ul>
            <li>Chính sách giao hàng</li>
            <li>Chính sách bảo mật</li>
            <li>Câu hỏi thường gặp</li>
          </ul>
        </div>

        {/* Cột 4: Liên hệ */}
        <div className="footer-column">
          <h4>Liên hệ</h4>
          <p>📍 Địa chỉ: {contact.address}</p>
          <p>📞 Hotline: {contact.phone}</p>
          <p>✉️ Email: {contact.email}</p>
        </div>

        {/* Cột 5: Bản đồ */}
        <div className="footer-column footer-column-map">
          <h4>Bản đồ</h4>
          <div className="footer-map-wrapper">
            <iframe 
              title="Bản đồ Shop Hoa Tươi"
              src="https://www.google.com/maps/embed?pb=..." // Thay bằng link nhúng thật của bạn
              width="100%" 
              height="150" 
              style={{ border: 0, borderRadius: "8px" }} 
              allowFullScreen="" 
              loading="lazy">
            </iframe>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Shop Hoa Tươi - Sắc hoa cho ngày mới. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
