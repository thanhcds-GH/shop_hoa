import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';
import { flowers } from '../../data/products';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams(); // Lấy ID từ thanh địa chỉ
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const product = flowers.find((item) => item.id === Number(id));

  if (!product) {
    return (
      <div className="product-detail-container">
        <p>Không tìm thấy sản phẩm này.</p>
        <Link to="/san-pham">Xem tất cả sản phẩm</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    alert(`Đã thêm ${product.name} vào giỏ hàng!`);
  };

  const handleBuyNow = () => {
    dispatch(addToCart(product));
    navigate('/gio-hang');
  };

  return (
    <div className="product-detail-container">
      <button className="btn-back" onClick={() => navigate(-1)}>← Quay lại</button>

      <div className="product-detail-content">
        <div className="product-detail-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-detail-info">
          <h1>{product.name}</h1>
          <p className="product-category">{product.category}</p>
          <p className="product-price">{product.price.toLocaleString()}đ</p>
          <div className="product-description">
            <h3>Mô tả sản phẩm:</h3>
            <p>{product.description || "Đóa hoa tươi thắm được thiết kế riêng biệt, mang lại thông điệp yêu thương."}</p>
          </div>

          <div className="detail-actions">
            <button className="btn-add-detail" onClick={handleBuyNow}>Mua ngay</button>
            <button className="btn-add-detail btn-outline" onClick={handleAddToCart}>Thêm vào giỏ hàng</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
