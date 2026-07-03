import { API_BASE_URL } from '../services/api'

export function formatCurrency(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount)
}

export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export function truncate(str, length = 120) {
  if (!str || str.length <= length) return str
  return str.slice(0, length).trimEnd() + '...'
}

export function getImageUrl(path) {
  if (!path) return ''
  if (path.startsWith('http')) return path
  // The upload endpoint already returns paths like "/uploads/filename.jpg",
  // so strip any leading slash and/or "uploads/" before re-adding it, instead
  // of blindly prepending and ending up with ".../uploads//uploads/...".
  const filename = path.replace(/^\/?(uploads\/)?/, '')
  return `${API_BASE_URL}/uploads/${filename}`
}

export function getDifficultyLabel(level) {
  const labels = {
    easy: 'Easy',
    moderate: 'Moderate',
    hard: 'Hard',
    challenging: 'Challenging',
    strenuous: 'Strenuous',
  }
  return labels[level] || level
}

export function capitalize(str) {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function groupBy(array, key) {
  return array.reduce((acc, item) => {
    const group = item[key]
    if (!acc[group]) acc[group] = []
    acc[group].push(item)
    return acc
  }, {})
}

export function debounce(fn, delay = 300) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}
