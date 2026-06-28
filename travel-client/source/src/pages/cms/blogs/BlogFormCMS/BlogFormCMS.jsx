import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { blogsApi } from '../../../../services/api'
import { useToast } from '../../../../context/ToastContext'
import ImageUpload from '../../../../components/common/ImageUpload/ImageUpload'
import RichTextEditor from '../../../../components/common/RichTextEditor/RichTextEditor'
import '../../tours/TourFormCMS/TourFormCMS.css'

const defaultForm = { title: '', category: '', author: '', excerpt: '', content: '', image: '', published: false }

function BlogFormCMS() {
  const { id } = useParams()
  const navigate = useNavigate()
  const toast = useToast()
  const [form, setForm] = useState(defaultForm)
  const [loading, setLoading] = useState(!!id)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (id) blogsApi.getById(id).then((res) => setForm({ ...defaultForm, ...(res?.data || res) })).finally(() => setLoading(false))
  }, [id])

  function update(key, value) { setForm((p) => ({ ...p, [key]: value })) }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    try {
      if (id) { await blogsApi.update(id, form); toast.success('Blog updated.') }
      else { await blogsApi.create(form); toast.success('Blog created.') }
      navigate('/cms/blogs/manage')
    } catch (err) { toast.error(err.message) }
    finally { setSaving(false) }
  }

  if (loading) return <div className="loading-spinner" />

  return (
    <div className="blog-form-page cms-page">
      <div className="cms-page__header" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>{id ? 'Edit Blog Post' : 'New Blog Post'}</h1>
        <button type="button" className="btn btn--outline" onClick={() => navigate('/cms/blogs/manage')}><i className="fa-solid fa-arrow-left"></i> Back</button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="tour-form-page__grid">
          <div>
            <div className="cms-section">
              <div className="form-field"><label>Title *</label><input type="text" value={form.title} onChange={(e) => update('title', e.target.value)} required /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div className="form-field"><label>Category</label><input type="text" value={form.category} onChange={(e) => update('category', e.target.value)} /></div>
                <div className="form-field"><label>Author</label><input type="text" value={form.author} onChange={(e) => update('author', e.target.value)} /></div>
              </div>
              <div className="form-field"><label>Excerpt</label><textarea value={form.excerpt} onChange={(e) => update('excerpt', e.target.value)} rows={3} placeholder="Short summary of the post..." /></div>
              <div className="form-field"><label>Content</label><RichTextEditor value={form.content} onChange={(v) => update('content', v)} /></div>
            </div>
          </div>
          <aside className="tour-form-page__sidebar">
            <div className="cms-section">
              <h3>Featured Image</h3>
              <ImageUpload value={form.image} onChange={(f) => update('image', f)} />
            </div>
            <div className="cms-section" style={{ marginTop: 20 }}>
              <div className="form-field" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <input type="checkbox" id="published" checked={form.published} onChange={(e) => update('published', e.target.checked)} />
                <label htmlFor="published">Published</label>
              </div>
              <button type="submit" className="btn btn--primary" style={{ width: '100%', justifyContent: 'center', marginTop: 16 }} disabled={saving}>{saving ? 'Saving...' : id ? 'Update Post' : 'Publish Post'}</button>
            </div>
          </aside>
        </div>
      </form>
    </div>
  )
}

export default BlogFormCMS
