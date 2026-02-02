import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../Context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({ category }) => {
  const { food_list, url, searchTerm } = useContext(StoreContext)
  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {food_list.filter(item => {
          if (category !== "All" && category !== item.category) {
            return false;
          }
          if (searchTerm && !item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            return false;
          }
          return true;
        }).map((item, index) => {
          return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={url + "/images/" + item.image} />
        })}
      </div>
    </div>
  )
}

export default FoodDisplay