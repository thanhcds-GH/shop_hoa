import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice'; // Nhập reducer từ file bạn vừa tạo

// Đọc giỏ hàng đã lưu trong trình duyệt để không mất khi tải lại trang
// shortcut: giá trong giỏ là giá lúc thêm vào; khi có backend thật cần tính lại giá phía server
const loadCart = () => {
  try {
    const saved = JSON.parse(localStorage.getItem('cart'));
    return saved && Array.isArray(saved.items) ? saved : undefined;
  } catch {
    return undefined; // Dữ liệu hỏng hoặc trình duyệt chặn localStorage: bắt đầu với giỏ trống
  }
};

const savedCart = loadCart();

export const store = configureStore({
  reducer: {
    cart: cartReducer, // Đặt tên kho dữ liệu giỏ hàng là 'cart'
  },
  preloadedState: savedCart && { cart: savedCart },
});

store.subscribe(() => {
  try {
    localStorage.setItem('cart', JSON.stringify(store.getState().cart));
  } catch {
    // Không lưu được (chế độ riêng tư, hết dung lượng): giỏ hàng vẫn dùng được trong phiên này
  }
});
