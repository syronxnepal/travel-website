const BASE_URL = import.meta.env.VITE_API_URL

function getToken() {
  return localStorage.getItem('token')
}

function normalize(obj) {
  if (Array.isArray(obj)) return obj.map(normalize)
  if (obj && typeof obj === 'object') {
    const out = {}
    for (const k of Object.keys(obj)) out[k] = normalize(obj[k])
    if (out._id && !out.id) out.id = out._id
    if (out.id && !out._id) out._id = out.id
    return out
  }
  return obj
}

async function request(endpoint, options = {}) {
  const token = getToken()
  const isFormData = options.body instanceof FormData
  const headers = {
    ...(!isFormData && { 'Content-Type': 'application/json' }),
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  })

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'An error occurred' }))
    throw new Error(error.message || `HTTP ${res.status}`)
  }

  return res.json().then(normalize)
}

// Auth
export const authApi = {
  login: (data) => request('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  register: (data) => request('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  getMe: () => request('/auth/me'),
  updateProfile: (data) => request('/auth/me', { method: 'PUT', body: JSON.stringify(data) }),
  changePassword: (data) => request('/auth/change-password', { method: 'PUT', body: JSON.stringify(data) }),
}

// Treks
export const treksApi = {
  getAll: (params) => request(`/treks${params ? `?${new URLSearchParams(params)}` : ''}`),
  getById: (id) => request(`/treks/${id}`),
  create: (data) => request('/treks', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => request(`/treks/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => request(`/treks/${id}`, { method: 'DELETE' }),
}

// Tours
export const toursApi = {
  getAll: (params) => request(`/tours${params ? `?${new URLSearchParams(params)}` : ''}`),
  getById: (id) => request(`/tours/${id}`),
  create: (data) => request('/tours', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => request(`/tours/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => request(`/tours/${id}`, { method: 'DELETE' }),
}

// Short Tours
export const shortToursApi = {
  getAll: (params) => request(`/short-tours${params ? `?${new URLSearchParams(params)}` : ''}`),
  getById: (id) => request(`/short-tours/${id}`),
  create: (data) => request('/short-tours', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => request(`/short-tours/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => request(`/short-tours/${id}`, { method: 'DELETE' }),
}

// Blogs
export const blogsApi = {
  getAll: (params) => request(`/blogs${params ? `?${new URLSearchParams(params)}` : ''}`),
  getById: (id) => request(`/blogs/${id}`),
  create: (data) => request('/blogs', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => request(`/blogs/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => request(`/blogs/${id}`, { method: 'DELETE' }),
}

// Blog Categories
export const blogCategoriesApi = {
  getAll: () => request('/blog-categories'),
  create: (data) => request('/blog-categories', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => request(`/blog-categories/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => request(`/blog-categories/${id}`, { method: 'DELETE' }),
}

// Gallery Images (public)
export const galleryApi = {
  getAll: (params) => request(`/gallery-images${params ? `?${new URLSearchParams(params)}` : ''}`),
  getById: (id) => request(`/gallery-images/${id}`),
  create: (formData) => request('/gallery-images', { method: 'POST', body: formData }),
  update: (id, data) => request(`/gallery-images/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => request(`/gallery-images/${id}`, { method: 'DELETE' }),
}

// Gallery Categories
export const galleryCategoriesApi = {
  getAll: () => request('/gallery-categories'),
  create: (data) => request('/gallery-categories', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => request(`/gallery-categories/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => request(`/gallery-categories/${id}`, { method: 'DELETE' }),
}

// Hero Sliders (public)
export const heroSlidersApi = {
  getAll: () => request('/hero-sliders'),
  create: (data) => request('/hero-sliders', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => request(`/hero-sliders/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => request(`/hero-sliders/${id}`, { method: 'DELETE' }),
}

// Testimonials
export const testimonialsApi = {
  getAll: () => request('/testimonials'),
  create: (data) => request('/testimonials', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => request(`/testimonials/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => request(`/testimonials/${id}`, { method: 'DELETE' }),
}

// Search (public)
export const searchApi = {
  search: (q) => request(`/search?q=${encodeURIComponent(q)}`),
}

// Bookings
export const bookingsApi = {
  getAll: (params) => request(`/bookings${params ? `?${new URLSearchParams(params)}` : ''}`),
  getById: (id) => request(`/bookings/${id}`),
  create: (data) => request('/bookings', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => request(`/bookings/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => request(`/bookings/${id}`, { method: 'DELETE' }),
}

// Stripe
export const stripeApi = {
  createPaymentIntent: (data) => request('/stripe/create-payment-intent', { method: 'POST', body: JSON.stringify(data) }),
}

// Contacts — POST to /contacts (public), admin reads via GET
export const contactsApi = {
  // Public: submit contact form. Backend fields: name, email, phone, subject, message
  submit: (data) => request('/contacts', { method: 'POST', body: JSON.stringify(data) }),
  // Admin
  getAll: () => request('/contacts'),
  getById: (id) => request(`/contacts/${id}`),
  update: (id, data) => request(`/contacts/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => request(`/contacts/${id}`, { method: 'DELETE' }),
  // Social links
  getSocialLinks: () => request('/contact-social-links'),
  updateSocialLink: (id, data) => request(`/contact-social-links/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  createSocialLink: (data) => request('/contact-social-links', { method: 'POST', body: JSON.stringify(data) }),
  deleteSocialLink: (id) => request(`/contact-social-links/${id}`, { method: 'DELETE' }),
}

// Pages
export const pagesApi = {
  getAll: () => request('/pages'),
  getBySlug: (slug) => request(`/pages/${slug}`),
  update: (id, data) => request(`/pages/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
}

// Users (admin)
export const usersApi = {
  getAll: () => request('/users'),
  getById: (id) => request(`/users/${id}`),
  update: (id, data) => request(`/users/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => request(`/users/${id}`, { method: 'DELETE' }),
  updateRole: (id, role) => request(`/users/${id}/role`, { method: 'PUT', body: JSON.stringify({ role }) }),
}

// Media
export const mediaApi = {
  upload: (formData) =>
    fetch(`${BASE_URL}/upload`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${getToken()}` },
      body: formData,
    }).then((r) => r.json()),
  getAll: () => request('/media'),
  delete: (id) => request(`/media/${id}`, { method: 'DELETE' }),
}

// Contact Page Sections
export const contactPageSectionsApi = {
  getAll: () => request('/contact-page-sections'),
  update: (id, data) => request(`/contact-page-sections/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
}

// About Page Sections
export const aboutPageSectionsApi = {
  getAll: () => request('/about-page-sections'),
  update: (id, data) => request(`/about-page-sections/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
}

// Home Page Sections
export const homePageSectionsApi = {
  getAll: () => request('/home-page-sections'),
  getByKey: (key) => request(`/home-page-sections/${key}`),
  update: (id, data) => request(`/home-page-sections/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
}
