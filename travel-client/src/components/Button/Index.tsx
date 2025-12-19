import './styles.scss'
type Props = {
    isLink?: boolean;
    text: string;
    link?: string;
    type?: 'main-button' | 'alternate-button';
}

const Button = ({isLink, text, link, type}: Props) => {
  return (
   isLink? <a className={type} href={link}>{text} <span><i className="fa-solid fa-arrow-right"></i></span></a> :  <button className={type}>{text} <span><i className="fa-solid fa-arrow-right"></i></span></button>
  )
}

export default Button