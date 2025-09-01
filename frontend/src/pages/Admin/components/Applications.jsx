import React, { useState, useEffect } from 'react';
import './Applications.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const Applications = () => {
  const [applications, setApplications] = useState([]);

  const fetchApplications = async () => {
    try {
      const response = await axios.get('https://food-delivery-backend-rkui.onrender.com/api/application');
      if (response.data.success) {
        setApplications(response.data.data);
      } else {
        toast.error('Error fetching applications');
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <div className='application add'>
      <h3>Job Applications</h3>
      <div className='application-list'>
        <div className='application-list-format title'>
          <b>Name</b>
          <b>Email</b>
          <b>Position</b>
          <b>Cover Letter</b>
        </div>
        {applications.map((application, index) => (
          <div key={index} className='application-list-format'>
            <p>{application.name}</p>
            <p>{application.email}</p>
            <p>{application.position}</p>
            <p>{application.coverLetter}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Applications;