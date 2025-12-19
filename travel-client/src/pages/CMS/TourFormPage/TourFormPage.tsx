// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CMSLayout from 'src/components/CMS/CMSLayout/CMSLayout';
import FormField from 'src/components/CMS/Common/FormField/FormField';
import ImageUpload from 'src/components/CMS/Common/ImageUpload/ImageUpload';
import RepeaterField from 'src/components/CMS/Common/RepeaterField/RepeaterField';
import StringRepeaterField from 'src/components/CMS/Common/StringRepeaterField/StringRepeaterField';
import CRUDProvider, { useCRUD } from 'src/components/CMS/Common/CRUDProvider/CRUDProvider';
import 'src/pages/CMS/CMSPage.scss';
import './TourFormPage.scss';

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

const TourFormPageContent: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { performAction } = useCRUD();
  const isEditing = !!id;

  // In a real app, fetch tour data from API
  const [formData, setFormData] = useState<Partial<Tour>>({
    title: '',
    location: '',
    category: 'Adventure',
    duration: '',
    price: '',
    rating: '4.5',
    reviewCount: 0,
    description: '',
    featured: false
  });

  useEffect(() => {
    if (isEditing && id) {
      // In a real app, fetch tour by id
      // For now, we'll initialize with empty form
      // You can add API call here: fetchTour(id).then(setFormData)
    }
  }, [id, isEditing]);

  const handleSave = () => {
    performAction(
      () => {
        // In a real app, save to API
        // if (isEditing) { updateTour(id, formData) } else { createTour(formData) }
        navigate('/cms/tours/manage');
      },
      isEditing ? 'Tour updated successfully' : 'Tour added successfully',
      'success'
    );
  };

  return (
    <CMSLayout>
      <div className="cms-page">
        <div className="cms-section">
          <div className="cms-section__header">
            <div className="cms-section__header-content">
              <h3>{isEditing ? 'Edit Tour' : 'Add New Tour'}</h3>
              <p>{isEditing ? 'Update tour details' : 'Create a new tour with all necessary information'}</p>
            </div>
          </div>

          <div className="cms-section__content">
            <div className="cms-section__form tour-form-page">
              <ImageUpload
                label="Tour Image"
                name="image"
                value={formData.image || ''}
                onChange={(value) => setFormData({ ...formData, image: value })}
                placeholder="Upload or enter image URL"
              />
              
              <FormField
                label="Title"
                name="title"
                type="text"
                value={formData.title || ''}
                onChange={(value) => setFormData({ ...formData, title: value })}
                placeholder="Enter tour title"
                required
              />
              
              <FormField
                label="Location"
                name="location"
                type="text"
                value={formData.location || ''}
                onChange={(value) => setFormData({ ...formData, location: value })}
                placeholder="Enter location"
                required
              />
              
              <FormField
                label="Category"
                name="category"
                type="select"
                value={formData.category || 'Adventure'}
                onChange={(value) => setFormData({ ...formData, category: value })}
                options={[
                  { value: 'Adventure', label: 'Adventure' },
                  { value: 'Cultural', label: 'Cultural' },
                  { value: 'Nature', label: 'Nature' },
                  { value: 'Historical', label: 'Historical' }
                ]}
                required
              />
              
              <FormField
                label="Duration"
                name="duration"
                type="text"
                value={formData.duration || ''}
                onChange={(value) => setFormData({ ...formData, duration: value })}
                placeholder="e.g., 10 days"
                required
              />
              
              <FormField
                label="Price"
                name="price"
                type="text"
                value={formData.price || ''}
                onChange={(value) => setFormData({ ...formData, price: value })}
                placeholder="e.g., $1,200"
                required
              />
              
              <FormField
                label="Rating"
                name="rating"
                type="number"
                value={formData.rating || '4.5'}
                onChange={(value) => setFormData({ ...formData, rating: value.toString() })}
                placeholder="e.g., 4.8"
                min="1"
                max="5"
                step="0.1"
                required
              />
              
              <FormField
                label="Review Count"
                name="reviewCount"
                type="number"
                value={formData.reviewCount?.toString() || '0'}
                onChange={(value) => setFormData({ ...formData, reviewCount: parseInt(value) || 0 })}
                placeholder="e.g., 128"
                min="0"
                required
              />
              
              <FormField
                label="Description"
                name="description"
                type="textarea"
                value={formData.description || ''}
                onChange={(value) => setFormData({ ...formData, description: value })}
                placeholder="Enter tour description"
                rows={4}
                required
              />
              
              <FormField
                label="Original Price (Optional)"
                name="originalPrice"
                type="text"
                value={formData.originalPrice || ''}
                onChange={(value) => setFormData({ ...formData, originalPrice: value })}
                placeholder="e.g., $1,500 (for discount display)"
              />
              
              <FormField
                label="Difficulty (Optional)"
                name="difficulty"
                type="select"
                value={formData.difficulty || ''}
                onChange={(value) => setFormData({ ...formData, difficulty: value })}
                options={[
                  { value: 'Easy', label: 'Easy' },
                  { value: 'Medium', label: 'Medium' },
                  { value: 'Hard', label: 'Hard' }
                ]}
              />
              
              <FormField
                label="Group Size (Optional)"
                name="groupSize"
                type="text"
                value={formData.groupSize || ''}
                onChange={(value) => setFormData({ ...formData, groupSize: value })}
                placeholder="e.g., Small groups, Medium groups"
              />
              
              <StringRepeaterField
                label="Highlights"
                value={formData.highlights || []}
                onChange={(value) => setFormData({ ...formData, highlights: value })}
                placeholder="Enter highlight"
                addButtonText="Add Highlight"
                emptyMessage="No highlights added yet"
                helpText="Add key highlights of this tour"
              />
              
              <StringRepeaterField
                label="What's Included"
                value={formData.included || []}
                onChange={(value) => setFormData({ ...formData, included: value })}
                placeholder="Enter included item"
                addButtonText="Add Included Item"
                emptyMessage="No included items added yet"
                helpText="List all items/services included in the tour"
              />
              
              <StringRepeaterField
                label="What's Not Included"
                value={formData.excluded || []}
                onChange={(value) => setFormData({ ...formData, excluded: value })}
                placeholder="Enter excluded item"
                addButtonText="Add Excluded Item"
                emptyMessage="No excluded items added yet"
                helpText="List all items/services not included in the tour"
              />
              
              <RepeaterField
                label="Tour Information"
                value={formData.tourInfo || []}
                onChange={(value) => setFormData({ ...formData, tourInfo: value })}
                fields={[
                  {
                    name: 'icon',
                    label: 'Icon',
                    type: 'text',
                    placeholder: 'e.g., fa-users, fa-clock',
                    required: true
                  },
                  {
                    name: 'title',
                    label: 'Title',
                    type: 'text',
                    placeholder: 'e.g., Group Size, Duration',
                    required: true
                  },
                  {
                    name: 'value',
                    label: 'Value',
                    type: 'text',
                    placeholder: 'e.g., Small groups (max 12 people)',
                    required: true
                  }
                ]}
                addButtonText="Add Tour Info"
                emptyMessage="No tour information added yet"
                helpText="Add essential tour information with icon, title, and value"
              />
              
              <RepeaterField
                label="Itinerary"
                value={formData.itinerary || []}
                onChange={(value) => setFormData({ ...formData, itinerary: value })}
                fields={[
                  {
                    name: 'day',
                    label: 'Day',
                    type: 'number',
                    placeholder: 'Day number',
                    required: true
                  },
                  {
                    name: 'title',
                    label: 'Title',
                    type: 'text',
                    placeholder: 'Day title',
                    required: true
                  },
                  {
                    name: 'description',
                    label: 'Description',
                    type: 'textarea',
                    placeholder: 'Day description',
                    required: true
                  },
                  {
                    name: 'activities',
                    label: 'Activities',
                    type: 'string-array',
                    placeholder: 'Enter activity',
                    addButtonText: 'Add Activity',
                    emptyMessage: 'No activities added yet'
                  },
                  {
                    name: 'meals',
                    label: 'Meals',
                    type: 'string-array',
                    placeholder: 'Enter meal (e.g., Breakfast, Lunch, Dinner)',
                    addButtonText: 'Add Meal',
                    emptyMessage: 'No meals added yet'
                  },
                  {
                    name: 'accommodation',
                    label: 'Accommodation',
                    type: 'text',
                    placeholder: 'Accommodation details (e.g., 3-star hotel in Kathmandu)'
                  },
                  {
                    name: 'highlights',
                    label: 'Highlights',
                    type: 'string-array',
                    placeholder: 'Enter highlight',
                    addButtonText: 'Add Highlight',
                    emptyMessage: 'No highlights added yet'
                  }
                ]}
                addButtonText="Add Day"
                emptyMessage="No itinerary days added yet"
                helpText="Add day-by-day itinerary for the tour"
              />
              
              <RepeaterField
                label="FAQs"
                value={formData.faqs || []}
                onChange={(value) => setFormData({ ...formData, faqs: value })}
                fields={[
                  {
                    name: 'question',
                    label: 'Question',
                    type: 'text',
                    placeholder: 'Enter FAQ question',
                    required: true
                  },
                  {
                    name: 'answer',
                    label: 'Answer',
                    type: 'textarea',
                    placeholder: 'Enter FAQ answer',
                    required: true
                  }
                ]}
                addButtonText="Add FAQ"
                emptyMessage="No FAQs added yet"
                helpText="Add frequently asked questions and answers"
              />
              
              <FormField
                label="Featured"
                name="featured"
                type="checkbox"
                value={formData.featured ? 'true' : 'false'}
                onChange={(value) => setFormData({ ...formData, featured: value === 'true' })}
              />
              
              <div className="form-actions">
                <button className="btn btn-secondary" onClick={() => navigate('/cms/tours/manage')}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleSave}>
                  {isEditing ? 'Update' : 'Add'} Tour
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CMSLayout>
  );
};

const TourFormPage: React.FC = () => {
  return (
    <CRUDProvider
      deleteConfig={{
        title: 'Delete Tour',
        message: 'Are you sure you want to delete this tour?',
        type: 'tour'
      }}
    >
      <TourFormPageContent />
    </CRUDProvider>
  );
};

export default TourFormPage;

