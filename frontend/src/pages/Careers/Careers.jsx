import React, { useEffect, useRef, useState } from 'react';
import './Careers.css';

const Careers = () => {
  useEffect(() => {
    document.title = "Careers - Join QuickBite";
  }, []);
  const jobPositions = [
    {
      title: " Delivery Driver",
      description: "Join our fleet of delivery heroes! Flexible schedules, competitive pay.",
      requirements: "Valid driver's license, reliable vehicle, smartphone, positive attitude"
    },
    {
      title: " Software Engineer",
      description: "Build the tech that powers millions of food deliveries. Work on cutting-edge mobile.",
      requirements: "2+ years experience, React/Node.js, problem-solving skills, team player"
    },
    {
      title: " Restaurant Partner Manager",
      description: "Be the bridge between QuickBite and amazing restaurants. .",
      requirements: "Sales experience, excellent communication, relationship building."
    },
    {
      title: " Customer Success Specialist",
      description: "Make every customer interaction amazing! Solve problems, answer questions..",
      requirements: "Customer service experience, empathy, multitasking abilities, tech-savvy"
    },
    {
      title: " Marketing Coordinator",
      description: "Help plan and execute marketing campaigns to grow QuickBite's customer base.",
      requirements: "Marketing experience, creativity, social media skills, analytical mindset"
    },
    {
      title: " Data Analyst",
      description: "Analyze data to help improve delivery efficiency and customer satisfaction.",
      requirements: "Proficiency in SQL, data visualization tools, analytical skills, attention to detail"
    }
  ];

  const applyFormRef = useRef(null);
  const [selectedPosition, setSelectedPosition] = useState("");

  const scrollToForm = (position) => {
    setSelectedPosition(position);
    if (applyFormRef.current) {
      applyFormRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleApplicationSubmit = async (e) => {
    e.preventDefault();
    const applicationData = {
      name: e.target.name.value,
      email: e.target.email.value,
      position: selectedPosition,
      coverLetter: e.target.coverLetter.value
    };
    try {
      const res = await fetch('https://food-delivery-backend-rkui.onrender.com/api/application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(applicationData)
      });
      if (res.ok) {
        alert('Application submitted successfully!');
        e.target.reset();
        setSelectedPosition("");
      } else {
        alert('Failed to submit application');
      }
    } catch (err) {
      console.error(err);
      alert('Error submitting application');
    }
  };

  return (
    <div className="careers-page">
      
      {/* Open Positions */}
      <section className="positions" id="positions">
        <div className="positions-container">
          <h2>Open Positions</h2>
          <div className="job-grid">
            {jobPositions.map((job, index) => (
              <div key={index} className="job-card">
                <h3>{job.title}</h3>
                <p>{job.description}</p>
                <div className="requirements">
                  <strong>Requirements:</strong> {job.requirements}
                </div>
                <button
                  className="apply-button"
                  onClick={() => scrollToForm(job.title)}
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
          <section className="apply-form-section" ref={applyFormRef}>
        <div className="apply-form-container">
        <h2>Apply for a Position</h2>
        <form className="apply-form" onSubmit={handleApplicationSubmit}>
          <input type="text" name="name" placeholder="Your Name" required />
          <input type="email" name="email" placeholder="Your Email" required />
          <input
            type="text"
            name="position"
            placeholder="Position Applying For"
            value={selectedPosition}
            onChange={(e) => setSelectedPosition(e.target.value)}
            required
          />
          <textarea name="coverLetter" placeholder="Cover Letter" rows="5" required></textarea>
          <button type="submit" className="apply-button">Submit Application</button>
        </form>
      </div>
    </section>

    </div>
  );
};

export default Careers;