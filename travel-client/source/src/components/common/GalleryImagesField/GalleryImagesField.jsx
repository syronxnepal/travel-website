import { useRef, useState } from 'react'
import { mediaApi } from '../../../services/api'
import { getImageUrl } from '../../../utils/helpers'
import { useToast } from '../../../context/ToastContext'
import './GalleryImagesField.css'

function GalleryImagesField({ images = [], onChange }) {
  const inputRef = useRef(null)
  const [uploading, setUploading] = useState(false)
  const toast = useToast()

  async function handleAdd(e) {
    const files = Array.from(e.target.files || [])
    e.target.value = ''
    if (files.length === 0) return
    setUploading(true)
    try {
      const uploaded = []
      for (const file of files) {
        const formData = new FormData()
        formData.append('image', file)
        const res = await mediaApi.upload(formData)
        if (res?.data?.url) uploaded.push(res.data.url)
      }
      onChange([...images, ...uploaded])
    } catch (err) {
      toast.error(err.message || 'Image upload failed.')
    } finally {
      setUploading(false)
    }
  }

  function handleRemove(index) {
    onChange(images.filter((_, i) => i !== index))
  }

  return (
    <div className="gallery-images-field">
      <div className="gallery-images-field__grid">
        {images.map((img, i) => (
          <div key={i} className="gallery-images-field__item">
            <img src={getImageUrl(img)} alt="" />
            <button type="button" className="gallery-images-field__remove" onClick={() => handleRemove(i)}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        ))}
        <button
          type="button"
          className="gallery-images-field__add"
          onClick={() => !uploading && inputRef.current.click()}
          disabled={uploading}
        >
          <i className={`fa-solid ${uploading ? 'fa-spinner fa-spin' : 'fa-plus'}`}></i>
          <span>{uploading ? 'Uploading...' : 'Add Images'}</span>
        </button>
      </div>
      <input ref={inputRef} type="file" accept="image/*" multiple onChange={handleAdd} style={{ display: 'none' }} />
    </div>
  )
}

export default GalleryImagesField
