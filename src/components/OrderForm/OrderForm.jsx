import React, { useState } from 'react';
import './OrderForm.css'; // Đảm bảo bạn đã có file CSS để giao diện đẹp hơn

const OrderForm = () => {
  // 1. Khởi tạo state với đầy đủ các trường dữ liệu
  const [order, setOrder] = useState({
    customerName: "",
    phone: "",
    flowerType: "Hoa Hồng",
    note: ""
  });

  // 2. Hàm cập nhật dữ liệu khi khách hàng nhập
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  };

  // 3. Hàm gửi dữ liệu tới API local (POST Method)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Chặn hành vi tải lại trang

    // Kiểm tra nhanh tính hợp lệ trước khi gửi
    if (!order.customerName || !order.phone) {
      alert("Vui lòng nhập đầy đủ Tên và Số điện thoại!");
      return;
    }

    try {
      // Thực hiện gửi yêu cầu POST tới endpoint /orders
      const response = await fetch('http://localhost:3636/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Khai báo gửi định dạng JSON
        },
        body: JSON.stringify(order), // Chuyển đối tượng sang chuỗi JSON
      });

      if (response.ok) {
        // Xử lý thành công: thông báo và reset form
        alert("Chúc mừng! Đơn hàng của bạn đã được ghi nhận vào db.json.");
        setOrder({ customerName: "", phone: "", flowerType: "Hoa Hồng", note: "" });
      } else {
        alert("Lỗi server: Không thể lưu đơn hàng.");
      }
    } catch (error) {
      console.error("Lỗi kết nối API:", error);
      alert("Lỗi kết nối: Hãy đảm bảo bạn đã bật json-server!");
    }
  };

  return (
    <div className="order-form-container">
      <h3>Đặt hoa theo yêu cầu</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input 
            name="customerName" 
            value={order.customerName} 
            onChange={handleChange} 
            placeholder="Họ và tên khách hàng" 
          />
        </div>
        
        <div className="form-group">
          <input 
            name="phone" 
            value={order.phone} 
            onChange={handleChange} 
            placeholder="Số điện thoại liên hệ" 
          />
        </div>

        <div className="form-group">
          <select name="flowerType" value={order.flowerType} onChange={handleChange}>
            <option value="Hoa Hồng">Hoa Hồng</option>
            <option value="Hoa Tulip">Hoa Tulip</option>
            <option value="Hoa Hướng Dương">Hoa Hướng Dương</option>
            <option value="Hoa Linh Lan">Hoa Linh Lan</option>
          </select>
        </div>

        <div className="form-group">
          <textarea 
            name="note" 
            value={order.note} 
            onChange={handleChange} 
            placeholder="Ghi chú thêm (ví dụ: Màu giấy gói, thời gian giao...)"
          />
        </div>

        <button type="submit" className="btn-submit">Gửi yêu cầu ngay</button>
      </form>
    </div>
  );
};

export default OrderForm;