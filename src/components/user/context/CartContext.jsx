import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const CartContext = createContext();



const CartContextProvider = ({children})=>{

    const [cartCount,setCartCount] = useState(0);
    const [cartQty, setCartQty] = useState(1);

    const getCartCount = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const response = await axios.get(
          `${import.meta.env.VITE_BURL}/cart`,
          {
            headers: {
              Authorization: `Tariq__${token}`,
            },
          }
        );
        setCartCount(response.data.count);
      } catch (error) {
        console.log(error);
      }
    };
    

    useEffect(()=>{
      getCartCount();
    },[])

    return <CartContext.Provider value={{cartCount,setCartCount}}>
        {children}
        </CartContext.Provider>
}

export default CartContextProvider;