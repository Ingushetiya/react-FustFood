import React, { useContext, useEffect, useState } from 'react'

import axios from 'axios';
import Paginotion from '../components/Pagination';
import Skeleton from "../components/PizzaBlock/Skeleton";

import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Sort from "../components/Sort";


import { searchContext } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setCurrentPage } from '../store/slices/filterSlice';



const Home = () => {

  const dispatch = useDispatch()
  const categoryId = useSelector((state)=> state.filterSlice.categoryId) 
  const sortType = useSelector((state) => state.filterSlice.sort.sortProperty)
  const currentPage = useSelector((state)=> state.filterSlice.currentpage)
  console.log(currentPage);

  const {search} = useContext(searchContext)
  const [loading, setLoading] = useState([]);
  const [items, setItems] = useState([]);


    const onClickCategory = (id) =>{
      dispatch(setCategoryId(id))
    }
    
    const onChangeCurrentPage = number =>{
      dispatch(setCurrentPage(number))
    }

  useEffect(() => {
      setLoading(true)
      const order = sortType.includes("-") ? "asc" : "desc"
      const sortBy = sortType.replace("-", "")
      const category = categoryId > 0 && `category=${categoryId}`
      const searchValue = search && `&filter=${search}`;
    axios.get(`https://63bb21d2cf99234bfa53c0bd.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${searchValue}`)
      .then((json) => {
        setItems(json.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
      window.scrollTo(0, 0)
  }, [categoryId, sortType, search, currentPage]);

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
        <Categories categoryId={categoryId} setcategoryId={onClickCategory} />
        <Sort/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {loading
          ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
          : filtered }
      </div>
      <Paginotion currentPage = {currentPage} setPages={onChangeCurrentPage} />
    </div>
  );
};

export default Home;
