import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Loader from '../custom/Loader';
import { FaStar } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import 'boxicons/css/boxicons.min.css';
import { useForm } from 'react-hook-form';
import { Bounce, Slide, toast } from 'react-toastify';
import ModalLoader from '../custom/ModalLoader';
import { CartContext } from '../context/CartContext';
import Swal from 'sweetalert2';



export default function ProductsDetailsArea({id}) {

  const [isLoading,setIsLoading] = useState(true);
  const [myLoader,setMyLoader] = useState(true);


  const [product,setProduct] = useState([]);
  const [quantity,setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const {register,handleSubmit,formState:{errors}} = useForm();
  const { cartCount, setCartCount } = useContext(CartContext);

    const getProductDetails = async()=>{
      setIsLoading(true);
        try{
          const {data} = await axios.get(`${import.meta.env.VITE_BURL}/products/${id}`);
          setProduct(data.product);
    }catch(error){
      console.log(error);
    }finally{
      setIsLoading(false);
    }
    };
    const addToCart = async () => {
      const token = localStorage.getItem("userToken");
      setMyLoader(true);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BURL}/cart`,
          {
            productId: id,
          },
          {
            headers: {
              Authorization: `Tariq__${token}`,
            },
          }
        );
        if (response.status == 201) {
          toast.success("Product added successfully...", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Slide,
          });
        }
        setCartCount(cartCount + 1);
      } catch (error) {
        if(token){
          toast.info("Product already in the cart !", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Slide,
          });
        }
        else{
          Swal.fire({
            icon: "warning",
            title: "You are not logged in!",
            text: "Please log in to add items to your cart.",
            confirmButtonText: "OK",
          });
          return;
        }
      } finally {
        setMyLoader(false);
      }
    };

    const reviewProduct = async (value)=>{
      setIsLoading(true);
      try{
        const token = localStorage.getItem("userToken");
        const response = await axios.post(`${import.meta.env.VITE_BURL}/products/${id}/review`,
          value,
        {
          headers:{
            Authorization:`Tariq__${token}`
          }
        }
      );
      toast.success(`review added successfully`,{
        position:"top-right",
        autoClose:4000,
        hideProgressBar:false,
        closeOnClick:true,
        pauseOnHover:true,
        draggable:true,
        theme:"dark",
        transition:Bounce,
      });
      getProductDetails();
      }catch(error){
        toast.error(`${error}`,{
          position:"top-right",
          autoClose:4000,
          hideProgressBar:false,
          closeOnClick:true,
          pauseOnHover:true,
          draggable:true,
          theme:"dark",
          transition:Bounce,
        });
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
                              {product.reviews.length > 0 ? (
                                (() => {
                                  const avgRating =
                                    product.reviews.reduce(
                                      (sum, review) => sum + review.rating,
                                      0
                                    ) / product.reviews.length;

                                  return Array.from({ length: 5 }, (_, i) => (
                                    <FaStar
                                      key={i}
                                      style={{
                                        color:
                                          i < Math.round(avgRating)
                                            ? "#FFB607"
                                            : "#ccc",
                                      }}
                                    />
                                  ));
                                })()
                              ) : (
                                <span>No Reviews</span>
                              )}
                            </div>
                </div>

                <div className="price">
                  {
                    product.discount != 0 ? <span className="old-price">${product.price}</span> : ""
                  }
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
                    className="default-btn"
                    onClick={addToCart}
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
                      
                      <div className="review-item" key={element._id}>
                        <div className="rating">
                          <div>
                            <img src={element.createdBy.image !=null ? element.createdBy.image.secure_url : ""} alt="" className='rounded-circle' />
                            <h3>{element.createdBy.userName}</h3>
                          </div>
                        {Array.from({ length: 5 }, (_, i) => (
                          <FaStar key={i} style={{ color: i < element.rating ? "#FFB607" : "#ccc" }} />
                        ))}
                        </div>
                        <h3>{element.comment}</h3>
                        <span>
                          <strong>Commented at </strong><strong>{element.createdAt.split("T")[0]}</strong>
                        </span>
                      </div>

                    ))}
                </div>

                <div className="review-form">
                  <h3>Write a Review</h3>

                  <form onSubmit={handleSubmit(reviewProduct)}>
                    <div className="row gap-3">
                      <div className="col-lg-6 col-md-6">
                        <div className="form-group">
                          <input
                            type="text"
                            id="review-title"
                            placeholder="Enter your review"
                            className="form-control"
                            {...register('comment',{required:'comment is required !'})}
                          />
                          {errors.comment? <div className='text-danger'>{errors.rating.message}</div>:null}
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="form-group">
                          <input
                            type='text'
                            id="review-body"
                            placeholder="Write your rating"
                            className="form-control"
                            {...register('rating',{required:'rating is required !'})}
                          />
                          {errors.rating? <div className='text-danger'>{errors.rating.message}</div>:null}
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
