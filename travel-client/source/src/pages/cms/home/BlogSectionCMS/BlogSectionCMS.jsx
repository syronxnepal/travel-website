import CMSSection from '../../../../components/cms/CMSSection/CMSSection'
import { pagesApi } from '../../../../services/api'

function BlogSectionCMS() {
  return (
    <CMSSection
      title="Blog Section"
      onLoad={() => pagesApi.getBySlug('home-blog-section')}
      onSave={(data) => pagesApi.update('home-blog-section', data)}
      fields={[
        { key: 'eyebrow', label: 'Eyebrow Text', type: 'text' },
        { key: 'title', label: 'Section Title', type: 'text' },
        { key: 'subtitle', label: 'Section Subtitle', type: 'text' },
      ]}
    />
  )
}

export default BlogSectionCMS
