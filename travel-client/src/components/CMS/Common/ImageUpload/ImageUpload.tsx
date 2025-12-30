import React, { useState, useRef } from 'react';
import MediaLibrary from '../MediaLibrary/MediaLibrary';
import './ImageUpload.scss';

interface ImageUploadProps {
  value?: string | string[];
  onChange: (value: string | string[]) => void;
  onFileUpload?: (file: File) => Promise<string>;
  multiple?: boolean;
  maxImages?: number;
  accept?: string;
  className?: string;
  placeholder?: string;
  aspectRatio?: string;
  label?: string;
  name?: string;
  showMediaLibrary?: boolean; // Show media library button
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  onFileUpload,
  multiple = false,
  maxImages = 5,
  accept = 'image/*',
  className = '',
  placeholder = 'Click to upload images',
  aspectRatio = '16/9',
  label,
  name,
  showMediaLibrary = true
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [isMediaLibraryOpen, setIsMediaLibraryOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentImages = Array.isArray(value) ? value : (value ? [value] : []);

  const handleFileSelect = async (files: FileList | null) => {
    if (!files) return;

    const fileArray = Array.from(files).filter(file => file.type.startsWith('image/'));
    if (fileArray.length === 0) return;

    // If onFileUpload is provided, upload to server immediately
    if (onFileUpload) {
      setUploading(true);
      try {
        const uploadedUrls: string[] = [];
        
        // Upload all files
        for (const file of fileArray) {
          const imageUrl = await onFileUpload(file);
          uploadedUrls.push(imageUrl);
        }

        // Update form data with uploaded URLs
        if (multiple) {
          const updatedImages = [...currentImages, ...uploadedUrls].slice(0, maxImages);
          onChange(updatedImages);
        } else {
          onChange(uploadedUrls[0]);
        }
      } catch (error) {
        console.error('Upload failed:', error);
        // Error is handled by the mutation hook
      } finally {
        setUploading(false);
      }
      return;
    }

    // Otherwise, use local preview (fallback)
    const newImages: string[] = [];
    fileArray.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        newImages.push(result);

        if (newImages.length === fileArray.length) {
          if (multiple) {
            const updatedImages = [...currentImages, ...newImages].slice(0, maxImages);
            onChange(updatedImages);
          } else {
            onChange(newImages[0]);
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    // Don't trigger file input if clicking on media library button
    if ((e.target as HTMLElement).closest('.image-upload__media-library-btn')) {
      return;
    }
    fileInputRef.current?.click();
  };

  const handleMediaLibrarySelect = (url: string) => {
    if (multiple) {
      // For multiple, add to existing images if not already present
      if (!currentImages.includes(url)) {
        const updatedImages = [...currentImages, url].slice(0, maxImages);
        onChange(updatedImages);
      }
    } else {
      // For single, replace
      onChange(url);
    }
  };

  const removeImage = (index: number) => {
    if (multiple) {
      const updatedImages = currentImages.filter((_, i) => i !== index);
      onChange(updatedImages);
    } else {
      onChange('');
    }
  };

  const renderImagePreview = (imageUrl: string, index: number) => (
    <div key={index} className="image-upload__preview-item">
      <div 
        className="image-upload__preview-image"
        style={{ aspectRatio }}
      >
        <img src={imageUrl} alt={`Preview ${index + 1}`} />
        <button
          className="image-upload__remove-btn"
          onClick={() => removeImage(index)}
          type="button"
        >
          <i className="fa-solid fa-times"></i>
        </button>
      </div>
    </div>
  );

  return (
    <div className={`image-upload ${className}`}>
      {label && (
        <label className="image-upload__label" htmlFor={name}>
          {label}
        </label>
      )}
      <div
        className={`image-upload__dropzone ${isDragging ? 'dragging' : ''} ${
          currentImages.length > 0 ? 'has-images' : ''
        } ${uploading ? 'uploading' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(e) => handleFileSelect(e.target.files)}
          className="image-upload__input"
        />

        {uploading ? (
          <div className="image-upload__placeholder">
            <i className="fa-solid fa-spinner fa-spin"></i>
            <p className="image-upload__placeholder-text">Uploading...</p>
          </div>
        ) : currentImages.length === 0 ? (
          <div className="image-upload__placeholder">
            <i className="fa-solid fa-cloud-upload-alt"></i>
            <p className="image-upload__placeholder-text">{placeholder}</p>
            <p className="image-upload__placeholder-hint">
              {multiple ? `Upload up to ${maxImages} images` : 'Upload an image'}
            </p>
          </div>
        ) : (
          <div className="image-upload__preview">
            {multiple ? (
              <div className="image-upload__preview-grid">
                {currentImages.map((imageUrl, index) => renderImagePreview(imageUrl, index))}
                {currentImages.length < maxImages && (
                  <div className="image-upload__add-more" onClick={handleClick}>
                    <i className="fa-solid fa-plus"></i>
                    <span>Add More</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="image-upload__single-preview">
                {renderImagePreview(currentImages[0], 0)}
              </div>
            )}
          </div>
        )}
      </div>

      {multiple && currentImages.length > 0 && (
        <div className="image-upload__info">
          <span className="image-upload__count">
            {currentImages.length} of {maxImages} images
          </span>
        </div>
      )}

      {/* Media Library Button */}
      {showMediaLibrary && onFileUpload && (
        <div className="image-upload__actions">
          <button
            type="button"
            className="image-upload__media-library-btn"
            onClick={(e) => {
              e.stopPropagation();
              setIsMediaLibraryOpen(true);
            }}
          >
            <i className="fa-solid fa-images"></i>
            Media Library
          </button>
        </div>
      )}

      {/* Media Library Modal */}
      {showMediaLibrary && onFileUpload && (
        <MediaLibrary
          isOpen={isMediaLibraryOpen}
          onClose={() => setIsMediaLibraryOpen(false)}
          onSelect={handleMediaLibrarySelect}
          multiple={multiple}
          selectedUrls={currentImages}
        />
      )}
    </div>
  );
};

export default ImageUpload;
