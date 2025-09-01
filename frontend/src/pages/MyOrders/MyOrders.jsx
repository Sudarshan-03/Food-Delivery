import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrders = () => {
    const {url,token} = useContext(StoreContext);
    const [data,setData]=useState([]);

    const fetchOrders = async () => {
            const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
            setData(response.data.data);
    }
    
    useEffect(() => {
        if (token) {
            fetchOrders();
        } else {
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                fetchOrders(); // use existing token
            }
        }
        // eslint-disable-next-line
    }, [token]);

  const downloadInvoice = (order) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Order Invoice", 14, 20);
    doc.setFontSize(12);
    doc.text(`Order ID: ${order && order._id ? order._id : "N/A"}`, 14, 26);
    doc.text(`Status: ${order && order.status ? order.status : "N/A"}`, 14, 34);
    doc.text(`Amount: ₹${order && order.amount ? order.amount : "0"}.00`, 14, 42);
    doc.text(`Items: ${order && order.items ? order.items.length : 0}`, 14, 50);

    const tableColumn = ["Item", "Quantity"];
    const tableRows = [];

    (order.items || []).forEach(item => {
      const itemData = [item.name || "N/A", item.quantity || 0];
      tableRows.push(itemData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 60,
    });

    setTimeout(() => {
      doc.save(`invoice_${order && order._id ? order._id : "order"}.pdf`);
    }, 0);
  };

  return (
    <div className='my-orders'>
        <h2>My Order</h2>
        <div className="container">
            {!token ? (
                <p>Please login again to view your orders.</p>
            ) : data.length === 0 ? (
                <p>You have no orders yet.</p>
            ) : (
                data.map((order, index) => (
                    <div key={index} className="my-orders-order">
                        <img src={assets.parcel_icon} alt="" />
                        <p>{order.items.map((item, index) => {
                            if(index === order.items.length - 1){
                                return item.name + " x " + item.quantity;
                            } else {
                                return item.name + " x " + item.quantity + "  ,  ";
                            }
                        })}</p>
                        <p>₹{order.amount}.00</p>
                        <p>Items:{order.items.length}</p>
                        <p><span>&#x25cf;</span><b>{order.status}</b></p>
                        <button onClick={() => downloadInvoice(order)}>Download Invoice</button>
                        <button onClick={fetchOrders}>Track Order</button>
                        
                    </div>
                ))
            )}
        </div>
        

    </div>
  )
}

export default MyOrders