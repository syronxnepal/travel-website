import { useState, useEffect } from 'react'
import { contactPageSectionsApi, contactsApi } from '../../../../services/api'
import { useToast } from '../../../../context/ToastContext'
import DataTable from '../../../../components/common/DataTable/DataTable'
import DeleteConfirmationModal from '../../../../components/common/DeleteConfirmationModal/DeleteConfirmationModal'

const EMPTY_LINK_FORM = { platform: '', url: '', icon: '', order: 0 }

function ContactInfoCMS() {
  const [info, setInfo] = useState({ address: '', phone: '', email: '', contactHours: '' })
  const [loadingInfo, setLoadingInfo] = useState(true)
  const [savingInfo, setSavingInfo] = useState(false)

  const [links, setLinks] = useState([])
  const [loadingLinks, setLoadingLinks] = useState(true)
  const [linkEditTarget, setLinkEditTarget] = useState(null)
  const [linkDeleteTarget, setLinkDeleteTarget] = useState(null)
  const [linkForm, setLinkForm] = useState(EMPTY_LINK_FORM)
  const [savingLink, setSavingLink] = useState(false)

  const toast = useToast()

  function loadInfo() {
    setLoadingInfo(true)
    contactPageSectionsApi.getByKey('contact-info-section')
      .then((res) => {
        const data = res?.data || res || {}
        setInfo({ address: data.address || '', phone: data.phone || '', email: data.email || '', contactHours: data.contactHours || '' })
      })
      .catch(() => toast.error('Failed to load contact info.'))
      .finally(() => setLoadingInfo(false))
  }

  function loadLinks() {
    setLoadingLinks(true)
    contactsApi.getSocialLinks()
      .then((res) => setLinks(res?.data || res || []))
      .finally(() => setLoadingLinks(false))
  }

  useEffect(() => { loadInfo(); loadLinks() }, [])

  async function handleSaveInfo(e) {
    e.preventDefault()
    setSavingInfo(true)
    try {
      await contactPageSectionsApi.update('contact-info-section', { heading: 'Get in Touch', ...info })
      toast.success('Contact info saved.')
    } catch (err) { toast.error(err.message) }
    finally { setSavingInfo(false) }
  }

  function startEditLink(link) {
    setLinkEditTarget(link)
    setLinkForm({ platform: link.platform || '', url: link.url || '', icon: link.icon || '', order: link.order || 0 })
  }

  function cancelEditLink() {
    setLinkEditTarget(null)
    setLinkForm(EMPTY_LINK_FORM)
  }

  async function handleSaveLink(e) {
    e.preventDefault()
    setSavingLink(true)
    try {
      if (linkEditTarget) {
        await contactsApi.updateSocialLink(linkEditTarget._id || linkEditTarget.id, linkForm)
        toast.success('Social link updated.')
      } else {
        await contactsApi.createSocialLink(linkForm)
        toast.success('Social link added.')
      }
      cancelEditLink()
      loadLinks()
    } catch (err) { toast.error(err.message) }
    finally { setSavingLink(false) }
  }

  async function handleDeleteLink() {
    try {
      await contactsApi.deleteSocialLink(linkDeleteTarget._id || linkDeleteTarget.id)
      toast.success('Deleted.')
      setLinkDeleteTarget(null)
      loadLinks()
    } catch (err) { toast.error(err.message) }
  }

  return (
    <div className="contact-info-cms cms-page">
      <div className="cms-page__header"><h1>Contact Information</h1></div>

      {loadingInfo ? <div className="loading-spinner" /> : (
        <form className="cms-section" onSubmit={handleSaveInfo}>
          <div className="form-field"><label>Address</label><input type="text" value={info.address} onChange={(e) => setInfo({ ...info, address: e.target.value })} /></div>
          <div className="form-field"><label>Phone Number</label><input type="text" value={info.phone} onChange={(e) => setInfo({ ...info, phone: e.target.value })} /></div>
          <div className="form-field"><label>Email</label><input type="text" value={info.email} onChange={(e) => setInfo({ ...info, email: e.target.value })} /></div>
          <div className="form-field"><label>Office Hours</label><textarea rows={3} value={info.contactHours} onChange={(e) => setInfo({ ...info, contactHours: e.target.value })} placeholder={'Monday - Friday: 09:00 - 17:00\nSaturday, Sunday: 09:00 - 15:00'} /></div>
          <button type="submit" className="btn btn--primary" disabled={savingInfo}>{savingInfo ? 'Saving...' : 'Save Contact Info'}</button>
        </form>
      )}

      <div className="cms-page__header" style={{ marginTop: 32 }}><h1>Social Links</h1></div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 24, alignItems: 'start' }}>
        <DataTable
          columns={[
            { key: 'platform', label: 'Platform' },
            { key: 'url', label: 'URL' },
            { key: 'order', label: 'Order' },
          ]}
          data={links}
          loading={loadingLinks}
          onEdit={startEditLink}
          onDelete={(row) => setLinkDeleteTarget(row)}
        />
        <div className="cms-section">
          <h3>{linkEditTarget ? 'Edit Link' : 'Add Link'}</h3>
          <form onSubmit={handleSaveLink}>
            <div className="form-field"><label>Platform *</label><input type="text" value={linkForm.platform} onChange={(e) => setLinkForm({ ...linkForm, platform: e.target.value })} placeholder="Facebook" required /></div>
            <div className="form-field"><label>URL *</label><input type="text" value={linkForm.url} onChange={(e) => setLinkForm({ ...linkForm, url: e.target.value })} placeholder="https://facebook.com/..." required /></div>
            <div className="form-field"><label>Icon (FontAwesome class)</label><input type="text" value={linkForm.icon} onChange={(e) => setLinkForm({ ...linkForm, icon: e.target.value })} placeholder="fa-brands fa-facebook-f" /></div>
            <div className="form-field"><label>Order</label><input type="number" value={linkForm.order} onChange={(e) => setLinkForm({ ...linkForm, order: +e.target.value })} /></div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button type="submit" className="btn btn--primary" disabled={savingLink}>{savingLink ? 'Saving...' : linkEditTarget ? 'Update Link' : 'Add Link'}</button>
              {linkEditTarget && <button type="button" className="btn btn--outline" onClick={cancelEditLink}>Cancel</button>}
            </div>
          </form>
        </div>
      </div>

      <DeleteConfirmationModal isOpen={!!linkDeleteTarget} onClose={() => setLinkDeleteTarget(null)} onConfirm={handleDeleteLink} title="Delete Social Link" message={`Delete "${linkDeleteTarget?.platform}"?`} />
    </div>
  )
}

export default ContactInfoCMS
