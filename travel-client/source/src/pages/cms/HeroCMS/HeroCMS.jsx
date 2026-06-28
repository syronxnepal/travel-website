import { useState, useEffect } from 'react'
import { useToast } from '../../../context/ToastContext'
import { pagesApi } from '../../../services/api'
import ImageUpload from '../../../components/common/ImageUpload/ImageUpload'
import RepeaterField from '../../../components/common/RepeaterField/RepeaterField'
import '../../../components/cms/CMSSection/CMSSection.css'

function HeroCMS() {
  const [slides, setSlides] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const toast = useToast()

  useEffect(() => {
    pagesApi.getBySlug('hero-slides')
      .then((res) => setSlides(res?.data?.slides || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  async function save() {
    setSaving(true)
    try {
      await pagesApi.update('hero-slides', { slides })
      toast.success('Hero slides saved.')
    } catch {
      toast.error('Failed to save.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="loading-spinner" />

  return (
    <div className="hero-cms cms-page">
      <div className="cms-page__header">
        <h1>Hero Carousel</h1>
      </div>

      <div className="cms-section">
        <RepeaterField
          label="Slides"
          items={slides}
          onChange={setSlides}
          defaultItem={{ title: '', subtitle: '', image: '', ctaLabel: 'Explore', ctaLink: '/tours' }}
          addLabel="Add Slide"
          renderItem={(item, index, update) => (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div className="form-field">
                <label>Title</label>
                <input type="text" value={item.title || ''} onChange={(e) => update({ title: e.target.value })} />
              </div>
              <div className="form-field">
                <label>Subtitle</label>
                <input type="text" value={item.subtitle || ''} onChange={(e) => update({ subtitle: e.target.value })} />
              </div>
              <div className="form-field">
                <label>Background Image</label>
                <ImageUpload value={item.image} onChange={(f) => update({ image: f })} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-field">
                  <label>CTA Label</label>
                  <input type="text" value={item.ctaLabel || ''} onChange={(e) => update({ ctaLabel: e.target.value })} />
                </div>
                <div className="form-field">
                  <label>CTA Link</label>
                  <input type="text" value={item.ctaLink || ''} onChange={(e) => update({ ctaLink: e.target.value })} />
                </div>
              </div>
            </div>
          )}
        />

        <div className="form-actions">
          <button className="btn btn--primary" onClick={save} disabled={saving}>
            {saving ? 'Saving...' : <><i className="fa-solid fa-floppy-disk"></i> Save Slides</>}
          </button>
        </div>
      </div>
    </div>
  )
}

export default HeroCMS
