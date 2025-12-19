import React, { useState } from 'react';
import './TrekDetailBooking.scss';

interface TrekDetailBookingProps {
  price: string;
  originalPrice?: string;
  discount?: string;
  currency?: string;
}

const TrekDetailBooking: React.FC<TrekDetailBookingProps> = ({
  price,
  originalPrice,
  discount,
  // currency = 'USD'
}) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [personCount, setPersonCount] = useState(1);

  const calculateTotal = () => {
    const basePrice = parseFloat(price.replace(/[^0-9.]/g, ''));
    const total = basePrice * personCount;
    return total.toFixed(2);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle booking logic here
    console.log('Booking submitted:', {
      date: selectedDate,
      persons: personCount,
      total: calculateTotal()
    });
  };

  return (
    <div className="trek-detail-booking">
      <div className="trek-detail-booking__container">
        <div className="trek-detail-booking__pricing">
          <h3>From</h3>
          <div className="right">
          <div className="trek-detail-booking__price-container">
            {originalPrice && (
              <span className="trek-detail-booking__original-price">{originalPrice}</span>
            )}
            <span className="trek-detail-booking__price">{price}</span>
            {discount && (
              <span className="trek-detail-booking__discount">{discount}</span>
            )}
          </div>
          <div className="trek-detail-booking__price-note">per person</div>

          </div>
        </div>

        <form className="trek-detail-booking__form" onSubmit={handleBookingSubmit}>
          <div className="trek-detail-booking__field">
            <label className="trek-detail-booking__label">Date</label>
            <input
              type="date"
              className="trek-detail-booking__input"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              required
            />
          </div>

          <div className="trek-detail-booking__field">
            <label className="trek-detail-booking__label">Number of Persons</label>
            <div className="trek-detail-booking__counter">
              <button
                type="button"
                onClick={() => setPersonCount(Math.max(1, personCount - 1))}
                className="trek-detail-booking__counter-btn"
              >
                -
              </button>
              <span className="trek-detail-booking__counter-value">{personCount}</span>
              <button
                type="button"
                onClick={() => setPersonCount(personCount + 1)}
                className="trek-detail-booking__counter-btn"
              >
                +
              </button>
            </div>
          </div>

          <div className="trek-detail-booking__total">
            <div className="trek-detail-booking__total-label">Total</div>
            <div className="trek-detail-booking__total-value">${calculateTotal()}</div>
          </div>

          <button 
            type="submit" 
            className="trek-detail-booking__book-btn"
            disabled={!selectedDate}
          >
            Book Now
          </button>
        </form>
{/* 
        <div className="trek-detail-booking__help">
          <div className="trek-detail-booking__help-title">Need help with booking?</div>
          <div className="trek-detail-booking__help-phone">+1 9555 278 58 43</div>
          <button className="trek-detail-booking__help-chat">Chat now</button>
        </div> */}
      </div>
    </div>
  );
};

export default TrekDetailBooking;
