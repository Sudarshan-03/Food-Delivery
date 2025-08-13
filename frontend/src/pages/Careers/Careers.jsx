import React, { useEffect } from 'react';
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
    }
  ];

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
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Careers;