import { useState, useEffect } from 'react'
import RichTextEditor from '../../common/RichTextEditor/RichTextEditor'
import ImageUpload from '../../common/ImageUpload/ImageUpload'
import StringRepeaterField from '../../common/StringRepeaterField/StringRepeaterField'
import { useToast } from '../../../context/ToastContext'
import './CMSSection.css'

function CMSSection({ title, onLoad, onSave, fields = [] }) {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const toast = useToast()

  useEffect(() => {
    onLoad()
      .then((res) => setData(res?.data || res || {}))
      .catch(() => toast.error('Failed to load section data.'))
      .finally(() => setLoading(false))
  }, [])

  function update(key, value) {
    setData((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSave() {
    setSaving(true)
    try {
      await onSave(data)
      toast.success('Section saved successfully.')
    } catch (err) {
      toast.error(err.message || 'Failed to save.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="loading-spinner" />

  return (
    <div className="section-cms cms-page">
      <div className="cms-page__header">
        <h1>{title}</h1>
      </div>

      <div className="cms-section">
        {fields.map((field) => (
          <div key={field.key} className="form-field">
            <label>{field.label}</label>

            {field.type === 'text' && (
              <input type="text" value={data[field.key] || ''} onChange={(e) => update(field.key, e.target.value)} placeholder={field.placeholder} />
            )}

            {field.type === 'textarea' && (
              <textarea value={data[field.key] || ''} onChange={(e) => update(field.key, e.target.value)} rows={4} placeholder={field.placeholder} />
            )}

            {field.type === 'richtext' && (
              <RichTextEditor value={data[field.key] || ''} onChange={(val) => update(field.key, val)} />
            )}

            {field.type === 'image' && (
              <ImageUpload value={data[field.key] || ''} onChange={(file) => update(field.key, file)} label={`Upload ${field.label}`} />
            )}

            {field.type === 'list' && (
              <StringRepeaterField items={data[field.key] || []} onChange={(val) => update(field.key, val)} placeholder={field.placeholder} addLabel={`Add ${field.label}`} />
            )}
          </div>
        ))}

        <div className="form-actions">
          <button className="btn btn--primary" onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : <><i className="fa-solid fa-floppy-disk"></i> Save Changes</>}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CMSSection
