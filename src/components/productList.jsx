import React from "react";
import useFetchProduct from "../utils/userfetchproduct.js";
import ProductItem from "./ProductItem"
import "../cssFolder/ProductList.css";

const ProductList = () => {
  const { products, loading, error } = useFetchProduct();

  if (loading) return <h2>Loading...</h2>;
  if (error) return <p>Error fetching products</p>;

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;


// import ProductItem from './ProductItem';
// import useFetchProducts from '../utils/userfetchproduct';
// import '../cssFolder/ProductList.css'

// const ProductList = () => {
//   const { products, error } = useFetchProducts();

//   if (error) return <div>Error loading products</div>;

//   return (
//     <div className="product-list">
//       {products.map((product) => (
//         <ProductItem key={product.id} product={product} />
//       ))}
//     </div>
//   );
// };

// export default ProductList;
