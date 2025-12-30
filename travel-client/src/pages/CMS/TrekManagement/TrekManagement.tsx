// @ts-nocheck
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CMSLayout from 'src/components/CMS/CMSLayout/CMSLayout';
import DataTable from 'src/components/CMS/Common/DataTable/DataTable';
import CRUDProvider, { useCRUD } from 'src/components/CMS/Common/CRUDProvider/CRUDProvider';
import { useTreks, useDeleteTrek, type Trek } from 'src/hooks/useTreks';
import 'src/pages/CMS/CMSPage.scss';

const TrekManagementContent: React.FC = () => {
  const navigate = useNavigate();
  const { showDeleteConfirmation } = useCRUD();
  const { data: treks = [], isLoading, error, refetch } = useTreks();
  const deleteTrekMutation = useDeleteTrek();


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
      deleteTrekMutation.mutate(trek.id);
    });
  };

  // Format treks for display (convert id to string for compatibility)
  const formattedTreks = treks.map(trek => ({
    ...trek,
    id: trek.id.toString() as any // Type assertion for display compatibility
  }));


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
              data={formattedTreks}
              columns={columns}
              onAdd={handleAdd}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
              loading={isLoading}
              error={error}
              onRetry={() => refetch()}
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

