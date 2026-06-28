import CMSSection from '../../../../components/cms/CMSSection/CMSSection'
import { pagesApi } from '../../../../services/api'

function WhyChooseUsSectionCMS() {
  return (
    <CMSSection
      title="Why Choose Us Section (Home)"
      onLoad={() => pagesApi.getBySlug('home-why-choose-us')}
      onSave={(data) => pagesApi.update('home-why-choose-us', data)}
      fields={[
        { key: 'eyebrow', label: 'Eyebrow Text', type: 'text' },
        { key: 'title', label: 'Section Title', type: 'text' },
        { key: 'items', label: 'Reasons', type: 'list', placeholder: 'Add reason...' },
      ]}
    />
  )
}

export default WhyChooseUsSectionCMS
