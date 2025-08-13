import React, { useState } from 'react';
import './ContactUs.css';

const ContactUs = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you soon.');
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
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
              <p>123 Food Street<br />Downtown District <br/> City, State IN <br/> 12345</p>
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
              <p>General Inquiries:<br /><a href="mailto:hello@quickbite.com">hello@quickbite.com</a></p>
              <p>Support:<br /><a href="mailto:support@quickbite.com">support@quickbite.com</a></p>
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
                {/* <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                  />
                </div> */}
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