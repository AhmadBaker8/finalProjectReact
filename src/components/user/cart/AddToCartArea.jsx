import axios from "axios";
import React, { useEffect, useState } from "react";

export default function AddToCartArea({ productId }) {
  const addToCart = async (id) => {
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.post(
        "https://ecommerce-node4.onrender.com/cart",
        {
          productId: id,
        },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      if(response.status == 201){
        
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    addToCart(productId);
  }, []);
  return <div></div>;
}
