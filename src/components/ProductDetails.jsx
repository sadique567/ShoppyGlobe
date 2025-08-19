import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

export default function ProductDetails() {
  const { id } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  const queryParams = new URLSearchParams(location.search);
  const source = queryParams.get("source");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        let url = "";

        if (source === "backend") {
          url = `https://shoppyglobalapis.onrender.com/api/getdata/${id}`;
        } else if (source === "dummyjson") {
          url = `https://dummyjson.com/products/${id}`;
        } else {
          throw new Error("Invalid product source");
        }

        const res = await fetch(url);
        if (!res.ok) throw new Error("Product not found");

        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProduct();
  }, [id, source]);

  if (error) return <h2 style={{ color: "red" }}>Error: {error}</h2>;
  if (!product) return <h2>Loading...</h2>;

  return (
    <div
      style={{
        display: "flex",
        gap: "30px",
        padding: "30px",
        maxWidth: "1000px",
        margin: "auto",
        alignItems: "flex-start",
        background: "#fff",
        borderRadius: "10px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
      }}
    >
      {/* Left Side Image */}
      <div style={{ flex: "1", textAlign: "center" }}>
        <img
          src={product.productImage || product.thumbnail}
          alt={product.productName || product.title}
          style={{
            width: "100%",
            maxWidth: "350px",
            height: "auto",
            borderRadius: "10px",
            objectFit: "cover",
            border: "1px solid #ddd",
            padding: "10px",
            background: "#f9f9f9",
          }}
        />
      </div>

      {/* Right Side Details */}
      <div style={{ flex: "2" }}>
        <h2 style={{ fontSize: "28px", marginBottom: "10px" }}>
          {product.productName || product.title}
        </h2>
        <h3 style={{ color: "#ff5722", marginBottom: "15px", fontSize: "22px" }}>
          ₹{product.productPrice || product.price}
        </h3>
        <p style={{ fontSize: "16px", lineHeight: "1.6", color: "#555" }}>
          {product.productDescription || product.description}
        </p>
      </div>
    </div>
  );
}
