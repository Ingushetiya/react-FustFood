import React, { useState } from "react";

const Categories = () => {
    const [activeIndex, setActiveIndex] = useState(0)
    const onClickCategory = (index) =>{
        setActiveIndex(index)
        console.log(index);
    }
    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']
  return (
    <div className="categories">
      <ul>
        {categories.map((item, index)=>{
            return(
                <li onClick={()=>onClickCategory(index)} className={activeIndex === index && "active"}> {item} </li>
            )
        })}
      </ul>
    </div>
  );
};

export default Categories;
