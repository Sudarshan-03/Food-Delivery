import React from 'react';
import './AboutUs.css';
import { assets } from '../../assets/assets'
const AboutUs = () => {
  return (
    <section className="about-section">
      <div className="about-container">
        <div className="about-content">
          <h2>About <span className="highlight-text">ZestyBites.</span></h2>
          <p>
            Founded in 2020, ZestyBite has revolutionized the way people experience food delivery. What started as a simple idea to connect food lovers with their favorite restaurants has grown into the city's most trusted delivery platform.
          </p>
          <p>
            We believe that <span className="highlight-text">great food should be accessible to everyone</span>, delivered fast, fresh, and with a smile. Our dedicated team works around the clock to ensure every meal reaches you at the perfect temperature, every time.
          </p>
          <p>
            From local family restaurants to popular chains, we've partnered with the best establishments in town to bring you an incredible variety of cuisines, all at the tap of a button.
          </p>
        </div>
        
        <div className="about-image">
           <img className='logo2' src={assets.logo3} alt="" />
        </div>
      </div>

      <div className="stats-section">
        <div className="stat-card">
          <span className="stat-number">10K+ </span>
          <span className="stat-label">Happy Customers</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">50+ </span>
          <span className="stat-label">Partner Restaurants</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">2K+ </span>
          <span className="stat-label">Orders Delivered</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">15min </span>
          <span className="stat-label">Average Delivery</span>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;