import React from 'react'


import Header from './components/Header';



import "./scss/app.scss"
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import Cart from './pages/Cart';
// Надо очистить App от лишнего мусора

function App() {



  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
         
            <Routes>
              <Route exact path='/' element={<Home />}/>
              <Route exact path='/cart' element={<Cart />} />

            </Routes>
        
        </div>
      </div>
    </div>
  );
}

export default App;
