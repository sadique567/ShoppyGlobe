import { Link } from "react-router-dom";
import "../cssFolder/ProductItem.css";

const ProductItem = ({ product, source }) => {
  return (
    <div className="product-item">
      <Link to={`/product/${product.id}?source=${source}`} className="product-link">
        <div className="product-image-container">
          <img
            src={product.productImage || product.thumbnail}
            alt={product.productName || product.title}
            className="product-image"
          />
        </div>
        <div className="product-info">
          <h3 className="product-title">{product.productName || product.title}</h3>
          <p className="product-price">₹{product.productPrice || product.price}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductItem;
