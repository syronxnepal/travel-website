import { useRef, useState } from 'react'
import { mediaApi } from '../../../services/api'
import { getImageUrl } from '../../../utils/helpers'
import { useToast } from '../../../context/ToastContext'
import './ImageUpload.css'

function ImageUpload({ value, onChange, label = 'Upload Image', accept = 'image/*' }) {
  const inputRef = useRef(null)
  const [uploading, setUploading] = useState(false)
  const toast = useToast()

  async function upload(file) {
    if (!file) return
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('image', file)
      const res = await mediaApi.upload(formData)
      onChange(res?.data?.url || '')
    } catch (err) {
      toast.error(err.message || 'Image upload failed.')
    } finally {
      setUploading(false)
    }
  }

  function handleChange(e) {
    upload(e.target.files[0])
    e.target.value = ''
  }

  function handleDrop(e) {
    e.preventDefault()
    upload(e.dataTransfer.files[0])
  }

  return (
    <div
      className="image-upload"
      onClick={() => !uploading && inputRef.current.click()}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <input ref={inputRef} type="file" accept={accept} onChange={handleChange} />

      {uploading ? (
        <div className="image-upload__placeholder">
          <i className="fa-solid fa-spinner fa-spin"></i>
          <p>Uploading...</p>
        </div>
      ) : value ? (
        <div className="image-upload__preview">
          <img src={getImageUrl(value)} alt="Preview" />
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
