import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import products from '../data/products';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Tìm sản phẩm dựa trên id từ URL
  const product = products.find((item) => item.id === parseInt(id));

  if (!product) {
    return <div className="container">Không tìm thấy sản phẩm!</div>;
  }

  return (
    <div className="container" style={{ padding: '40px 20px', display: 'flex', gap: '40px' }}>
      <div className="product-image" style={{ flex: 1 }}>
        <img 
          src={product.image} 
          alt={product.name} 
          style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }} 
        />
      </div>

      <div className="product-info" style={{ flex: 1 }}>
        <button onClick={() => navigate(-1)} style={{ marginBottom: '20px', cursor: 'pointer' }}>
          ← Quay lại
        </button>
        
        <h1>{product.name}</h1>
        <p style={{ fontSize: '24px', color: '#e91e63', fontWeight: 'bold' }}>
          {product.price.toLocaleString()} VNĐ
        </p>
        
        <div style={{ margin: '20px 0', lineHeight: '1.6' }}>
          <h3>Mô tả sản phẩm:</h3>
          <p>{product.description || "Dòng hoa tươi thắm, thích hợp làm quà tặng ý nghĩa cho người thân yêu."}</p>
        </div>

        <button style={{
          backgroundColor: '#4CAF50',
          color: 'white',
          padding: '12px 24px',
          border: 'none',
          borderRadius: '4px',
          fontSize: '18px',
          cursor: 'pointer'
        }}>
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;