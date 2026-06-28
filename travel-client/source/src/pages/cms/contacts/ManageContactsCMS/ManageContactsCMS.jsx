import { useState, useEffect } from 'react'
import DataTable from '../../../../components/common/DataTable/DataTable'
import Modal from '../../../../components/common/Modal/Modal'
import DeleteConfirmationModal from '../../../../components/common/DeleteConfirmationModal/DeleteConfirmationModal'
import { contactsApi } from '../../../../services/api'
import { useToast } from '../../../../context/ToastContext'
import { formatDate } from '../../../../utils/helpers'

function ManageContactsCMS() {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [viewTarget, setViewTarget] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const toast = useToast()

  function load() {
    setLoading(true)
    contactsApi.getAll().then((res) => setContacts(res?.data || res || [])).finally(() => setLoading(false))
  }

  useEffect(load, [])

  async function handleDelete() {
    try {
      await contactsApi.delete(deleteTarget._id)
      toast.success('Contact deleted.')
      setDeleteTarget(null)
      load()
    } catch (err) { toast.error(err.message) }
  }

  return (
    <div className="contact-cms cms-page">
      <div className="cms-page__header"><h1>Contact Submissions</h1><p>{contacts.length} messages</p></div>

      <DataTable
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'email', label: 'Email' },
          { key: 'phone', label: 'Phone', render: (v) => v || '—' },
          { key: 'message', label: 'Message', render: (v) => v?.slice(0, 60) + '...' },
          { key: 'createdAt', label: 'Received', render: (v) => v ? formatDate(v) : '—' },
        ]}
        data={contacts}
        loading={loading}
        onView={(row) => setViewTarget(row)}
        onDelete={(row) => setDeleteTarget(row)}
      />

      <Modal isOpen={!!viewTarget} onClose={() => setViewTarget(null)} title="Contact Message">
        {viewTarget && (
          <div>
            <p><strong>From:</strong> {viewTarget.name} ({viewTarget.email})</p>
            {viewTarget.phone && <p><strong>Phone:</strong> {viewTarget.phone}</p>}
            <p style={{ marginTop: 16 }}>{viewTarget.message}</p>
          </div>
        )}
      </Modal>

      <DeleteConfirmationModal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} title="Delete Message" message={`Delete message from "${deleteTarget?.name}"?`} />
    </div>
  )
}

export default ManageContactsCMS
