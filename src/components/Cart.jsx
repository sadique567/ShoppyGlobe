import React from 'react';
import { useSelector } from 'react-redux';
import CartItem from './CartItem';
import '../cssFolder/Cart.css'

const Cart = () => {
  const items = useSelector((state) => state.cart.items);

  return (
    <div className="cart">
      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        items.map((item) => <CartItem key={item.id} item={item} />)
      )}
    </div>
  );
};

export default Cart;