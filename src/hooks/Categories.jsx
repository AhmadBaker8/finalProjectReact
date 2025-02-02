import axios from 'axios';
import React, { useEffect, useState } from 'react'
import SpecProductsByCategory from './SpecProductsByCategory';

export default function Categories({type}) {

    const [filterBy, setFilterBy] = useState("66fb864941aba231158e3b4d");
    const [categories,setCategories] = useState([]);
    const [isLoading,setIsLoading] = useState(true);

    const getCategories = async ()=>{
        try{
            const {data} = await axios.get(`https://ecommerce-node4.onrender.com/categories`);
            setCategories(data.categories);
        }catch(error){
            console.log(error);
        }finally{
            setIsLoading(false);
        }
    }
    const getProductsForThisCategory = (categoryId)=>{
        setFilterBy(categoryId);
        <SpecProductsByCategory type={"col-lg-3 col-md-4"} id={categoryId} />
    }

    useEffect(()=>{
        getCategories();
    },[])

    if(isLoading){
        return <h2>Loading...</h2>
    }

  return (
    <>

        

        <ul className={type}>
        {
        categories.map(category=>
            <li
            onClick={() => getProductsForThisCategory(category._id)}
            className={`tab-item${
            filterBy === `${category._id}` ? " tab-active" : ""
                }`}
                >
                <span>{category.name}</span>
                </li>
            )
        }
        </ul>
    </>
  )
}
