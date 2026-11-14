import React from 'react';
import { useDispatch } from 'react-redux'; // Bổ sung hook để gửi hành động
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaShoppingCart } from 'react-icons/fa';
import { addToCart } from '../../redux/slices/cartSlice'; // Đảm bảo đúng đường dẫn file
import './ProductCard.css';

function ProductCard({ flower }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const detailPath = `/san-pham/${flower.id}`;

  // Icon giỏ hàng: thêm vào giỏ và ở lại trang để mua tiếp
  const handleAddToCart = () => {
    dispatch(addToCart(flower));
    alert(`Đã thêm ${flower.name} vào giỏ hàng!`);
  };

  // "Mua ngay": thêm vào giỏ rồi chuyển thẳng tới giỏ hàng để đặt
  const handleBuyNow = () => {
    dispatch(addToCart(flower));
    navigate('/gio-hang');
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <Link to={detailPath}>
          <img src={flower.image} alt={flower.name} />
        </Link>
        <div className="hover-actions">
          <button className="icon-btn" aria-label="Xem chi tiết" onClick={() => navigate(detailPath)}><FaEye /></button>
          <button className="icon-btn" aria-label="Thêm vào giỏ" onClick={handleAddToCart}><FaShoppingCart /></button>
        </div>
      </div>
      <div className="product-info">
        <h3><Link to={detailPath} className="product-link">{flower.name}</Link></h3>
        <p className="price">{flower.price?.toLocaleString()}đ</p>
        <button className="buy-btn" onClick={handleBuyNow}>
          Mua ngay
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
