import React, { useState, useRef } from 'react';
import './ImageUpload.scss';

interface ImageUploadProps {
  value?: string | string[];
  onChange: (value: string | string[]) => void;
  multiple?: boolean;
  maxImages?: number;
  accept?: string;
  className?: string;
  placeholder?: string;
  aspectRatio?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  multiple = false,
  maxImages = 5,
  accept = 'image/*',
  className = '',
  placeholder = 'Click to upload images',
  aspectRatio = '16/9'
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentImages = Array.isArray(value) ? value : (value ? [value] : []);

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const fileArray = Array.from(files);
    const newImages: string[] = [];

    fileArray.forEach((file) => {
      if (file.type.startsWith('image/')) {
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
      }
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

  const handleClick = () => {
    fileInputRef.current?.click();
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
      <div
        className={`image-upload__dropzone ${isDragging ? 'dragging' : ''} ${
          currentImages.length > 0 ? 'has-images' : ''
        }`}
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

        {currentImages.length === 0 ? (
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
    </div>
  );
};

export default ImageUpload;
