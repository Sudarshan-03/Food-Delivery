import React, { createContext, useState, useEffect } from 'react';
export const StoreContext = createContext(null);
import axios from "axios";


const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const url = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
    const [food_list, setFoodList] = useState([]);
    const [token, setToken] = useState(() => localStorage.getItem("token") || "");
    const [searchTerm, setSearchTerm] = useState("");
    const [user, setUser] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("user")) || null;
        } catch (e) {
            return null;
        }
    });


    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems(prev => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItems(prev => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if (token) {
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } })
        }
    }
    const removeCartItems = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } })
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    }

    const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/food/list");
        setFoodList(response.data.data);
    }

    const loadCartData = async (token) => {
        const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } })
        setCartItems(response.data.cartData);
    }

    const fetchUserProfile = async (token) => {
        try {
            const response = await axios.post(url + "/api/user/get", {}, { headers: { token } });
            if (response.data.success) {
                setUser(response.data.user);
            }
        } catch (error) {
            console.error("Failed to fetch user profile", error);
        }
    }

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
                await fetchUserProfile(localStorage.getItem("token"));
            }
        }
        loadData();
    }, [])

    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        }
    }, [user])

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
        searchTerm,
        setSearchTerm
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )

}

export default StoreContextProvider 
