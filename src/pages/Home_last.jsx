
import Banner from "../components/Banner/Banner";
import ProductList from "../components/ProductList/ProductList";
import products from "../data/products";
// Bước 1: Import OrderForm
import OrderForm from "../components/OrderForm/OrderForm";

function Home() {
  return (
    <>
      <Banner products={products} />
      
      <div className="container">
         {/* FilterBar đã được bạn tích hợp sẵn trong ProductList ở các bước trước */}
         <ProductList products={products} />
      </div>

      {/* Bước 2: Đặt OrderForm ở đây để tạo điểm nhấn cuối trang chủ */}
      <section className="custom-order-wrapper">
         <OrderForm />
      </section>
    </>
  );
}

export default Home;