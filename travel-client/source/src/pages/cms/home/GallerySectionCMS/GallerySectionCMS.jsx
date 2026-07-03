import CMSSection from '../../../../components/cms/CMSSection/CMSSection'
import { homePageSectionsApi } from '../../../../services/api'

function GallerySectionCMS() {
  return (
    <CMSSection
      title="Gallery Section (Home)"
      onLoad={() => homePageSectionsApi.getByKey('gallery-section')}
      onSave={(data) => homePageSectionsApi.update('gallery-section', data)}
      fields={[
        { key: 'topTitle', label: 'Eyebrow Text', type: 'text' },
        { key: 'heading', label: 'Section Title', type: 'text' },
        { key: 'subtitle', label: 'Section Subtitle', type: 'text' },
      ]}
    />
  )
}

export default GallerySectionCMS
