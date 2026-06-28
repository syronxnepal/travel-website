import CMSSection from '../../../../components/cms/CMSSection/CMSSection'
import { pagesApi } from '../../../../services/api'

function TopTrekSectionCMS() {
  return (
    <CMSSection
      title="Top Trek Section"
      onLoad={() => pagesApi.getBySlug('home-top-treks')}
      onSave={(data) => pagesApi.update('home-top-treks', data)}
      fields={[
        { key: 'eyebrow', label: 'Eyebrow Text', type: 'text' },
        { key: 'title', label: 'Section Title', type: 'text' },
        { key: 'subtitle', label: 'Section Subtitle', type: 'text' },
      ]}
    />
  )
}

export default TopTrekSectionCMS
