import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import './BookingPage.scss';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import BookingStep1 from '../../components/BookingModal/BookingStep1/BookingStep1';
import BookingStep2 from '../../components/BookingModal/BookingStep2/BookingStep2';
import BookingStep3 from '../../components/BookingModal/BookingStep3/BookingStep3';
import { useAppToast } from 'src/context/ToastContext';

interface BookingData {
  // User Details
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  nationality: string;
  emergencyContact: string;
  emergencyPhone: string;
  specialRequests: string;
  
  // Booking Details
  bookingType: 'trek' | 'tour' | 'short-tour' | 'custom-package';
  itemId: string;
  itemTitle: string;
  itemLocation: string;
  selectedDate: string;
  selectedTime?: string;
  numberOfPersons: number;
  basePrice: number;
  totalPrice: number;
  
  // Payment Details
  paymentMethod: 'card' | 'bank' | 'wallet';
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
  billingAddress: string;
  
  // Additional Options
  travelInsurance: boolean;
  privateGuide: boolean;
  privateTransport: boolean;
  mealUpgrade: boolean;
  additionalOptions: string[];
}

const BookingPage: React.FC = () => {
  const { bookingType, itemId } = useParams<{ bookingType: string; itemId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useAppToast();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Get booking data from location state or initialize with defaults
  const initialBookingData: BookingData = location.state?.bookingData || {
    // User Details
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    nationality: '',
    emergencyContact: '',
    emergencyPhone: '',
    specialRequests: '',
    
    // Booking Details
    bookingType: (bookingType as 'trek' | 'tour' | 'short-tour' | 'custom-package') || 'tour',
    itemId: itemId || '1',
    itemTitle: location.state?.itemTitle || 'Experience',
    itemLocation: location.state?.itemLocation || 'Location',
    selectedDate: location.state?.selectedDate || '',
    selectedTime: location.state?.selectedTime || '',
    numberOfPersons: location.state?.numberOfPersons || 1,
    basePrice: location.state?.basePrice || 0,
    totalPrice: (location.state?.basePrice || 0) * (location.state?.numberOfPersons || 1),
    
    // Payment Details
    paymentMethod: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    billingAddress: '',
    
    // Additional Options
    travelInsurance: false,
    privateGuide: false,
    privateTransport: false,
    mealUpgrade: false,
    additionalOptions: []
  };

  const [bookingData, setBookingData] = useState<BookingData>(initialBookingData);

  useEffect(() => {
    // Update total price when additional options change
    const newTotal = calculateTotalPrice(bookingData);
    setBookingData(prev => ({ ...prev, totalPrice: newTotal }));
  }, [bookingData.travelInsurance, bookingData.privateGuide, bookingData.privateTransport, bookingData.mealUpgrade, bookingData.numberOfPersons]);

  const calculateTotalPrice = (data: BookingData) => {
    const basePrice = data.basePrice || 0;
    const numberOfPersons = data.numberOfPersons || 1;
    let total = basePrice * numberOfPersons;
    
    if (data.travelInsurance) total += 25 * numberOfPersons;
    if (data.privateGuide) total += 50 * numberOfPersons;
    if (data.privateTransport) total += 80 * numberOfPersons;
    if (data.mealUpgrade) total += 30 * numberOfPersons;
    
    return total;
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleDataUpdate = (updatedData: Partial<BookingData>) => {
    setBookingData(prev => ({
      ...prev,
      ...updatedData,
      totalPrice: calculateTotalPrice({ ...prev, ...updatedData })
    }));
  };

  const handleBookingSubmit = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would integrate with your actual booking API
      console.log('Booking submitted:', bookingData);
      
      // Show success message or redirect
      showToast('Booking confirmed! You will receive a confirmation email shortly.', 'success');
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      console.error('Booking failed:', error);
      showToast('Booking failed. Please try again.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return 'Personal Details';
      case 2:
        return 'Payment Information';
      case 3:
        return 'Confirmation';
      default:
        return 'Booking';
    }
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case 1:
        return 'Please provide your personal information and travel preferences';
      case 2:
        return 'Enter your payment details to secure your booking';
      case 3:
        return 'Review your booking details and confirm your reservation';
      default:
        return '';
    }
  };

  const getBookingTypeLabel = () => {
    switch (bookingData.bookingType) {
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

  return (
    <div className="booking-page">
      <Header />
      
      <main className="booking-page__main">
        <div className="booking-page__container">
          {/* Hero Section */}
          <div className="booking-page__hero">
            <div className="booking-page__hero-content">
              <div className="booking-page__breadcrumb">
                <button 
                  className="booking-page__back-btn"
                  onClick={() => navigate(-1)}
                >
                  <i className="fa-solid fa-arrow-left"></i>
                  Back
                </button>
                <span className="booking-page__breadcrumb-separator">/</span>
                <span className="booking-page__breadcrumb-item">Booking</span>
              </div>
              
              <h1 className="booking-page__title">
                Book Your {getBookingTypeLabel()}
              </h1>
              <p className="booking-page__subtitle">
                Complete your reservation in just a few simple steps
              </p>
            </div>
            
            <div className="booking-page__booking-summary">
              <div className="booking-page__summary-card">
                <div className="booking-page__summary-image">
                  <img 
                    src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop" 
                    alt={bookingData.itemTitle}
                  />
                </div>
                <div className="booking-page__summary-content">
                  <h3 className="booking-page__summary-title">{bookingData.itemTitle}</h3>
                  <p className="booking-page__summary-location">
                    <i className="fa-solid fa-location-dot"></i>
                    {bookingData.itemLocation}
                  </p>
                  <div className="booking-page__summary-details">
                    <div className="booking-page__summary-detail">
                      <span>Date:</span>
                      <span>{bookingData.selectedDate ? new Date(bookingData.selectedDate).toLocaleDateString() : 'Not selected'}</span>
                    </div>
                    <div className="booking-page__summary-detail">
                      <span>Persons:</span>
                      <span>{bookingData.numberOfPersons}</span>
                    </div>
                    <div className="booking-page__summary-detail">
                      <span>Total:</span>
                      <span className="booking-page__summary-price">${(bookingData.totalPrice || 0).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Section */}
          <div className="booking-page__progress">
            <div className="booking-page__progress-bar">
              <div 
                className="booking-page__progress-fill"
                style={{ width: `${(currentStep / 3) * 100}%` }}
              ></div>
            </div>
            <div className="booking-page__steps">
              <div className={`booking-page__step ${currentStep >= 1 ? 'active' : ''}`}>
                <div className="booking-page__step-number">1</div>
                <span>Details</span>
              </div>
              <div className={`booking-page__step ${currentStep >= 2 ? 'active' : ''}`}>
                <div className="booking-page__step-number">2</div>
                <span>Payment</span>
              </div>
              <div className={`booking-page__step ${currentStep >= 3 ? 'active' : ''}`}>
                <div className="booking-page__step-number">3</div>
                <span>Confirm</span>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="booking-page__content">
            <div className="booking-page__content-header">
              <h2 className="booking-page__content-title">{getStepTitle()}</h2>
              <p className="booking-page__content-description">{getStepDescription()}</p>
            </div>

            <div className="booking-page__content-body">
              {currentStep === 1 && (
                <BookingStep1
                  data={bookingData}
                  onDataUpdate={handleDataUpdate}
                  onNext={handleNext}
                />
              )}
              
              {currentStep === 2 && (
                <BookingStep2
                  data={bookingData}
                  onDataUpdate={handleDataUpdate}
                  onNext={handleNext}
                  onPrevious={handlePrevious}
                />
              )}
              
              {currentStep === 3 && (
                <BookingStep3
                  data={bookingData}
                  onPrevious={handlePrevious}
                  onSubmit={handleBookingSubmit}
                  isProcessing={isProcessing}
                />
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BookingPage;
