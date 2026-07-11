import { useState, useEffect } from 'react'
import { contactPageSectionsApi } from '../services/api'

const DEFAULTS = {
  address: 'Suite 502/155 Castlereagh Street, Sydney - Australia 2000',
  phone: '+61 2 0000 0000',
  email: 'sales@traveladventurenepal.com.au',
  contactHours: 'Monday - Friday: 09:00 - 17:00, Saturday, Sunday: 09:00 - 15:00',
}

// Fetches the CMS-managed contact info (CMS > Contact Page > Contact
// Information) so Header, Footer, Contact page, Booking page, and detail
// pages all show the exact same address/phone/email/hours everywhere.
export function useContactInfo() {
  const [info, setInfo] = useState(DEFAULTS)

  useEffect(() => {
    contactPageSectionsApi.getByKey('contact-info-section')
      .then((res) => {
        const data = res?.data || res
        if (!data) return
        setInfo({
          address: data.address || DEFAULTS.address,
          phone: data.phone || DEFAULTS.phone,
          email: data.email || DEFAULTS.email,
          contactHours: data.contactHours || DEFAULTS.contactHours,
        })
      })
      .catch(() => {})
  }, [])

  return info
}
