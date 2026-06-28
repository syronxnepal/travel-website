import CMSSection from '../../../../components/cms/CMSSection/CMSSection'
import { pagesApi } from '../../../../services/api'

function TopToursSectionCMS() {
  return (
    <CMSSection
      title="Top Tours Section"
      onLoad={() => pagesApi.getBySlug('home-top-tours')}
      onSave={(data) => pagesApi.update('home-top-tours', data)}
      fields={[
        { key: 'eyebrow', label: 'Eyebrow Text', type: 'text', placeholder: 'Explore Nepal' },
        { key: 'title', label: 'Section Title', type: 'text', placeholder: 'Top Tours' },
        { key: 'subtitle', label: 'Section Subtitle', type: 'text', placeholder: 'Handpicked tours for the ultimate experience' },
      ]}
    />
  )
}

export default TopToursSectionCMS
