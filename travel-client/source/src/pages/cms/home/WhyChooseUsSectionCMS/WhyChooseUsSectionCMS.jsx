import CMSSection from '../../../../components/cms/CMSSection/CMSSection'
import { homePageSectionsApi } from '../../../../services/api'

function WhyChooseUsSectionCMS() {
  return (
    <CMSSection
      title="Why Choose Us Section (Home)"
      onLoad={() => homePageSectionsApi.getByKey('why-choose-us-section')}
      onSave={(data) => homePageSectionsApi.update('why-choose-us-section', data)}
      fields={[
        { key: 'topTitle', label: 'Eyebrow Text', type: 'text' },
        { key: 'heading', label: 'Section Title', type: 'text' },
        { key: 'subtitle', label: 'Section Subtitle', type: 'text' },
        { key: 'adventureImage', label: 'Adventure Photo', type: 'image' },
      ]}
    />
  )
}

export default WhyChooseUsSectionCMS
