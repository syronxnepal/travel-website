import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toursApi } from '../../../../services/api'
import { useToast } from '../../../../context/ToastContext'
import ImageUpload from '../../../../components/common/ImageUpload/ImageUpload'
import GalleryImagesField from '../../../../components/common/GalleryImagesField/GalleryImagesField'
import RichTextEditor from '../../../../components/common/RichTextEditor/RichTextEditor'
import RepeaterField from '../../../../components/common/RepeaterField/RepeaterField'
import StringRepeaterField from '../../../../components/common/StringRepeaterField/StringRepeaterField'
import '../../../../components/cms/CMSSection/CMSSection.css'
import './TourFormCMS.css'

const defaultForm = {
  title: '', category: '', price: '', duration: '', difficulty: '', location: '', groupSize: '',
  image: '', images: [], description: '', overview: '', highlights: [], includes: [], excludes: [], itinerary: [], faq: [], featured: false,
}

function TourFormCMS() {
  const { id } = useParams()
  const navigate = useNavigate()
  const toast = useToast()
  const [form, setForm] = useState(defaultForm)
  const [loading, setLoading] = useState(!!id)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (id) {
      toursApi.getById(id)
        .then((res) => setForm({ ...defaultForm, ...(res?.data || res) }))
        .finally(() => setLoading(false))
    }
  }, [id])

  function update(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    try {
      if (id) {
        await toursApi.update(id, form)
        toast.success('Tour updated.')
      } else {
        await toursApi.create(form)
        toast.success('Tour created.')
      }
      navigate('/cms/tours/manage')
    } catch (err) {
      toast.error(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="loading-spinner" />

  return (
    <div className="tour-form-page cms-page">
      <div className="cms-page__header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>{id ? 'Edit Tour' : 'Add New Tour'}</h1>
        <button type="button" className="btn btn--outline" onClick={() => navigate('/cms/tours/manage')}>
          <i className="fa-solid fa-arrow-left"></i> Back
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="tour-form-page__grid">
          <div className="tour-form-page__main">
            <div className="cms-section">
              <h3>Basic Information</h3>
              <div className="form-field"><label>Title *</label><input type="text" value={form.title} onChange={(e) => update('title', e.target.value)} required /></div>
              <div className="tour-form-page__row">
                <div className="form-field">
                  <label>Category</label>
                  <select value={form.category} onChange={(e) => update('category', e.target.value)}>
                    <option value="">Select</option>
                    <option value="adventure">Adventure</option>
                    <option value="cultural">Cultural</option>
                    <option value="historical">Historical</option>
                    <option value="nature">Nature</option>
                  </select>
                </div>
                <div className="form-field"><label>Price (USD)</label><input type="number" value={form.price} onChange={(e) => update('price', +e.target.value)} /></div>
                <div className="form-field"><label>Duration</label><input type="text" value={form.duration} onChange={(e) => update('duration', e.target.value)} placeholder="e.g. 7 Days / 6 Nights" /></div>
              </div>
              <div className="tour-form-page__row">
                <div className="form-field">
                  <label>Difficulty</label>
                  <select value={form.difficulty} onChange={(e) => update('difficulty', e.target.value)}>
                    <option value="">Select</option>
                    <option value="easy">Easy</option>
                    <option value="moderate">Moderate</option>
                    <option value="hard">Hard</option>
                    <option value="challenging">Challenging</option>
                    <option value="strenuous">Strenuous</option>
                  </select>
                </div>
                <div className="form-field"><label>Location</label><input type="text" value={form.location} onChange={(e) => update('location', e.target.value)} /></div>
                <div className="form-field"><label>Max Group Size</label><input type="number" value={form.groupSize} onChange={(e) => update('groupSize', +e.target.value)} /></div>
              </div>
              <div className="form-field" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <input type="checkbox" id="featured" checked={form.featured} onChange={(e) => update('featured', e.target.checked)} />
                <label htmlFor="featured">Featured Tour</label>
              </div>
            </div>

            <div className="cms-section" style={{ marginTop: 20 }}>
              <h3>Description & Overview</h3>
              <div className="form-field"><label>Short Description</label><textarea value={form.description} onChange={(e) => update('description', e.target.value)} rows={3} /></div>
              <div className="form-field"><label>Full Overview</label><RichTextEditor value={form.overview} onChange={(v) => update('overview', v)} /></div>
            </div>

            <div className="cms-section" style={{ marginTop: 20 }}>
              <h3>Highlights & Includes</h3>
              <StringRepeaterField label="Highlights" items={form.highlights} onChange={(v) => update('highlights', v)} placeholder="Add highlight..." addLabel="Add Highlight" />
              <StringRepeaterField label="What's Included" items={form.includes} onChange={(v) => update('includes', v)} placeholder="e.g. Airport transfers" addLabel="Add Inclusion" />
              <StringRepeaterField label="What's Not Included" items={form.excludes} onChange={(v) => update('excludes', v)} placeholder="e.g. International flights" addLabel="Add Exclusion" />
            </div>

            <div className="cms-section" style={{ marginTop: 20 }}>
              <h3>Itinerary</h3>
              <RepeaterField
                items={form.itinerary}
                onChange={(v) => update('itinerary', v)}
                defaultItem={{ day: 1, title: '', description: '' }}
                addLabel="Add Day"
                renderItem={(item, index, updater) => (
                  <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 12 }}>
                    <div className="form-field"><label>Day</label><input type="number" min="1" value={item.day || index + 1} onChange={(e) => updater({ day: +e.target.value })} /></div>
                    <div>
                      <div className="form-field"><label>Title</label><input type="text" value={item.title || ''} onChange={(e) => updater({ title: e.target.value })} /></div>
                      <div className="form-field"><label>Description</label><textarea value={item.description || ''} onChange={(e) => updater({ description: e.target.value })} rows={3} /></div>
                    </div>
                  </div>
                )}
              />
            </div>

            <div className="cms-section" style={{ marginTop: 20 }}>
              <h3>FAQ</h3>
              <RepeaterField
                items={form.faq}
                onChange={(v) => update('faq', v)}
                defaultItem={{ question: '', answer: '' }}
                addLabel="Add FAQ"
                renderItem={(item, index, updater) => (
                  <div>
                    <div className="form-field"><label>Question</label><input type="text" value={item.question || ''} onChange={(e) => updater({ question: e.target.value })} /></div>
                    <div className="form-field"><label>Answer</label><textarea value={item.answer || ''} onChange={(e) => updater({ answer: e.target.value })} rows={3} /></div>
                  </div>
                )}
              />
            </div>
          </div>

          <aside className="tour-form-page__sidebar">
            <div className="cms-section">
              <h3>Featured Image</h3>
              <ImageUpload value={form.image} onChange={(f) => update('image', f)} />
            </div>

            <div className="cms-section" style={{ marginTop: 20 }}>
              <h3>Gallery Images</h3>
              <GalleryImagesField images={form.images || []} onChange={(v) => update('images', v)} />
            </div>

            <div className="cms-section" style={{ marginTop: 20 }}>
              <h3>Actions</h3>
              <button type="submit" className="btn btn--primary" style={{ width: '100%', justifyContent: 'center' }} disabled={saving}>
                {saving ? 'Saving...' : id ? 'Update Tour' : 'Create Tour'}
              </button>
              <button type="button" className="btn btn--outline" style={{ width: '100%', justifyContent: 'center', marginTop: 12 }} onClick={() => navigate('/cms/tours/manage')}>
                Cancel
              </button>
            </div>
          </aside>
        </div>
      </form>
    </div>
  )
}

export default TourFormCMS
