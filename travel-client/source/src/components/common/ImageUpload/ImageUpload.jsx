import { useRef } from 'react'
import './ImageUpload.css'

function ImageUpload({ value, onChange, label = 'Upload Image', accept = 'image/*', multiple = false }) {
  const inputRef = useRef(null)

  function handleChange(e) {
    const files = multiple ? Array.from(e.target.files) : e.target.files[0]
    onChange(files)
  }

  function handleDrop(e) {
    e.preventDefault()
    const files = multiple ? Array.from(e.dataTransfer.files) : e.dataTransfer.files[0]
    onChange(files)
  }

  return (
    <div
      className="image-upload"
      onClick={() => inputRef.current.click()}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <input ref={inputRef} type="file" accept={accept} multiple={multiple} onChange={handleChange} />

      {value ? (
        <div className="image-upload__preview">
          <img src={typeof value === 'string' ? value : URL.createObjectURL(value)} alt="Preview" />
          <span className="image-upload__change">Click to change</span>
        </div>
      ) : (
        <div className="image-upload__placeholder">
          <i className="fa-solid fa-cloud-arrow-up"></i>
          <p>{label}</p>
          <span>Click to browse or drag & drop</span>
        </div>
      )}
    </div>
  )
}

export default ImageUpload
