import products from "../../data/products";
import ProductCard from "../ProductCard/ProductCard.jsx";
import "./ProductList_new.css";

const ProductList_new = () => {
  return (
    <div id="product-list" className="product-grid">
      
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
};

export default ProductList_new;
