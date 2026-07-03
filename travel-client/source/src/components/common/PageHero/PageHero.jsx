import './PageHero.css'

function PageHero({ title, subtitle, backgroundImage, breadcrumb }) {
  return (
    <section
      className="page-hero"
      style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined }}
    >
      <div className="page-hero__content">
        {breadcrumb && <p className="page-hero__breadcrumb">{breadcrumb}</p>}
        <h1 className="page-hero__title">{title}</h1>
        {subtitle && <p className="page-hero__subtitle">{subtitle}</p>}
      </div>
    </section>
  )
}

export default PageHero
