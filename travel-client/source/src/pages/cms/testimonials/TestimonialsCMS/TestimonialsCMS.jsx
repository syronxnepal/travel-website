import { useState, useEffect } from 'react'
import { testimonialsApi } from '../../../../services/api'
import { useToast } from '../../../../context/ToastContext'
import DataTable from '../../../../components/common/DataTable/DataTable'
import DeleteConfirmationModal from '../../../../components/common/DeleteConfirmationModal/DeleteConfirmationModal'
import ImageUpload from '../../../../components/common/ImageUpload/ImageUpload'

function TestimonialsCMS() {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [form, setForm] = useState({ name: '', designation: '', location: '', review: '', rating: 5, avatar: '' })
  const [saving, setSaving] = useState(false)
  const toast = useToast()

  function load() {
    setLoading(true)
    testimonialsApi.getAll().then((res) => setTestimonials(res?.data || res || [])).finally(() => setLoading(false))
  }

  useEffect(load, [])

  async function handleCreate(e) {
    e.preventDefault()
    setSaving(true)
    try {
      await testimonialsApi.create(form)
      toast.success('Testimonial added.')
      setForm({ name: '', designation: '', location: '', review: '', rating: 5, avatar: '' })
      load()
    } catch (err) { toast.error(err.message) }
    finally { setSaving(false) }
  }

  async function handleDelete() {
    try {
      await testimonialsApi.delete(deleteTarget._id)
      toast.success('Deleted.')
      setDeleteTarget(null)
      load()
    } catch (err) { toast.error(err.message) }
  }

  return (
    <div className="testimonials-cms cms-page">
      <div className="cms-page__header"><h1>Testimonials</h1></div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 24, alignItems: 'start' }}>
        <DataTable
          columns={[{ key: 'name', label: 'Name' }, { key: 'designation', label: 'Role' }, { key: 'rating', label: 'Rating', render: (v) => `${v}/5` }, { key: 'review', label: 'Review', render: (v) => v?.slice(0, 60) + '...' }]}
          data={testimonials}
          loading={loading}
          onDelete={(row) => setDeleteTarget(row)}
        />
        <div className="cms-section">
          <h3>Add Testimonial</h3>
          <form onSubmit={handleCreate}>
            <div className="form-field"><label>Name *</label><input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></div>
            <div className="form-field"><label>Designation / Title</label><input type="text" value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })} /></div>
            <div className="form-field"><label>Location</label><input type="text" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} /></div>
            <div className="form-field"><label>Rating (1–5)</label><input type="number" min="1" max="5" value={form.rating} onChange={(e) => setForm({ ...form, rating: +e.target.value })} /></div>
            <div className="form-field"><label>Review *</label><textarea value={form.review} onChange={(e) => setForm({ ...form, review: e.target.value })} rows={4} required /></div>
            <div className="form-field"><label>Avatar</label><ImageUpload value={form.avatar} onChange={(f) => setForm({ ...form, avatar: f })} /></div>
            <button type="submit" className="btn btn--primary" disabled={saving}>{saving ? 'Adding...' : 'Add Testimonial'}</button>
          </form>
        </div>
      </div>
      <DeleteConfirmationModal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} title="Delete Testimonial" message={`Delete testimonial from "${deleteTarget?.name}"?`} />
    </div>
  )
}

export default TestimonialsCMS
