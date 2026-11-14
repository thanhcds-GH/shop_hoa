
import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import './ProductList.css'; // BẮT BUỘC PHẢI CÓ DÒNG NÀY
function ProductList({ flowers }) {
  return (
    <div className="product-container">
      <div className="product-grid">
        {flowers && flowers.map((flower) => (
          <ProductCard key={flower.id} flower={flower} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;