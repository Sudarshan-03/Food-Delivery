import React from 'react'
import './Applications.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../../assets/assets'

const Applications = ({ url }) => {
  const [applications, setApplications] = useState([]);

  const fetchAllApplications = async () => {
    try {
      const response = await axios.get(url + "/api/application/list");
      if (response.data.success) {
        setApplications(response.data.data);
      } else {
        toast.error("Error");
      }
    } catch (error) {
      toast.error("Error fetching applications");
    }
  }

  useEffect(() => {
    fetchAllApplications();
  }, [])

  return (
    <div className='application add'>
      <h3>Applications</h3>
      <div className="application-list">
        {applications.map((application, index) => (
          <div key={index} className="application-item">
            <img src={assets.parcel_icon} alt="parcel icon" />
            <div>
              <p className='application-item-name'>{application.name}</p>
              <p className='application-item-email'>{application.email}</p>
              <p className='application-item-phone'>{application.phone}</p>
              <p className='application-item-resume'>{application.resume}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Applications
