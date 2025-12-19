import React, { useState } from 'react';
import './BookingStep1.scss';

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
  travelInsurance: boolean;
  privateGuide: boolean;
  privateTransport: boolean;
  mealUpgrade: boolean;
  additionalOptions: string[];
}

interface BookingStep1Props {
  data: BookingData;
  onDataUpdate: (data: Partial<BookingData>) => void;
  onNext: () => void;
}

const BookingStep1: React.FC<BookingStep1Props> = ({ data, onDataUpdate, onNext }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!data.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!data.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!data.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(data.email)) newErrors.email = 'Email is invalid';
    if (!data.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!data.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!data.nationality.trim()) newErrors.nationality = 'Nationality is required';
    if (!data.emergencyContact.trim()) newErrors.emergencyContact = 'Emergency contact is required';
    if (!data.emergencyPhone.trim()) newErrors.emergencyPhone = 'Emergency phone is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  const handleInputChange = (field: keyof BookingData, value: string | boolean) => {
    onDataUpdate({ [field]: value });
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const nationalities = [
    'Afghanistan', 'Albania', 'Algeria', 'Argentina', 'Armenia', 'Australia', 'Austria',
    'Azerbaijan', 'Bangladesh', 'Belarus', 'Belgium', 'Brazil', 'Bulgaria', 'Cambodia',
    'Canada', 'Chile', 'China', 'Colombia', 'Croatia', 'Czech Republic', 'Denmark',
    'Egypt', 'Estonia', 'Finland', 'France', 'Georgia', 'Germany', 'Greece', 'Hungary',
    'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy',
    'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kuwait', 'Latvia', 'Lebanon', 'Lithuania',
    'Luxembourg', 'Malaysia', 'Mexico', 'Morocco', 'Nepal', 'Netherlands', 'New Zealand',
    'Nigeria', 'Norway', 'Pakistan', 'Peru', 'Philippines', 'Poland', 'Portugal',
    'Romania', 'Russia', 'Saudi Arabia', 'Singapore', 'Slovakia', 'Slovenia', 'South Africa',
    'South Korea', 'Spain', 'Sri Lanka', 'Sweden', 'Switzerland', 'Thailand', 'Turkey',
    'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Vietnam'
  ];

  return (
    <div className="booking-step1">
      <div className="booking-step1__section">
        <h3 className="booking-step1__section-title">Personal Information</h3>
        <div className="booking-step1__form-grid">
          <div className="booking-step1__field">
            <label className="booking-step1__label">First Name *</label>
            <input
              type="text"
              className={`booking-step1__input ${errors.firstName ? 'error' : ''}`}
              value={data.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              placeholder="Enter your first name"
            />
            {errors.firstName && <span className="booking-step1__error">{errors.firstName}</span>}
          </div>

          <div className="booking-step1__field">
            <label className="booking-step1__label">Last Name *</label>
            <input
              type="text"
              className={`booking-step1__input ${errors.lastName ? 'error' : ''}`}
              value={data.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              placeholder="Enter your last name"
            />
            {errors.lastName && <span className="booking-step1__error">{errors.lastName}</span>}
          </div>

          <div className="booking-step1__field">
            <label className="booking-step1__label">Email Address *</label>
            <input
              type="email"
              className={`booking-step1__input ${errors.email ? 'error' : ''}`}
              value={data.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Enter your email address"
            />
            {errors.email && <span className="booking-step1__error">{errors.email}</span>}
          </div>

          <div className="booking-step1__field">
            <label className="booking-step1__label">Phone Number *</label>
            <input
              type="tel"
              className={`booking-step1__input ${errors.phone ? 'error' : ''}`}
              value={data.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="Enter your phone number"
            />
            {errors.phone && <span className="booking-step1__error">{errors.phone}</span>}
          </div>

          <div className="booking-step1__field">
            <label className="booking-step1__label">Date of Birth *</label>
            <input
              type="date"
              className={`booking-step1__input ${errors.dateOfBirth ? 'error' : ''}`}
              value={data.dateOfBirth}
              onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
            />
            {errors.dateOfBirth && <span className="booking-step1__error">{errors.dateOfBirth}</span>}
          </div>

          <div className="booking-step1__field">
            <label className="booking-step1__label">Nationality *</label>
            <select
              className={`booking-step1__select ${errors.nationality ? 'error' : ''}`}
              value={data.nationality}
              onChange={(e) => handleInputChange('nationality', e.target.value)}
            >
              <option value="">Select your nationality</option>
              {nationalities.map(nationality => (
                <option key={nationality} value={nationality}>{nationality}</option>
              ))}
            </select>
            {errors.nationality && <span className="booking-step1__error">{errors.nationality}</span>}
          </div>
        </div>
      </div>

      <div className="booking-step1__section">
        <h3 className="booking-step1__section-title">Emergency Contact</h3>
        <div className="booking-step1__form-grid">
          <div className="booking-step1__field">
            <label className="booking-step1__label">Emergency Contact Name *</label>
            <input
              type="text"
              className={`booking-step1__input ${errors.emergencyContact ? 'error' : ''}`}
              value={data.emergencyContact}
              onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
              placeholder="Enter emergency contact name"
            />
            {errors.emergencyContact && <span className="booking-step1__error">{errors.emergencyContact}</span>}
          </div>

          <div className="booking-step1__field">
            <label className="booking-step1__label">Emergency Contact Phone *</label>
            <input
              type="tel"
              className={`booking-step1__input ${errors.emergencyPhone ? 'error' : ''}`}
              value={data.emergencyPhone}
              onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
              placeholder="Enter emergency contact phone"
            />
            {errors.emergencyPhone && <span className="booking-step1__error">{errors.emergencyPhone}</span>}
          </div>
        </div>
      </div>

      <div className="booking-step1__section">
        <h3 className="booking-step1__section-title">Additional Options</h3>
        <div className="booking-step1__options">
          <label className="booking-step1__checkbox">
            <input
              type="checkbox"
              checked={data.travelInsurance}
              onChange={(e) => handleInputChange('travelInsurance', e.target.checked)}
            />
            <span className="booking-step1__checkbox-text">
              <strong>Travel Insurance</strong> - $25 per person
              <small>Comprehensive coverage for your trip</small>
            </span>
          </label>

          <label className="booking-step1__checkbox">
            <input
              type="checkbox"
              checked={data.privateGuide}
              onChange={(e) => handleInputChange('privateGuide', e.target.checked)}
            />
            <span className="booking-step1__checkbox-text">
              <strong>Private Guide</strong> - $50 per person
              <small>Dedicated guide for your group</small>
            </span>
          </label>

          <label className="booking-step1__checkbox">
            <input
              type="checkbox"
              checked={data.privateTransport}
              onChange={(e) => handleInputChange('privateTransport', e.target.checked)}
            />
            <span className="booking-step1__checkbox-text">
              <strong>Private Transport</strong> - $80 per person
              <small>Comfortable private vehicle</small>
            </span>
          </label>

          <label className="booking-step1__checkbox">
            <input
              type="checkbox"
              checked={data.mealUpgrade}
              onChange={(e) => handleInputChange('mealUpgrade', e.target.checked)}
            />
            <span className="booking-step1__checkbox-text">
              <strong>Meal Upgrade</strong> - $30 per person
              <small>Premium dining experience</small>
            </span>
          </label>
        </div>
      </div>

      <div className="booking-step1__section">
        <h3 className="booking-step1__section-title">Special Requests</h3>
        <div className="booking-step1__field">
          <textarea
            className="booking-step1__textarea"
            value={data.specialRequests}
            onChange={(e) => handleInputChange('specialRequests', e.target.value)}
            placeholder="Any special dietary requirements, accessibility needs, or other requests..."
            rows={4}
          />
        </div>
      </div>

      <div className="booking-step1__actions">
        <button className="booking-step1__next-btn" onClick={handleNext}>
          Continue to Payment
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
};

export default BookingStep1;
