// Home.js
import React, { useState } from 'react';
import '../Home.css'; // Ensure the CSS file path is correct

// Placeholder testimonial data
const testimonials = [
  {
    quote: "IKELOS Group solves all of our security needs!",
    author: "Paul J.",
  },

  {
    quote: "[IKELOS Group] brings security to the non-computer-y folk.",
    author: "Thomas P.",
  },
  // More testimonials can be added here
];

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const goToPrevious = () => {
    setActiveIndex(prev => prev === 0 ? testimonials.length - 1 : prev - 1);
  };

  const goToNext = () => {
    setActiveIndex(prev => prev === testimonials.length - 1 ? 0 : prev + 1);
  };

  return (
    <div className="home-container">
      <div className="hero-section">
        <h2>Defend Your Digital World with Ikelos Group</h2>
        <button className="cta-button">LEARN MORE</button>
      </div>
      
      <div className="testimonials-teaser">
        <div className="testimonial">
          {testimonials.length > 1 && (
            <button onClick={goToPrevious}>&#9664;</button> // Left arrow
          )}
          <blockquote>
            <p>"{testimonials[activeIndex].quote}"</p>
            <footer>- {testimonials[activeIndex].author}</footer>
          </blockquote>
          {testimonials.length > 1 && (
            <button onClick={goToNext}>&#9654;</button> // Right arrow
          )}
        </div>
      </div>
      
      {/* Additional sections like blog-highlights and newsletter-sign-up */}
      
</div>
  )};

  export default Home;