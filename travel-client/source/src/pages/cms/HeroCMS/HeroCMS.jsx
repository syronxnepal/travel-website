import { useState, useEffect } from 'react'
import { heroSlidersApi } from '../../../services/api'
import { useToast } from '../../../context/ToastContext'
import DataTable from '../../../components/common/DataTable/DataTable'
import DeleteConfirmationModal from '../../../components/common/DeleteConfirmationModal/DeleteConfirmationModal'
import ImageUpload from '../../../components/common/ImageUpload/ImageUpload'
import '../../../components/cms/CMSSection/CMSSection.css'

const emptyForm = { title: '', paragraph: '', image: '', order: 0, isActive: true }

function HeroCMS() {
  const [slides, setSlides] = useState([])
  const [loading, setLoading] = useState(true)
  const [editTarget, setEditTarget] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const toast = useToast()

  function load() {
    setLoading(true)
    heroSlidersApi.getAll().then((res) => setSlides(res?.data || res || [])).finally(() => setLoading(false))
  }

  useEffect(load, [])

  function startEdit(slide) {
    setEditTarget(slide)
    setForm({ title: slide.title || '', paragraph: slide.paragraph || '', image: slide.image || '', order: slide.order || 0, isActive: slide.isActive !== false })
  }

  function cancelEdit() {
    setEditTarget(null)
    setForm(emptyForm)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    try {
      if (editTarget) {
        await heroSlidersApi.update(editTarget._id || editTarget.id, form)
        toast.success('Slide updated.')
      } else {
        await heroSlidersApi.create(form)
        toast.success('Slide added.')
      }
      cancelEdit()
      load()
    } catch (err) { toast.error(err.message) }
    finally { setSaving(false) }
  }

  async function handleDelete() {
    try {
      await heroSlidersApi.delete(deleteTarget._id || deleteTarget.id)
      toast.success('Deleted.')
      setDeleteTarget(null)
      load()
    } catch (err) { toast.error(err.message) }
  }

  return (
    <div className="hero-cms cms-page">
      <div className="cms-page__header"><h1>Hero Carousel</h1></div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 24, alignItems: 'start' }}>
        <DataTable
          columns={[
            { key: 'title', label: 'Title' },
            { key: 'order', label: 'Order' },
            { key: 'isActive', label: 'Active', render: (v) => (v ? 'Yes' : 'No') },
          ]}
          data={slides}
          loading={loading}
          onEdit={startEdit}
          onDelete={(row) => setDeleteTarget(row)}
        />
        <div className="cms-section">
          <h3>{editTarget ? 'Edit Slide' : 'Add Slide'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-field"><label>Title *</label><input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required /></div>
            <div className="form-field"><label>Paragraph</label><textarea value={form.paragraph} onChange={(e) => setForm({ ...form, paragraph: e.target.value })} rows={3} /></div>
            <div className="form-field"><label>Background Image *</label><ImageUpload value={form.image} onChange={(f) => setForm({ ...form, image: f })} /></div>
            <div className="form-field"><label>Order</label><input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: +e.target.value })} /></div>
            <div className="form-field">
              <label><input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} style={{ width: 'auto', marginRight: 8 }} />Active</label>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button type="submit" className="btn btn--primary" disabled={saving}>{saving ? 'Saving...' : editTarget ? 'Update Slide' : 'Add Slide'}</button>
              {editTarget && <button type="button" className="btn btn--outline" onClick={cancelEdit}>Cancel</button>}
            </div>
          </form>
        </div>
      </div>
      <DeleteConfirmationModal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} title="Delete Slide" message={`Delete slide "${deleteTarget?.title}"?`} />
    </div>
  )
}

export default HeroCMS
