import axios from "axios";
import { createContext, useEffect, useState } from "react";
import Loader from "../custom/Loader";


export const CartContext = createContext();



const CartContextProvider = ({children})=>{

    const [cartCount,setCartCount] = useState(0);
    const [isLoading,setIsLoading] = useState(false);

    const getCartCount = async () => {
      const token = localStorage.getItem("userToken");
      setIsLoading(true);
      try {
        if(token){
        const response = await axios.get(
          `${import.meta.env.VITE_BURL}/cart`,
          {
            headers: {
              Authorization: `Tariq__${token}`,
            },
          }
        );
      
        setCartCount(response.data.count);
      }
      } catch (error) {
        console.log(error);
      }finally{
        setIsLoading(false);
      }
    };
    

    useEffect(()=>{
      getCartCount();
    },[])

    if(isLoading){
      return <Loader/>
    }

    return <CartContext.Provider value={{cartCount,setCartCount}}>
        {children}
        </CartContext.Provider>
}

export default CartContextProvider;