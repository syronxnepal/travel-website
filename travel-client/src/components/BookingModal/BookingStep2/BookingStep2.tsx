import React, { useState } from 'react';
import './BookingStep2.scss';

interface BookingData {
  paymentMethod: 'card' | 'bank' | 'wallet';
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
  billingAddress: string;
  totalPrice: number;
}

interface BookingStep2Props {
  data: BookingData;
  onDataUpdate: (data: Partial<BookingData>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const BookingStep2: React.FC<BookingStep2Props> = ({ data, onDataUpdate, onNext, onPrevious }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (data.paymentMethod === 'card') {
      if (!data.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
      else if (!/^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/.test(data.cardNumber.replace(/\s/g, ''))) {
        newErrors.cardNumber = 'Invalid card number format';
      }
      
      if (!data.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required';
      else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(data.expiryDate)) {
        newErrors.expiryDate = 'Invalid expiry date format (MM/YY)';
      }
      
      if (!data.cvv.trim()) newErrors.cvv = 'CVV is required';
      else if (!/^\d{3,4}$/.test(data.cvv)) {
        newErrors.cvv = 'Invalid CVV format';
      }
      
      if (!data.cardholderName.trim()) newErrors.cardholderName = 'Cardholder name is required';
    }

    if (!data.billingAddress.trim()) newErrors.billingAddress = 'Billing address is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  const handleInputChange = (field: keyof BookingData, value: string) => {
    onDataUpdate({ [field]: value });
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\D/g, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  return (
    <div className="booking-step2">
      <div className="booking-step2__section">
        <h3 className="booking-step2__section-title">Payment Method</h3>
        <div className="booking-step2__payment-methods">
          <label className={`booking-step2__payment-method ${data.paymentMethod === 'card' ? 'active' : ''}`}>
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              checked={data.paymentMethod === 'card'}
              onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
            />
            <div className="booking-step2__payment-option">
              <i className="fa-solid fa-credit-card"></i>
              <span>Credit/Debit Card</span>
            </div>
          </label>

          <label className={`booking-step2__payment-method ${data.paymentMethod === 'bank' ? 'active' : ''}`}>
            <input
              type="radio"
              name="paymentMethod"
              value="bank"
              checked={data.paymentMethod === 'bank'}
              onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
            />
            <div className="booking-step2__payment-option">
              <i className="fa-solid fa-university"></i>
              <span>Bank Transfer</span>
            </div>
          </label>

          <label className={`booking-step2__payment-method ${data.paymentMethod === 'wallet' ? 'active' : ''}`}>
            <input
              type="radio"
              name="paymentMethod"
              value="wallet"
              checked={data.paymentMethod === 'wallet'}
              onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
            />
            <div className="booking-step2__payment-option">
              <i className="fa-solid fa-wallet"></i>
              <span>Digital Wallet</span>
            </div>
          </label>
        </div>
      </div>

      {data.paymentMethod === 'card' && (
        <div className="booking-step2__section">
          <h3 className="booking-step2__section-title">Card Details</h3>
          <div className="booking-step2__form-grid">
            <div className="booking-step2__field booking-step2__field--full">
              <label className="booking-step2__label">Card Number *</label>
              <input
                type="text"
                className={`booking-step2__input ${errors.cardNumber ? 'error' : ''}`}
                value={data.cardNumber}
                onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
              />
              {errors.cardNumber && <span className="booking-step2__error">{errors.cardNumber}</span>}
            </div>

            <div className="booking-step2__field">
              <label className="booking-step2__label">Expiry Date *</label>
              <input
                type="text"
                className={`booking-step2__input ${errors.expiryDate ? 'error' : ''}`}
                value={data.expiryDate}
                onChange={(e) => handleInputChange('expiryDate', formatExpiryDate(e.target.value))}
                placeholder="MM/YY"
                maxLength={5}
              />
              {errors.expiryDate && <span className="booking-step2__error">{errors.expiryDate}</span>}
            </div>

            <div className="booking-step2__field">
              <label className="booking-step2__label">CVV *</label>
              <input
                type="text"
                className={`booking-step2__input ${errors.cvv ? 'error' : ''}`}
                value={data.cvv}
                onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, ''))}
                placeholder="123"
                maxLength={4}
              />
              {errors.cvv && <span className="booking-step2__error">{errors.cvv}</span>}
            </div>

            <div className="booking-step2__field booking-step2__field--full">
              <label className="booking-step2__label">Cardholder Name *</label>
              <input
                type="text"
                className={`booking-step2__input ${errors.cardholderName ? 'error' : ''}`}
                value={data.cardholderName}
                onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                placeholder="Enter cardholder name"
              />
              {errors.cardholderName && <span className="booking-step2__error">{errors.cardholderName}</span>}
            </div>
          </div>
        </div>
      )}

      <div className="booking-step2__section">
        <h3 className="booking-step2__section-title">Billing Address</h3>
        <div className="booking-step2__field">
          <label className="booking-step2__label">Address *</label>
          <textarea
            className={`booking-step2__textarea ${errors.billingAddress ? 'error' : ''}`}
            value={data.billingAddress}
            onChange={(e) => handleInputChange('billingAddress', e.target.value)}
            placeholder="Enter your billing address"
            rows={3}
          />
          {errors.billingAddress && <span className="booking-step2__error">{errors.billingAddress}</span>}
        </div>
      </div>

      <div className="booking-step2__section">
        <h3 className="booking-step2__section-title">Payment Summary</h3>
        <div className="booking-step2__summary">
          <div className="booking-step2__summary-row">
            <span>Base Price</span>
            <span>${(data.totalPrice / 1.2).toFixed(2)}</span>
          </div>
          <div className="booking-step2__summary-row">
            <span>Tax (20%)</span>
            <span>${(data.totalPrice * 0.2 / 1.2).toFixed(2)}</span>
          </div>
          <div className="booking-step2__summary-row booking-step2__summary-row--total">
            <span>Total Amount</span>
            <span>${data.totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="booking-step2__actions">
        <button className="booking-step2__back-btn" onClick={onPrevious}>
          <i className="fa-solid fa-arrow-left"></i>
          Back
        </button>
        <button className="booking-step2__next-btn" onClick={handleNext}>
          Continue to Confirmation
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
};

export default BookingStep2;
