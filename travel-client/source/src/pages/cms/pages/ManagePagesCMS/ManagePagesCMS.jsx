import { useState, useEffect } from 'react'
import DataTable from '../../../../components/common/DataTable/DataTable'
import Modal from '../../../../components/common/Modal/Modal'
import RichTextEditor from '../../../../components/common/RichTextEditor/RichTextEditor'
import { pagesApi } from '../../../../services/api'
import { useToast } from '../../../../context/ToastContext'

function ManagePagesCMS() {
  const [pages, setPages] = useState([])
  const [loading, setLoading] = useState(true)
  const [editTarget, setEditTarget] = useState(null)
  const [saving, setSaving] = useState(false)
  const toast = useToast()

  function load() {
    setLoading(true)
    pagesApi.getAll().then((res) => setPages(res?.data || res || [])).finally(() => setLoading(false))
  }

  useEffect(load, [])

  async function handleSave() {
    setSaving(true)
    try {
      await pagesApi.update(editTarget._id, editTarget)
      toast.success('Page saved.')
      setEditTarget(null)
      load()
    } catch (err) { toast.error(err.message) }
    finally { setSaving(false) }
  }

  return (
    <div className="pages-cms cms-page">
      <div className="cms-page__header">
        <h1>Manage Pages</h1>
        <p>{pages.length} pages</p>
      </div>

      <DataTable
        columns={[
          { key: 'title', label: 'Page Title' },
          { key: 'slug', label: 'Slug' },
          { key: 'updatedAt', label: 'Last Updated', render: (v) => v ? new Date(v).toLocaleDateString() : '—' },
        ]}
        data={pages}
        loading={loading}
        onEdit={(row) => setEditTarget({ ...row })}
      />

      <Modal isOpen={!!editTarget} onClose={() => setEditTarget(null)} title={`Edit: ${editTarget?.title || ''}`} size="xl">
        {editTarget && (
          <div>
            <div className="form-field"><label>Page Title</label><input type="text" value={editTarget.title || ''} onChange={(e) => setEditTarget({ ...editTarget, title: e.target.value })} /></div>
            <div className="form-field"><label>Meta Description</label><textarea value={editTarget.metaDescription || ''} onChange={(e) => setEditTarget({ ...editTarget, metaDescription: e.target.value })} rows={2} /></div>
            <div className="form-field">
              <label>Content</label>
              <RichTextEditor value={editTarget.content || ''} onChange={(v) => setEditTarget({ ...editTarget, content: v })} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 20 }}>
              <button className="btn btn--outline" onClick={() => setEditTarget(null)}>Cancel</button>
              <button className="btn btn--primary" onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : 'Save Page'}</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default ManagePagesCMS
