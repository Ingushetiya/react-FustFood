import React from 'react'

import Categories from './components/Categories';
import Header from './components/Header';
import PizzaBlock from './components/PizzaBlock';
import Sort from './components/Sort';

import pizzas from './assets/fakeDataPizza.json'

import "./scss/app.scss"
// Надо очистить App от лишнего мусора

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <div className="content__top">
                <Categories />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
              {pizzas.map((item)=>{
                return (
                  <PizzaBlock
                  key={item} 
                  {...item}
                  />
                )
              })}
         
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
