import CMSSection from '../../../../components/cms/CMSSection/CMSSection'
import { contactsApi } from '../../../../services/api'

function ContactInfoCMS() {
  return (
    <CMSSection
      title="Contact Information"
      onLoad={() => contactsApi.getInfo()}
      onSave={(data) => contactsApi.updateInfo(data)}
      fields={[
        { key: 'address', label: 'Address', type: 'text' },
        { key: 'phone', label: 'Phone Number', type: 'text' },
        { key: 'email', label: 'Email', type: 'text' },
        { key: 'officeHours', label: 'Office Hours', type: 'text' },
        { key: 'facebook', label: 'Facebook URL', type: 'text' },
        { key: 'instagram', label: 'Instagram URL', type: 'text' },
        { key: 'twitter', label: 'Twitter URL', type: 'text' },
        { key: 'whatsapp', label: 'WhatsApp Number', type: 'text' },
      ]}
    />
  )
}

export default ContactInfoCMS
