import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { treksApi } from '../../../../services/api'
import { useToast } from '../../../../context/ToastContext'
import ImageUpload from '../../../../components/common/ImageUpload/ImageUpload'
import RichTextEditor from '../../../../components/common/RichTextEditor/RichTextEditor'
import RepeaterField from '../../../../components/common/RepeaterField/RepeaterField'
import StringRepeaterField from '../../../../components/common/StringRepeaterField/StringRepeaterField'
import '../../tours/TourFormCMS/TourFormCMS.css'

const defaultForm = {
  title: '', category: '', price: '', duration: '', difficulty: '', maxAltitude: '', bestSeason: '', location: '', groupSize: '',
  image: '', description: '', overview: '', highlights: [], includes: [], excludes: [], itinerary: [], faq: [], featured: false,
}

function TrekFormCMS() {
  const { id } = useParams()
  const navigate = useNavigate()
  const toast = useToast()
  const [form, setForm] = useState(defaultForm)
  const [loading, setLoading] = useState(!!id)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (id) {
      treksApi.getById(id).then((res) => setForm({ ...defaultForm, ...(res?.data || res) })).finally(() => setLoading(false))
    }
  }, [id])

  function update(key, value) { setForm((p) => ({ ...p, [key]: value })) }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    try {
      if (id) { await treksApi.update(id, form); toast.success('Trek updated.') }
      else { await treksApi.create(form); toast.success('Trek created.') }
      navigate('/cms/treks/manage')
    } catch (err) { toast.error(err.message) }
    finally { setSaving(false) }
  }

  if (loading) return <div className="loading-spinner" />

  return (
    <div className="trek-form-page cms-page">
      <div className="cms-page__header" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>{id ? 'Edit Trek' : 'Add New Trek'}</h1>
        <button type="button" className="btn btn--outline" onClick={() => navigate('/cms/treks/manage')}><i className="fa-solid fa-arrow-left"></i> Back</button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="tour-form-page__grid">
          <div className="tour-form-page__main">
            <div className="cms-section">
              <h3>Basic Information</h3>
              <div className="form-field"><label>Title *</label><input type="text" value={form.title} onChange={(e) => update('title', e.target.value)} required /></div>
              <div className="tour-form-page__row">
                <div className="form-field"><label>Price (USD)</label><input type="number" value={form.price} onChange={(e) => update('price', +e.target.value)} /></div>
                <div className="form-field"><label>Duration</label><input type="text" value={form.duration} onChange={(e) => update('duration', e.target.value)} /></div>
                <div className="form-field"><label>Max Altitude</label><input type="text" value={form.maxAltitude} onChange={(e) => update('maxAltitude', e.target.value)} /></div>
              </div>
              <div className="tour-form-page__row">
                <div className="form-field"><label>Difficulty</label><select value={form.difficulty} onChange={(e) => update('difficulty', e.target.value)}><option value="">Select</option><option>easy</option><option>moderate</option><option>hard</option><option>strenuous</option></select></div>
                <div className="form-field"><label>Best Season</label><input type="text" value={form.bestSeason} onChange={(e) => update('bestSeason', e.target.value)} /></div>
                <div className="form-field"><label>Max Group Size</label><input type="number" value={form.groupSize} onChange={(e) => update('groupSize', +e.target.value)} /></div>
              </div>
            </div>

            <div className="cms-section" style={{ marginTop: 20 }}>
              <h3>Content</h3>
              <div className="form-field"><label>Short Description</label><textarea value={form.description} onChange={(e) => update('description', e.target.value)} rows={3} /></div>
              <div className="form-field"><label>Full Overview</label><RichTextEditor value={form.overview} onChange={(v) => update('overview', v)} /></div>
            </div>

            <div className="cms-section" style={{ marginTop: 20 }}>
              <h3>Highlights & Details</h3>
              <StringRepeaterField label="Highlights" items={form.highlights} onChange={(v) => update('highlights', v)} addLabel="Add Highlight" />
              <StringRepeaterField label="Included" items={form.includes} onChange={(v) => update('includes', v)} addLabel="Add Inclusion" />
              <StringRepeaterField label="Not Included" items={form.excludes} onChange={(v) => update('excludes', v)} addLabel="Add Exclusion" />
            </div>

            <div className="cms-section" style={{ marginTop: 20 }}>
              <h3>Itinerary</h3>
              <RepeaterField items={form.itinerary} onChange={(v) => update('itinerary', v)} defaultItem={{ day: 1, title: '', description: '' }} addLabel="Add Day" renderItem={(item, i, upd) => (
                <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 12 }}>
                  <div className="form-field"><label>Day</label><input type="number" value={item.day || i + 1} onChange={(e) => upd({ day: +e.target.value })} /></div>
                  <div>
                    <div className="form-field"><label>Title</label><input type="text" value={item.title || ''} onChange={(e) => upd({ title: e.target.value })} /></div>
                    <div className="form-field"><label>Description</label><textarea value={item.description || ''} onChange={(e) => upd({ description: e.target.value })} rows={2} /></div>
                  </div>
                </div>
              )} />
            </div>
          </div>

          <aside className="tour-form-page__sidebar">
            <div className="cms-section">
              <h3>Featured Image</h3>
              <ImageUpload value={form.image} onChange={(f) => update('image', f)} />
            </div>
            <div className="cms-section" style={{ marginTop: 20 }}>
              <h3>Actions</h3>
              <button type="submit" className="btn btn--primary" style={{ width: '100%', justifyContent: 'center' }} disabled={saving}>{saving ? 'Saving...' : id ? 'Update Trek' : 'Create Trek'}</button>
            </div>
          </aside>
        </div>
      </form>
    </div>
  )
}

export default TrekFormCMS
