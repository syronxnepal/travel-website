import { useState } from 'react'
import Header from '../../../components/common/Header/Header'
import Footer from '../../../components/common/Footer/Footer'
import PageHero from '../../../components/common/PageHero/PageHero'
import { useAuth } from '../../../context/AuthContext'
import { authApi } from '../../../services/api'
import { useToast } from '../../../context/ToastContext'
import './ProfilePage.css'

function ProfilePage() {
  const { user, updateUser } = useAuth()
  const toast = useToast()
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', phone: user?.phone || '' })
  const [pwForm, setPwForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })
  const [loading, setLoading] = useState(false)

  async function handleProfileUpdate(e) {
    e.preventDefault()
    setLoading(true)
    try {
      const updated = await authApi.updateProfile(form)
      updateUser(updated.user || updated.data || updated)
      toast.success('Profile updated successfully.')
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handlePasswordChange(e) {
    e.preventDefault()
    if (pwForm.newPassword !== pwForm.confirmPassword) {
      return toast.error('Passwords do not match.')
    }
    setLoading(true)
    try {
      await authApi.changePassword({ currentPassword: pwForm.currentPassword, newPassword: pwForm.newPassword })
      toast.success('Password changed successfully.')
      setPwForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="profile-page">
      <Header />
      <PageHero title="My Profile" breadcrumb="Home / Profile" />

      <section className="section">
        <div className="container">
          <div className="user-profile">
            <div className="user-profile__avatar">
              <div className="user-profile__avatar-placeholder">{user?.name?.charAt(0)?.toUpperCase()}</div>
              <h2>{user?.name}</h2>
              <p>{user?.email}</p>
              <span className="status-badge active">{user?.role}</span>
            </div>

            <div className="user-profile__forms">
              <div className="user-profile__section">
                <h3>Personal Information</h3>
                <form onSubmit={handleProfileUpdate}>
                  <div className="form-field"><label>Full Name</label><input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
                  <div className="form-field"><label>Email</label><input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
                  <div className="form-field"><label>Phone</label><input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
                  <button type="submit" className="btn btn--primary" disabled={loading}>Save Changes</button>
                </form>
              </div>

              <div className="user-profile__section">
                <h3>Change Password</h3>
                <form onSubmit={handlePasswordChange}>
                  <div className="form-field"><label>Current Password</label><input type="password" value={pwForm.currentPassword} onChange={(e) => setPwForm({ ...pwForm, currentPassword: e.target.value })} /></div>
                  <div className="form-field"><label>New Password</label><input type="password" value={pwForm.newPassword} onChange={(e) => setPwForm({ ...pwForm, newPassword: e.target.value })} /></div>
                  <div className="form-field"><label>Confirm New Password</label><input type="password" value={pwForm.confirmPassword} onChange={(e) => setPwForm({ ...pwForm, confirmPassword: e.target.value })} /></div>
                  <button type="submit" className="btn btn--primary" disabled={loading}>Update Password</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default ProfilePage
