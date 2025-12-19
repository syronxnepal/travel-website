import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../../components/PageHero/PageHero';
import Footer from '../../components/Footer/Footer';
import TrekCard from '../../components/TrekCard/Index';
import TourCard from '../../components/TourCard/TourCard';
import './WishlistPage.scss';

interface WishlistItem {
  id: string;
  title: string;
  location: string;
  price: string;
  originalPrice?: string;
  images: string[];
  type: 'trek' | 'tour' | 'short-tour';
  duration: string;
  rating: number;
  reviewCount: number;
  addedDate: string;
  difficulty?: string;
  category?: string;
}

const WishlistPage: React.FC = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<WishlistItem[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - in a real app, this would come from a context or API
  useEffect(() => {
    const mockWishlistItems: WishlistItem[] = [
      {
        id: '1',
        title: 'Everest Base Camp Trek',
        location: 'Sagarmatha National Park, Nepal',
        price: '$1,299',
        originalPrice: '$1,599',
        images: [
          'https://admin.ntb.gov.np/image-cache/ebc_tk_adventure_2-1624450765.jpeg?p=main&s=1f72965258be9625bee4886c373424ad',
          'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800',
          'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800'
        ],
        type: 'trek',
        duration: '14 Days',
        rating: 4.8,
        reviewCount: 1247,
        addedDate: '2024-01-15',
        difficulty: 'Challenging'
      },
      {
        id: '2',
        title: 'Annapurna Circuit Trek',
        location: 'Annapurna Region, Nepal',
        price: '$899',
        images: [
          'https://www.adventuregreathimalaya.com/wp-content/uploads/nepal-hiking-tours.jpg',
          'https://images.unsplash.com/photo-1551524164-6cf2ac5313f4?w=800',
          'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800'
        ],
        type: 'trek',
        duration: '12 Days',
        rating: 4.6,
        reviewCount: 892,
        addedDate: '2024-01-10',
        difficulty: 'Moderate'
      },
      {
        id: '3',
        title: 'Cultural Heritage Walking Tour',
        location: 'Kathmandu, Nepal',
        price: '$35',
        images: [
          'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
        ],
        type: 'tour',
        duration: '4 hours',
        rating: 4.8,
        reviewCount: 45,
        addedDate: '2024-01-08',
        category: 'Cultural'
      },
      {
        id: '4',
        title: 'Kathmandu City Highlights',
        location: 'Kathmandu, Nepal',
        price: '$45',
        images: [
          'https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
        ],
        type: 'short-tour',
        duration: '1 day',
        rating: 4.4,
        reviewCount: 67,
        addedDate: '2024-01-05',
        category: 'Cultural'
      },
      {
        id: '5',
        title: 'Mountain Adventure Trek',
        location: 'Annapurna Region',
        price: '$450',
        images: [
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
        ],
        type: 'tour',
        duration: '7 days',
        rating: 4.9,
        reviewCount: 78,
        addedDate: '2024-01-03',
        category: 'Adventure'
      },
      {
        id: '6',
        title: 'Langtang Valley Trek',
        location: 'Langtang Region, Nepal',
        price: '$699',
        images: [
          'https://www.adventuregreathimalaya.com/wp-content/uploads/nepal-hiking-tours.jpg',
          'https://images.unsplash.com/photo-1551524164-6cf2ac5313f4?w=800',
          'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800'
        ],
        type: 'trek',
        duration: '8 Days',
        rating: 4.4,
        reviewCount: 623,
        addedDate: '2024-01-01',
        difficulty: 'Moderate'
      }
    ];

    setWishlistItems(mockWishlistItems);
    setFilteredItems(mockWishlistItems);
    setIsLoading(false);
  }, []);


  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
    let filtered = wishlistItems;
    
    if (filter !== 'all') {
      filtered = wishlistItems.filter(item => item.type === filter);
    }
    
    setFilteredItems(filtered);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    let sorted = [...filteredItems];
    
    switch (sort) {
      case 'newest':
        sorted.sort((a, b) => new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime());
        break;
      case 'oldest':
        sorted.sort((a, b) => new Date(a.addedDate).getTime() - new Date(b.addedDate).getTime());
        break;
      case 'price-low':
        sorted.sort((a, b) => {
          const priceA = parseInt(a.price.replace(/[^0-9]/g, ''));
          const priceB = parseInt(b.price.replace(/[^0-9]/g, ''));
          return priceA - priceB;
        });
        break;
      case 'price-high':
        sorted.sort((a, b) => {
          const priceA = parseInt(a.price.replace(/[^0-9]/g, ''));
          const priceB = parseInt(b.price.replace(/[^0-9]/g, ''));
          return priceB - priceA;
        });
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
    }
    
    setFilteredItems(sorted);
  };

  const handleRemoveItem = (id: string) => {
    const updatedItems = wishlistItems.filter(item => item.id !== id);
    setWishlistItems(updatedItems);
    setFilteredItems(updatedItems);
  };

  const handleClearAll = () => {
    setWishlistItems([]);
    setFilteredItems([]);
  };

  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'My Wishlist', isActive: true }
  ];

  if (isLoading) {
    return (
      <div className="wishlist-page">
        <PageHero 
          title="My Wishlist"
          subtitle="Your saved adventures await"
          breadcrumbs={breadcrumbs}
        />
        <div className="wishlist-page__loading">
          <div className="loading-spinner"></div>
          <p>Loading your wishlist...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <PageHero 
        title="My Wishlist"
        subtitle="Your saved adventures await"
        breadcrumbs={breadcrumbs}
      />
      
      <div className="wishlist-page__content">
        <div className="container">
          {wishlistItems.length === 0 ? (
            <div className="wishlist-page__empty">
              <div className="wishlist-page__empty-icon">
                <i className="fa-solid fa-heart-broken"></i>
              </div>
              <h3>Your wishlist is empty</h3>
              <p>Start exploring and add your favorite adventures to your wishlist</p>
              <div className="wishlist-page__empty-actions">
                <Link to="/tours" className="btn btn--primary">
                  Explore Tours
                </Link>
                <Link to="/trekking" className="btn btn--outline">
                  View Treks
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="wishlist-page__header">
                <div className="wishlist-page__stats">
                  <h2>My Wishlist</h2>
                  <span className="wishlist-page__count">{wishlistItems.length} items</span>
                </div>
                
                <div className="wishlist-page__controls">
                  <div className="wishlist-page__filter">
                    <label htmlFor="filter">Filter by:</label>
                    <select 
                      id="filter"
                      value={selectedFilter} 
                      onChange={(e) => handleFilterChange(e.target.value)}
                    >
                      <option value="all">All Items</option>
                      <option value="trek">Treks</option>
                      <option value="tour">Tours</option>
                      <option value="short-tour">Short Tours</option>
                    </select>
                  </div>
                  
                  <div className="wishlist-page__sort">
                    <label htmlFor="sort">Sort by:</label>
                    <select 
                      id="sort"
                      value={sortBy} 
                      onChange={(e) => handleSortChange(e.target.value)}
                    >
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Highest Rated</option>
                    </select>
                  </div>
                  
                  <button 
                    className="wishlist-page__clear-btn"
                    onClick={handleClearAll}
                  >
                    <i className="fa-solid fa-trash"></i>
                    Clear All
                  </button>
                </div>
              </div>

              <div className="wishlist-page__grid">
                {filteredItems.map((item) => {
                  // Convert WishlistItem to the format expected by card components
                  const cardProps = {
                    id: parseInt(item.id),
                    title: item.title,
                    location: item.location,
                    duration: item.duration,
                    rating: item.rating,
                    reviewCount: item.reviewCount,
                    price: item.price,
                    image: item.images[0], // Use first image for TourCard
                    images: item.images,
                    category: item.category || 'General',
                    difficulty: item.difficulty || 'Easy'
                  };

                  return (
                    <div key={item.id} className="wishlist-page__item">
                      {item.type === 'trek' ? (
                        <TrekCard tour={cardProps} />
                      ) : (
                        <TourCard 
                          tour={cardProps} 
                          isShortTour={item.type === 'short-tour'} 
                        />
                      )}
                      
                      <button
                        className="wishlist-page__item-remove"
                        onClick={() => handleRemoveItem(item.id)}
                        aria-label={`Remove ${item.title} from wishlist`}
                      >
                        <i className="fa-solid fa-heart"></i>
                      </button>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default WishlistPage;
