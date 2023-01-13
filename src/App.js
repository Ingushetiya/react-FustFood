import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import "./scss/app.scss"
// Надо очистить App от лишнего мусора

function App() {
  const [search, setSearch] = useState('')
  return (
    <div className="App">
      <div className="wrapper">
        <Header search={search} setSearch={setSearch} />
        <div className="content">
         
            <Routes>
              <Route exact path='/' element={<Home search={search} />}/>
              <Route exact path='/cart' element={<Cart />} />

            </Routes>
        
        </div>
      </div>
    </div>
  );
}

export default App;
