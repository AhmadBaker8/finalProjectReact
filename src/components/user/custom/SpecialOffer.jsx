import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaStar } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import Loader from './Loader';


export default function SpecialOffer() {

    const [products,setProducts] = useState([]);
    const [isLoading,setIsLoading] = useState(false);


    const getProducts = async ()=>{
      setIsLoading(true);
        try{
            const {data} = await axios.get(`${import.meta.env.VITE_BURL}/products?page=1&limit=3`);
            setProducts(data.products);
        }catch(error){
            console.log(error);
        }finally{
            setIsLoading(false);
        }
        
    }

    useEffect(()=>{
        getProducts();
    },[]);
    const navigate = useNavigate();
    const goToShop = ()=>{
      navigate('/shop');
    }


    if(isLoading){
        return <Loader/>
    }

  return (
    <>
    <section className={"offer-products-area ptb-100"}>
      <div className="container">
        <div className="section-title">
          <h2>Specials Offer</h2>
        </div>

        <div className="row justify-content-center">
        {
                products.map(product=>
          <div className="col-lg-4 col-md-12" key={product._id} onClick={goToShop}>
            
              <div className="single-offer-products">
                <div className="offer-products-image">
                <a>
                  <img src={product.mainImage.secure_url} alt="image" />
                </a>
                  <div className="tag">-{(product.discount/product.price*100).toFixed(2)}%</div>
                </div>

                <div className="offer-products-content">
                  <span>Gadget</span>
                  <h3>
                    <Link>
                      {product.name}
                    </Link>
                  </h3>
                  <div className="price">
                    <span className="new-price">${product.finalPrice}</span>
                    <span className="old-price">{product.price}</span>
                  </div>
                  <ul className="rating">
                    <li>
                      <FaStar style={{ color: "#FFB607" }} />
                      <FaStar style={{ color: "#FFB607" }} />
                      <FaStar style={{ color: "#FFB607" }} />
                      <FaStar style={{ color: "#FFB607" }} />
                      <FaStar style={{ color: "#FFB607" }} />
                    </li>
                  </ul>

                  
                </div>
              </div>
            
          </div>
          )}
        </div>
      </div>
    </section>
    </>
  )
}
