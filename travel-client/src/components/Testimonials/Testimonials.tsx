import React, { useState } from 'react';
import './Testimonials.scss';
import SectionHeading from '../SectionHeading/Index';

const Testimonials: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      text: "Travel Adventure Nepal Exceeded Our Expectations! The Booking Process Was Seamless, The Itinerary Was Well-Planned, And Our Guide Was Incredibly Knowledgeable. We Discovered Breathtaking Places And Had A Stress-Free, Unforgettable Experience. Highly Recommend!",
      author: "Jane Cooper",
      title: "Design",
      avatar: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop"
    },
    {
      id: 2,
      text: "Amazing service and incredible destinations! Travel Adventure Nepal made our dream vacation a reality with their attention to detail and personalized approach.",
      author: "John Smith",
      title: "Marketing",
      avatar: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop"
    },
    {
      id: 3,
      text: "The best travel experience we've ever had. Professional team, beautiful locations, and memories that will last a lifetime.",
      author: "Sarah Johnson",
      title: "Sales",
      avatar: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentTestimonial(index);
  };

  return (
    <section className="testimonials section">
      <div className="container">
        <div className="inner">
                  <SectionHeading topTitle='Testimonials' title='What Others are saying about us' center iconclassName="fa-solid fa-users" />

        <div className="testimonials__rating">
          <div className="testimonials__stars">
            {[...Array(5)].map((_, i) => (
              <svg key={i} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L15.09 8.26L22 9.27L17 15.14L18.18 22.02L12 17.77L5.82 22.02L7 15.14L2 9.27L8.91 8.26L12 2Z"/>
              </svg>
            ))}
          </div>
        </div>
        
        <div className="testimonials__content">
          <div className="testimonials__testimonial">
            <blockquote className="testimonials__quote">
              "{testimonials[currentTestimonial].text}"
            </blockquote>
            
            <div className="testimonials__author">
              <div className="testimonials__avatar">
                <img 
                  src={testimonials[currentTestimonial].avatar} 
                  alt={testimonials[currentTestimonial].author} 
                />
              </div>
              <div className="testimonials__author-info">
                <h4 className="testimonials__author-name">
                  {testimonials[currentTestimonial].author}
                </h4>
                <p className="testimonials__author-title">
                  {testimonials[currentTestimonial].title}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="testimonials__navigation">
          <div className="testimonials__dots">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`testimonials__dot ${index === currentTestimonial ? 'active' : ''}`}
                onClick={() => goToTestimonial(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          
          <div className="testimonials__arrows">
            <button 
              className="testimonials__arrow testimonials__arrow--prev"
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <button 
              className="testimonials__arrow testimonials__arrow--next"
              onClick={nextTestimonial}
              aria-label="Next testimonial"
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
        </div>
        
      </div>
    </section>
  );
};

export default Testimonials;
