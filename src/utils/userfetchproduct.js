import { useState, useEffect } from "react";

const useFetchProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        // Backend Products
        const backendRes = await fetch("https://shoppyglobalapis.onrender.com/api/getdata");
        const backendData = await backendRes.json();
        const backendProducts = backendData.map(p => ({ ...p, source: "backend" }));

        // DummyJSON Products
        const dummyRes = await fetch("https://dummyjson.com/products");
        const dummyData = await dummyRes.json();
        const dummyProducts = dummyData.products.map(p => ({ ...p, source: "dummyjson" }));

        setProducts([...backendProducts, ...dummyProducts]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  return { products, loading, error };
};

export default useFetchProducts;
