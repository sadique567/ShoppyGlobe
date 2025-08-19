import React, { useState, useEffect } from "react";

import { ADD_PRODUCT_API } from "../utils/baseApi"; // change to your API endpoint

export default function AddProductsPage() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    productName: "",
    productImage: "",
    productPrice: "",
    productDescription: "",
  });
  const [editId, setEditId] = useState(null);

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(ADD_PRODUCT_API);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        // Update
        await fetch(`${ADD_PRODUCT_API}/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      } else {
        // Create
        await fetch(ADD_PRODUCT_API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      }
      setFormData({
        id: "",
        productName: "",
        productImage: "",
        productPrice: "",
        productDescription: "",
      });
      setEditId(null);
      fetchProducts();
    } catch (err) {
      console.error("Error saving product:", err);
    }
  };

  const handleEdit = (product) => {
    setFormData(product);
    setEditId(product._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await fetch(`${ADD_PRODUCT_API}/${id}`, { method: "DELETE" });
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  return (
    <div className="min-h-screen bg-blue-200 flex flex-col items-center py-10">
      <div className="bg-green-300 border border-gray rounded-[30px] shadow-lg w-full max-w-4xl p-10">
        <h1 className="text-2xl font-bold mb-5 text-center">
          {editId ? "Edit Product" : "Add New Product"}
        </h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="id"
            type="number"
            placeholder="Product ID"
            value={formData.id}
            onChange={handleChange}
            required
            className="h-12 border rounded-[10px] px-3"
          />
          <input
            name="productName"
            placeholder="Product Name"
            value={formData.productName}
            onChange={handleChange}
            required
            className="h-12 border rounded-[10px] px-3"
          />
          <input
            name="productImage"
            placeholder="Product Image URL"
            value={formData.productImage}
            onChange={handleChange}
            required
            className="h-12 border rounded-[10px] px-3"
          />
          <input
            name="productPrice"
            type="number"
            placeholder="Product Price"
            value={formData.productPrice}
            onChange={handleChange}
            required
            className="h-12 border rounded-[10px] px-3"
          />
          <textarea
            name="productDescription"
            placeholder="Product Description"
            value={formData.productDescription}
            onChange={handleChange}
            required
            className="h-24 border rounded-[10px] px-3 md:col-span-2"
          />
          <button
            type="submit"
            className="h-12 rounded-[30px] bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition md:col-span-2"
          >
            {editId ? "Update Product" : "Add Product"}
          </button>
        </form>
      </div>

      {/* Product List */}
      <div className="bg-white rounded-[20px] shadow-lg w-full max-w-4xl p-5 mt-10">
        <h2 className="text-xl font-bold mb-4">Products List</h2>
        {products.length === 0 ? (
          <p className="text-gray-500">No products found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border">ID</th>
                  <th className="p-2 border">Image</th>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Price</th>
                  <th className="p-2 border">Description</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id}>
                    <td className="p-2 border">{p.id}</td>
                    <td className="p-2 border">
                      <img
                        src={p.productImage}
                        alt={p.productName}
                        className="h-12 w-12 object-cover rounded"
                      />
                    </td>
                    <td className="p-2 border">{p.productName}</td>
                    <td className="p-2 border">₹{p.productPrice}</td>
                    <td className="p-2 border">{p.productDescription}</td>
                    <td className="p-2 border flex gap-2">
                      <button
                        onClick={() => handleEdit(p)}
                        className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="bg-red-500 px-3 py-1 text-white rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
