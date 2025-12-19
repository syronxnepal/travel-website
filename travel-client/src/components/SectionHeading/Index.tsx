import './styles.scss'
type Props = {
    title: string;
    topTitle?: string;
    center?: boolean,
    iconclassName?: string
}

const SectionHeading = ({title, topTitle, center, iconclassName}: Props) => {
  return (
    <div className={`section-heading-container ${center ? 'center' : ''}`}>
        <h4 className='section-heading-top'>
            <span className='heading-icon'>
                {iconclassName && <i className={iconclassName}></i>}
             </span>
             
             <span className='heading-text'>
                {topTitle}
            </span>
        </h4>
        <h2 className='section-heading'>{title}</h2>
    </div>
  )
}

export default SectionHeading