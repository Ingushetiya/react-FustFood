import React from "react";

const Categories = ({categoryId, setcategoryId}) => {
 

    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']
  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index)=>{
            return(
                <li key={index} onClick={()=>setcategoryId(index)} className={categoryId === index ? "active":''}> {categoryName} </li>
            )
        })}
      </ul>
    </div>
  );
};

export default Categories;
