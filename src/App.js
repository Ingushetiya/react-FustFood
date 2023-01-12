import React, { useEffect, useState } from 'react'

import Categories from './components/Categories';
import Header from './components/Header';
import PizzaBlock from './components/PizzaBlock/PizzaBlock';
import Sort from './components/Sort';
import Skeleton from './components/PizzaBlock/Skeleton';


import "./scss/app.scss"
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import Cart from './pages/Cart';
// Надо очистить App от лишнего мусора

function App() {
  const [loading, setLoading] = useState([])
  const [items, setItems] = useState([])

  useEffect(()=>{
      fetch("https://63bb21d2cf99234bfa53c0bd.mockapi.io/items")
      .then((res)=>{
        return res.json()
      })
      .then((json)=>{
        setItems(json)
        setLoading(false)
      })
      .catch((err)=>console.error(err))
  }, [])
  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route exact path='/' element={<Home />}/>
              <Route exact path='/cart' element={<Cart />} />

            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
