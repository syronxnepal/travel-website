import { useState, useEffect } from 'react'
import { aboutWhyChooseUsItemsApi } from '../../../../services/api'
import { useToast } from '../../../../context/ToastContext'
import DataTable from '../../../../components/common/DataTable/DataTable'
import DeleteConfirmationModal from '../../../../components/common/DeleteConfirmationModal/DeleteConfirmationModal'

const emptyForm = { heading: '', paragraph: '', icon: '', order: 0, isActive: true }

function AboutWhyChooseUsCMS() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [editTarget, setEditTarget] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const toast = useToast()

  function load() {
    setLoading(true)
    aboutWhyChooseUsItemsApi.getAll().then((res) => setItems(res?.data || res || [])).finally(() => setLoading(false))
  }

  useEffect(load, [])

  function startEdit(item) {
    setEditTarget(item)
    setForm({ heading: item.heading || '', paragraph: item.paragraph || '', icon: item.icon || '', order: item.order || 0, isActive: item.isActive !== false })
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
        await aboutWhyChooseUsItemsApi.update(editTarget._id || editTarget.id, form)
        toast.success('Reason updated.')
      } else {
        await aboutWhyChooseUsItemsApi.create(form)
        toast.success('Reason added.')
      }
      cancelEdit()
      load()
    } catch (err) { toast.error(err.message) }
    finally { setSaving(false) }
  }

  async function handleDelete() {
    try {
      await aboutWhyChooseUsItemsApi.delete(deleteTarget._id || deleteTarget.id)
      toast.success('Deleted.')
      setDeleteTarget(null)
      load()
    } catch (err) { toast.error(err.message) }
  }

  return (
    <div className="about-why-choose-us-cms cms-page">
      <div className="cms-page__header"><h1>About — Why Choose Us</h1></div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 24, alignItems: 'start' }}>
        <DataTable
          columns={[
            { key: 'heading', label: 'Heading' },
            { key: 'icon', label: 'Icon' },
            { key: 'order', label: 'Order' },
            { key: 'isActive', label: 'Active', render: (v) => (v ? 'Yes' : 'No') },
          ]}
          data={items}
          loading={loading}
          onEdit={startEdit}
          onDelete={(row) => setDeleteTarget(row)}
        />
        <div className="cms-section">
          <h3>{editTarget ? 'Edit Reason' : 'Add Reason'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-field"><label>Heading *</label><input type="text" value={form.heading} onChange={(e) => setForm({ ...form, heading: e.target.value })} required /></div>
            <div className="form-field"><label>Paragraph *</label><textarea value={form.paragraph} onChange={(e) => setForm({ ...form, paragraph: e.target.value })} rows={3} required /></div>
            <div className="form-field"><label>Icon (FontAwesome class) *</label><input type="text" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} placeholder="fa-shield-halved" required /></div>
            <div className="form-field"><label>Order</label><input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: +e.target.value })} /></div>
            <div className="form-field">
              <label><input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} style={{ width: 'auto', marginRight: 8 }} />Active</label>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button type="submit" className="btn btn--primary" disabled={saving}>{saving ? 'Saving...' : editTarget ? 'Update Reason' : 'Add Reason'}</button>
              {editTarget && <button type="button" className="btn btn--outline" onClick={cancelEdit}>Cancel</button>}
            </div>
          </form>
        </div>
      </div>
      <DeleteConfirmationModal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} title="Delete Reason" message={`Delete "${deleteTarget?.heading}"?`} />
    </div>
  )
}

export default AboutWhyChooseUsCMS
