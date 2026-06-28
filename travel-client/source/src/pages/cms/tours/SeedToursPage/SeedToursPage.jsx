import { useState } from 'react'
import { toursApi } from '../../../../services/api'
import { useToast } from '../../../../context/ToastContext'

function SeedToursPage() {
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  async function handleSeed() {
    setLoading(true)
    try {
      await toursApi.seed({})
      toast.success('Sample tours seeded successfully.')
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="seed-tours-page cms-page">
      <div className="cms-page__header">
        <h1>Seed Tours</h1>
        <p>Populate the database with sample tour data.</p>
      </div>

      <div style={{ background: '#fff', borderRadius: 'var(--radius-md)', padding: 32, maxWidth: 480, boxShadow: 'var(--shadow-sm)' }}>
        <p style={{ marginBottom: 20, color: 'var(--color-text-light)', lineHeight: 1.7 }}>
          This will create sample tours, treks, and short tours in the database. Use only in development.
        </p>
        <button className="btn btn--primary" onClick={handleSeed} disabled={loading}>
          {loading ? 'Seeding...' : <><i className="fa-solid fa-seedling"></i> Run Seed</>}
        </button>
      </div>
    </div>
  )
}

export default SeedToursPage
