import { useState, useEffect } from 'react'
import DataTable from '../../../../components/common/DataTable/DataTable'
import StatusBadge from '../../../../components/common/StatusBadge/StatusBadge'
import Modal from '../../../../components/common/Modal/Modal'
import { bookingsApi } from '../../../../services/api'
import { useToast } from '../../../../context/ToastContext'
import { formatCurrency, formatDate } from '../../../../utils/helpers'

function ManageBookingsCMS() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [viewTarget, setViewTarget] = useState(null)
  const toast = useToast()

  useEffect(() => {
    bookingsApi.getAll()
      .then((res) => setBookings(res?.data || res || []))
      .finally(() => setLoading(false))
  }, [])

  async function updateStatus(id, status) {
    try {
      await bookingsApi.update(id, { status })
      toast.success(`Status updated to ${status}.`)
      setBookings((prev) => prev.map((b) => b._id === id ? { ...b, status } : b))
      setViewTarget((prev) => prev ? { ...prev, status } : prev)
    } catch (err) { toast.error(err.message) }
  }

  return (
    <div className="booking-cms cms-page">
      <div className="cms-page__header"><h1>Manage Bookings</h1><p>{bookings.length} bookings</p></div>

      <DataTable
        columns={[
          { key: 'name', label: 'Guest Name' },
          { key: 'email', label: 'Email' },
          { key: 'bookingType', label: 'Type' },
          { key: 'startDate', label: 'Date', render: (v) => v ? formatDate(v) : '—' },
          { key: 'travelers', label: 'Guests' },
          { key: 'totalAmount', label: 'Total', render: (v) => formatCurrency(v || 0) },
          { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v || 'pending'} /> },
        ]}
        data={bookings}
        loading={loading}
        onView={(row) => setViewTarget(row)}
      />

      <Modal isOpen={!!viewTarget} onClose={() => setViewTarget(null)} title="Booking Details" size="md">
        {viewTarget && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
              {[
                ['Guest', viewTarget.name], ['Email', viewTarget.email], ['Phone', viewTarget.phone || '—'],
                ['Type', viewTarget.bookingType], ['Travelers', viewTarget.travelers], ['Total', formatCurrency(viewTarget.totalAmount || 0)],
                ['Start Date', viewTarget.startDate ? formatDate(viewTarget.startDate) : '—'],
              ].map(([k, v]) => (
                <div key={k}><strong style={{ fontSize: 11, textTransform: 'uppercase', color: 'var(--color-text-light)' }}>{k}</strong><p style={{ marginTop: 2 }}>{v}</p></div>
              ))}
            </div>
            {viewTarget.notes && <div style={{ marginBottom: 20 }}><strong>Notes:</strong><p style={{ color: 'var(--color-text-light)', marginTop: 4 }}>{viewTarget.notes}</p></div>}
            <div className="form-field">
              <label>Update Status</label>
              <select value={viewTarget.status || 'pending'} onChange={(e) => updateStatus(viewTarget._id, e.target.value)}>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default ManageBookingsCMS
