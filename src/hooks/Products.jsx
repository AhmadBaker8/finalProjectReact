import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { FaCartShopping } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

export default function Products({scale}) {

    const [filterBy, setFilterBy] = useState("66fb864941aba231158e3b4d");
    const [products,setProducts] = useState([]);
    const [isLoading,setIsLoading] = useState(true);


    const getProducts = async (id)=>{
        setFilterBy(id);
        try{
            const {data} = await axios.get(`https://ecommerce-node4.onrender.com/products?page=1&limit=10`);
            setProducts(data.products);
        }catch(error){
            console.log(error);
        }finally{
            setIsLoading(false);
        }
        
    }

    useEffect(()=>{
        getProducts("66fb864941aba231158e3b4d");
    },[])


    if(isLoading){
        return <h2>loading...</h2>
    }


  return (
    <>
    <div className="row">
                {
                  products.map((product) => {
                      return (
                        <div className={scale} key={product._id}>
                        <div className="single-shop-products">
                          <div className="shop-products-image">
                            <Link to={`/`}>
                              <img src={product.mainImage.secure_url} alt="" />
                            </Link>
                            <div className="tag">New</div>
                            <ul className="shop-action">
                              <li>
                                <span className="addtocart-icon-wrap">
                                  <FaCartShopping />
                                </span>
                              </li>
                              <li>
                                <span className="addtocart-icon-wrap">
                                  <FaRegHeart />
                                </span>
                              </li>
                              <li>
                                <span
                                  data-toggle="modal"
                                  data-target="#productsQuickView"
                                  className="quick-icon"
                                >
                                  <FaRegEye />
                                </span>
                              </li>
                            </ul>
                          </div>
                
                          <div className="shop-products-content">
                            <h3>
                              <Link to={`/`}>{product.name}</Link>
                            </h3>
                            <ul className="rating">
                              <li>
                                <FaStar style={{ color: "#FFB607" }} />
                              </li>
                              <li>
                                <FaStar style={{ color: "#FFB607" }} />
                              </li>
                              <li>
                                <FaStar style={{ color: "#FFB607" }} />
                              </li>
                              <li>
                                <FaStar style={{ color: "#FFB607" }} />
                              </li>
                              <li>
                                <FaStar style={{ color: "#FFB607" }} />
                              </li>
                            </ul>
                            <span>$150.00</span>
                          </div>
                        </div>
                        </div>
                      );
                    }
                )}
            </div>
      
    </>
  )
}
