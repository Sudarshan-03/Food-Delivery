import React, { createContext, useState, useEffect } from 'react';
export const StoreContext = createContext(null);
import { food_list } from '../assets/assets'


const StoreContextProvider = (props) => {
    const [cartItems , setCartItems] = useState({});
    const url = 'http://localhost:4000'
    const [ token,setToken] = useState("")
    const addToCart = async (itemId) => {
        if (!cartItems[itemId])  {
            setCartItems(prev => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItems(prev => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if(token){
            await axios.post(url + "/api/cart/add" ,{itemId} , {headers:{token}})
        }
    }
    const removeCartItems = async (itemId)=>{
         setCartItems(prev => {
            const updatedCount = (prev[itemId] || 0) - 1;
            if (updatedCount <= 0) {
                const { [itemId]: _, ...rest } = prev;
                return rest;
            }

            return { ...prev, [itemId]: updatedCount };
        });
        if(token){
            await axios.post(url + "/api/cart/remove" ,{itemId} , {headers:{token}})
        }
    }
    
    const getTotalCartAmount = () =>{
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
            let itemInfo = food_list.find((product) => product._id === item);
            totalAmount += itemInfo.price * cartItems [item];
            }
        }        
            return totalAmount;
    }
    

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);
    
    const contextValue = {
            food_list,
            cartItems,
            setCartItems,
            removeCartItems,
            addToCart,
            getTotalCartAmount,
            url,
            token,
            setToken
    }
    return (
        <StoreContext.Provider value  = {contextValue}>
            {props.children}
        </StoreContext.Provider>
    )

}

export default StoreContextProvider 