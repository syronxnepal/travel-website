import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function ManageTestimonialsCMS() {
  const navigate = useNavigate()
  useEffect(() => { navigate('/cms/testimonials', { replace: true }) }, [])
  return null
}

export default ManageTestimonialsCMS
