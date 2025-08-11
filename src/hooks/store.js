import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../redux/cartSlice'; // correct path

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;

