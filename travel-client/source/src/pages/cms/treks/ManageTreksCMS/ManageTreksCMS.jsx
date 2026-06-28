import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import DataTable from '../../../../components/common/DataTable/DataTable'
import DeleteConfirmationModal from '../../../../components/common/DeleteConfirmationModal/DeleteConfirmationModal'
import { treksApi } from '../../../../services/api'
import { useToast } from '../../../../context/ToastContext'
import { formatCurrency } from '../../../../utils/helpers'

function ManageTreksCMS() {
  const [treks, setTreks] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const navigate = useNavigate()
  const toast = useToast()

  function load() {
    setLoading(true)
    treksApi.getAll()
      .then((res) => setTreks(res?.data || res || []))
      .finally(() => setLoading(false))
  }

  useEffect(load, [])

  async function handleDelete() {
    try {
      await treksApi.delete(deleteTarget._id)
      toast.success('Trek deleted.')
      setDeleteTarget(null)
      load()
    } catch (err) { toast.error(err.message) }
  }

  return (
    <div className="trek-cms cms-page">
      <div className="cms-page__header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div><h1>Manage Treks</h1><p>{treks.length} treks</p></div>
        <button className="btn btn--primary" onClick={() => navigate('/cms/treks/form')}><i className="fa-solid fa-plus"></i> Add Trek</button>
      </div>
      <DataTable
        columns={[
          { key: 'title', label: 'Title' },
          { key: 'category', label: 'Category' },
          { key: 'duration', label: 'Duration' },
          { key: 'difficulty', label: 'Difficulty' },
          { key: 'price', label: 'Price', render: (v) => formatCurrency(v || 0) },
        ]}
        data={treks}
        loading={loading}
        onEdit={(row) => navigate(`/cms/treks/form/${row._id}`)}
        onDelete={(row) => setDeleteTarget(row)}
      />
      <DeleteConfirmationModal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} title="Delete Trek" message={`Delete "${deleteTarget?.title}"?`} />
    </div>
  )
}

export default ManageTreksCMS
