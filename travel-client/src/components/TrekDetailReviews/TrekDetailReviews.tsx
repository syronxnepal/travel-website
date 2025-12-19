import React, { useState } from 'react';
import './TrekDetailReviews.scss';

interface Review {
  id: number;
  name: string;
  date: string;
  rating: number;
  title: string;
  comment: string;
  categories: {
    quality: number;
    hospitality: number;
    service: number;
    pricing: number;
  };
}

interface TrekDetailReviewsProps {
  overallRating: number;
  totalReviews: number;
  reviews: Review[];
}

const TrekDetailReviews: React.FC<TrekDetailReviewsProps> = ({
  overallRating,
  totalReviews,
  reviews
}) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    name: '',
    email: '',
    rating: 0,
    title: '',
    comment: '',
    categories: {
      quality: 0,
      hospitality: 0,
      service: 0,
      pricing: 0
    }
  });

  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'md') => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={i} className={`trek-detail-reviews__star trek-detail-reviews__star--${size} trek-detail-reviews__star--filled`} viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <svg key="half" className={`trek-detail-reviews__star trek-detail-reviews__star--${size} trek-detail-reviews__star--half`} viewBox="0 0 24 24">
          <defs>
            <linearGradient id="half-star">
              <stop offset="50%" stopColor="currentColor"/>
              <stop offset="50%" stopColor="transparent"/>
            </linearGradient>
          </defs>
          <path fill="url(#half-star)" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className={`trek-detail-reviews__star trek-detail-reviews__star--${size} trek-detail-reviews__star--empty`} viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      );
    }

    return stars;
  };

  const handleStarClick = (rating: number, category?: keyof typeof reviewForm.categories) => {
    if (category) {
      setReviewForm(prev => ({
        ...prev,
        categories: {
          ...prev.categories,
          [category]: rating
        }
      }));
    } else {
      setReviewForm(prev => ({
        ...prev,
        rating
      }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReviewForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle review submission
    console.log('Review submitted:', reviewForm);
    setShowReviewForm(false);
    setReviewForm({
      name: '',
      email: '',
      rating: 0,
      title: '',
      comment: '',
      categories: {
        quality: 0,
        hospitality: 0,
        service: 0,
        pricing: 0
      }
    });
  };

  const getRatingText = (rating: number) => {
    if (rating >= 4.5) return 'Excellent';
    if (rating >= 4) return 'Very Good';
    if (rating >= 3) return 'Good';
    if (rating >= 2) return 'Fair';
    return 'Poor';
  };

  return (
    <div className="trek-detail-reviews">
      <div className="trek-detail-reviews__container">
        <div className="trek-detail-reviews__header">
          <div className="trek-detail-reviews__overall">
            <div className="trek-detail-reviews__overall-rating">
              <span className="trek-detail-reviews__rating-number">{overallRating}</span>
              <div className="trek-detail-reviews__rating-stars">
                {renderStars(overallRating, 'lg')}
              </div>
              <div className="trek-detail-reviews__rating-text">
                {getRatingText(overallRating)}
              </div>
              <div className="trek-detail-reviews__rating-count">
                {totalReviews} Reviews
              </div>
            </div>
          </div>

          <div className="trek-detail-reviews__breakdown">
            <h3 className="trek-detail-reviews__breakdown-title">Rating Breakdown</h3>
            <div className="trek-detail-reviews__breakdown-bars">
              {[
                { label: 'Quality', rating: 4.8 },
                { label: 'Hospitality', rating: 4.6 },
                { label: 'Service', rating: 4.7 },
                { label: 'Pricing', rating: 4.5 }
              ].map((item, index) => (
                <div key={index} className="trek-detail-reviews__breakdown-item">
                  <span className="trek-detail-reviews__breakdown-label">{item.label}</span>
                  <div className="trek-detail-reviews__breakdown-bar">
                    <div 
                      className="trek-detail-reviews__breakdown-fill"
                      style={{ width: `${(item.rating / 5) * 100}%` }}
                    ></div>
                  </div>
                  <span className="trek-detail-reviews__breakdown-rating">{item.rating}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="trek-detail-reviews__reviews">
          <h3 className="trek-detail-reviews__reviews-title">Reviews</h3>
          <div className="trek-detail-reviews__reviews-list">
            {reviews.map((review) => (
              <div key={review.id} className="trek-detail-reviews__review">
                <div className="trek-detail-reviews__review-header">
                  <div className="trek-detail-reviews__review-author">
                    <h4 className="trek-detail-reviews__review-name">{review.name}</h4>
                    <div className="trek-detail-reviews__review-date">{review.date}</div>
                  </div>
                  <div className="trek-detail-reviews__review-rating">
                    {renderStars(review.rating, 'sm')}
                  </div>
                </div>
                
                <h5 className="trek-detail-reviews__review-title">{review.title}</h5>
                <p className="trek-detail-reviews__review-comment">{review.comment}</p>
                
                <div className="trek-detail-reviews__review-categories">
                  {Object.entries(review.categories).map(([category, rating]) => (
                    <div key={category} className="trek-detail-reviews__review-category">
                      <span className="trek-detail-reviews__category-label">
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </span>
                      <div className="trek-detail-reviews__category-rating">
                        {renderStars(rating, 'sm')}
                        <span className="trek-detail-reviews__category-value">{rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="trek-detail-reviews__write-review">
          <h3 className="trek-detail-reviews__write-title">Write a Review</h3>
          
          {!showReviewForm ? (
            <button 
              className="trek-detail-reviews__write-btn"
              onClick={() => setShowReviewForm(true)}
            >
              Write a Review
            </button>
          ) : (
            <form className="trek-detail-reviews__form" onSubmit={handleSubmitReview}>
              <div className="trek-detail-reviews__form-row">
                <div className="trek-detail-reviews__form-field">
                  <label className="trek-detail-reviews__form-label">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={reviewForm.name}
                    onChange={handleInputChange}
                    className="trek-detail-reviews__form-input"
                    required
                  />
                </div>
                <div className="trek-detail-reviews__form-field">
                  <label className="trek-detail-reviews__form-label">Your Email</label>
                  <input
                    type="email"
                    name="email"
                    value={reviewForm.email}
                    onChange={handleInputChange}
                    className="trek-detail-reviews__form-input"
                    required
                  />
                </div>
              </div>

              <div className="trek-detail-reviews__form-field">
                <label className="trek-detail-reviews__form-label">Overall Rating</label>
                <div className="trek-detail-reviews__form-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={`trek-detail-reviews__form-star ${
                        star <= reviewForm.rating ? 'trek-detail-reviews__form-star--active' : ''
                      }`}
                      onClick={() => handleStarClick(star)}
                    >
                      <svg viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </button>
                  ))}
                </div>
              </div>

              <div className="trek-detail-reviews__form-categories">
                <h4 className="trek-detail-reviews__form-categories-title">Rate by Category</h4>
                {Object.entries(reviewForm.categories).map(([category, rating]) => (
                  <div key={category} className="trek-detail-reviews__form-category">
                    <span className="trek-detail-reviews__form-category-label">
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </span>
                    <div className="trek-detail-reviews__form-category-stars">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          className={`trek-detail-reviews__form-star ${
                            star <= rating ? 'trek-detail-reviews__form-star--active' : ''
                          }`}
                          onClick={() => handleStarClick(star, category as keyof typeof reviewForm.categories)}
                        >
                          <svg viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="trek-detail-reviews__form-field">
                <label className="trek-detail-reviews__form-label">Review Title</label>
                <input
                  type="text"
                  name="title"
                  value={reviewForm.title}
                  onChange={handleInputChange}
                  className="trek-detail-reviews__form-input"
                  required
                />
              </div>

              <div className="trek-detail-reviews__form-field">
                <label className="trek-detail-reviews__form-label">Your Review</label>
                <textarea
                  name="comment"
                  value={reviewForm.comment}
                  onChange={handleInputChange}
                  className="trek-detail-reviews__form-textarea"
                  rows={4}
                  required
                />
              </div>

              <div className="trek-detail-reviews__form-actions">
                <button 
                  type="button" 
                  className="trek-detail-reviews__form-cancel"
                  onClick={() => setShowReviewForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="trek-detail-reviews__form-submit">
                  Submit Review
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrekDetailReviews;
