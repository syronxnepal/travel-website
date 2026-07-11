import { useState, useEffect } from 'react'
import { contactsApi } from '../services/api'

// Fetches the CMS-managed social links (CMS > Contacts > Social Links) so
// Header, Footer, and the Contact page all render the exact same set —
// only links added there show up, anywhere.
export function useSocialLinks() {
  const [links, setLinks] = useState([])

  useEffect(() => {
    contactsApi.getSocialLinks()
      .then((res) => setLinks(res?.data || res || []))
      .catch(() => {})
  }, [])

  return links
}
