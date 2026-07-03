import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Duplicate of the "Why Choose Us Section (Home)" editor — this route isn't
// linked in the CMS nav, so redirect to the real, linked editor instead of
// maintaining two competing forms for the same homepage section.
function WhyBookWithUsCMS() {
  const navigate = useNavigate()
  useEffect(() => { navigate('/cms/home/why-choose-us-section', { replace: true }) }, [])
  return null
}

export default WhyBookWithUsCMS
