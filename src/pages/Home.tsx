import React, { useEffect, useRef } from 'react';

import qs from 'qs';
import { Link, useNavigate } from 'react-router-dom';

import Paginotion from '../components/Pagination';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import SortPopup, { sortList } from '../components/Sort';

import { useSelector } from 'react-redux';
import {
  categoryIdState,
  currentPageState,
  searchValueState,
  selectSort,
  setCategoryId,
  setCurrentPage,
  // setFilters,
} from '../store/slices/filterSlice';
import {
  getPizzas,
  // SearchPizzaParams,
  selectPizzaData,
  statusState,
} from '../store/slices/pizzasSlice';
import { useAppDispatch } from 'store';

const Home: React.FC = () => {
  // const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = useRef(false);
  // const isMounted = useRef(false);

  const categoryId = useSelector(categoryIdState);

  const sortType = useSelector(selectSort);

  const currentPage = useSelector(currentPageState);

  const searchValue = useSelector(searchValueState);

  const items = useSelector(selectPizzaData);

  const status = useSelector(statusState);

  const onClickCategory = (idx: number) => {
    dispatch(setCategoryId(idx));
  };

  const onChangeCurrentPage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const fetchPizzas = async () => {
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.sortProperty.replace('-', '');
    const category = categoryId > 0 && `category=${categoryId}`;
    const search = searchValue && `&filter=${searchValue}`;
    dispatch(
      getPizzas({
        order,
        sortBy,
        category: String(category),
        search,
        currentPage: String(currentPage),
      }),
    );
    window.scrollTo(0, 0);
  };
  // useEffect(() => {
  //   //Проверка был ли первый рендер или изменение параметров, если был то он вщивает в адресную строку параметры из первого рендера

  //   if (isMounted.current) {
  //     const queryString = qs.stringify({
  //       sortProperty: sortType.sortProperty,
  //       categoryId,
  //       currentPage,
  //     });

  //     navigate(`?${queryString}`);
  //   }
  //   isMounted.current = true;
  // }, [categoryId, sortType.sortProperty, searchValue, currentPage, navigate]);

  // если был первый рендер, то проверяем URL-параметры и сохраняем в Redux
  // useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
  //     const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);
  //     dispatch(
  //       setFilters({
  //         searchValue: params.search,
  //         categoryId: Number(params.category),
  //         currentPage: Number(params.currentPage),
  //         sort: sort || sortList[0],
  //       }),
  //     );
  //     isSearch.current = true;
  //   }
  // }, [dispatch]);

  //Если был первый рендер то запрашиваем пиццы
  useEffect(() => {
    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sortType.sortProperty, searchValue, currentPage]);

  // Search
  const filtered = items
    .filter((item: any) => {
      if (item.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} setcategoryId={onClickCategory} />
        <SortPopup />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__info-error">
          {' '}
          <h2>
            Произошла ошибка. <span>😕</span>
          </h2>
          <p>
            К сожаление не удалось получить пиццы. <br /> Попробуйте повторить попытку позже.
          </p>{' '}
        </div>
      ) : (
        <div className="content__items">
          {status === 'loading' ? [...new Array(6)].map((_, i) => <Skeleton key={i} />) : filtered}
        </div>
      )}

      <Paginotion currentPage={currentPage} setPages={onChangeCurrentPage} />
    </div>
  );
};

export default Home;
