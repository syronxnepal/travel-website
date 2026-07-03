import CMSSection from '../../../../components/cms/CMSSection/CMSSection'
import { aboutPageSectionsApi } from '../../../../services/api'

function AboutIntroSectionCMS() {
  return (
    <CMSSection
      title="About Intro Section"
      onLoad={() => aboutPageSectionsApi.getByKey('about-intro-section')}
      onSave={(data) => aboutPageSectionsApi.update('about-intro-section', data)}
      fields={[
        { key: 'topTitle', label: 'Eyebrow Text', type: 'text' },
        { key: 'heading', label: 'Title', type: 'text' },
        { key: 'paragraph', label: 'Intro Paragraph', type: 'textarea' },
        { key: 'description', label: 'Description', type: 'richtext' },
        { key: 'features', label: 'Feature Bullets', type: 'list', placeholder: 'Add feature...' },
        { key: 'missionHeading', label: 'Mission Heading', type: 'text' },
        { key: 'missionParagraph', label: 'Mission Paragraph', type: 'textarea' },
      ]}
    />
  )
}

export default AboutIntroSectionCMS
