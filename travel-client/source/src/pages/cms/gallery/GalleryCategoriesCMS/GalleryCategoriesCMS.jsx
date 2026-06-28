import { useState, useEffect } from 'react'
import DataTable from '../../../../components/common/DataTable/DataTable'
import DeleteConfirmationModal from '../../../../components/common/DeleteConfirmationModal/DeleteConfirmationModal'
import { galleryCategoriesApi } from '../../../../services/api'
import { useToast } from '../../../../context/ToastContext'
import { slugify } from '../../../../utils/helpers'

function GalleryCategoriesCMS() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [form, setForm] = useState({ name: '', slug: '' })
  const [saving, setSaving] = useState(false)
  const toast = useToast()

  function load() {
    setLoading(true)
    galleryCategoriesApi.getAll().then((res) => setCategories(res?.data || res || [])).finally(() => setLoading(false))
  }

  useEffect(load, [])

  async function handleAdd(e) {
    e.preventDefault()
    setSaving(true)
    try {
      await galleryCategoriesApi.create({ ...form, slug: form.slug || slugify(form.name) })
      toast.success('Category added.')
      setForm({ name: '', slug: '' })
      load()
    } catch (err) { toast.error(err.message) }
    finally { setSaving(false) }
  }

  async function handleDelete() {
    try {
      await galleryCategoriesApi.delete(deleteTarget._id)
      toast.success('Category deleted.')
      setDeleteTarget(null)
      load()
    } catch (err) { toast.error(err.message) }
  }

  return (
    <div className="gallery-categories-cms cms-page">
      <div className="cms-page__header"><h1>Gallery Categories</h1></div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24, alignItems: 'start' }}>
        <DataTable
          columns={[
            { key: 'name', label: 'Name' },
            { key: 'slug', label: 'Slug' },
          ]}
          data={categories}
          loading={loading}
          onDelete={(row) => setDeleteTarget(row)}
        />

        <div className="cms-section">
          <h3>Add Category</h3>
          <form onSubmit={handleAdd}>
            <div className="form-field">
              <label>Name *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value, slug: slugify(e.target.value) })}
                required
              />
            </div>
            <div className="form-field">
              <label>Slug</label>
              <input type="text" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
            </div>
            <button type="submit" className="btn btn--primary" disabled={saving}>{saving ? 'Adding...' : 'Add Category'}</button>
          </form>
        </div>
      </div>

      <DeleteConfirmationModal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} title="Delete Category" message={`Delete category "${deleteTarget?.name}"?`} />
    </div>
  )
}

export default GalleryCategoriesCMS
