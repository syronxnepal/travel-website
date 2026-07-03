import { useState, useEffect } from 'react'
import { aboutWhyChooseUsItemsApi, aboutPageSectionsApi } from '../../../../services/api'
import { useToast } from '../../../../context/ToastContext'
import DataTable from '../../../../components/common/DataTable/DataTable'
import DeleteConfirmationModal from '../../../../components/common/DeleteConfirmationModal/DeleteConfirmationModal'

const emptyForm = { heading: '', paragraph: '', icon: '', order: 0, isActive: true }

function AboutWhyChooseUsCMS() {
  const [intro, setIntro] = useState({ heading: '', paragraph: '' })
  const [loadingIntro, setLoadingIntro] = useState(true)
  const [savingIntro, setSavingIntro] = useState(false)

  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [editTarget, setEditTarget] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const toast = useToast()

  function loadIntro() {
    setLoadingIntro(true)
    aboutPageSectionsApi.getByKey('about-why-choose-us-section')
      .then((res) => {
        const data = res?.data || res || {}
        setIntro({ heading: data.heading || '', paragraph: data.paragraph || '' })
      })
      .catch(() => toast.error('Failed to load section heading.'))
      .finally(() => setLoadingIntro(false))
  }

  function load() {
    setLoading(true)
    aboutWhyChooseUsItemsApi.getAll().then((res) => setItems(res?.data || res || [])).finally(() => setLoading(false))
  }

  useEffect(() => { loadIntro(); load() }, [])

  async function handleSaveIntro(e) {
    e.preventDefault()
    setSavingIntro(true)
    try {
      await aboutPageSectionsApi.update('about-why-choose-us-section', intro)
      toast.success('Section heading saved.')
    } catch (err) { toast.error(err.message) }
    finally { setSavingIntro(false) }
  }

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
      <div className="cms-page__header"><h1>Why Choose Us Page</h1></div>

      {loadingIntro ? <div className="loading-spinner" /> : (
        <form className="cms-section" onSubmit={handleSaveIntro}>
          <h3>Section Heading</h3>
          <div className="form-field"><label>Heading</label><input type="text" value={intro.heading} onChange={(e) => setIntro({ ...intro, heading: e.target.value })} placeholder="What Sets Us Apart" /></div>
          <div className="form-field"><label>Paragraph</label><textarea value={intro.paragraph} onChange={(e) => setIntro({ ...intro, paragraph: e.target.value })} rows={3} placeholder="With over a decade of experience..." /></div>
          <button type="submit" className="btn btn--primary" disabled={savingIntro}>{savingIntro ? 'Saving...' : 'Save Heading'}</button>
        </form>
      )}

      <div className="cms-page__header" style={{ marginTop: 32 }}><h1>Reasons</h1></div>
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
