import React from 'react';
import '../cssFolder/NotFound.css'

const NotFound = () => {
  return <h2>404 - Page Not Found</h2>;
};

export default NotFound;




// import React from 'react';

// const NotFound = () => {
//   return <h2>404 - Page Not Found</h2>;
// };

// export default NotFound;

// // redux/cartSlice.js
// import { createSlice } from '@reduxjs/toolkit';

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState: { items: [] },
//   reducers: {
//     addToCart: (state, action) => {
//       state.items.push(action.payload);
//     },
//     removeFromCart: (state, action) => {
//       state.items = state.items.filter((item) => item.id !== action.payload);
//     },
//   },
// });

// export const { addToCart, removeFromCart } = cartSlice.actions;
// export default cartSlice.reducer;