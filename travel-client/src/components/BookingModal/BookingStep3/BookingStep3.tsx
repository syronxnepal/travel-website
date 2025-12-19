import React from 'react';
import './BookingStep3.scss';

interface BookingData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  nationality: string;
  emergencyContact: string;
  emergencyPhone: string;
  specialRequests: string;
  bookingType: 'trek' | 'tour' | 'short-tour' | 'custom-package';
  itemId: string;
  itemTitle: string;
  itemLocation: string;
  selectedDate: string;
  selectedTime?: string;
  numberOfPersons: number;
  basePrice: number;
  totalPrice: number;
  paymentMethod: 'card' | 'bank' | 'wallet';
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
  billingAddress: string;
  travelInsurance: boolean;
  privateGuide: boolean;
  privateTransport: boolean;
  mealUpgrade: boolean;
  additionalOptions: string[];
}

interface BookingStep3Props {
  data: BookingData;
  onPrevious: () => void;
  onSubmit: () => void;
  isProcessing: boolean;
}

const BookingStep3: React.FC<BookingStep3Props> = ({ data, onPrevious, onSubmit, isProcessing }) => {
  const getBookingTypeLabel = () => {
    switch (data.bookingType) {
      case 'trek':
        return 'Trekking Adventure';
      case 'tour':
        return 'Tour Experience';
      case 'short-tour':
        return 'Short Tour';
      case 'custom-package':
        return 'Custom Package';
      default:
        return 'Experience';
    }
  };

  const getPaymentMethodLabel = () => {
    switch (data.paymentMethod) {
      case 'card':
        return 'Credit/Debit Card';
      case 'bank':
        return 'Bank Transfer';
      case 'wallet':
        return 'Digital Wallet';
      default:
        return 'Payment';
    }
  };

  const formatCardNumber = (cardNumber: string) => {
    return cardNumber.replace(/\d(?=\d{4})/g, '*');
  };

  const calculateBreakdown = () => {
    const baseAmount = data.basePrice * data.numberOfPersons;
    const insuranceAmount = data.travelInsurance ? 25 * data.numberOfPersons : 0;
    const guideAmount = data.privateGuide ? 50 * data.numberOfPersons : 0;
    const transportAmount = data.privateTransport ? 80 * data.numberOfPersons : 0;
    const mealAmount = data.mealUpgrade ? 30 * data.numberOfPersons : 0;
    
    const subtotal = baseAmount + insuranceAmount + guideAmount + transportAmount + mealAmount;
    const tax = subtotal * 0.2;
    const total = subtotal + tax;

    return {
      baseAmount,
      insuranceAmount,
      guideAmount,
      transportAmount,
      mealAmount,
      subtotal,
      tax,
      total
    };
  };

  const breakdown = calculateBreakdown();

  return (
    <div className="booking-step3">
      <div className="booking-step3__section">
        <h3 className="booking-step3__section-title">Booking Summary</h3>
        <div className="booking-step3__booking-details">
          <div className="booking-step3__booking-item">
            <div className="booking-step3__item-info">
              <h4 className="booking-step3__item-title">{data.itemTitle}</h4>
              <p className="booking-step3__item-location">
                <i className="fa-solid fa-location-dot"></i>
                {data.itemLocation}
              </p>
              <p className="booking-step3__item-type">
                <i className="fa-solid fa-tag"></i>
                {getBookingTypeLabel()}
              </p>
            </div>
            <div className="booking-step3__item-details">
              <div className="booking-step3__detail-row">
                <span>Date:</span>
                <span>{new Date(data.selectedDate).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              {data.selectedTime && (
                <div className="booking-step3__detail-row">
                  <span>Time:</span>
                  <span>{data.selectedTime}</span>
                </div>
              )}
              <div className="booking-step3__detail-row">
                <span>Persons:</span>
                <span>{data.numberOfPersons}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="booking-step3__section">
        <h3 className="booking-step3__section-title">Personal Information</h3>
        <div className="booking-step3__personal-info">
          <div className="booking-step3__info-grid">
            <div className="booking-step3__info-item">
              <span className="booking-step3__info-label">Name:</span>
              <span className="booking-step3__info-value">{data.firstName} {data.lastName}</span>
            </div>
            <div className="booking-step3__info-item">
              <span className="booking-step3__info-label">Email:</span>
              <span className="booking-step3__info-value">{data.email}</span>
            </div>
            <div className="booking-step3__info-item">
              <span className="booking-step3__info-label">Phone:</span>
              <span className="booking-step3__info-value">{data.phone}</span>
            </div>
            <div className="booking-step3__info-item">
              <span className="booking-step3__info-label">Nationality:</span>
              <span className="booking-step3__info-value">{data.nationality}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="booking-step3__section">
        <h3 className="booking-step3__section-title">Payment Information</h3>
        <div className="booking-step3__payment-info">
          <div className="booking-step3__payment-method">
            <span className="booking-step3__payment-label">Payment Method:</span>
            <span className="booking-step3__payment-value">{getPaymentMethodLabel()}</span>
          </div>
          {data.paymentMethod === 'card' && (
            <div className="booking-step3__card-details">
              <div className="booking-step3__card-info">
                <span className="booking-step3__card-label">Card Number:</span>
                <span className="booking-step3__card-value">{formatCardNumber(data.cardNumber)}</span>
              </div>
              <div className="booking-step3__card-info">
                <span className="booking-step3__card-label">Expiry:</span>
                <span className="booking-step3__card-value">{data.expiryDate}</span>
              </div>
              <div className="booking-step3__card-info">
                <span className="booking-step3__card-label">Cardholder:</span>
                <span className="booking-step3__card-value">{data.cardholderName}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="booking-step3__section">
        <h3 className="booking-step3__section-title">Additional Services</h3>
        <div className="booking-step3__services">
          {data.travelInsurance && (
            <div className="booking-step3__service-item">
              <i className="fa-solid fa-check"></i>
              <span>Travel Insurance - $25 per person</span>
            </div>
          )}
          {data.privateGuide && (
            <div className="booking-step3__service-item">
              <i className="fa-solid fa-check"></i>
              <span>Private Guide - $50 per person</span>
            </div>
          )}
          {data.privateTransport && (
            <div className="booking-step3__service-item">
              <i className="fa-solid fa-check"></i>
              <span>Private Transport - $80 per person</span>
            </div>
          )}
          {data.mealUpgrade && (
            <div className="booking-step3__service-item">
              <i className="fa-solid fa-check"></i>
              <span>Meal Upgrade - $30 per person</span>
            </div>
          )}
          {!data.travelInsurance && !data.privateGuide && !data.privateTransport && !data.mealUpgrade && (
            <div className="booking-step3__no-services">
              <i className="fa-solid fa-info-circle"></i>
              <span>No additional services selected</span>
            </div>
          )}
        </div>
      </div>

      <div className="booking-step3__section">
        <h3 className="booking-step3__section-title">Price Breakdown</h3>
        <div className="booking-step3__price-breakdown">
          <div className="booking-step3__price-row">
            <span>Base Price ({data.numberOfPersons} person{data.numberOfPersons > 1 ? 's' : ''})</span>
            <span>${breakdown.baseAmount.toFixed(2)}</span>
          </div>
          {breakdown.insuranceAmount > 0 && (
            <div className="booking-step3__price-row">
              <span>Travel Insurance</span>
              <span>${breakdown.insuranceAmount.toFixed(2)}</span>
            </div>
          )}
          {breakdown.guideAmount > 0 && (
            <div className="booking-step3__price-row">
              <span>Private Guide</span>
              <span>${breakdown.guideAmount.toFixed(2)}</span>
            </div>
          )}
          {breakdown.transportAmount > 0 && (
            <div className="booking-step3__price-row">
              <span>Private Transport</span>
              <span>${breakdown.transportAmount.toFixed(2)}</span>
            </div>
          )}
          {breakdown.mealAmount > 0 && (
            <div className="booking-step3__price-row">
              <span>Meal Upgrade</span>
              <span>${breakdown.mealAmount.toFixed(2)}</span>
            </div>
          )}
          <div className="booking-step3__price-row">
            <span>Subtotal</span>
            <span>${breakdown.subtotal.toFixed(2)}</span>
          </div>
          <div className="booking-step3__price-row">
            <span>Tax (20%)</span>
            <span>${breakdown.tax.toFixed(2)}</span>
          </div>
          <div className="booking-step3__price-row booking-step3__price-row--total">
            <span>Total Amount</span>
            <span>${breakdown.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {data.specialRequests && (
        <div className="booking-step3__section">
          <h3 className="booking-step3__section-title">Special Requests</h3>
          <div className="booking-step3__special-requests">
            <p>{data.specialRequests}</p>
          </div>
        </div>
      )}

      <div className="booking-step3__actions">
        <button className="booking-step3__back-btn" onClick={onPrevious} disabled={isProcessing}>
          <i className="fa-solid fa-arrow-left"></i>
          Back
        </button>
        <button 
          className="booking-step3__confirm-btn" 
          onClick={onSubmit}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <i className="fa-solid fa-spinner fa-spin"></i>
              Processing...
            </>
          ) : (
            <>
              <i className="fa-solid fa-check"></i>
              Confirm Booking
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default BookingStep3;
