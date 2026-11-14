import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'; // 1. Import Link
import './CartIcon.css';

const CartIcon = () => {
  // 1. Lấy danh sách sản phẩm từ kho 'cart'
  const cartItems = useSelector((state) => state.cart.items);

  // 2. Tính tổng số lượng hoa
  const totalQuantity = cartItems.reduce((total, item) => total + (item.quantity || 0), 0);

  return (
    // 2. Bọc toàn bộ container bằng Link và trỏ đến đường dẫn /gio-hang
    <Link to="/gio-hang" className="cart-link-wrapper" style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="cart-icon-container">
        <FaShoppingCart className="main-cart-icon" />
        {/* 3. Hiển thị badge số lượng */}
        {totalQuantity > 0 && (
          <span className="cart-badge">{totalQuantity}</span>
        )}
      </div>
    </Link>
  );
};

export default CartIcon;