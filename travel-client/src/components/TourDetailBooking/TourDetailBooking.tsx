import React, { useState } from 'react';
import './TourDetailBooking.scss';

interface Tour {
  id: number;
  image: string;
  location: string;
  duration: string;
  title: string;
  rating: number;
  reviewCount: number;
  price: string;
  category: string;
  description: string;
  highlights: string[];
}

interface Props {
  tour: Tour;
}

const TourDetailBooking: React.FC<Props> = ({ tour }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [groupSize, setGroupSize] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const bookingOptions = [
    { id: 'guide', name: 'Private Guide', price: 50, description: 'Dedicated guide for your group' },
    { id: 'transport', name: 'Private Transport', price: 80, description: 'Comfortable private vehicle' },
    { id: 'lunch', name: 'Lunch Included', price: 25, description: 'Traditional local lunch' },
    { id: 'insurance', name: 'Travel Insurance', price: 15, description: 'Comprehensive coverage' }
  ];

  const handleOptionToggle = (optionId: string) => {
    setSelectedOptions(prev => 
      prev.includes(optionId) 
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    );
  };

  const calculateTotal = () => {
    const basePrice = parseInt(tour.price.replace('$', ''));
    const optionsPrice = selectedOptions.reduce((total, optionId) => {
      const option = bookingOptions.find(opt => opt.id === optionId);
      return total + (option ? option.price : 0);
    }, 0);
    return (basePrice + optionsPrice) * groupSize;
  };

  const handleBooking = () => {
    alert('Booking functionality would be implemented here!');
  };

  return (
    <div className="tour-detail-booking">
      <div className="tour-detail-booking__header">
        <div className="tour-detail-booking__price">
          <span className="tour-detail-booking__price-label">From</span>
          <span className="tour-detail-booking__price-value">{tour.price}</span>
          <span className="tour-detail-booking__price-unit">per person</span>
        </div>
        <div className="tour-detail-booking__rating">
          <div className="tour-detail-booking__stars">
            {[...Array(5)].map((_, i) => (
              <i 
                key={i} 
                className={`fa-solid fa-star ${
                  i < Math.floor(tour.rating) ? 'active' : ''
                }`}
              ></i>
            ))}
          </div>
          <span className="tour-detail-booking__rating-text">
            {tour.rating} ({tour.reviewCount} reviews)
          </span>
        </div>
      </div>

      <div className="tour-detail-booking__form">
        <div className="tour-detail-booking__field">
          <label>Select Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        <div className="tour-detail-booking__field">
          <label>Group Size</label>
          <div className="tour-detail-booking__group-size">
            <button 
              onClick={() => setGroupSize(Math.max(1, groupSize - 1))}
              disabled={groupSize <= 1}
            >
              <i className="fa-solid fa-minus"></i>
            </button>
            <span>{groupSize}</span>
            <button 
              onClick={() => setGroupSize(Math.min(12, groupSize + 1))}
              disabled={groupSize >= 12}
            >
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>

        <div className="tour-detail-booking__options">
          <h3>Add Options</h3>
          {bookingOptions.map((option) => (
            <div 
              key={option.id} 
              className="tour-detail-booking__option"
            >
              <label>
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(option.id)}
                  onChange={() => handleOptionToggle(option.id)}
                />
                <div className="tour-detail-booking__option-content">
                  <h4>{option.name}</h4>
                  <p>{option.description}</p>
                </div>
                <div className="tour-detail-booking__option-price">
                  +${option.price}
                </div>
              </label>
            </div>
          ))}
        </div>

        <div className="tour-detail-booking__total">
          <div className="tour-detail-booking__total-row">
            <span>Base Price ({groupSize} person{groupSize > 1 ? 's' : ''})</span>
            <span>${parseInt(tour.price.replace('$', '')) * groupSize}</span>
          </div>
          {selectedOptions.map(optionId => {
            const option = bookingOptions.find(opt => opt.id === optionId);
            return option ? (
              <div key={optionId} className="tour-detail-booking__total-row">
                <span>{option.name}</span>
                <span>${option.price * groupSize}</span>
              </div>
            ) : null;
          })}
          <div className="tour-detail-booking__total-row tour-detail-booking__total-row--final">
            <span>Total</span>
            <span>${calculateTotal()}</span>
          </div>
        </div>

        <button 
          className="tour-detail-booking__book-btn"
          onClick={handleBooking}
          disabled={!selectedDate}
        >
          <i className="fa-solid fa-calendar-check"></i>
          Book This Tour
        </button>

        <div className="tour-detail-booking__features">
          <div className="tour-detail-booking__feature">
            <i className="fa-solid fa-shield-check"></i>
            <span>Free cancellation up to 24h before</span>
          </div>
          <div className="tour-detail-booking__feature">
            <i className="fa-solid fa-clock"></i>
            <span>Instant confirmation</span>
          </div>
          <div className="tour-detail-booking__feature">
            <i className="fa-solid fa-headset"></i>
            <span>24/7 customer support</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetailBooking;
