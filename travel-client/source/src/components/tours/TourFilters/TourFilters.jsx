import { useState, useEffect } from 'react'
import './TourFilters.css'

function TourFilters({ filters, onChange, difficulties = ['Easy', 'Medium', 'Hard'], label = 'Filters' }) {
  const [price, setPrice] = useState(filters.maxPrice || 5000)
  const [duration, setDuration] = useState(filters.maxDuration || 30)

  useEffect(() => {
    setPrice(filters.maxPrice || 5000)
    setDuration(filters.maxDuration || 30)
  }, [filters.maxPrice, filters.maxDuration])

  function handlePrice(val) {
    setPrice(val)
    onChange({ ...filters, maxPrice: val })
  }

  function handleDuration(val) {
    setDuration(val)
    onChange({ ...filters, maxDuration: val })
  }

  function toggleDifficulty(diff) {
    const current = filters.difficulty ? filters.difficulty.split(',').filter(Boolean) : []
    const next = current.includes(diff) ? current.filter((d) => d !== diff) : [...current, diff]
    onChange({ ...filters, difficulty: next.join(',') })
  }

  const activeDifficulties = filters.difficulty ? filters.difficulty.split(',').filter(Boolean) : []

  return (
    <div className="tour-filters">
      <h3 className="tour-filters__heading">{label}</h3>

      <div className="tour-filters__group">
        <label className="tour-filters__label">Price Range</label>
        <div className="tour-filters__range-labels">
          <span>$0</span>
          <span>${Number(price).toLocaleString()}</span>
        </div>
        <input
          type="range" min="0" max="5000" step="50"
          value={price}
          onChange={(e) => handlePrice(Number(e.target.value))}
          className="tour-filters__range"
        />
      </div>

      <div className="tour-filters__group">
        <label className="tour-filters__label">Duration (Days)</label>
        <div className="tour-filters__range-labels">
          <span>0 Days</span>
          <span>{duration} Days</span>
        </div>
        <input
          type="range" min="0" max="30" step="1"
          value={duration}
          onChange={(e) => handleDuration(Number(e.target.value))}
          className="tour-filters__range"
        />
      </div>

      <div className="tour-filters__group">
        <label className="tour-filters__label">Difficulty</label>
        {difficulties.map((d) => (
          <label key={d} className="tour-filters__checkbox">
            <input
              type="checkbox"
              checked={activeDifficulties.includes(d)}
              onChange={() => toggleDifficulty(d)}
            />
            {d}
          </label>
        ))}
      </div>
    </div>
  )
}

export default TourFilters
