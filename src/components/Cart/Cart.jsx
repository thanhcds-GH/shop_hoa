import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, decreaseQuantity, removeFromCart, clearCart } from '../../redux/slices/cartSlice';
import '../OrderForm/OrderForm.css'; // Dùng lại style form của OrderForm
import './Cart.css';

const emptyCustomer = { customerName: "", phone: "", address: "", note: "", paymentMethod: "COD" };

const Cart = () => {
  // Lấy danh sách sản phẩm từ Redux Store
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const [showCheckout, setShowCheckout] = useState(false); // Hiện form thanh toán
  const [customer, setCustomer] = useState(emptyCustomer);
  const [submitting, setSubmitting] = useState(false);     // Chặn bấm gửi 2 lần
  const [placedOrder, setPlacedOrder] = useState(null);    // Đơn vừa đặt thành công (để hiện màn hình xác nhận)

  // Tính tổng tiền cho toàn bộ giỏ hàng
  const totalPrice = cartItems.reduce((total, item) => {
    return total + (item.price * (item.quantity || 1));
  }, 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  // Gửi đơn hàng (thông tin khách + sản phẩm trong giỏ) tới json-server
  const handleCheckout = async (e) => {
    e.preventDefault();

    if (!customer.customerName.trim() || !customer.phone.trim() || !customer.address.trim()) {
      alert("Vui lòng nhập đầy đủ Họ tên, Số điện thoại và Địa chỉ giao hàng!");
      return;
    }
    if (!/^0\d{9}$/.test(customer.phone.trim())) {
      alert("Số điện thoại phải gồm 10 chữ số và bắt đầu bằng 0!");
      return;
    }

    const order = {
      ...customer,
      items: cartItems.map(({ id, name, price, quantity }) => ({ id, name, price, quantity: quantity || 1 })),
      totalPrice,
      status: "Chờ xác nhận",
      createdAt: new Date().toISOString(),
    };

    setSubmitting(true);
    try {
      const response = await fetch('http://localhost:3636/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      });

      if (response.ok) {
        const saved = await response.json();
        // Gộp với order đã gửi: màn hình xác nhận vẫn đủ dữ liệu dù server trả thiếu trường
        setPlacedOrder({ ...order, ...saved });
        dispatch(clearCart());
        setCustomer(emptyCustomer);
        setShowCheckout(false);
      } else {
        alert(`Lỗi server (${response.status}): Không thể lưu đơn hàng. Hãy kiểm tra json-server đang chạy ở cổng 3636 (npm run server).`);
      }
    } catch (error) {
      console.error("Lỗi kết nối API:", error);
      alert("Lỗi kết nối: Hãy bật json-server bằng lệnh: npm run server");
    } finally {
      setSubmitting(false);
    }
  };

  // Màn hình cảm ơn sau khi đặt hàng thành công
  if (placedOrder) {
    return (
      <div className="cart-page container">
        <div className="order-success">
          <div className="order-success-icon" aria-hidden="true">✅</div>
          <h2>Đặt hàng thành công!</h2>
          <p className="order-success-meta">
            Mã đơn hàng #{placedOrder.id} · Tổng {placedOrder.totalPrice.toLocaleString('vi-VN')} ₫
          </p>
          <p>Cảm ơn {placedOrder.customerName}, chúng tôi sẽ gọi tới số {placedOrder.phone} để xác nhận.</p>
          <Link to="/" className="order-success-btn">Tiếp tục mua sắm</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page container">
      <h2 className="cart-title">Chi tiết giỏ hàng</h2>
      
      {cartItems.length === 0 ? (
        <div className="empty-message">
          <p>Giỏ hàng đang trống! Hãy chọn những bó hoa tươi thắm nhất nhé.</p>
          <Link to="/" className="btn-back">Quay lại cửa hàng</Link>
        </div>
      ) : (
        <div className="cart-container">
          <div className="cart-list">
            {cartItems.map((item, index) => (
              <div key={item.id || index} className="cart-item">
                
                {/* Khối 1: Hình ảnh sản phẩm */}
                <div className="cart-item-image-wrapper">
                  <img src={item.image} alt={item.name} className="cart-item-img" />
                </div>
                
                {/* Khối 2: Nội dung chính bao gồm Chi tiết và Thành tiền */}
                <div className="cart-item-content">
                  
                  {/* Khối 2.1: Chi tiết tên, giá, số lượng (Sẽ được khống chế width trong CSS) */}
                  <div className="cart-item-details">
                    <h4>{item.name}</h4>
                    <p className="price">Đơn giá: {item.price?.toLocaleString()}đ</p>
                    <div className="quantity-controls">
                      <button type="button" aria-label={`Giảm số lượng ${item.name}`} disabled={(item.quantity || 1) <= 1} onClick={() => dispatch(decreaseQuantity(item.id))}>−</button>
                      <span aria-label="Số lượng">{item.quantity || 1}</span>
                      <button type="button" aria-label={`Tăng số lượng ${item.name}`} onClick={() => dispatch(addToCart(item))}>+</button>
                      <button type="button" className="remove-btn" aria-label={`Xóa ${item.name} khỏi giỏ`} onClick={() => dispatch(removeFromCart(item.id))}>Xóa</button>
                    </div>
                    {item.note && <p className="cart-note">Ghi chú: {item.note}</p>}
                  </div>
                  
                  {/* Khối 2.2: Thành tiền (Sẽ nằm sát bên phải Khối 2.1) */}
                  <div className="cart-item-subtotal">
                    {(item.price * (item.quantity || 1)).toLocaleString()}đ
                  </div>
                  
                </div>
              </div>
            ))}
          </div>

          {/* Khối 3: Tổng kết giỏ hàng */}
          <div className="cart-summary">
            <h3>Tổng cộng: <span>{totalPrice.toLocaleString()}đ</span></h3>
            {!showCheckout && (
              <button className="checkout-btn" onClick={() => setShowCheckout(true)}>Tiến hành đặt hàng</button>
            )}
          </div>

          {/* Khối 4: Form thông tin giao hàng & thanh toán */}
          {showCheckout && (
            <div className="order-form-container">
              <h3>Thông tin giao hàng</h3>
              <form onSubmit={handleCheckout}>
                <div className="form-group">
                  <input name="customerName" value={customer.customerName} onChange={handleChange} placeholder="Họ và tên người nhận" />
                </div>
                <div className="form-group">
                  <input name="phone" type="tel" value={customer.phone} onChange={handleChange} placeholder="Số điện thoại (10 số)" />
                </div>
                <div className="form-group">
                  <input name="address" value={customer.address} onChange={handleChange} placeholder="Địa chỉ giao hàng" />
                </div>
                <div className="form-group">
                  <select name="paymentMethod" value={customer.paymentMethod} onChange={handleChange}>
                    <option value="COD">Thanh toán khi nhận hàng (COD)</option>
                    <option value="BANK">Chuyển khoản ngân hàng</option>
                  </select>
                </div>
                <div className="form-group">
                  <textarea name="note" value={customer.note} onChange={handleChange} placeholder="Ghi chú (thời gian giao, lời nhắn trên thiệp...)" />
                </div>
                <button type="submit" className="btn-submit" disabled={submitting}>
                  {submitting ? "Đang gửi đơn..." : `Xác nhận đặt hàng (${totalPrice.toLocaleString()}đ)`}
                </button>
                <button type="button" className="checkout-btn" onClick={() => setShowCheckout(false)}>Hủy</button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;