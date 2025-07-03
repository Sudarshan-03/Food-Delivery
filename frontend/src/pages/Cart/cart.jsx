import { useNavigate } from 'react-router-dom';
import React from 'react'
import './cart.css'
import { useContext } from 'react';
import { StoreContext } from '../../Context/StoreContext';
const cart = () => {
  const { cartItems, food_list, removeCartItems , getTotalCartAmount } = useContext(StoreContext);
  const nevigate = useNavigate();

  return (
    <div className='cart'>
      <div className="cart-item">
        <div className="cart-item-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
           </div>
        <br />
        <hr />
       {food_list.map((item,index) =>{
        if(cartItems[item._id] > 0){
          return (
            <div>
                <div className="cart-item-title cart-item-item">
              <img src={item.image} alt="" />
              <p>{item.name}</p>
              <p>₹ {item.price}</p>
              <p>{cartItems[item._id]}</p>
              <p>₹ {item.price*cartItems[item._id]}</p>
              <p onClick={() =>removeCartItems(item._id)} className='x'>X</p>
             
            </div>
            <hr />

            </div>
            
          )
        }
       })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Total Amount</h2>
          <div>
            <div className="cart-total-detail">
              <p>Subtotal</p>
              <p>₹ {getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-detail">
              <p>Delevery Fee</p>
              <p>₹ {50}</p>
            </div>
            <hr />
            <div className="cart-total-detail">
              <b>Total</b>
              <b>₹ {getTotalCartAmount()+ 50}</b>
            </div>
           </div>
           <button onClick={() =>nevigate('/placeorder')}>CheckOut</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have Promocode, Enter It Here</p>
              <div className="cart-promocode-input">
                <input type="text" placeholder="promo code" />
                <button>Submit</button>
              </div>
            
          </div>
        </div>
      </div>
    </div>
    )
  }
  export default cart