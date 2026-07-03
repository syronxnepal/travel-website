import CMSSection from '../../../../components/cms/CMSSection/CMSSection'
import { homePageSectionsApi } from '../../../../services/api'

function ReachUsSectionCMS() {
  return (
    <CMSSection
      title="Reach Us Section"
      onLoad={() => homePageSectionsApi.getByKey('reach-us-section')}
      onSave={(data) => homePageSectionsApi.update('reach-us-section', data)}
      fields={[
        { key: 'topTitle', label: 'Eyebrow Text', type: 'text' },
        { key: 'heading', label: 'Section Title', type: 'text' },
        { key: 'subtitle', label: 'Section Subtitle', type: 'text' },
        { key: 'ctaLabel', label: 'Button Text', type: 'text' },
        { key: 'backgroundImage', label: 'Background Image', type: 'image' },
      ]}
    />
  )
}

export default ReachUsSectionCMS
