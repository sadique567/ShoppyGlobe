// src/hooks/store.js OR src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../redux/cartSlice'; // correct path

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;


// import { configureStore } from '@reduxjs/toolkit';
// import cartReducer from './cartSlice';

// const store = configureStore({
//   reducer: {
//     cart: cartReducer,
//   },
// });

// export default store;