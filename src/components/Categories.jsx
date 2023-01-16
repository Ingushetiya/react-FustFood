import React from "react";

const Categories = ({activeIndex, setActiveIndex}) => {
 

    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']
  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index)=>{
            return(
                <li key={index} onClick={()=>setActiveIndex(index)} className={activeIndex === index ? "active":''}> {categoryName} </li>
            )
        })}
      </ul>
    </div>
  );
};

export default Categories;
