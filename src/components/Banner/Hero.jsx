import "./Hero.css";
import heroImg from "../../assets/Banner_hoa.jpg"; // ảnh banner hoa

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-overlay">
        <h1>Hoa tươi mỗi ngày</h1>
        <p>
          Giao nhanh trong 2 giờ – Thiết kế theo yêu cầu – Giá tốt
        </p>
        <button className="hero-btn">Mua ngay</button>
      </div>
    </section>
  );
};

export default Hero;
