import React, { useEffect } from 'react';
import './FilterSlider.scss';

interface FilterSliderProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const FilterSlider: React.FC<FilterSliderProps> = ({
  isOpen,
  onClose,
  title = 'Filters',
  children
}) => {
  // Prevent body scroll when slider is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`filter-slider__backdrop ${isOpen ? 'active' : ''}`}
        onClick={onClose}
      />
      
      {/* Slider */}
      <div className={`filter-slider ${isOpen ? 'active' : ''}`}>
        <div className="filter-slider__header">
          <h3 className="filter-slider__title">
            <i className="fa-solid fa-filter"></i>
            {title}
          </h3>
          <button 
            className="filter-slider__close"
            onClick={onClose}
            aria-label="Close filters"
          >
            <i className="fa-solid fa-times"></i>
          </button>
        </div>

        <div className="filter-slider__content">
          {children}
        </div>
      </div>
    </>
  );
};

export default FilterSlider;
