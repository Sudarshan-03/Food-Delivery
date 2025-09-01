import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = () => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get('https://food-delivery-backend-rkui.onrender.com/api/food/list');
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error('Error fetching list');
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post('https://food-delivery-backend-rkui.onrender.com/api/food/remove', { id: foodId });
      await fetchList();
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error('Error removing food');
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className='list-table'>
        <div className='list-table-format title'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className='list-table-format'>
              <img src={`https://food-delivery-backend-rkui.onrender.com/images/` + item.image} alt='' />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={() => removeFood(item._id)} className='cursor'>
                x
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;