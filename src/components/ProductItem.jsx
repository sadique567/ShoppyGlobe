import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartslice";
import "../cssFolder/ProductItem.css";
import { Link } from "react-router-dom";

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className="product-item">
      <Link to={`/product/${product.id}`}>
      <img src={product.thumbnail} alt={product.title} />
      <h3>{product.title}</h3>
      </Link>
      <p>₹{product.price}</p>
      <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
    </div>
  );
};

export default ProductItem;



// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { addToCart } from '../redux/cartSlice';
// import '../cssFolder/ProductItem.css'

// const ProductItem = ({ product }) => {
//   const dispatch = useDispatch();

//   return (
//     <div className="product-item">
//       <h3>{product.title}</h3>
//       <img src={product.thumbnail} alt={product.title} />
//       <p>${product.price}</p>
//       <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
//       <Link to={`/product/${product.id}`}>View Details</Link>
//     </div>
//   );
// };

// export default ProductItem;
