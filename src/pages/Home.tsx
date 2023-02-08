import React, { useEffect, useRef } from 'react';

import qs from 'qs';
import { Link, useNavigate } from 'react-router-dom';

import Paginotion from '../components/Pagination';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Sort, { sortList } from '../components/Sort';

import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters } from '../store/slices/filterSlice';
import { getPizzas, selectPizzaData } from '../store/slices/pizzasSlice';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  //@ts-ignore
  const categoryId = useSelector((state) => state.filterSlice.categoryId);
  //@ts-ignore
  const sortType = useSelector((state) => state.filterSlice.sort);
  //@ts-ignore
  const currentPage = useSelector((state) => state.filterSlice.currentPage);
  //@ts-ignore
  const searchValue = useSelector((state) => state.filterSlice.searchValue);
  //@ts-ignore
  const items = useSelector(selectPizzaData);
  //@ts-ignore
  const status = useSelector((state) => state.pizzas.status);

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
      //@ts-ignore
      getPizzas({
        order,
        sortBy,
        category,
        search,
        currentPage,
      }),
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
  }, [categoryId, sortType.sortProperty, searchValue, currentPage]);

  // если был первый рендер, то проверяем URL-параметры и сохраняем в Redux
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);
      dispatch(
        setFilters({
          ...params,
          sort,
        }),
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
  }, [categoryId, sortType.sortProperty, searchValue, currentPage]);

  // Search
  const filtered = items
    .filter((item: any) => {
      if (item.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map((obj: any) => (
      <Link key={obj.id} to={`/pizza/${obj.id}`}>
        <PizzaBlock {...obj} />
      </Link>
    ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} setcategoryId={onClickCategory} />
        <Sort />
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
