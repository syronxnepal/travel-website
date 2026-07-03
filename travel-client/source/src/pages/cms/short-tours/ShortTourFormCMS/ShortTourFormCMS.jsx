import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { shortToursApi } from '../../../../services/api'
import { useToast } from '../../../../context/ToastContext'
import ImageUpload from '../../../../components/common/ImageUpload/ImageUpload'
import GalleryImagesField from '../../../../components/common/GalleryImagesField/GalleryImagesField'
import RichTextEditor from '../../../../components/common/RichTextEditor/RichTextEditor'
import StringRepeaterField from '../../../../components/common/StringRepeaterField/StringRepeaterField'
import '../../tours/TourFormCMS/TourFormCMS.css'

const defaultForm = { title: '', category: '', price: '', duration: '', location: '', image: '', images: [], description: '', overview: '', highlights: [], includes: [], excludes: [] }

function ShortTourFormCMS() {
  const { id } = useParams()
  const navigate = useNavigate()
  const toast = useToast()
  const [form, setForm] = useState(defaultForm)
  const [loading, setLoading] = useState(!!id)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (id) shortToursApi.getById(id).then((res) => setForm({ ...defaultForm, ...(res?.data || res) })).finally(() => setLoading(false))
  }, [id])

  function update(key, value) { setForm((p) => ({ ...p, [key]: value })) }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    try {
      if (id) { await shortToursApi.update(id, form); toast.success('Updated.') }
      else { await shortToursApi.create(form); toast.success('Created.') }
      navigate('/cms/tours/manage-short')
    } catch (err) { toast.error(err.message) }
    finally { setSaving(false) }
  }

  if (loading) return <div className="loading-spinner" />

  return (
    <div className="short-tour-cms cms-page">
      <div className="cms-page__header" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>{id ? 'Edit Short Tour' : 'Add Short Tour'}</h1>
        <button type="button" className="btn btn--outline" onClick={() => navigate('/cms/tours/manage-short')}><i className="fa-solid fa-arrow-left"></i> Back</button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="tour-form-page__grid">
          <div>
            <div className="cms-section">
              <div className="form-field"><label>Title *</label><input type="text" value={form.title} onChange={(e) => update('title', e.target.value)} required /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                <div className="form-field"><label>Category</label><select value={form.category} onChange={(e) => update('category', e.target.value)}><option value="">Select</option><option value="day-trips">Day Trips</option><option value="weekend">Weekend</option><option value="3-5-days">3–5 Days</option></select></div>
                <div className="form-field"><label>Price (USD)</label><input type="number" value={form.price} onChange={(e) => update('price', +e.target.value)} /></div>
                <div className="form-field"><label>Duration</label><input type="text" value={form.duration} onChange={(e) => update('duration', e.target.value)} /></div>
              </div>
              <div className="form-field"><label>Location</label><input type="text" value={form.location} onChange={(e) => update('location', e.target.value)} /></div>
              <div className="form-field"><label>Description</label><textarea value={form.description} onChange={(e) => update('description', e.target.value)} rows={3} /></div>
              <div className="form-field"><label>Overview</label><RichTextEditor value={form.overview} onChange={(v) => update('overview', v)} /></div>
              <StringRepeaterField label="Highlights" items={form.highlights} onChange={(v) => update('highlights', v)} addLabel="Add Highlight" />
              <StringRepeaterField label="Includes" items={form.includes} onChange={(v) => update('includes', v)} addLabel="Add" />
              <StringRepeaterField label="Excludes" items={form.excludes} onChange={(v) => update('excludes', v)} addLabel="Add" />
            </div>
          </div>
          <aside className="tour-form-page__sidebar">
            <div className="cms-section">
              <h3>Image</h3>
              <ImageUpload value={form.image} onChange={(f) => update('image', f)} />
            </div>
            <div className="cms-section" style={{ marginTop: 20 }}>
              <h3>Gallery Images</h3>
              <GalleryImagesField images={form.images || []} onChange={(v) => update('images', v)} />
            </div>
            <div className="cms-section" style={{ marginTop: 20 }}>
              <button type="submit" className="btn btn--primary" style={{ width: '100%', justifyContent: 'center' }} disabled={saving}>{saving ? 'Saving...' : id ? 'Update' : 'Create'}</button>
            </div>
          </aside>
        </div>
      </form>
    </div>
  )
}

export default ShortTourFormCMS
