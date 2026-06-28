import CMSSection from '../../../components/cms/CMSSection/CMSSection'
import { pagesApi } from '../../../services/api'

function WhyBookWithUsCMS() {
  return (
    <CMSSection
      title="Why Book With Us"
      onLoad={() => pagesApi.getSection('why-book-with-us')}
      onSave={(data) => pagesApi.updateSection('why-book-with-us', data)}
      fields={[
        { key: 'heading', label: 'Section Heading', type: 'text' },
        { key: 'subheading', label: 'Subheading', type: 'text' },
        {
          key: 'reasons',
          label: 'Reasons',
          type: 'list',
          defaultItem: { icon: '', title: '', description: '' },
          renderItem: (item, onChange) => (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div className="form-field"><label>Icon (FontAwesome class)</label><input type="text" value={item.icon || ''} onChange={(e) => onChange({ ...item, icon: e.target.value })} placeholder="fa-solid fa-check" /></div>
              <div className="form-field"><label>Title</label><input type="text" value={item.title || ''} onChange={(e) => onChange({ ...item, title: e.target.value })} /></div>
              <div className="form-field"><label>Description</label><textarea value={item.description || ''} onChange={(e) => onChange({ ...item, description: e.target.value })} rows={2} /></div>
            </div>
          ),
        },
      ]}
    />
  )
}

export default WhyBookWithUsCMS
