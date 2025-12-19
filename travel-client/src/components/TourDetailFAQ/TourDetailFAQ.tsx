import React, { useState } from 'react';
import './TourDetailFAQ.scss';

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

const TourDetailFAQ: React.FC<Props> = () => {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "What should I bring on this tour?",
      answer: "We recommend bringing comfortable walking shoes, a camera, sunscreen, a hat, and a light jacket. Water and snacks will be provided, but you may want to bring your own if you have specific dietary requirements."
    },
    {
      question: "Is this tour suitable for children?",
      answer: "Yes, this tour is family-friendly and suitable for children aged 6 and above. We can accommodate families with younger children, but please let us know in advance so we can make appropriate arrangements."
    },
    {
      question: "What happens if it rains?",
      answer: "The tour will continue in light rain as we provide umbrellas. In case of severe weather conditions, we will offer to reschedule the tour or provide a full refund. Your safety is our priority."
    },
    {
      question: "Are meals included in the tour?",
      answer: "Yes, a traditional local lunch is included in the tour price. We can accommodate dietary restrictions and preferences if you let us know in advance. Please inform us of any allergies or special requirements."
    },
    {
      question: "How do I book this tour?",
      answer: "You can book directly through our website by selecting your preferred date and group size. You'll receive instant confirmation and detailed instructions via email. Payment is secure and you can cancel up to 24 hours before the tour."
    },
    {
      question: "What is the group size?",
      answer: "We keep our groups small with a maximum of 12 people to ensure a personalized experience. This allows for better interaction with your guide and a more intimate exploration of the destinations."
    }
  ];

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <div className="tour-detail-faq">
      <div className="tour-detail-faq__header">
        <h2 className="tour-detail-faq__title">Frequently Asked Questions</h2>
        <p className="tour-detail-faq__subtitle">
          Everything you need to know about this tour
        </p>
      </div>

      <div className="tour-detail-faq__content">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className={`tour-detail-faq__item ${
              expandedFAQ === index ? 'expanded' : ''
            }`}
          >
            <div 
              className="tour-detail-faq__question"
              onClick={() => toggleFAQ(index)}
            >
              <h3>{faq.question}</h3>
              <i className={`fa-solid fa-chevron-${expandedFAQ === index ? 'up' : 'down'}`}></i>
            </div>
            
            {expandedFAQ === index && (
              <div className="tour-detail-faq__answer">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="tour-detail-faq__contact">
        <h3>Still have questions?</h3>
        <p>Contact our support team for personalized assistance</p>
        <div className="tour-detail-faq__contact-options">
          <a href="tel:+1234567890" className="tour-detail-faq__contact-btn">
            <i className="fa-solid fa-phone"></i>
            Call Us
          </a>
          <a href="mailto:support@example.com" className="tour-detail-faq__contact-btn">
            <i className="fa-solid fa-envelope"></i>
            Email Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default TourDetailFAQ;
