import React, { useState } from 'react';
import './ShortTourDetailBooking.scss';

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

const ShortTourDetailBooking: React.FC<Props> = ({ tour }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [groupSize, setGroupSize] = useState(1);
  const [selectedTime, setSelectedTime] = useState('');

  const timeSlots = [
    { value: '9:00', label: '9:00 AM' },
    { value: '10:00', label: '10:00 AM' },
    { value: '11:00', label: '11:00 AM' },
    { value: '14:00', label: '2:00 PM' },
    { value: '15:00', label: '3:00 PM' }
  ];

  const calculateTotal = () => {
    const basePrice = parseInt(tour.price.replace('$', ''));
    return basePrice * groupSize;
  };

  const handleBooking = () => {
    alert('Booking functionality would be implemented here!');
  };

  return (
    <div className="short-tour-detail-booking">
      <div className="short-tour-detail-booking__header">
        <div className="short-tour-detail-booking__price">
          <span className="short-tour-detail-booking__price-value">{tour.price}</span>
          <span className="short-tour-detail-booking__price-unit">per person</span>
        </div>
        <div className="short-tour-detail-booking__rating">
          <div className="short-tour-detail-booking__stars">
            {[...Array(5)].map((_, i) => (
              <i 
                key={i} 
                className={`fa-solid fa-star ${
                  i < Math.floor(tour.rating) ? 'active' : ''
                }`}
              ></i>
            ))}
          </div>
          <span className="short-tour-detail-booking__rating-text">
            {tour.rating} ({tour.reviewCount} reviews)
          </span>
        </div>
      </div>

      <div className="short-tour-detail-booking__form">
        <div className="short-tour-detail-booking__field">
          <label>Select Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        <div className="short-tour-detail-booking__field">
          <label>Select Time</label>
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
          >
            <option value="">Choose time</option>
            {timeSlots.map((slot) => (
              <option key={slot.value} value={slot.value}>
                {slot.label}
              </option>
            ))}
          </select>
        </div>

        <div className="short-tour-detail-booking__field">
          <label>Group Size</label>
          <div className="short-tour-detail-booking__group-size">
            <button 
              onClick={() => setGroupSize(Math.max(1, groupSize - 1))}
              disabled={groupSize <= 1}
            >
              <i className="fa-solid fa-minus"></i>
            </button>
            <span>{groupSize}</span>
            <button 
              onClick={() => setGroupSize(Math.min(8, groupSize + 1))}
              disabled={groupSize >= 8}
            >
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>

        <div className="short-tour-detail-booking__total">
          <div className="short-tour-detail-booking__total-row">
            <span>Base Price ({groupSize} person{groupSize > 1 ? 's' : ''})</span>
            <span>${calculateTotal()}</span>
          </div>
          <div className="short-tour-detail-booking__total-row short-tour-detail-booking__total-row--final">
            <span>Total</span>
            <span>${calculateTotal()}</span>
          </div>
        </div>

        <button 
          className="short-tour-detail-booking__book-btn"
          onClick={handleBooking}
          disabled={!selectedDate || !selectedTime}
        >
          <i className="fa-solid fa-calendar-check"></i>
          Book Now
        </button>

        <div className="short-tour-detail-booking__features">
          <div className="short-tour-detail-booking__feature">
            <i className="fa-solid fa-shield-check"></i>
            <span>Free cancellation up to 24h before</span>
          </div>
          <div className="short-tour-detail-booking__feature">
            <i className="fa-solid fa-clock"></i>
            <span>Instant confirmation</span>
          </div>
          <div className="short-tour-detail-booking__feature">
            <i className="fa-solid fa-headset"></i>
            <span>24/7 customer support</span>
          </div>
        </div>

        <div className="short-tour-detail-booking__info">
          <h4>Why Choose This Tour?</h4>
          <ul>
            <li>Perfect for busy schedules</li>
            <li>Small group experience</li>
            <li>Expert local guide</li>
            <li>All-inclusive pricing</li>
            <li>Flexible timing options</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ShortTourDetailBooking;
