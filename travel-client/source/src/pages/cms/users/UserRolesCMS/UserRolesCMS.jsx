import { useState, useEffect } from 'react'
import DataTable from '../../../../components/common/DataTable/DataTable'
import { usersApi } from '../../../../services/api'
import { useToast } from '../../../../context/ToastContext'

const ROLES = ['admin', 'editor', 'viewer']

function UserRolesCMS() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(null)
  const toast = useToast()

  useEffect(() => {
    usersApi.getAll().then((res) => setUsers(res?.data || res || [])).finally(() => setLoading(false))
  }, [])

  async function changeRole(user, role) {
    setSaving(user._id)
    try {
      await usersApi.update(user._id, { role })
      toast.success(`Role updated to "${role}".`)
      setUsers((prev) => prev.map((u) => u._id === user._id ? { ...u, role } : u))
    } catch (err) { toast.error(err.message) }
    finally { setSaving(null) }
  }

  return (
    <div className="user-roles-cms cms-page">
      <div className="cms-page__header">
        <h1>User Roles</h1>
        <p>Manage access levels</p>
      </div>

      <DataTable
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'email', label: 'Email' },
          {
            key: 'role',
            label: 'Role',
            render: (v, row) => (
              <select
                value={v || 'viewer'}
                disabled={saving === row._id}
                onChange={(e) => changeRole(row, e.target.value)}
                style={{ padding: '4px 8px', borderRadius: 4, border: '1px solid var(--color-border)' }}
              >
                {ROLES.map((r) => <option key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</option>)}
              </select>
            ),
          },
        ]}
        data={users}
        loading={loading}
      />
    </div>
  )
}

export default UserRolesCMS
