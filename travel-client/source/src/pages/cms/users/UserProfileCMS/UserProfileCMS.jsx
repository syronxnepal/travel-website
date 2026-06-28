import { useState } from 'react'
import { authApi } from '../../../../services/api'
import { useAuth } from '../../../../context/AuthContext'
import { useToast } from '../../../../context/ToastContext'

function UserProfileCMS() {
  const { user, updateUser } = useAuth()
  const toast = useToast()
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '' })
  const [pwForm, setPwForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })
  const [saving, setSaving] = useState(false)
  const [savingPw, setSavingPw] = useState(false)

  async function handleProfile(e) {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await authApi.updateProfile(form)
      updateUser(res?.data || res)
      toast.success('Profile updated.')
    } catch (err) { toast.error(err.message) }
    finally { setSaving(false) }
  }

  async function handlePassword(e) {
    e.preventDefault()
    if (pwForm.newPassword !== pwForm.confirmPassword) { toast.error('Passwords do not match.'); return }
    setSavingPw(true)
    try {
      await authApi.changePassword({ currentPassword: pwForm.currentPassword, newPassword: pwForm.newPassword })
      toast.success('Password changed.')
      setPwForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
    } catch (err) { toast.error(err.message) }
    finally { setSavingPw(false) }
  }

  return (
    <div className="user-profile-cms cms-page">
      <div className="cms-page__header"><h1>My Profile</h1></div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'start' }}>
        <div className="cms-section">
          <h3>Account Details</h3>
          <form onSubmit={handleProfile}>
            <div className="form-field"><label>Full Name *</label><input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></div>
            <div className="form-field"><label>Email *</label><input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /></div>
            <button type="submit" className="btn btn--primary" disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</button>
          </form>
        </div>
        <div className="cms-section">
          <h3>Change Password</h3>
          <form onSubmit={handlePassword}>
            <div className="form-field"><label>Current Password *</label><input type="password" value={pwForm.currentPassword} onChange={(e) => setPwForm({ ...pwForm, currentPassword: e.target.value })} required /></div>
            <div className="form-field"><label>New Password *</label><input type="password" value={pwForm.newPassword} onChange={(e) => setPwForm({ ...pwForm, newPassword: e.target.value })} required /></div>
            <div className="form-field"><label>Confirm New Password *</label><input type="password" value={pwForm.confirmPassword} onChange={(e) => setPwForm({ ...pwForm, confirmPassword: e.target.value })} required /></div>
            <button type="submit" className="btn btn--primary" disabled={savingPw}>{savingPw ? 'Updating...' : 'Update Password'}</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UserProfileCMS
