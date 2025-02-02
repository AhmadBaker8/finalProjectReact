import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaStar } from "react-icons/fa";
import { Link } from 'react-router-dom';


export default function SpecialOffer() {

    const [products,setProducts] = useState([]);
    const [isLoading,setIsLoading] = useState(true);


    const getProducts = async ()=>{
        try{
            const {data} = await axios.get(`https://ecommerce-node4.onrender.com/products?page=1&limit=3`);
            setProducts(data.products);
        }catch(error){
            console.log(error);
        }finally{
            setIsLoading(false);
        }
        
    }

    useEffect(()=>{
        getProducts();
    },[])


    if(isLoading){
        return <h2>loading...</h2>
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
          <div className="col-lg-4 col-md-12">
            
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

                <div className="offer-soon-content">
                  <div
                    id="timer"
                    className="flex-wrap d-flex justify-content-center"
                  >
                    <div
                      id="days"
                      className="align-items-center flex-column d-flex justify-content-center"
                    >
                      
                      <span>Days</span>
                    </div>
                    <div
                      id="hours"
                      className="align-items-center flex-column d-flex justify-content-center"
                    >
                      
                      <span>Hours</span>
                    </div>
                    <div
                      id="minutes"
                      className="align-items-center flex-column d-flex justify-content-center"
                    >
                      
                      <span>Minutes</span>
                    </div>
                    <div
                      id="seconds"
                      className="align-items-center flex-column d-flex justify-content-center"
                    >
                      
                      <span>Seconds</span>
                    </div>
                  </div>
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
