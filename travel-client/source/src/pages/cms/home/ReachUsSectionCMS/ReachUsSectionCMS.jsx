import CMSSection from '../../../../components/cms/CMSSection/CMSSection'
import { pagesApi } from '../../../../services/api'

function ReachUsSectionCMS() {
  return (
    <CMSSection
      title="Reach Us Section"
      onLoad={() => pagesApi.getBySlug('home-reach-us')}
      onSave={(data) => pagesApi.update('home-reach-us', data)}
      fields={[
        { key: 'title', label: 'Section Title', type: 'text' },
        { key: 'subtitle', label: 'Section Subtitle', type: 'text' },
        { key: 'ctaLabel', label: 'Button Text', type: 'text' },
        { key: 'backgroundImage', label: 'Background Image', type: 'image' },
      ]}
    />
  )
}

export default ReachUsSectionCMS
