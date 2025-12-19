import React, { useState, useEffect } from 'react';
import './HeroCarousel.scss';

interface CarouselSlide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
}

interface HeroCarouselProps {
  slides: CarouselSlide[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ 
  slides, 
  autoPlay = true, 
  autoPlayInterval = 5000 
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  if (!slides || slides.length === 0) {
    return null;
  }

  return (
    <div className="hero-carousel">
      <div className="hero-carousel__container">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`hero-carousel__slide ${
              index === currentSlide ? 'active' : ''
            }`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="hero-carousel__overlay"></div>
            <div className="hero-carousel__content">
              <div className="container">
                <h1 className="hero-carousel__title">{slide.title}</h1>
                <p className="hero-carousel__subtitle">{slide.subtitle}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          className="hero-carousel__nav hero-carousel__nav--prev"
          onClick={goToPrevious}
          aria-label="Previous slide"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>

        <button
          className="hero-carousel__nav hero-carousel__nav--next"
          onClick={goToNext}
          aria-label="Next slide"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>

        {/* Dots Navigation */}
        <div className="hero-carousel__dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`hero-carousel__dot ${
                index === currentSlide ? 'active' : ''
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;
