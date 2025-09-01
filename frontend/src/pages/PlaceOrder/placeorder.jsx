import React, { useContext, useState, useEffect } from 'react';

import './placeorder.css';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'


const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url, setCartItems } = useContext(StoreContext);
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  });
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/");
    } else {
      const parsedUser = JSON.parse(user);
      console.log("Parsed User:", parsedUser);
      // Check both parsedUser.email and parsedUser.user?.email
      let email = "";
      let name = "";
      if (parsedUser && (parsedUser.email || parsedUser.user?.email)) {
        email = parsedUser.email ? parsedUser.email : (parsedUser.user?.email || "");
      }
      if (parsedUser && (parsedUser.name || parsedUser.user?.name)) {
        name = parsedUser.name ? parsedUser.name : (parsedUser.user?.name || "");
      }
      let firstName = "";
      let lastName = "";
      if (name) {
        const [fName, ...lastNameParts] = name.split(" ");
        firstName = fName || "";
        lastName = lastNameParts.join(" ");
      }
      setData(prev => ({
        ...prev,
        firstName,
        lastName,
        email
      }));
    }
  }, []);
  useEffect(() => {
    const isDark = localStorage.getItem("theme") === "dark";
    if (isDark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, []);

  const [paymentMethod, setPaymentMethod] = useState("cod");

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item ;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })

    let orderData = {
    address:data,
    items: orderItems,
    amount:getTotalCartAmount() + 50,
    paymentMethod: paymentMethod,
    }
      let response = await axios.post(url +"/api/order/place",orderData, {headers:{token} });
       if (response.data.success) {
         if (paymentMethod === "online") {
           const { session_url } = response.data;
           setCartItems({});
           window.location.replace(session_url);
         } else {
           alert("Order placed !! Par Bhai payment mere phone no. pe kar de !!");
           setCartItems({});
           navigate("/myorders");
         }
       }
        else {
         alert("Error placing order. Please try again.");
        }
  }

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder="First name" />
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder="Last name" />
        </div>
        <input
          type="text"
          value={`${data.firstName} ${data.lastName}`}
          placeholder="Full Name"
          readOnly
        />
        <input
          type="email"
          value={data.email}
          placeholder="Email"
          readOnly
        />
        <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder="Street" />
        <div className="multi-fields">
          <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder="City" />
          <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder="State" />
        </div>
        <div className="multi-fields">
          <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder="Zip code" />
          <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder="Country" />
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder="Phone" />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>₹{getTotalCartAmount()}</p>
          </div>
          <hr />
          {/* // new Added */}
          <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>₹{getTotalCartAmount()===0?0:50}</p>
              </div>
              <hr/>
          <div className="cart-total-details">
            <b> Total Amount </b>
            <b> ₹{getTotalCartAmount() + 50}</b>
          </div>
          <div className="cart-total-details">
            <label className="payment-button"
              
            >
              <input
                type="radio"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
                style={{ marginRight: "8px" }}
              />
              Cash on Delivery
            </label>
            <label className="payment-button"
      
            >
              <input
                type="radio"
                value="online"
                checked={paymentMethod === "online"}
                onChange={() => setPaymentMethod("online")}
                style={{ marginRight: "8px" }}
              />
              Online Payment
            </label>
          </div>
          <button className='payment'  type="submit">Payment</button>
        </div>
      </div>



    </form>
  )
}


export default PlaceOrder