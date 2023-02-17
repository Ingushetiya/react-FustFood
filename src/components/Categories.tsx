import React, { memo } from 'react';

type CategoriesProps = {
  categoryId: number;
  setcategoryId: (index: number) => void;
};
const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
const Categories: React.FC<CategoriesProps> = memo(({ categoryId, setcategoryId }) => {
  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => {
          return (
            <li
              key={index}
              onClick={() => setcategoryId(index)}
              className={categoryId === index ? 'active' : ''}>
              {' '}
              {categoryName}{' '}
            </li>
          );
        })}
      </ul>
    </div>
  );
});

export default Categories;
