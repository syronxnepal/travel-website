import CMSSection from '../../../../components/cms/CMSSection/CMSSection'
import { pagesApi } from '../../../../services/api'

function TestimonialsSectionCMS() {
  return (
    <CMSSection
      title="Testimonials Section"
      onLoad={() => pagesApi.getBySlug('home-testimonials')}
      onSave={(data) => pagesApi.update('home-testimonials', data)}
      fields={[
        { key: 'eyebrow', label: 'Eyebrow Text', type: 'text' },
        { key: 'title', label: 'Section Title', type: 'text' },
      ]}
    />
  )
}

export default TestimonialsSectionCMS
