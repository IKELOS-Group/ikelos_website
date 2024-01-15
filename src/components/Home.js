// Home.js
import React, { useState } from 'react';
import '../Home.css'; // Ensure the CSS file path is correct

// Placeholder testimonial data
const testimonials = [
  {
    quote: "The Ikelos Group is amazing.",
    author: "Satisfied Customer Name",
  },

  {
    quote: "Hire them yesterday.",
    author: "Satisfied Customer Name 2",
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
      
      <div className="blog-highlights">
<p>From our blog</p>
{/* Insert blog posts */}
</div>


  <div className="newsletter-sign-up">
    <p>Stay updated with the latest security insights</p>
    <button className="cta-button">SIGN UP FOR NEWSLETTER</button>
  </div>
</div>
  )};

  export default Home;