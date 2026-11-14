import './MainLayout.css';

function MainLayout({ children }) {
  return (
    <div className="main-layout">
      <nav className="navbar">
        <div className="menu">
          <span>Trang chủ</span> <span>Danh mục</span> <span>Sản phẩm</span>
        </div>
        <div className="logo">🌸 Shop Hoa</div>
        <div className="cart-icon">🛒 <span className="badge">3</span></div>
      </nav>
      <main>{children}</main>
    </div>
  );
}
export default MainLayout;