import CMSSection from '../../../../components/cms/CMSSection/CMSSection'
import { pagesApi } from '../../../../services/api'

function HeroSectionCMS() {
  return (
    <CMSSection
      title="Hero Section"
      onLoad={() => pagesApi.getBySlug('home-hero')}
      onSave={(data) => pagesApi.update('home-hero', data)}
      fields={[
        { key: 'title', label: 'Main Title', type: 'text', placeholder: 'Discover the Magic of the Himalayas' },
        { key: 'subtitle', label: 'Subtitle', type: 'textarea', placeholder: 'Unforgettable adventures in Nepal...' },
        { key: 'backgroundImage', label: 'Background Image', type: 'image' },
        { key: 'ctaLabel', label: 'CTA Button Text', type: 'text', placeholder: 'Explore Tours' },
        { key: 'ctaLink', label: 'CTA Button Link', type: 'text', placeholder: '/tours' },
      ]}
    />
  )
}

export default HeroSectionCMS
