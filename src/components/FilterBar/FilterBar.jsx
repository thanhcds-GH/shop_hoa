import React from 'react';
import './FilterBar.css';

function FilterBar({ activeCategory, onFilterChange }) {
  // Danh sách này phải khớp 100% với thuộc tính category trong products.js
  const categories = ['Tất cả', 'Hoa Cưới', 'Hoa Sinh Nhật', 'Hoa Khai Trương'];

  return (
    <div className="filter-bar">
      {categories.map((category) => (
        <button
          key={category}
          className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
          onClick={() => onFilterChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;