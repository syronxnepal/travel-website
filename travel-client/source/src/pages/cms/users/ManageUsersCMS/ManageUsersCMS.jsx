import { useState, useEffect } from 'react'
import DataTable from '../../../../components/common/DataTable/DataTable'
import DeleteConfirmationModal from '../../../../components/common/DeleteConfirmationModal/DeleteConfirmationModal'
import StatusBadge from '../../../../components/common/StatusBadge/StatusBadge'
import { usersApi } from '../../../../services/api'
import { useToast } from '../../../../context/ToastContext'
import { formatDate } from '../../../../utils/helpers'

function ManageUsersCMS() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const toast = useToast()

  function load() {
    setLoading(true)
    usersApi.getAll().then((res) => setUsers(res?.data || res || [])).finally(() => setLoading(false))
  }

  useEffect(load, [])

  async function handleDelete() {
    try {
      await usersApi.delete(deleteTarget._id)
      toast.success('User deleted.')
      setDeleteTarget(null)
      load()
    } catch (err) { toast.error(err.message) }
  }

  async function toggleStatus(user) {
    try {
      const newStatus = user.status === 'active' ? 'inactive' : 'active'
      await usersApi.update(user._id, { status: newStatus })
      toast.success(`User ${newStatus}.`)
      setUsers((prev) => prev.map((u) => u._id === user._id ? { ...u, status: newStatus } : u))
    } catch (err) { toast.error(err.message) }
  }

  return (
    <div className="users-cms cms-page">
      <div className="cms-page__header">
        <h1>Manage Users</h1>
        <p>{users.length} users</p>
      </div>

      <DataTable
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'email', label: 'Email' },
          { key: 'role', label: 'Role' },
          { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v || 'active'} /> },
          { key: 'createdAt', label: 'Joined', render: (v) => v ? formatDate(v) : '—' },
        ]}
        data={users}
        loading={loading}
        onEdit={(row) => toggleStatus(row)}
        onDelete={(row) => setDeleteTarget(row)}
      />

      <DeleteConfirmationModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete User"
        message={`Delete user "${deleteTarget?.name}"? This action cannot be undone.`}
      />
    </div>
  )
}

export default ManageUsersCMS
