import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Cart from './pages/Cart';
import './scss/app.scss';
import FullPizza from './pages/FullPizza';
import MainLayout from './layouts/MainLayout';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="pizza/:id" element={<FullPizza />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
