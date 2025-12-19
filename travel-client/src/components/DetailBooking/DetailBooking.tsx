import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DetailBooking.scss';

interface DetailBookingProps {
  price: string;
  originalPrice?: string | null;
  discount?: string | null;
  timeSlots?: string[];
  type: 'tour' | 'short-tour' | 'trek';
  itemId?: string;
  itemTitle?: string;
  itemLocation?: string;
}

const DetailBooking: React.FC<DetailBookingProps> = ({ 
  price, 
  originalPrice, 
  discount, 
  timeSlots,
  type,
  itemId = '1',
  itemTitle = 'Experience',
  itemLocation = 'Location'
}) => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState('');
  const [personCount, setPersonCount] = useState(1);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');

  const calculateTotal = () => {
    const basePrice = parseFloat(price.replace(/[^0-9.]/g, ''));
    const total = basePrice * personCount;
    return total.toFixed(2);
  };

  const handleBookingClick = () => {
    if (!selectedDate || (timeSlots && !selectedTimeSlot)) {
      alert('Please select date' + (timeSlots ? ' and time' : '') + ' before booking');
      return;
    }
    
    const bookingData = {
      bookingType: getBookingType(),
      itemId,
      itemTitle,
      itemLocation,
      selectedDate,
      selectedTime: selectedTimeSlot,
      numberOfPersons: personCount,
      basePrice: parseFloat(price.replace(/[^0-9.]/g, ''))
    };
    
    navigate(`/booking/${getBookingType()}/${itemId}`, { 
      state: { bookingData } 
    });
  };

  const getBookingButtonText = () => {
    switch (type) {
      case 'short-tour':
        return 'Book Quick Escape';
      case 'trek':
        return 'Book Adventure';
      default:
        return 'Book Now';
    }
  };

  const getBookingType = () => {
    switch (type) {
      case 'trek':
        return 'trek';
      case 'tour':
        return 'tour';
      case 'short-tour':
        return 'short-tour';
      default:
        return 'tour';
    }
  };

  return (
    <div className="detail-booking">
      <div className="detail-booking__container">
        <div className="detail-booking__pricing">
          <h3>From</h3>
          <div className="detail-booking__right">
            <div className="detail-booking__price-container">
              {originalPrice && (
                <span className="detail-booking__original-price">{originalPrice}</span>
              )}
              <span className="detail-booking__price">{price}</span>
              {discount && (
                <span className="detail-booking__discount">{discount}</span>
              )}
            </div>
            <div className="detail-booking__price-note">per person</div>
          </div>
        </div>

        <div className="detail-booking__form">
          <div className="detail-booking__field">
            <label className="detail-booking__label">Date</label>
            <div className="detail-booking__input-container">
              <input
                type="date"
                className="detail-booking__input"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                required
              />
              <i className="fa-solid fa-calendar detail-booking__input-icon"></i>
            </div>
          </div>

          {timeSlots && timeSlots.length > 0 && (
            <div className="detail-booking__field">
              <label className="detail-booking__label">Time Slot</label>
              <select
                className="detail-booking__select"
                value={selectedTimeSlot}
                onChange={(e) => setSelectedTimeSlot(e.target.value)}
                required
              >
                <option value="">Select time</option>
                {timeSlots.map((slot, index) => (
                  <option key={index} value={slot}>{slot}</option>
                ))}
              </select>
            </div>
          )}

          <div className="detail-booking__field">
            <label className="detail-booking__label">Number of Persons</label>
            <div className="detail-booking__counter">
              <button
                type="button"
                onClick={() => setPersonCount(Math.max(1, personCount - 1))}
                className="detail-booking__counter-btn"
              >
                -
              </button>
              <span className="detail-booking__counter-value">{personCount}</span>
              <button
                type="button"
                onClick={() => setPersonCount(personCount + 1)}
                className="detail-booking__counter-btn"
              >
                +
              </button>
            </div>
          </div>

          <div className="detail-booking__total">
            <div className="detail-booking__total-label">Total</div>
            <div className="detail-booking__total-value">${calculateTotal()}</div>
          </div>

          <button 
            type="button"
            className="detail-booking__book-btn"
            onClick={handleBookingClick}
          >
            {getBookingButtonText()}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailBooking;