import React from 'react';

type CategoriesProps = {
  categoryId: number;
  setcategoryId: any;
};

const Categories: React.FC<CategoriesProps> = ({ categoryId, setcategoryId }) => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
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
};

export default Categories;
