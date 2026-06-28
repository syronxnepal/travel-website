import CMSSection from '../../../../components/cms/CMSSection/CMSSection'
import { pagesApi } from '../../../../services/api'

function GallerySectionCMS() {
  return (
    <CMSSection
      title="Gallery Section (Home)"
      onLoad={() => pagesApi.getBySlug('home-gallery-section')}
      onSave={(data) => pagesApi.update('home-gallery-section', data)}
      fields={[
        { key: 'eyebrow', label: 'Eyebrow Text', type: 'text' },
        { key: 'title', label: 'Section Title', type: 'text' },
        { key: 'subtitle', label: 'Section Subtitle', type: 'text' },
      ]}
    />
  )
}

export default GallerySectionCMS
