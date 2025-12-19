import React, { useState } from 'react';
import './TrekDetailFAQ.scss';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const TrekDetailFAQ: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const faqData: FAQItem[] = [
    {
      id: 1,
      question: "What is the best time to go on this trek?",
      answer: "The best time for this trek is during the spring (March to May) and autumn (September to November) seasons when the weather is clear, stable, and offers the best mountain views. These periods provide optimal trekking conditions with moderate temperatures and minimal rainfall."
    },
    {
      id: 2,
      question: "What level of fitness is required?",
      answer: "This trek requires a good level of physical fitness as it involves walking 6-8 hours daily at high altitudes. We recommend regular cardiovascular exercise, hiking practice, and strength training for at least 2-3 months before the trek. Previous trekking experience at altitude is beneficial but not mandatory."
    },
    {
      id: 3,
      question: "What should I pack for the trek?",
      answer: "Essential items include: warm clothing layers, waterproof jacket and pants, good quality trekking boots, sleeping bag (rated for -10°C), trekking poles, headlamp, water bottles, personal medications, and basic toiletries. A detailed packing list will be provided upon booking."
    },
    {
      id: 4,
      question: "Is altitude sickness a concern?",
      answer: "Yes, altitude sickness can be a concern as we'll be trekking to high elevations. We follow a gradual ascent schedule with acclimatization days. Our experienced guides are trained to recognize symptoms and will monitor your health throughout the trek. We also carry emergency oxygen and medical supplies."
    },
    {
      id: 5,
      question: "What type of accommodation is provided?",
      answer: "We stay in comfortable teahouses along the trekking route. These are basic but clean lodges with shared bathroom facilities. Rooms typically have twin beds with basic bedding. Hot showers and charging facilities may be available for an additional cost in some locations."
    },
    {
      id: 6,
      question: "What meals are included?",
      answer: "All meals during the trek are included - breakfast, lunch, and dinner. Meals consist of a mix of local and international cuisine, with plenty of carbohydrates for energy. Vegetarian options are always available. We recommend bringing some snacks and energy bars for personal preference."
    },
    {
      id: 7,
      question: "What happens in case of bad weather?",
      answer: "Safety is our top priority. In case of severe weather conditions, we may need to adjust the itinerary or take rest days. Our guides will make decisions based on current conditions and safety protocols. We have contingency plans for various weather scenarios."
    },
    {
      id: 8,
      question: "Is travel insurance required?",
      answer: "Yes, comprehensive travel insurance that covers high-altitude trekking and emergency evacuation is mandatory. The insurance should cover medical expenses, trip cancellation, and emergency helicopter evacuation up to 6,000m altitude. We can provide recommendations for suitable insurance providers."
    }
  ];

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="trek-detail-faq">
      <div className="trek-detail-faq__container">
        <h2 className="trek-detail-faq__title">Frequently Asked Questions</h2>
        <div className="trek-detail-faq__content">
          {faqData.map((item) => (
            <div key={item.id} className="trek-detail-faq__item">
              <button
                className={`trek-detail-faq__question ${openItems.includes(item.id) ? 'active' : ''}`}
                onClick={() => toggleItem(item.id)}
              >
                <span className="trek-detail-faq__question-text">{item.question}</span>
                <span className="trek-detail-faq__icon">
                  {openItems.includes(item.id) ? '−' : '+'}
                </span>
              </button>
              {openItems.includes(item.id) && (
                <div className="trek-detail-faq__answer">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrekDetailFAQ;
