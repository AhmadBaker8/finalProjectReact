import React, { useEffect, useState } from "react";
import PageTitle from "../../../components/user/custom/PageTitle";
import { Link } from "react-router-dom";
import any from "../../../assets/images/banner/landing.jpg";
import { FaCartShopping } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import Partner from "../../../components/user/custom/Partner";
import Footer from "../footer/Footer";
import axios from "axios";
export default function Shop() {

  const [products,setProducts] = useState([]);
  const [isLoading,setIsLoading] = useState(true);

  const getProducts = async()=>{
    try{
      const {data} = await axios.get("https://ecommerce-node4.onrender.com/products?limit=10");
      setProducts(data.products);
    }catch(error){
      console.error(error);
    }finally{
      setIsLoading(false);
    }
  }
  
  
  useEffect(()=>{
    getProducts();
  },[]);

if(isLoading){
  return <h2>loading...</h2>
}

  return (
    <>
      <PageTitle title={"Shop"} />


      <div className="container ptb-100">
      <div className="row">
        {
          products.map(product=>
            <div className="col-lg-3 col-sm-6" key={product._id}>
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
          )
        }

      </div>
      </div>

      <Partner/>
      <Footer/>
    </>
  );
}
