import React, { createContext, useState } from 'react'
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import "./scss/app.scss"
// Надо очистить App от лишнего мусора

export const searchContext = createContext();
function App() {

  const [search, setSearch] = useState('')
  return (
    <div className="App">
      <searchContext.Provider value={{search, setSearch}}>
      <div className="wrapper">
        <Header />
        <div className="content">
         
            <Routes>
              <Route exact path='/' element={<Home/>}/>
              <Route exact path='/cart' element={<Cart />} />

            </Routes>
        
        </div>
      </div>
      </searchContext.Provider>
    </div>
  );
}

export default App;
