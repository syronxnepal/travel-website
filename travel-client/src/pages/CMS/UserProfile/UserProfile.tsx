import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CMSLayout from 'src/components/CMS/CMSLayout/CMSLayout';
import FormField from 'src/components/CMS/Common/FormField/FormField';
import { useAuth } from 'src/context/AuthContext';
import CRUDProvider, { useCRUD } from 'src/components/CMS/Common/CRUDProvider/CRUDProvider';
import 'src/pages/CMS/CMSPage.scss';
import './UserProfile.scss';

const UserProfileContent: React.FC = () => {
  const { user, updateUser } = useAuth();
  const { performAction } = useCRUD();
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState(() => ({
    name: user?.name || '',
    email: user?.email || '',
    avatar: user?.avatar || ''
  }));

  // Update formData when user changes
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        avatar: user.avatar || ''
      });
    }
  }, [user]);

  // If user is not loaded, show loading state
  if (!user) {
    return (
      <CMSLayout>
        <div className="cms-page">
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '2rem' }}></i>
            <p>Loading profile...</p>
          </div>
        </div>
      </CMSLayout>
    );
  }

  const handleSave = () => {
    performAction(
      () => {
        updateUser({ 
          name: formData.name,
          email: formData.email,
          avatar: formData.avatar 
        });
        setIsEditing(false);
      },
      'Profile updated successfully!',
      'success'
    );
  };

  return (
    <CMSLayout>
      <div className="cms-page">
        <div className="user-profile">
          <div className="user-profile__header">
            <h2>My Profile</h2>
            <button 
              className="btn btn-primary"
              onClick={() => setIsEditing(!isEditing)}
            >
              <i className={isEditing ? 'fa-solid fa-xmark' : 'fa-solid fa-edit'}></i>
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          <div className="user-profile__content">
            <div className="user-profile__avatar-section">
              <div className="user-profile__avatar">
                {formData.avatar ? (
                  <img src={formData.avatar} alt={user?.name} />
                ) : (
                  <i className="fa-solid fa-user"></i>
                )}
              </div>
              {isEditing && (
                <FormField
                  label="Avatar URL"
                  name="avatar"
                  type="text"
                  value={formData.avatar}
                  onChange={(value) => setFormData({ ...formData, avatar: value })}
                  placeholder="Enter avatar URL"
                />
              )}
            </div>

            <div className="user-profile__form">
              <FormField
                label="Name"
                name="name"
                type="text"
                value={formData.name}
                onChange={(value) => setFormData({ ...formData, name: value })}
                placeholder="Enter your name"
                required
                disabled={!isEditing}
              />
              
              <FormField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={(value) => setFormData({ ...formData, email: value })}
                placeholder="Enter your email"
                required
                disabled={!isEditing}
              />

              <div className="user-profile__info-row">
                <div className="user-profile__info-item">
                  <label>Role</label>
                  <span className={`user-profile__badge user-profile__badge--${user?.role}`}>
                    {user?.role}
                  </span>
                </div>
                <div className="user-profile__info-item">
                  <label>Member Since</label>
                  <span>{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}</span>
                </div>
              </div>

              {isEditing && (
                <div className="user-profile__actions">
                  <button className="btn btn-primary" onClick={handleSave}>
                    <i className="fa-solid fa-save"></i>
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </CMSLayout>
  );
};

const UserProfile: React.FC = () => {
  return (
    <CRUDProvider>
      <UserProfileContent />
    </CRUDProvider>
  );
};

export default UserProfile;

