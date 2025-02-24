import axios from "axios";
import { createContext, useEffect, useState } from "react";
import Loader from "../custom/Loader";

export const UserContext = createContext();

const UserContextProvider = ({children})=>{

    const [user,setUser] = useState(null);
    const [isLoading,setIsLoading] = useState(false);

    useEffect(()=>{
        getUser();
    },[]);

    const getUser = async() =>{
        setIsLoading(true);
        const token = localStorage.getItem('userToken');
        try{
            const response = await axios.get(`${import.meta.env.VITE_BURL}/user/profile`,
                {
                    headers:{
                        Authorization:`Tariq__${token}`
                    }
                }
            );
            setUser(response.data.user);
        }catch(error){
            console.log(error);
        }finally{
            setIsLoading(false);
        }

    }
    if(isLoading){
        return <Loader/>
    }
    return <UserContext.Provider value={{user}}>
        {children}
    </UserContext.Provider>

}
export default UserContextProvider;