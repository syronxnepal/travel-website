import './SectionHeading.css'

function SectionHeading({ eyebrow, title, subtitle, align = 'center' }) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      {eyebrow && <span className="section-heading-top">{eyebrow}</span>}
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-heading__subtitle">{subtitle}</p>}
    </div>
  )
}

export default SectionHeading
