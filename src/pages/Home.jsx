import React, { useEffect, useState } from 'react'

import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Paginotion from '../components/Pagination';


const Home = ({search}) => {

  const [loading, setLoading] = useState([]);
  const [items, setItems] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0)
  const [sortIndex, setSortIndex] = useState({
    name:"популярности", sort: "raiting"
  })

  useEffect(() => {
      setLoading(true)
      const order = sortIndex.sort.includes("-") ? "asc" : "desc"
      const sortBy = sortIndex.sort.replace("-", "")
      const category = activeIndex > 0 && `category=${activeIndex}`
      const searchValue = search && `&filter=${search}`;
    fetch(`https://63bb21d2cf99234bfa53c0bd.mockapi.io/items?page=1&limit=4&${category}&sortBy=${sortBy}&order=${order}${searchValue}`)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setItems(json);
        setLoading(false);
      })
      .catch((err) => console.error(err));
      window.scrollTo(0, 0)
  }, [activeIndex, sortIndex, search]);

  // Search
  const filtered = items.filter(item=>{
    if(item.title.toLowerCase().includes(search.toLowerCase())){
      return true
    }
    return false
  }).map((obj) => <PizzaBlock key={obj.id} {...obj} />)

  return (
     <div className="container">
      <div className="content__top">
        <Categories activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
        <Sort sortIndex={sortIndex} setSortIndex={setSortIndex}/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {loading
          ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
          : filtered }
      </div>
      <Paginotion />
    </div>
  );
};

export default Home;
