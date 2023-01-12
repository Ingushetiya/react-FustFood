import React from "react";

const Categories = () => {
 
    const onClickCategory = (index) =>{
        setActiveIndex(index)
    }
    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']
  return (
    <div className="categories">
      <ul>
        {categories.map((item, index)=>{
            return(
                <li key={index} onClick={()=>onClickCategory(index)} className={activeIndex === index && "active"}> {item} </li>
            )
        })}
      </ul>
    </div>
  );
};

export default Categories;
