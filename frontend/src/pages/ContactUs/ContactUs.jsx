import React, { useState, useContext } from 'react';
import './ContactUs.css';
import { StoreContext } from '../../Context/StoreContext';

const ContactUs = () => {
  const { url } = useContext(StoreContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${url}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        alert('Message sent successfully!');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        alert('Failed to send message');
      }
    } catch (err) {
      console.error(err);
      alert('Error sending message');
    }
  };
  return (
    <section className="contact-section">
      <div className="contact-header">
        <p>We'd love to hear from you! Whether you have questions, feedback, or need support, our team is here to help.</p>
      </div>

      <div className="contact-container">
        <div className="contact-info-row">
          <div className="contact-info">
            <div className="info-card">
              {/* <div className="info-icon">📍</div> */}
              <h3>Our Location</h3>
              <p>India Mart C/o Burger Point<br />Sector K, LDA Colony <br /> Lucknow, Uttar Pradesh <br /> 226012, India</p>
            </div>

            <div className="info-card">
              {/* <div className="info-icon">📞</div> */}
              <h3>Phone Number</h3>
              <p>Customer Support:<br /><a href="tel:+1234567890">+1 (234) 567-8900</a></p>
              <p>Restaurant Partners:<br /><a href="tel:+1234567891">+1 (234) 567-8901</a></p>
            </div>

            <div className="info-card">
              {/* <div className="info-icon">✉️</div> */}
              <h3>Email Address</h3>
              <p>General Inquiries:<br /><a href="mailto:hello@zestybites.com">hello@zestybites.com</a></p>
              <p>Support:<br /><a href="mailto:support@zestybites.com">support@zestybites.com</a></p>
            </div>

          </div>
        </div>

        <div className="contact-form-row">
          <div className="contact-form-container">
            <div className="form-header">
              <h2>Send Us a Message</h2>
              {/* <p>Fill out the form below and we'll respond as soon as possible.</p> */}
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Customer Support</option>
                    <option value="partnership">Restaurant Partnership</option>
                    <option value="feedback">Feedback</option>
                    <option value="complaint">Complaint</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">
                <span>Send Message</span>
                <div className="btn-icon"></div>
              </button>
            </form>
          </div>
        </div>
      </div>


    </section>
  );
};

export default ContactUs;