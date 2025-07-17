import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "../cssFolder/Header.css"

const Header = () => {
  const cartItems = useSelector((state) => state.cart.items);
  return (
    <header className="header">
      <nav>
        <Link to="/">ShoppyGlobe</Link>
        <Link to="/cart">Cart ({cartItems.length})</Link>
      </nav>
    </header>
  );
};

export default Header;
