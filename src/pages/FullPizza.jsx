import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const FullPizza = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [pizza, setPizza] = useState()

   useEffect(() => {
     const fetchPizza = async () =>{
        try {
            const {data} = await axios.get(`https://63bb21d2cf99234bfa53c0bd.mockapi.io/items/${id}`)
            setPizza(data)
        } catch (error) {
            console.error(error);
            navigate('/')
        }
     }
   
     fetchPizza()
   }, [])
   if(!pizza){
    return "Загрузка ...."
   }
    return (
        <div className='container'>
            <img src={pizza.imageUrl}  alt="pizza" />
            <h2>{pizza.title}</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, laudantium ex rem minima dicta quod maxime non obcaecati tenetur saepe aperiam possimus adipisci vitae tempora natus ducimus ad porro culpa?</p>
            <h2>{pizza.price} $</h2>
        </div>
    );
};

export default FullPizza;