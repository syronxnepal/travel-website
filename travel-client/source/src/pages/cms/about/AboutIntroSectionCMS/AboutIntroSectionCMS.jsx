import CMSSection from '../../../../components/cms/CMSSection/CMSSection'
import { pagesApi } from '../../../../services/api'

function AboutIntroSectionCMS() {
  return (
    <CMSSection
      title="About Intro Section"
      onLoad={() => pagesApi.getBySlug('about-intro')}
      onSave={(data) => pagesApi.update('about-intro', data)}
      fields={[
        { key: 'eyebrow', label: 'Eyebrow Text', type: 'text' },
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'content', label: 'Content', type: 'richtext' },
        { key: 'image', label: 'Section Image', type: 'image' },
      ]}
    />
  )
}

export default AboutIntroSectionCMS
