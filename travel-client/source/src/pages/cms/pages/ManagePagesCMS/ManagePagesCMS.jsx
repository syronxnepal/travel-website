import { useState, useEffect } from 'react'
import Modal from '../../../../components/common/Modal/Modal'
import ImageUpload from '../../../../components/common/ImageUpload/ImageUpload'
import { pagesApi } from '../../../../services/api'
import { useToast } from '../../../../context/ToastContext'

// These are the only pageType values the backend accepts. Home page and item
// detail pages aren't listed here — home has its own Hero Slider CMS, and
// detail pages use the trek/tour/blog's own title + featured image instead.
const PAGE_TYPES = [
  { type: 'about', label: 'About Us' },
  { type: 'about-our-story', label: 'Our Story' },
  { type: 'about-why-choose-us', label: 'Why Choose Us' },
  { type: 'contact', label: 'Contact' },
  { type: 'trek-listing', label: 'Trekking Listing' },
  { type: 'tour-listing', label: 'Tours Listing' },
  { type: 'short-tour-listing', label: 'Short Tours Listing' },
  { type: 'gallery', label: 'Gallery' },
  { type: 'blogs', label: 'Blogs' },
  { type: 'custom-listing', label: 'Custom Packages' },
]

const emptyForm = { topTitle: '', heading: '', image: '', status: 'published' }

function ManagePagesCMS() {
  const [pages, setPages] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingType, setEditingType] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const toast = useToast()

  function load() {
    setLoading(true)
    pagesApi.getAll().then((res) => setPages(res?.data || res || [])).finally(() => setLoading(false))
  }

  useEffect(load, [])

  function findPage(type) {
    return pages.find((p) => p.pageType === type)
  }

  function startEdit(type) {
    const existing = findPage(type)
    setForm({
      topTitle: existing?.topTitle || '',
      heading: existing?.heading || '',
      image: existing?.image || '',
      status: existing?.status || 'published',
    })
    setEditingType(type)
  }

  async function handleSave() {
    if (!form.heading || !form.image || !form.topTitle) {
      toast.error('Subtitle, title, and image are all required.')
      return
    }
    setSaving(true)
    try {
      const existing = findPage(editingType)
      if (existing) {
        await pagesApi.update(existing._id || existing.id, form)
      } else {
        await pagesApi.create({ pageType: editingType, ...form })
      }
      toast.success('Page saved.')
      setEditingType(null)
      load()
    } catch (err) { toast.error(err.message) }
    finally { setSaving(false) }
  }

  const editingLabel = PAGE_TYPES.find((p) => p.type === editingType)?.label

  return (
    <div className="pages-cms cms-page">
      <div className="cms-page__header">
        <h1>Pages</h1>
        <p>Set the title, subtitle, and banner image shown at the top of each page below. The homepage (its own Hero Slider) and item detail pages (which use their own title and featured image) aren't managed here.</p>
      </div>

      <div className="data-table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Page</th>
              <th>Title</th>
              <th>Subtitle</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="data-table__empty"><div className="loading-spinner" /></td></tr>
            ) : (
              PAGE_TYPES.map(({ type, label }) => {
                const existing = findPage(type)
                return (
                  <tr key={type}>
                    <td>{label}</td>
                    <td>{existing?.heading || <em style={{ color: 'var(--color-text-light)' }}>Not configured</em>}</td>
                    <td>{existing?.topTitle || '—'}</td>
                    <td>{existing ? (existing.status === 'published' ? 'Published' : 'Draft') : '—'}</td>
                    <td className="data-table__actions">
                      <button className="data-table__btn data-table__btn--edit" onClick={() => startEdit(type)} title="Edit">
                        <i className="fa-solid fa-pen"></i>
                      </button>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      <Modal isOpen={!!editingType} onClose={() => setEditingType(null)} title={`Edit: ${editingLabel || ''}`}>
        <div>
          <div className="form-field"><label>Subtitle *</label><input type="text" value={form.topTitle} onChange={(e) => setForm({ ...form, topTitle: e.target.value })} placeholder="e.g. EXPLORE THE HIMALAYAS" required /></div>
          <div className="form-field"><label>Title *</label><input type="text" value={form.heading} onChange={(e) => setForm({ ...form, heading: e.target.value })} required /></div>
          <div className="form-field"><label>Banner Image *</label><ImageUpload value={form.image} onChange={(f) => setForm({ ...form, image: f })} /></div>
          <div className="form-field">
            <label>Status</label>
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 20 }}>
            <button className="btn btn--outline" onClick={() => setEditingType(null)}>Cancel</button>
            <button className="btn btn--primary" onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : 'Save Page'}</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default ManagePagesCMS
