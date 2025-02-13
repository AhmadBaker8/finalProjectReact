import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loader from '../custom/Loader';
import { FaStar } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import 'boxicons/css/boxicons.min.css';



export default function ProductsDetailsArea({id}) {

  const [isLoading,setIsLoading] = useState(true);
  const [product,setProduct] = useState([]);
  const [quantity,setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

    const getProductDetails = async()=>{
        try{const {data} = await axios.get(`https://ecommerce-node4.onrender.com/products/${id}`);
        setProduct(data.product);
        console.log(data.product.reviews);
    }catch(error){
      console.log(error);
    }finally{
      setIsLoading(false);
    }
    }

    useEffect(()=>{
      getProductDetails();
    },[])

    if(isLoading)
      return <Loader/>
  return (
    <>
    <section className="products-details-area ptb-50">
      <div className="container">
        <div className="products-details-desc">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6">
              <div className="main-products-image">
                <div className="slider slider-for">
                  <div>
                    <img src={product.mainImage.secure_url} alt="" width={500}/>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-6">
              <div className="product-content content-two">
                <h3>{product.name}</h3>

                <div className="product-review">
                  <div className="rating">
                    <FaStar style={{ color: "#FFB607" }} />
                    <FaStar style={{ color: "#FFB607" }} />
                    <FaStar style={{ color: "#FFB607" }} />
                    <FaStar style={{ color: "#FFB607" }} />
                    <FaStar style={{ color: "#FFB607" }} />
                  </div>
                </div>

                <div className="price">
                  <span className="old-price">${product.price}</span>
                  <span className="new-price">${product.finalPrice}</span>
                </div>
                <p>{product.description}</p>

                <ul className="products-info">
                  <li>
                    <span>Availability:</span>{" "}
                    {product.stock > 0
                      ? `In stock (${product.stock})`
                      : "Stock finished"}
                  </li>
                </ul>

                <div className="products-color-switch">
                  <p className="available-color">
                    <span>Color</span> :
                    <a href="#" style={{ backgroundColor: "#a53c43" }}></a>
                    <a href="#" style={{ backgroundColor: "#192861" }}></a>
                    <a href="#" style={{ backgroundColor: "#c58a84" }}></a>
                    <a href="#" style={{ backgroundColor: "#ecc305" }}></a>
                    <a href="#" style={{ backgroundColor: "#000000" }}></a>
                    <a href="#" style={{ backgroundColor: "#808080" }}></a>
                  </p>
                </div>

                <div className="product-quantities">
                  <span>Quantities:</span>

                  <div className="input-counter">
                    <span
                      className="minus-btn"
                      onClick={() =>
                        quantity >= 1
                          ? setQuantity(quantity - 1)
                          : setQuantity(1)
                      }
                    >
                      <i className="bx bx-minus"></i>
                    </span>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      min="1"
                      max={product.stock}
                    />
                    <span
                      className="plus-btn d-flex justify-content-center align-items-center"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <i className="bx bx-plus"></i>
                    </span>
                  </div>
                </div>

                <div className="product-add-to-cart">
                  <button
                    type="submit"
                    className="default-btn"
                    
                  >
                    <FaCartShopping/>
                    Add to cart
                    <span></span>
                  </button>
                </div>

                <div className="products-share">
                  <ul className="social d-flex align-items-center">
                    <li>
                      <span>Share:</span>
                    </li>
                    <li>
                      <a href="#" target="_blank">
                        <i className="bx bxl-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#" target="_blank">
                        <i className="bx bxl-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#" target="_blank">
                        <i className="bx bxl-linkedin"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#" target="_blank">
                        <i className="bx bxl-instagram"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="products-details-tabs">
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item">
              <a
                className={`nav-link ${activeTab === "description" ? "active" : ""}`}
                onClick={() => setActiveTab("description")}
              >
                Description
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${activeTab === "reviews" ? "active" : ""}`}
                onClick={() => setActiveTab("reviews")}
              >
                Reviews
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${activeTab === "information" ? "active" : ""}`}
                onClick={() => setActiveTab("information")}
              >
                Shipping Information
              </a>
              
            </li>
          </ul>

          <div className="tab-content" id="myTabContent">
            {
              activeTab === "description" && (
                <div className={`tab-pane fade show ${activeTab === "description" ? "active" : ""}`} id="description" role="tabpanel" >
              <h2>Overview</h2>
              <p>
                {product.description}
              </p>
              <h3>
                Why choosing this product?
              </h3>
              <ul>
                <li>
                  It has great user onboarding
                </li>
                <li>
                  It looks good
                </li>
                <li>
                  It has a good price for value
                </li>
                <li>
                  The time-to-master is short
                </li>
                <li>
                  It is marketed efficiently with clear value proposition
                </li>
                <li>
                  It solves a problem
                </li>
                <li>
                  The time-to-value is short
                </li>
                <li>
                  It meets a need and it's reliable
                </li>
              </ul>


            </div>
              )
            }

            {
              activeTab === "reviews" && (
                <div className={`tab-pane fade show ${activeTab === "reviews" ? "active" : ""}`} id="reviews" role="tabpanel">
              <div className="products-reviews">
                <h3>Reviews</h3>

                <div className="row">
                  <div className="side">
                    <div>5 star</div>
                  </div>
                  <div className="middle">
                    <div className="bar-container">
                      <div className="bar-5"></div>
                    </div>
                  </div>
                  <div className="side right">
                    <div>70%</div>
                  </div>
                  <div className="side">
                    <div>4 star</div>
                  </div>
                  <div className="middle">
                    <div className="bar-container">
                      <div className="bar-4"></div>
                    </div>
                  </div>
                  <div className="side right">
                    <div>20%</div>
                  </div>
                  <div className="side">
                    <div>3 star</div>
                  </div>
                  <div className="middle">
                    <div className="bar-container">
                      <div className="bar-3"></div>
                    </div>
                  </div>
                  <div className="side right">
                    <div>5%</div>
                  </div>
                  <div className="side">
                    <div>2 star</div>
                  </div>
                  <div className="middle">
                    <div className="bar-container">
                      <div className="bar-2"></div>
                    </div>
                  </div>
                  <div className="side right">
                    <div>3%</div>
                  </div>
                  <div className="side">
                    <div>1 star</div>
                  </div>
                  <div className="middle">
                    <div className="bar-container">
                      <div className="bar-1"></div>
                    </div>
                  </div>
                  <div className="side right">
                    <div>2%</div>
                  </div>
                </div>
              </div>

              <div className="products-review-form">
                <h3>Customer Reviews</h3>

                <div className="review-title">
                  <div className="rating">
                    <FaStar style={{ color: "#FFB607" }} />
                    <FaStar style={{ color: "#FFB607" }} />
                    <FaStar style={{ color: "#FFB607" }} />
                    <FaStar style={{ color: "#FFB607" }} />
                    <FaStar style={{ color: "#FFB607" }} />
                    <FaStar style={{ color: "#FFB607" }} />
                  </div>
                </div>

                <div className="review-comments">
                  
                  {
                    product.reviews.map((element)=>(
                      <div className="review-item">
                        <div className="rating">
                        {Array.from({ length: 5 }, (_, i) => (
                          <FaStar key={i} style={{ color: i < element.rating ? "#FFB607" : "#ccc" }} />
                        ))}
                        </div>
                        <h3>{element.comment}</h3>
                        <span>
                          <strong>Commented at </strong><strong>{element.createdAt.split("T")[0]}</strong>
                        </span>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                          sed do eiusmod tempor incididunt ut labore et dolore magna
                          aliqua. Ut enim ad minim veniam, quis nostrud
                          exercitation.
                        </p>
                      </div>

                    ))}
                </div>

                <div className="review-form">
                  <h3>Write a Review</h3>

                  <form>
                    <div className="row gap-3">
                      <div className="col-lg-6 col-md-6">
                        <div className="form-group">
                          <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter your name"
                            className="form-control"
                          />
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-6">
                        <div className="form-group">
                          <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            className="form-control"
                          />
                        </div>
                      </div>

                      <div className="col-lg-12 col-md-12">
                        <div className="form-group">
                          <input
                            type="text"
                            id="review-title"
                            name="review-title"
                            placeholder="Enter your review a title"
                            className="form-control"
                          />
                        </div>
                      </div>

                      <div className="col-lg-12 col-md-12">
                        <div className="form-group">
                          <textarea
                            name="review-body"
                            id="review-body"
                            cols="30"
                            rows="6"
                            placeholder="Write your comments here"
                            className="form-control"
                          ></textarea>
                        </div>
                      </div>

                      <div className="col-lg-12 col-md-12">
                        <button type="submit" className="default-btn">
                          Submit Review
                          <span></span>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
              )
            }

            {
              activeTab === "information" && (
                <div className={`tab-pane fade show ${activeTab === "information" ? "active" : ""}`} id="information" role="tabpanel">
              <ul className="information-list">
                <li>
                  Address:{" "}
                  <span>6605 Lemke Run, Jacktown, NH 77076</span>
                </li>
                <li>
                  Phone: <a href="tel:+12214215363">+1 (221) 421-5363</a>
                </li>
                <li>
                  Email: <a href="mailto:contact@shop.com">contact@shop.com</a>
                </li>
              </ul>
              
            </div>
            
              )
            }
          </div>
        </div>
      </div>
    </section>

      
    </>
  )
}
