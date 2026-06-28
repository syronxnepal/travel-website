import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import DataTable from '../../../../components/common/DataTable/DataTable'
import DeleteConfirmationModal from '../../../../components/common/DeleteConfirmationModal/DeleteConfirmationModal'
import StatusBadge from '../../../../components/common/StatusBadge/StatusBadge'
import { toursApi } from '../../../../services/api'
import { useToast } from '../../../../context/ToastContext'
import { formatCurrency } from '../../../../utils/helpers'
import './ManageToursCMS.css'

function ManageToursCMS() {
  const [tours, setTours] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const navigate = useNavigate()
  const toast = useToast()

  function load() {
    setLoading(true)
    toursApi.getAll()
      .then((res) => setTours(res?.data || res || []))
      .finally(() => setLoading(false))
  }

  useEffect(load, [])

  async function handleDelete() {
    setDeleting(true)
    try {
      await toursApi.delete(deleteTarget._id || deleteTarget.id)
      toast.success('Tour deleted.')
      setDeleteTarget(null)
      load()
    } catch (err) {
      toast.error(err.message)
    } finally {
      setDeleting(false)
    }
  }

  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'category', label: 'Category', render: (v) => v ? <span style={{ textTransform: 'capitalize' }}>{v}</span> : '—' },
    { key: 'duration', label: 'Duration' },
    { key: 'price', label: 'Price', render: (v) => formatCurrency(v || 0) },
    { key: 'difficulty', label: 'Difficulty', render: (v) => v ? <StatusBadge status={v} /> : '—' },
    { key: 'featured', label: 'Featured', render: (v) => v ? <span style={{ color: '#2e7d32' }}><i className="fa-solid fa-check"></i></span> : '' },
  ]

  return (
    <div className="tour-cms cms-page">
      <div className="cms-page__header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Manage Tours</h1>
          <p>{tours.length} tours total</p>
        </div>
        <button className="btn btn--primary" onClick={() => navigate('/cms/tours/form')}>
          <i className="fa-solid fa-plus"></i> Add Tour
        </button>
      </div>

      <DataTable
        columns={columns}
        data={tours}
        loading={loading}
        onEdit={(row) => navigate(`/cms/tours/form/${row._id || row.id}`)}
        onDelete={(row) => setDeleteTarget(row)}
      />

      <DeleteConfirmationModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={deleting}
        title="Delete Tour"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
      />
    </div>
  )
}

export default ManageToursCMS
