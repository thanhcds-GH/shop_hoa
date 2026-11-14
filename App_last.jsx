
import React, { useState } from 'react';
// Import các thành phần của React Router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 

import Header from './components/Header/Header';
import FilterBar from './components/FilterBar/FilterBar';
import ProductList from './components/ProductList/ProductList';
import OrderForm from './components/OrderForm/OrderForm';
import Footer from './components/Footer/Footer';
import Cart from './components/Cart/Cart'; // Đảm bảo bạn đã có file Cart.jsx trong thư mục components/Cart/
import { flowers } from "./data/products";
import './styles/App.css';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');

  // Logic lọc sản phẩm cho trang chủ
  const filteredProducts = selectedCategory === 'Tất cả' 
    ? flowers 
    : flowers.filter(item => item.category === selectedCategory);

  return (
    <Router>
      <div className="app-wrapper" style={{ width: '100%', minHeight: '100vh' }}>
        {/* Header nằm ngoài Routes để luôn hiển thị ở mọi trang */}
        <Header />
        
        <Routes>
          {/* ĐỊNH NGHĨA TRANG CHỦ (Path: "/") */}
          <Route path="/" element={
            <main className="container-fluid" style={{ padding: '0' }}>
              {/* Phần 1: Bộ sưu tập mới */}
              <section className="section-padding">
              
                <ProductList flowers={flowers.slice(0, 4)} /> 
              </section>

              <hr className="divider" />

              {/* Phần 2: Sản phẩm nổi bật + Bộ lọc */}
              <section className="section-padding">
               
                <FilterBar 
                  activeCategory={selectedCategory} 
                  onFilterChange={(cat) => setSelectedCategory(cat)} 
                />
                <ProductList flowers={filteredProducts} />
              </section>

              {/* Phần 3: Form đặt hoa theo yêu cầu */}
              <section className="order-section" style={{ backgroundColor: '#fff5f7', padding: '40px 0' }}>
                 <OrderForm />
              </section>
            </main>
          } />

          {/* ĐỊNH NGHĨA TRANG GIỎ HÀNG (Path: "/gio-hang") */}
          <Route path="/gio-hang" element={<Cart />} /> 

        </Routes>

        {/* Footer nằm ngoài Routes để luôn hiển thị ở cuối mọi trang */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;