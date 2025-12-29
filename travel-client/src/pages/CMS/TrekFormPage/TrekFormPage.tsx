// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CMSLayout from 'src/components/CMS/CMSLayout/CMSLayout';
import FormField from 'src/components/CMS/Common/FormField/FormField';
import ImageUpload from 'src/components/CMS/Common/ImageUpload/ImageUpload';
import RepeaterField from 'src/components/CMS/Common/RepeaterField/RepeaterField';
import StringRepeaterField from 'src/components/CMS/Common/StringRepeaterField/StringRepeaterField';
import CRUDProvider, { useCRUD } from 'src/components/CMS/Common/CRUDProvider/CRUDProvider';
import { useTrek, useCreateTrek, useUpdateTrek, useUploadImage, type Trek } from 'src/hooks/useTreks';
import 'src/pages/CMS/CMSPage.scss';
import './TrekFormPage.scss';

const TrekFormPageContent: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;
  
  // React Query hooks
  const { data: trek, isLoading: isLoadingTrek } = useTrek(id);
  const createTrekMutation = useCreateTrek();
  const updateTrekMutation = useUpdateTrek();
  const uploadImageMutation = useUploadImage();

  const [formData, setFormData] = useState<Partial<Trek>>({
    title: '',
    location: '',
    difficulty: 'Moderate',
    duration: '',
    price: '',
    rating: '4.5',
    reviewCount: 0,
    description: '',
    featured: false
  });

  // Load trek data when editing
  useEffect(() => {
    if (trek) {
      setFormData({
        image: trek.image || '',
        title: trek.title || '',
        location: trek.location || '',
        difficulty: trek.difficulty || 'Moderate',
        duration: trek.duration || '',
        price: trek.price || '',
        originalPrice: trek.originalPrice,
        rating: trek.rating || '4.5',
        reviewCount: trek.reviewCount || 0,
        description: trek.description || '',
        highlights: trek.highlights || [],
        included: trek.included || [],
        excluded: trek.excluded || [],
        itinerary: trek.itinerary || [],
        tourInfo: trek.tourInfo || [],
        faqs: trek.faqs || [],
        featured: trek.featured || false
      });
    }
  }, [trek]);

  const handleImageUpload = async (file: File) => {
    try {
      const imageUrl = await uploadImageMutation.mutateAsync(file);
      setFormData({ ...formData, image: imageUrl });
    } catch (error) {
      // Error is handled by the mutation hook
    }
  };

  const handleSave = () => {
    // Prepare data for API (remove id for create, keep for update)
    const apiData: Partial<Trek> = {
      image: formData.image || '',
      title: formData.title || '',
      location: formData.location || '',
      difficulty: formData.difficulty || 'Moderate',
      duration: formData.duration || '',
      price: formData.price || '',
      originalPrice: formData.originalPrice,
      rating: formData.rating || '4.5',
      reviewCount: formData.reviewCount || 0,
      description: formData.description || '',
      highlights: formData.highlights || [],
      included: formData.included || [],
      excluded: formData.excluded || [],
      itinerary: formData.itinerary || [],
      tourInfo: formData.tourInfo || [],
      faqs: formData.faqs || [],
      featured: formData.featured || false
    };

    if (isEditing && id) {
      updateTrekMutation.mutate({ id, data: apiData });
    } else {
      createTrekMutation.mutate(apiData);
    }
  };

  const isLoading = isLoadingTrek || createTrekMutation.isPending || updateTrekMutation.isPending;

  return (
    <CMSLayout>
      <div className="cms-page">
        <div className="cms-section">
          <div className="cms-section__header">
            <div className="cms-section__header-content">
              <h3>{isEditing ? 'Edit Trek' : 'Add New Trek'}</h3>
              <p>{isEditing ? 'Update trek details' : 'Create a new trek with all necessary information'}</p>
            </div>
          </div>

          <div className="cms-section__content">
            {isLoadingTrek && isEditing ? (
              <div style={{ padding: '2rem', textAlign: 'center' }}>
                <p>Loading trek data...</p>
              </div>
            ) : (
              <div className="cms-section__form trek-form-page">
              <ImageUpload
                label="Trek Image"
                name="image"
                value={formData.image || ''}
                onChange={(value) => setFormData({ ...formData, image: value })}
                onFileUpload={handleImageUpload}
                placeholder="Upload or enter image URL"
              />
              
              <FormField
                label="Title"
                name="title"
                type="text"
                value={formData.title || ''}
                onChange={(value) => setFormData({ ...formData, title: value })}
                placeholder="Enter trek title"
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
                label="Difficulty"
                name="difficulty"
                type="select"
                value={formData.difficulty || 'Moderate'}
                onChange={(value) => setFormData({ ...formData, difficulty: value })}
                options={['Easy', 'Moderate', 'Challenging', 'Expert']}
                required
              />
              
              <FormField
                label="Duration"
                name="duration"
                type="text"
                value={formData.duration || ''}
                onChange={(value) => setFormData({ ...formData, duration: value })}
                placeholder="e.g., 14 days"
                required
              />
              
              <FormField
                label="Price"
                name="price"
                type="text"
                value={formData.price || ''}
                onChange={(value) => setFormData({ ...formData, price: value })}
                placeholder="e.g., $1,500"
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
                placeholder="Enter trek description"
                rows={4}
                required
              />
              
              <FormField
                label="Original Price (Optional)"
                name="originalPrice"
                type="text"
                value={formData.originalPrice || ''}
                onChange={(value) => setFormData({ ...formData, originalPrice: value })}
                placeholder="e.g., $1,800 (for discount display)"
              />
              
              <StringRepeaterField
                label="Highlights"
                value={formData.highlights || []}
                onChange={(value) => setFormData({ ...formData, highlights: value })}
                placeholder="Enter highlight"
                addButtonText="Add Highlight"
                emptyMessage="No highlights added yet"
                helpText="Add key highlights of this trek"
              />
              
              <StringRepeaterField
                label="What's Included"
                value={formData.included || []}
                onChange={(value) => setFormData({ ...formData, included: value })}
                placeholder="Enter included item"
                addButtonText="Add Included Item"
                emptyMessage="No included items added yet"
                helpText="List all items/services included in the trek"
              />
              
              <StringRepeaterField
                label="What's Not Included"
                value={formData.excluded || []}
                onChange={(value) => setFormData({ ...formData, excluded: value })}
                placeholder="Enter excluded item"
                addButtonText="Add Excluded Item"
                emptyMessage="No excluded items added yet"
                helpText="List all items/services not included in the trek"
              />
              
              <RepeaterField
                label="Trek Information"
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
                addButtonText="Add Trek Info"
                emptyMessage="No trek information added yet"
                helpText="Add essential trek information with icon, title, and value"
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
                    placeholder: 'Accommodation details (e.g., Teahouse in Phakding)'
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
                helpText="Add day-by-day itinerary for the trek"
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
                <button 
                  className="btn btn-secondary" 
                  onClick={() => navigate('/cms/treks/manage')}
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button 
                  className="btn btn-primary" 
                  onClick={handleSave}
                  disabled={isLoading}
                >
                  {isLoading 
                    ? (isLoadingTrek ? 'Loading...' : 'Saving...') 
                    : (isEditing ? 'Update' : 'Add')} Trek
                </button>
              </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </CMSLayout>
  );
};

const TrekFormPage: React.FC = () => {
  return (
    <CRUDProvider
      deleteConfig={{
        title: 'Delete Trek',
        message: 'Are you sure you want to delete this trek?',
        type: 'trek'
      }}
    >
      <TrekFormPageContent />
    </CRUDProvider>
  );
};

export default TrekFormPage;

