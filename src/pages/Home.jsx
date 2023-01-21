import React, { useContext, useEffect, useRef, useState } from "react";

import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";

import Paginotion from "../components/Pagination";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Sort, { sortList } from "../components/Sort";

import { searchContext } from "../App";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../store/slices/filterSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const categoryId = useSelector((state) => state.filterSlice.categoryId);
  const sortType = useSelector((state) => state.filterSlice.sort);
  const currentPage = useSelector((state) => state.filterSlice.currentPage);
  const { search } = useContext(searchContext);
  const [loading, setLoading] = useState([]);
  const [items, setItems] = useState([]);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangeCurrentPage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const fetchPizzas = () => {
    setLoading(true);
    const order = sortType.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = sortType.sortProperty.replace("-", "");
    const category = categoryId > 0 && `category=${categoryId}`;
    const searchValue = search && `&filter=${search}`;
    axios
      .get(
        `https://63bb21d2cf99234bfa53c0bd.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${searchValue}`
      )
      .then((json) => {
        setItems(json.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    //Проверка был ли первый рендер или изменение параметров, если был то он вщивает в адресную строку параметры из первого рендера

    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType.sortProperty, search, currentPage]);

  // если был первый рендер, то проверяем URL-параметры и сохраняем в Redux
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find(
        (obj) => obj.sortProperty === params.sortProperty
      );
      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);

    //Если был первый рендер то запрашиваем пиццы
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sortType.sortProperty, search, currentPage]);

  // Search
  const filtered = items
    .filter((item) => {
      if (item.title.toLowerCase().includes(search.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} setcategoryId={onClickCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {loading
          ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
          : filtered}
      </div>
      <Paginotion currentPage={currentPage} setPages={onChangeCurrentPage} />
    </div>
  );
};

export default Home;
