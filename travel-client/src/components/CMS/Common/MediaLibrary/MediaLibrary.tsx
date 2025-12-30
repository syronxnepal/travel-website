import React, { useState } from 'react';
import { useMediaLibrary, useInvalidateMediaLibrary, type MediaItem } from 'src/hooks/useMediaLibrary';
import { useUploadImage } from 'src/hooks/useTreks';
import Modal from '../Modal/Modal';
import './MediaLibrary.scss';

interface MediaLibraryProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
  multiple?: boolean;
  selectedUrls?: string[];
}

const MediaLibrary: React.FC<MediaLibraryProps> = ({
  isOpen,
  onClose,
  onSelect,
  multiple = false,
  selectedUrls = []
}) => {
  const { data: mediaItems, isLoading, error, refetch } = useMediaLibrary();
  const uploadImageMutation = useUploadImage();
  const invalidateMedia = useInvalidateMediaLibrary();
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Handle file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        await uploadImageMutation.mutateAsync(file);
      }
      invalidateMedia();
      // Reset file input
      e.target.value = '';
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  // Filter media items by search query
  const filteredItems = mediaItems?.filter(item =>
    item.filename.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  // Check if item is selected
  const isSelected = (url: string) => {
    return selectedUrls.includes(url);
  };

  // Handle image selection
  const handleSelect = (item: MediaItem) => {
    if (multiple) {
      // Toggle selection for multiple mode
      if (isSelected(item.fullUrl)) {
        // Remove from selection (would need parent to handle this)
        // For now, just call onSelect with current selection
        onSelect(item.fullUrl);
      } else {
        onSelect(item.fullUrl);
      }
    } else {
      // Single selection - select and close
      onSelect(item.fullUrl);
      onClose();
    }
  };

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  // Format date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Media Library" size="xl">
      <div className="media-library">
        {/* Toolbar */}
        <div className="media-library__toolbar">
          <div className="media-library__search">
            <i className="fa-solid fa-search"></i>
            <input
              type="text"
              placeholder="Search media..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="media-library__search-input"
            />
          </div>
          <div className="media-library__actions">
            <label className="media-library__upload-btn">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileUpload}
                disabled={uploading}
                style={{ display: 'none' }}
              />
              <i className="fa-solid fa-upload"></i>
              {uploading ? 'Uploading...' : 'Upload'}
            </label>
            <button
              className="media-library__refresh-btn"
              onClick={() => refetch()}
              disabled={isLoading}
            >
              <i className="fa-solid fa-refresh"></i>
              Refresh
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="media-library__content">
          {isLoading ? (
            <div className="media-library__loading">
              <i className="fa-solid fa-spinner fa-spin"></i>
              <p>Loading media library...</p>
            </div>
          ) : error ? (
            <div className="media-library__error">
              <i className="fa-solid fa-exclamation-triangle"></i>
              <p>Failed to load media library</p>
              <button onClick={() => refetch()} className="btn btn-primary">
                Try Again
              </button>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="media-library__empty">
              <i className="fa-solid fa-images"></i>
              <p>{searchQuery ? 'No images found' : 'No images uploaded yet'}</p>
              {!searchQuery && (
                <label className="btn btn-primary">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileUpload}
                    disabled={uploading}
                    style={{ display: 'none' }}
                  />
                  Upload Your First Image
                </label>
              )}
            </div>
          ) : (
            <div className="media-library__grid">
              {filteredItems.map((item) => (
                <div
                  key={item.url}
                  className={`media-library__item ${isSelected(item.fullUrl) ? 'selected' : ''}`}
                  onClick={() => handleSelect(item)}
                >
                  <div className="media-library__item-image">
                    <img src={item.fullUrl} alt={item.filename} />
                    {isSelected(item.fullUrl) && (
                      <div className="media-library__item-check">
                        <i className="fa-solid fa-check"></i>
                      </div>
                    )}
                    <div className="media-library__item-overlay">
                      <div className="media-library__item-info">
                        <p className="media-library__item-filename">{item.filename}</p>
                        <p className="media-library__item-meta">
                          {formatFileSize(item.size)} • {formatDate(item.uploadedAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {multiple && selectedUrls.length > 0 && (
          <div className="media-library__footer">
            <p>{selectedUrls.length} image(s) selected</p>
            <button className="btn btn-primary" onClick={onClose}>
              Use Selected
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default MediaLibrary;

