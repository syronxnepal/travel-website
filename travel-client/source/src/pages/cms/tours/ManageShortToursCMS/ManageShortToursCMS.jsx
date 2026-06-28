import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import DataTable from '../../../../components/common/DataTable/DataTable'
import DeleteConfirmationModal from '../../../../components/common/DeleteConfirmationModal/DeleteConfirmationModal'
import { shortToursApi } from '../../../../services/api'
import { useToast } from '../../../../context/ToastContext'
import { formatCurrency } from '../../../../utils/helpers'

function ManageShortToursCMS() {
  const [tours, setTours] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const navigate = useNavigate()
  const toast = useToast()

  function load() {
    setLoading(true)
    shortToursApi.getAll()
      .then((res) => setTours(res?.data || res || []))
      .finally(() => setLoading(false))
  }

  useEffect(load, [])

  async function handleDelete() {
    try {
      await shortToursApi.delete(deleteTarget._id)
      toast.success('Short tour deleted.')
      setDeleteTarget(null)
      load()
    } catch (err) { toast.error(err.message) }
  }

  return (
    <div className="short-tour-cms cms-page">
      <div className="cms-page__header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div><h1>Manage Short Tours</h1><p>{tours.length} short tours</p></div>
        <button className="btn btn--primary" onClick={() => navigate('/cms/short-tours/form')}><i className="fa-solid fa-plus"></i> Add Short Tour</button>
      </div>
      <DataTable columns={[{ key: 'title', label: 'Title' }, { key: 'category', label: 'Category' }, { key: 'duration', label: 'Duration' }, { key: 'price', label: 'Price', render: (v) => formatCurrency(v || 0) }]} data={tours} loading={loading} onEdit={(row) => navigate(`/cms/short-tours/form/${row._id}`)} onDelete={(row) => setDeleteTarget(row)} />
      <DeleteConfirmationModal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} title="Delete Short Tour" message={`Delete "${deleteTarget?.title}"?`} />
    </div>
  )
}

export default ManageShortToursCMS
