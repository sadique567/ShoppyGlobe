import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../cssFolder/Header.css";

const Header = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="header">
      <nav>
        <Link to="/">ShoppyGlobe</Link>
        <Link to="/cart">Cart ({cartItems.length})</Link>

        {token ? (
          <>
            <button onClick={handleLogout} className="logout-btn ml-5 mr-5 bg-slate-900">
              Logout
            </button>
            <Link to="/addNewProduct">Add New Product</Link>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
