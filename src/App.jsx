import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Header from './components/Header/Header';
import FilterBar from './components/FilterBar/FilterBar';
import ProductList from './components/ProductList/ProductList';
import ProductDetail from './components/ProductDetail/ProductDetail';
import OrderForm from './components/OrderForm/OrderForm';
import Footer from './components/Footer/Footer';
import Cart from './components/Cart/Cart';
import { flowers } from "./data/products";
import { contact } from "./data/contact";
import './styles/App.css';

// Danh mục lấy thẳng từ dữ liệu sản phẩm nên luôn khớp với products.js
const categories = [...new Set(flowers.map(item => item.category))];

function App() {
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');

  const filteredProducts = selectedCategory === 'Tất cả'
    ? flowers
    : flowers.filter(item => item.category === selectedCategory);

  return (
    <Router>
      <div className="app-wrapper" style={{ width: '100%', minHeight: '100vh' }}>
        <Header />

        <Routes>
          <Route path="/" element={
            <main className="container-fluid" style={{ padding: '0' }}>
              {/* Phần 1: Bộ sưu tập mới nhất */}
              <section className="section-padding">
                <ProductList flowers={flowers.slice(0, 5)} section="new" />
              </section>

              <hr className="divider" />

              {/* Phần 2: Sản phẩm nổi bật + Bộ lọc */}
              <section className="section-padding">
                <FilterBar
                  activeCategory={selectedCategory}
                  onFilterChange={(cat) => setSelectedCategory(cat)}
                />
                <ProductList flowers={filteredProducts} section="featured" />
              </section>

              {/* Phần 3: Form đặt hoa theo yêu cầu */}
              <section className="order-section" style={{ backgroundColor: '#fff5f7', padding: '40px 0' }}>
                 <OrderForm />
              </section>
            </main>
          } />

          {/* Sản phẩm: toàn bộ sản phẩm kèm bộ lọc */}
          <Route path="/san-pham" element={
            <main>
              <FilterBar activeCategory={selectedCategory} onFilterChange={setSelectedCategory} />
              <ProductList flowers={filteredProducts} title="TẤT CẢ SẢN PHẨM" />
            </main>
          } />

          <Route path="/san-pham/:id" element={<ProductDetail />} />

          {/* Danh mục: sản phẩm xếp theo từng nhóm */}
          <Route path="/danh-muc" element={
            <main>
              {categories.map(category => (
                <ProductList
                  key={category}
                  title={category.toUpperCase()}
                  flowers={flowers.filter(item => item.category === category)}
                />
              ))}
            </main>
          } />

          <Route path="/lien-he" element={
            <main>
              <div className="contact-page">
                <div className="section-shape">LIÊN HỆ</div>
                <p>📍 Địa chỉ: {contact.address}</p>
                <p>📞 Hotline: <a href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phone}</a></p>
                <p>✉️ Email: <a href={`mailto:${contact.email}`}>{contact.email}</a></p>
              </div>
              <OrderForm />
            </main>
          } />

          <Route path="/gio-hang" element={<Cart />} />

          {/* Địa chỉ không tồn tại: báo rõ thay vì để trang trắng */}
          <Route path="*" element={
            <main className="contact-page">
              <p>Không tìm thấy trang này.</p>
              <Link to="/">Về trang chủ</Link>
            </main>
          } />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
