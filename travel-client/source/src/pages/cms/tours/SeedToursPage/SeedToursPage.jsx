function SeedToursPage() {
  return (
    <div className="seed-tours-page cms-page">
      <div className="cms-page__header">
        <h1>Seed Tours</h1>
        <p>Populate the database with sample tour data.</p>
      </div>

      <div style={{ background: '#fff', borderRadius: 'var(--radius-md)', padding: 32, maxWidth: 480, boxShadow: 'var(--shadow-sm)' }}>
        <p style={{ color: 'var(--color-text-light)', lineHeight: 1.7 }}>
          Seeding isn't available from the admin panel — there's no API endpoint for it,
          only standalone scripts run on the server itself (<code>npm run db:seed</code>,{' '}
          <code>db:seed:api</code>, <code>db:seed:tours</code> in <code>travel-server</code>).
          Run one of those directly on the server if you need sample data.
        </p>
      </div>
    </div>
  )
}

export default SeedToursPage
