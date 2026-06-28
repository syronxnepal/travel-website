import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import DataTable from '../../../../components/common/DataTable/DataTable'
import DeleteConfirmationModal from '../../../../components/common/DeleteConfirmationModal/DeleteConfirmationModal'
import { blogsApi } from '../../../../services/api'
import { useToast } from '../../../../context/ToastContext'
import { formatDate } from '../../../../utils/helpers'

function ManageBlogsCMS() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const navigate = useNavigate()
  const toast = useToast()

  function load() {
    setLoading(true)
    blogsApi.getAll().then((res) => setBlogs(res?.data || res || [])).finally(() => setLoading(false))
  }

  useEffect(load, [])

  async function handleDelete() {
    try {
      await blogsApi.delete(deleteTarget._id)
      toast.success('Blog deleted.')
      setDeleteTarget(null)
      load()
    } catch (err) { toast.error(err.message) }
  }

  return (
    <div className="blog-cms cms-page">
      <div className="cms-page__header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div><h1>Manage Blogs</h1><p>{blogs.length} posts</p></div>
        <button className="btn btn--primary" onClick={() => navigate('/cms/blogs/form')}><i className="fa-solid fa-plus"></i> New Post</button>
      </div>
      <DataTable
        columns={[
          { key: 'title', label: 'Title' },
          { key: 'category', label: 'Category' },
          { key: 'author', label: 'Author', render: (v) => v || 'Admin' },
          { key: 'createdAt', label: 'Published', render: (v) => formatDate(v) },
        ]}
        data={blogs}
        loading={loading}
        onEdit={(row) => navigate(`/cms/blogs/form/${row._id}`)}
        onDelete={(row) => setDeleteTarget(row)}
      />
      <DeleteConfirmationModal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} title="Delete Blog" message={`Delete "${deleteTarget?.title}"?`} />
    </div>
  )
}

export default ManageBlogsCMS
