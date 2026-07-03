import CMSSection from '../../../../components/cms/CMSSection/CMSSection'
import { homePageSectionsApi } from '../../../../services/api'

function BlogSectionCMS() {
  return (
    <CMSSection
      title="Blog Section"
      onLoad={() => homePageSectionsApi.getByKey('blog-section')}
      onSave={(data) => homePageSectionsApi.update('blog-section', data)}
      fields={[
        { key: 'topTitle', label: 'Eyebrow Text', type: 'text' },
        { key: 'heading', label: 'Section Title', type: 'text' },
        { key: 'subtitle', label: 'Section Subtitle', type: 'text' },
      ]}
    />
  )
}

export default BlogSectionCMS
