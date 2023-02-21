import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home';

import './scss/app.scss';
// import Cart from './pages/Cart';
// import FullPizza from './pages/FullPizza';
import MainLayout from './layouts/MainLayout';

const Cart = React.lazy(() => import(/*webpackChunkName: "Cart" */ './pages/Cart'));
const FullPizza = React.lazy(() => import(/*webpackChunkName: "FullPizza"*/ './pages/FullPizza'));

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<Home />} />
          <Route
            path="cart"
            element={
              <Suspense fallback={<div>Идет загрузка корзины ....</div>}>
                <Cart />
              </Suspense>
            }
          />
          <Route
            path="pizza/:id"
            element={
              <Suspense fallback={<div>И дет загрузка....</div>}>
                <FullPizza />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
