import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Hero content is managed as a list of slides (see /cms/hero), not a single
// section blob — redirect here so old links/bookmarks still land somewhere useful.
function HeroSectionCMS() {
  const navigate = useNavigate()
  useEffect(() => { navigate('/cms/hero', { replace: true }) }, [])
  return null
}

export default HeroSectionCMS
