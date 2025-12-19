// @ts-nocheck
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CMSLayout from 'src/components/CMS/CMSLayout/CMSLayout';
import DataTable from 'src/components/CMS/Common/DataTable/DataTable';
import CRUDProvider, { useCRUD } from 'src/components/CMS/Common/CRUDProvider/CRUDProvider';
import 'src/pages/CMS/CMSPage.scss';

interface Tour {
  id: string;
  image: string;
  title: string;
  location: string;
  category: string;
  duration: string;
  price: string;
  originalPrice?: string;
  rating: string;
  reviewCount: number;
  description: string;
  difficulty?: string;
  groupSize?: string;
  highlights?: string[];
  included?: string[];
  excluded?: string[];
  itinerary?: Array<{
    day: number;
    title: string;
    description: string;
    activities?: string[];
    meals?: string[];
    accommodation?: string;
    highlights?: string[];
  }>;
  tourInfo?: Array<{
    icon: string;
    title: string;
    value: string;
  }>;
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
  featured: boolean;
}

const TourManagementContent: React.FC = () => {
  const navigate = useNavigate();
  const { performAction, showDeleteConfirmation } = useCRUD();
  const [tours, setTours] = useState<Tour[]>([
    {
      id: '1',
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400',
      title: 'Cultural Heritage Tour',
      location: 'India',
      category: 'Cultural',
      duration: '10 days',
      price: '$1,200',
      originalPrice: '$1,500',
      rating: '4.8',
      reviewCount: 128,
      description: 'Discover the rich cultural heritage of India through its ancient temples and traditional architecture.',
      difficulty: 'Easy',
      groupSize: 'Small groups',
      highlights: ['UNESCO sites', 'Local guide', 'Traditional architecture'],
      featured: true
    },
    {
      id: '2',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400',
      title: 'Beach Paradise Tour',
      location: 'Thailand',
      category: 'Nature',
      duration: '8 days',
      price: '$900',
      rating: '4.7',
      reviewCount: 85,
      description: 'Experience the beautiful beaches and tropical paradise of Thailand.',
      difficulty: 'Easy',
      groupSize: 'Medium groups',
      highlights: ['Beach activities', 'Island hopping', 'Snorkeling'],
      featured: false
    },
    {
      id: '3',
      image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400',
      title: 'Historical Sites Tour',
      location: 'Egypt',
      category: 'Historical',
      duration: '12 days',
      price: '$1,400',
      rating: '4.6',
      reviewCount: 92,
      description: 'Explore the ancient wonders of Egypt including pyramids and historical monuments.',
      difficulty: 'Medium',
      highlights: ['Pyramids', 'Sphinx', 'Historical sites'],
      featured: false
    }
  ]);


  const columns = [
    {
      key: 'image',
      label: 'Image',
      width: '80px',
      render: () => (
        <div className="tour-cms__image-cell">
          <div className="tour-cms__image-placeholder">
            <i className="fa-solid fa-route"></i>
          </div>
        </div>
      )
    },
    {
      key: 'title',
      label: 'Title',
      render: (value: string) => (
        <div className="tour-cms__title-cell">
          <strong>{value}</strong>
        </div>
      )
    },
    {
      key: 'location',
      label: 'Location'
    },
    {
      key: 'category',
      label: 'Category',
      width: '120px',
      render: (value: string) => (
        <div className="tour-cms__category-cell">
          <span className={`tour-cms__category tour-cms__category--${value.toLowerCase()}`}>
            {value}
          </span>
        </div>
      )
    },
    {
      key: 'duration',
      label: 'Duration',
      width: '100px'
    },
    {
      key: 'price',
      label: 'Price',
      width: '120px'
    },
    {
      key: 'featured',
      label: 'Featured',
      width: '100px',
      render: (_: boolean, item: Tour) => (
        <div className="tour-cms__featured-cell">
          <span className={`tour-cms__featured-badge ${item.featured ? 'featured' : 'regular'}`}>
            {item.featured ? 'Featured' : 'Regular'}
          </span>
        </div>
      )
    },
    {
      key: 'rating',
      label: 'Rating',
      width: '100px',
      render: (value: string, item: Tour) => (
        <div className="tour-cms__rating">
          <div className="tour-cms__stars">
            {[...Array(5)].map((_, i) => (
              <i
                key={i}
                className={`fa-solid fa-star ${i < Math.floor(parseFloat(value)) ? 'active' : ''}`}
              ></i>
            ))}
          </div>
          <span className="tour-cms__review-count">({item.reviewCount || 0})</span>
        </div>
      )
    }
  ];

  const handleAdd = () => {
    navigate('/cms/tours/form');
  };

  const handleEdit = (tour: Tour) => {
    navigate(`/cms/tours/form/${tour.id}`);
  };

  const handleDeleteClick = (tour: Tour) => {
    showDeleteConfirmation(tour, () => {
      performAction(
        () => setTours(tours.filter(t => t.id !== tour.id)),
        'Tour deleted successfully',
        'success'
      );
    });
  };


  return (
    <CMSLayout>
      <div className="cms-page">
        <div className="cms-section">
          <div className="cms-section__header">
            <div className="cms-section__header-content">
              <h3>Tour Management</h3>
              <p>Manage all tours with full control over details, pricing, and featured status</p>
            </div>
          </div>

          <div className="cms-section__content">
            <DataTable
              data={tours}
              columns={columns}
              onAdd={handleAdd}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
              searchable
              emptyMessage="No tours found"
            />
          </div>
        </div>
      </div>
    </CMSLayout>
  );
};

const TourManagement: React.FC = () => {
  return (
    <CRUDProvider
      deleteConfig={{
        title: 'Delete Tour',
        message: 'Are you sure you want to delete this tour?',
        type: 'tour'
      }}
    >
      <TourManagementContent />
    </CRUDProvider>
  );
};

export default TourManagement;

