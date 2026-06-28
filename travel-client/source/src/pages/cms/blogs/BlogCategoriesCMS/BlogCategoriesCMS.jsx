import { useState, useEffect } from 'react'
import { blogCategoriesApi } from '../../../../services/api'
import { useToast } from '../../../../context/ToastContext'
import DataTable from '../../../../components/common/DataTable/DataTable'
import DeleteConfirmationModal from '../../../../components/common/DeleteConfirmationModal/DeleteConfirmationModal'

function BlogCategoriesCMS() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [form, setForm] = useState({ name: '', slug: '' })
  const [saving, setSaving] = useState(false)
  const toast = useToast()

  function load() {
    setLoading(true)
    blogCategoriesApi.getAll().then((res) => setCategories(res?.data || res || [])).finally(() => setLoading(false))
  }

  useEffect(load, [])

  async function handleCreate(e) {
    e.preventDefault()
    setSaving(true)
    try {
      await blogCategoriesApi.create(form)
      toast.success('Category created.')
      setForm({ name: '', slug: '' })
      load()
    } catch (err) { toast.error(err.message) }
    finally { setSaving(false) }
  }

  async function handleDelete() {
    try {
      await blogCategoriesApi.delete(deleteTarget._id)
      toast.success('Category deleted.')
      setDeleteTarget(null)
      load()
    } catch (err) { toast.error(err.message) }
  }

  return (
    <div className="blog-cms cms-page">
      <div className="cms-page__header"><h1>Blog Categories</h1></div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 24, alignItems: 'start' }}>
        <DataTable
          columns={[{ key: 'name', label: 'Name' }, { key: 'slug', label: 'Slug' }]}
          data={categories}
          loading={loading}
          onDelete={(row) => setDeleteTarget(row)}
        />
        <div className="cms-section">
          <h3>Add Category</h3>
          <form onSubmit={handleCreate}>
            <div className="form-field"><label>Category Name *</label><input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></div>
            <div className="form-field"><label>Slug</label><input type="text" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="auto-generated" /></div>
            <button type="submit" className="btn btn--primary" disabled={saving}>{saving ? 'Adding...' : 'Add Category'}</button>
          </form>
        </div>
      </div>

      <DeleteConfirmationModal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} title="Delete Category" message={`Delete "${deleteTarget?.name}"?`} />
    </div>
  )
}

export default BlogCategoriesCMS
