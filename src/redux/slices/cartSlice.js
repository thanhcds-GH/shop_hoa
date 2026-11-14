import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [], totalCount: 0 },
  reducers: {
    addToCart: (state, action) => {
      // 1. Tìm xem sản phẩm đã tồn tại trong giỏ hàng chưa
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        // 2. Nếu đã có: Chỉ tăng số lượng của sản phẩm đó
        existingItem.quantity += 1;
      } else {
        // 3. Nếu chưa có: Thêm sản phẩm mới vào mảng và đặt số lượng mặc định là 1
        state.items.push({ ...action.payload, quantity: 1 });
      }
      
      // Cập nhật tổng số lượng hiển thị trên icon giỏ hàng
      state.totalCount += 1;
    },
    
    // Bổ sung thêm logic giảm số lượng nếu chị muốn làm nút (-) trong giỏ hàng
    decreaseQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.totalCount -= 1;
      }
    },

    // Bổ sung thêm logic xóa hẳn sản phẩm khỏi giỏ hàng
    removeFromCart: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        state.totalCount -= item.quantity;
        state.items = state.items.filter(i => i.id !== action.payload);
      }
    },

    // Xóa toàn bộ giỏ hàng sau khi đặt hàng thành công
    clearCart: (state) => {
      state.items = [];
      state.totalCount = 0;
    }
  }
});

export const { addToCart, decreaseQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;