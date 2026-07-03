import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../../components/common/Header/Header'
import Footer from '../../../components/common/Footer/Footer'
import PageHero from '../../../components/common/PageHero/PageHero'
import { blogsApi } from '../../../services/api'
import { getImageUrl } from '../../../utils/helpers'
import { usePageHero } from '../../../hooks/usePageHero'
import './BlogsPage.css'

const CATEGORIES = ['All', 'Adventure', 'News', 'Culture', 'Travel Tips']
const DEFAULT_HERO = { title: 'Latest Blogs', subtitle: '', backgroundImage: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&h=400&fit=crop' }

function BlogsPage() {
  const hero = usePageHero('blogs', DEFAULT_HERO)
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('All')
  const [visible, setVisible] = useState(6)

  useEffect(() => {
    blogsApi.getAll()
      .then((res) => setBlogs(res?.data || res || []))
      .catch(() => setBlogs([]))
      .finally(() => setLoading(false))
  }, [])

  const filtered = category === 'All' ? blogs : blogs.filter((b) => b.category?.toLowerCase() === category.toLowerCase())

  function formatDate(d) {
    if (!d) return ''
    return new Date(d).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  return (
    <div className="blogs-page">
      <Header />
      <PageHero title={hero.title} subtitle={hero.subtitle} breadcrumb="Home / Blogs" backgroundImage={hero.backgroundImage} />

      <div className="container">
        {/* Category Pills */}
        <div className="blogs-page__categories">
          {CATEGORIES.map((cat) => (
            <button key={cat} className={`blogs-page__cat-pill${category === cat ? ' active' : ''}`} onClick={() => { setCategory(cat); setVisible(6) }}>
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {loading ? <div className="loading-spinner" /> : (
          <>
            <div className="blogs-page__grid">
              {filtered.slice(0, visible).map((blog) => {
                const blogId = blog._id || blog.id
                return (
                  <Link to={`/blogs/${blogId}`} key={blogId} className="blog-card">
                    <div className="blog-card__img-wrap">
                      <img src={getImageUrl(blog.image) || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=240&fit=crop'} alt={blog.title} />
                      {blog.category && <span className="blog-card__cat">{blog.category}</span>}
                    </div>
                    <div className="blog-card__body">
                      <div className="blog-card__meta">
                        <span><i className="fa-regular fa-calendar"></i> {formatDate(blog.createdAt || blog.publishedAt)}</span>
                        {blog.author && <span><i className="fa-regular fa-user"></i> {blog.author}</span>}
                      </div>
                      <h3 className="blog-card__title">{blog.title}</h3>
                      {blog.excerpt && <p className="blog-card__excerpt">{blog.excerpt}</p>}
                      <span className="blog-card__read">Read More <i className="fa-solid fa-arrow-right"></i></span>
                    </div>
                  </Link>
                )
              })}
            </div>

            {visible < filtered.length && (
              <div className="blogs-page__load-more">
                <button className="btn btn--outline" onClick={() => setVisible((v) => v + 6)}>
                  Load More Posts
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default BlogsPage
