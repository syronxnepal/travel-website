import CMSSection from '../../../../components/cms/CMSSection/CMSSection'
import { homePageSectionsApi } from '../../../../services/api'

function TestimonialsSectionCMS() {
  return (
    <CMSSection
      title="Testimonials Section"
      onLoad={() => homePageSectionsApi.getByKey('testimonials-section')}
      onSave={(data) => homePageSectionsApi.update('testimonials-section', data)}
      fields={[
        { key: 'topTitle', label: 'Eyebrow Text', type: 'text' },
        { key: 'heading', label: 'Section Title', type: 'text' },
      ]}
    />
  )
}

export default TestimonialsSectionCMS
