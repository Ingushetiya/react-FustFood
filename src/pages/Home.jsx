import React, { useEffect, useState } from 'react'

import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";

const Home = () => {
  
  const [loading, setLoading] = useState([]);
  const [items, setItems] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0)
  const [sortIndex, setSortIndex] = useState(0)

  useEffect(() => {
    fetch("https://63bb21d2cf99234bfa53c0bd.mockapi.io/items")
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setItems(json);
        setLoading(false);
      })
      .catch((err) => console.error(err));
      window.scrollTo(0, 0)
  }, []);
  return (
     <div className="container">
      <div className="content__top">
        <Categories value={activeIndex} setActiveIndex={setActiveIndex} />
        <Sort value={sortIndex} setSortIndex={setSortIndex}/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {loading
          ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
          : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
    </div>
  );
};

export default Home;
