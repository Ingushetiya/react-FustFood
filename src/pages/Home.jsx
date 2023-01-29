import React, { useContext, useEffect, useRef, useState } from "react";

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
import { getPizzas } from "../store/slices/pizzasSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const categoryId = useSelector((state) => state.filterSlice.categoryId);
  const sortType = useSelector((state) => state.filterSlice.sort);
  const currentPage = useSelector((state) => state.filterSlice.currentPage);
  const items = useSelector((state) => state.pizzas.items);
  const status = useSelector((state) => state.pizzas.status);



  const { search } = useContext(searchContext);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangeCurrentPage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const fetchPizzas = async () => {
    const order = sortType.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = sortType.sortProperty.replace("-", "");
    const category = categoryId > 0 && `category=${categoryId}`;
    const searchValue = search && `&filter=${search}`;
    dispatch(
      getPizzas({
        order,
        sortBy,
        category,
        searchValue,
        currentPage,
      })
    );
    window.scrollTo(0, 0);
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
      {status === "error" ? (
        <div className="content__info-error"> <h2>
        Произошла ошибка.  <icon>😕</icon>
      </h2>
      <p>
        К сожаление не удалось получить пиццы. <br /> Попробуйте повторить попытку позже.
      </p> </div>
      ) : (
        <div className="content__items">
          {status === "loading"
            ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
            : filtered}
        </div>
      )}

      <Paginotion currentPage={currentPage} setPages={onChangeCurrentPage} />
    </div>
  );
};

export default Home;
