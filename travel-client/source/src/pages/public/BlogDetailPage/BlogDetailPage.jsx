import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Header from '../../../components/common/Header/Header'
import Footer from '../../../components/common/Footer/Footer'
import { blogsApi } from '../../../services/api'
import { getImageUrl } from '../../../utils/helpers'
import './BlogDetailPage.css'

function BlogDetailPage() {
  const { blogId, id } = useParams()
  const resolvedId = blogId || id
  const [blog, setBlog] = useState(null)
  const [recent, setRecent] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      blogsApi.getById(resolvedId),
      blogsApi.getAll(),
    ])
      .then(([single, all]) => {
        setBlog(single?.data || single)
        const list = all?.data || all || []
        setRecent(list.filter((b) => String(b._id || b.id) !== String(resolvedId)).slice(0, 4))
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [blogId])

  function formatDate(d) {
    if (!d) return ''
    return new Date(d).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })
  }

  function share(platform) {
    const url = encodeURIComponent(window.location.href)
    const title = encodeURIComponent(blog?.title || '')
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      whatsapp: `https://wa.me/?text=${title}%20${url}`,
    }
    if (urls[platform]) window.open(urls[platform], '_blank', 'width=600,height=400')
  }

  if (loading) return <><Header /><div className="loading-spinner" style={{ marginTop: 200 }} /><Footer /></>
  if (!blog) return <><Header /><div style={{ textAlign: 'center', padding: 100 }}>Post not found.</div><Footer /></>

  return (
    <div className="blog-detail-page">
      <Header />

      {/* Hero */}
      <div
        className="blog-detail-page__hero"
        style={{ backgroundImage: `url(${getImageUrl(blog.image) || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&h=500&fit=crop'})` }}
      >
        <div className="blog-detail-page__hero-overlay" />
        <div className="container">
          <div className="blog-detail-page__hero-content">
            <div className="detail-page__breadcrumb" style={{ color: 'rgba(255,255,255,0.7)' }}>
              <Link to="/" style={{ color: 'rgba(255,255,255,0.7)' }}>Home</Link> / <Link to="/blogs" style={{ color: 'rgba(255,255,255,0.7)' }}>Blogs</Link> / <span>{blog.title}</span>
            </div>
            <h1 className="blog-detail-page__title">{blog.title}</h1>
            <div className="blog-detail-page__meta">
              {blog.author && <span><i className="fa-regular fa-user"></i> {blog.author}</span>}
              {blog.createdAt && <span><i className="fa-regular fa-calendar"></i> {formatDate(blog.createdAt)}</span>}
              {blog.category && <span className="detail-badge detail-badge--orange">{blog.category}</span>}
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="blog-detail-page__layout">
          {/* Content */}
          <article className="blog-detail-page__content">
            <div className="blog-detail-page__body" dangerouslySetInnerHTML={{ __html: blog.content || blog.body || blog.description || '' }} />

            {/* Share */}
            <div className="blog-detail-page__share">
              <span>Share:</span>
              <button onClick={() => share('facebook')}><i className="fa-brands fa-facebook-f"></i></button>
              <button onClick={() => share('twitter')}><i className="fa-brands fa-x-twitter"></i></button>
              <button onClick={() => share('whatsapp')}><i className="fa-brands fa-whatsapp"></i></button>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="blog-detail-page__sidebar">
            {/* Author */}
            {blog.author && (
              <div className="blog-sidebar-card">
                <h4>Author</h4>
                <div className="blog-sidebar-card__author">
                  <div className="blog-sidebar-card__avatar">
                    <i className="fa-solid fa-user"></i>
                  </div>
                  <div>
                    <strong>{blog.author}</strong>
                    {blog.authorBio && <p>{blog.authorBio}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Category */}
            {blog.category && (
              <div className="blog-sidebar-card">
                <h4>Category</h4>
                <p className="blog-sidebar-card__cat">{blog.category}</p>
              </div>
            )}

            {/* Recent Posts */}
            {recent.length > 0 && (
              <div className="blog-sidebar-card">
                <h4>Recent Posts</h4>
                {recent.map((b) => {
                  const bid = b._id || b.id
                  return (
                    <Link key={bid} to={`/blogs/${bid}`} className="blog-sidebar-card__post">
                      <img src={getImageUrl(b.image) || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=80&h=60&fit=crop'} alt={b.title} />
                      <div>
                        <strong>{b.title}</strong>
                        <span>{formatDate(b.createdAt)}</span>
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default BlogDetailPage
