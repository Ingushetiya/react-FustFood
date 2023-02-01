import React from 'react'
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import "./scss/app.scss"
import FullPizza from './pages/FullPizza';
import MainLayout from './layouts/MainLayout';
// Надо очистить App от лишнего мусора


function App() {


  return (
    <div className="App">

   
       <Routes>
          <Route path='/' element={<MainLayout />}>
              <Route exact path='' element={<Home/>} />
              <Route exact path='cart' element={<Cart />} />
              <Route exact path='pizza/:id' element={<FullPizza />} />
          </Route>
       </Routes>
         
            {/* <Routes>
              
            </Routes> */}
        
     
      </div>

  );
}

export default App;
