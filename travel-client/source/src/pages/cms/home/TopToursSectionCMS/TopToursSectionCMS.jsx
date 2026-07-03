import CMSSection from '../../../../components/cms/CMSSection/CMSSection'
import { homePageSectionsApi } from '../../../../services/api'

function TopToursSectionCMS() {
  return (
    <CMSSection
      title="Top Tours Section"
      onLoad={() => homePageSectionsApi.getByKey('top-tours-section')}
      onSave={(data) => homePageSectionsApi.update('top-tours-section', data)}
      fields={[
        { key: 'topTitle', label: 'Eyebrow Text', type: 'text', placeholder: 'Explore Nepal' },
        { key: 'heading', label: 'Section Title', type: 'text', placeholder: 'Top Tours' },
        { key: 'subtitle', label: 'Section Subtitle', type: 'text', placeholder: 'Handpicked tours for the ultimate experience' },
      ]}
    />
  )
}

export default TopToursSectionCMS
