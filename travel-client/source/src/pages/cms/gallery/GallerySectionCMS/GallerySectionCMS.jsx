import { useState, useEffect } from 'react'
import DataTable from '../../../../components/common/DataTable/DataTable'
import Modal from '../../../../components/common/Modal/Modal'
import DeleteConfirmationModal from '../../../../components/common/DeleteConfirmationModal/DeleteConfirmationModal'
import ImageUpload from '../../../../components/common/ImageUpload/ImageUpload'
import { galleryApi, galleryCategoriesApi } from '../../../../services/api'
import { useToast } from '../../../../context/ToastContext'

const EMPTY_FORM = { title: '', category: '', image: '', alt: '' }

function GallerySectionCMS() {
  const [items, setItems] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [editTarget, setEditTarget] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [showAdd, setShowAdd] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const toast = useToast()

  function load() {
    setLoading(true)
    Promise.all([galleryApi.getAll(), galleryCategoriesApi.getAll()])
      .then(([g, c]) => { setItems(g?.data || g || []); setCategories(c?.data || c || []) })
      .finally(() => setLoading(false))
  }

  useEffect(load, [])

  async function handleSave() {
    setSaving(true)
    try {
      if (editTarget) {
        await galleryApi.update(editTarget._id, form)
        toast.success('Gallery item updated.')
      } else {
        await galleryApi.create(form)
        toast.success('Gallery item added.')
      }
      setEditTarget(null)
      setShowAdd(false)
      setForm(EMPTY_FORM)
      load()
    } catch (err) { toast.error(err.message) }
    finally { setSaving(false) }
  }

  async function handleDelete() {
    try {
      await galleryApi.delete(deleteTarget._id)
      toast.success('Deleted.')
      setDeleteTarget(null)
      load()
    } catch (err) { toast.error(err.message) }
  }

  function openEdit(row) {
    const cat = row.category
    const catVal = typeof cat === 'object' && cat !== null ? (cat.slug || cat.name || '') : (cat || '')
    setForm({ title: row.title || '', category: catVal, image: row.image || '', alt: row.alt || '' })
    setEditTarget(row)
  }

  const isOpen = !!editTarget || showAdd

  return (
    <div className="gallery-cms cms-page">
      <div className="cms-page__header">
        <h1>Gallery</h1>
        <button className="btn btn--primary" onClick={() => { setForm(EMPTY_FORM); setEditTarget(null); setShowAdd(true) }}>Add Image</button>
      </div>

      <DataTable
        columns={[
          { key: 'image', label: 'Image', render: (v) => v ? <img src={v} alt="" style={{ width: 60, height: 40, objectFit: 'cover', borderRadius: 4 }} /> : '—' },
          { key: 'title', label: 'Title' },
          { key: 'category', label: 'Category', render: (v) => typeof v === 'object' && v !== null ? (v.name || v.slug || '—') : (v || '—') },
        ]}
        data={items}
        loading={loading}
        onEdit={openEdit}
        onDelete={(row) => setDeleteTarget(row)}
      />

      <Modal isOpen={isOpen} onClose={() => { setEditTarget(null); setShowAdd(false) }} title={editTarget ? 'Edit Gallery Item' : 'Add Gallery Item'}>
        <div>
          <div className="form-field"><label>Title</label><input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
          <div className="form-field">
            <label>Category</label>
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              <option value="">All</option>
              {categories.map((c) => <option key={c._id} value={c.slug || c.name}>{c.name}</option>)}
            </select>
          </div>
          <div className="form-field"><label>Alt Text</label><input type="text" value={form.alt} onChange={(e) => setForm({ ...form, alt: e.target.value })} /></div>
          <div className="form-field"><label>Image</label><ImageUpload value={form.image} onChange={(f) => setForm({ ...form, image: f })} /></div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 20 }}>
            <button className="btn btn--outline" onClick={() => { setEditTarget(null); setShowAdd(false) }}>Cancel</button>
            <button className="btn btn--primary" onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
          </div>
        </div>
      </Modal>

      <DeleteConfirmationModal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} title="Delete Gallery Item" message={`Delete "${deleteTarget?.title || 'this item'}"?`} />
    </div>
  )
}

export default GallerySectionCMS
