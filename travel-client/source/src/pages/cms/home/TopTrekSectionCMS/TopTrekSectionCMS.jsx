import CMSSection from '../../../../components/cms/CMSSection/CMSSection'
import { homePageSectionsApi } from '../../../../services/api'

function TopTrekSectionCMS() {
  return (
    <CMSSection
      title="Top Trek Section"
      onLoad={() => homePageSectionsApi.getByKey('top-trek-section')}
      onSave={(data) => homePageSectionsApi.update('top-trek-section', data)}
      fields={[
        { key: 'topTitle', label: 'Eyebrow Text', type: 'text' },
        { key: 'heading', label: 'Section Title', type: 'text' },
        { key: 'subtitle', label: 'Section Subtitle', type: 'text' },
      ]}
    />
  )
}

export default TopTrekSectionCMS
