import React, { createContext, useState, useEffect } from 'react';
export const StoreContext = createContext(null);
import { food_list } from '../assets/assets'
import axios from "axios";


const StoreContextProvider = (props) => {
    const [cartItems , setCartItems] = useState({});
    const url = "https://food-delivery-backend-rkui.onrender.com"

    const [ token,setToken] = useState(() => localStorage.getItem("token") || "");
    const [user, setUser] = useState(() => {
  try {
    return JSON.parse(localStorage.getItem("user")) || null;
  } catch (e) {
    return null;
  }
});
    

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
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
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
    
    const fetchFoodList = async()=>{
        const response =await axios.get(url+"/api/food/list");
        setFoodList(response.data.data);
    }

    const loadCartData =async (token)=>{
        const response =await axios.post(url+"/api/cart/get",{},{headers:{token}})
        setCartItems(response.data.cartData);
    }

     useEffect(()=>{
        async function loadData(){
            await fetchFoodList();
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"))
            }
        }
        loadData();
    },[])
    
    const contextValue = {
            food_list,
            cartItems,
            setCartItems,
            removeCartItems,
            addToCart,
            getTotalCartAmount,
            url,
            token,
            setToken,
            user,
            setUser,
    }
    return (
        <StoreContext.Provider value  = {contextValue}>
            {props.children}
        </StoreContext.Provider>
    )

}

export default StoreContextProvider 
