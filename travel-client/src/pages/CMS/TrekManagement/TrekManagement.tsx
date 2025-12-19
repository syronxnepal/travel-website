// @ts-nocheck
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CMSLayout from 'src/components/CMS/CMSLayout/CMSLayout';
import DataTable from 'src/components/CMS/Common/DataTable/DataTable';
import CRUDProvider, { useCRUD } from 'src/components/CMS/Common/CRUDProvider/CRUDProvider';
import 'src/pages/CMS/CMSPage.scss';

interface Trek {
  id: string;
  image: string;
  title: string;
  location: string;
  difficulty: string;
  duration: string;
  price: string;
  originalPrice?: string;
  rating: string;
  reviewCount: number;
  description: string;
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

const TrekManagementContent: React.FC = () => {
  const navigate = useNavigate();
  const { performAction, showDeleteConfirmation } = useCRUD();
  const [treks, setTreks] = useState<Trek[]>([
    {
      id: '1',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
      title: 'Everest Base Camp Trek',
      location: 'Nepal',
      difficulty: 'Challenging',
      duration: '14 days',
      price: '$1,500',
      rating: '4.8',
      featured: true
    },
    {
      id: '2',
      image: 'https://images.unsplash.com/photo-1579192199754-e5d35f5b78e5?w=400',
      title: 'Annapurna Circuit Trek',
      location: 'Nepal',
      difficulty: 'Moderate',
      duration: '12 days',
      price: '$1,200',
      rating: '4.7',
      featured: false
    },
    {
      id: '3',
      image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400',
      title: 'Langtang Valley Trek',
      location: 'Nepal',
      difficulty: 'Moderate',
      duration: '10 days',
      price: '$900',
      rating: '4.6',
      featured: false
    }
  ]);


  const columns = [
    {
      key: 'image',
      label: 'Image',
      width: '80px',
      render: () => (
        <div className="trek-cms__image-cell">
          <div className="trek-cms__image-placeholder">
            <i className="fa-solid fa-mountain"></i>
          </div>
        </div>
      )
    },
    {
      key: 'title',
      label: 'Title',
      render: (value: string) => (
        <div className="trek-cms__title-cell">
          <strong>{value}</strong>
        </div>
      )
    },
    {
      key: 'location',
      label: 'Location'
    },
    {
      key: 'difficulty',
      label: 'Difficulty',
      width: '120px',
      render: (value: string) => (
        <div className="trek-cms__difficulty-cell">
          <span className={`trek-cms__difficulty trek-cms__difficulty--${value.toLowerCase()}`}>
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
      render: (_: boolean, item: Trek) => (
        <div className="trek-cms__featured-cell">
          <span className={`trek-cms__featured-badge ${item.featured ? 'featured' : 'regular'}`}>
            {item.featured ? 'Featured' : 'Regular'}
          </span>
        </div>
      )
    },
    {
      key: 'rating',
      label: 'Rating',
      width: '100px',
      render: (value: string, item: Trek) => (
        <div className="trek-cms__rating">
          <div className="trek-cms__stars">
            {[...Array(5)].map((_, i) => (
              <i
                key={i}
                className={`fa-solid fa-star ${i < Math.floor(parseFloat(value)) ? 'active' : ''}`}
              ></i>
            ))}
          </div>
          <span className="trek-cms__review-count">({item.reviewCount || 0})</span>
        </div>
      )
    }
  ];

  const handleAdd = () => {
    navigate('/cms/treks/form');
  };

  const handleEdit = (trek: Trek) => {
    navigate(`/cms/treks/form/${trek.id}`);
  };

  const handleDeleteClick = (trek: Trek) => {
    showDeleteConfirmation(trek, () => {
      performAction(
        () => setTreks(treks.filter(t => t.id !== trek.id)),
        'Trek deleted successfully',
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
              <h3>Trek Management</h3>
              <p>Manage all treks with full control over details, pricing, and featured status</p>
            </div>
          </div>

          <div className="cms-section__content">
            <DataTable
              data={treks}
              columns={columns}
              onAdd={handleAdd}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
              searchable
              emptyMessage="No treks found"
            />
          </div>

        </div>
      </div>
    </CMSLayout>
  );
};

const TrekManagement: React.FC = () => {
  return (
    <CRUDProvider
      deleteConfig={{
        title: 'Delete Trek',
        message: 'Are you sure you want to delete this trek?',
        type: 'trek'
      }}
    >
      <TrekManagementContent />
    </CRUDProvider>
  );
};

export default TrekManagement;

