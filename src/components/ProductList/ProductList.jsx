import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import './ProductList.css';

function ProductList({ flowers, section, title }) {
  return (
    <div className="product-container">
      {/* Shape tiêu đề */}
      <div className="section-shape">
        {section === 'new' && 'BỘ SƯU TẬP MỚI NHẤT'}
        {section === 'featured' && 'SẢN PHẨM NỔI BẬT'}
        {title}
      </div>

      {/* Grid sản phẩm */}
      <div className="product-grid">
        {flowers && flowers.map((flower) => (
          <ProductCard key={flower.id} flower={flower} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;

