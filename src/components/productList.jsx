import React from "react";
import useFetchProducts from "../utils/userfetchproduct";
import ProductItem from "./ProductItem";
import "../cssFolder/ProductList.css";

const ProductList = () => {
  const { products, loading, error } = useFetchProducts();

  if (loading) return <h2>Loading...</h2>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductItem
          key={`${product.source}-${product.id}`}
          product={product}
          source={product.source}
        />
      ))}
    </div>
  );
};

export default ProductList;
