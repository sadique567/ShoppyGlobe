import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './hooks/store';
import Header from './components/header' 
import NotFound from './components/NotFound';

const ProductList = lazy(() => import('./components/productList'));
const ProductDetail = lazy(() => import('./components/ProductDetails'));
const Cart = lazy(() => import('./components/Cart'));
const CenteredAuthTabs = lazy(() => import('./components/Login'));
const AddProductsPage = lazy(()=>import('./components/AddNewProduct'))

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<CenteredAuthTabs />} />
            <Route path="/addNewProduct" element={<AddProductsPage />} />
            <Route path="*" element={<NotFound />} />addNewProduct
          </Routes>
        </Suspense>
      </Router>
    </Provider>
  );
}

export default App;