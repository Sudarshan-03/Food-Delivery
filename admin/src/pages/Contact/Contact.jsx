import React from 'react'
import './Contact.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../../assets/assets'

const Contact = ({ url }) => {
  const [contacts, setContacts] = useState([]);

  const fetchAllContacts = async () => {
    try {
      const response = await axios.get( url + "/api/contact/contacts");
      if (response.data.success) {
        setContacts(response.data.data);
      } else {
        toast.error("Error");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching contacts");
    }
  }

  useEffect(() => {
    fetchAllContacts();
  }, [])

  return (
    <div className='contact add'>
      <h3>Contact Messages</h3>
      <div className="contact-list">
        {contacts.map((contact, index) => (
          <div key={index} className="contact-item">
            <img src={assets.email} alt="email icon" />
            <div>
              <p className='contact-item-name'>{contact.name}</p>
              <p className='contact-item-email'>{contact.email}</p>
              <p className='contact-item-subject'>{contact.subject}</p>
              <p className='contact-item-message'>{contact.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Contact
