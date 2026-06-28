import CMSSection from '../../../../components/cms/CMSSection/CMSSection'
import { pagesApi } from '../../../../services/api'

function AboutWhyChooseUsCMS() {
  return (
    <CMSSection
      title="About — Why Choose Us"
      onLoad={() => pagesApi.getBySlug('about-why-choose-us')}
      onSave={(data) => pagesApi.update('about-why-choose-us', data)}
      fields={[
        { key: 'title', label: 'Section Title', type: 'text' },
        { key: 'items', label: 'Reasons (one per line)', type: 'list', placeholder: 'Add reason...' },
      ]}
    />
  )
}

export default AboutWhyChooseUsCMS
