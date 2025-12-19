import { Link } from 'react-router-dom';
import './styles.scss';

interface Props {
    tour:{
        id: number;
        images: string[];
        location: string;
        duration: string;
        title: string;
        rating: number;
        price: string;

    }
}

const TrekCard = ({tour}:Props) => {
 

  // const renderStars = (rating: number) => {
  //   const stars = [];
  //   const fullStars = Math.floor(rating);
  //   const hasHalfStar = rating % 1 !== 0;

  //   for (let i = 0; i < fullStars; i++) {
  //     stars.push(
  //       <svg key={i} viewBox="0 0 24 24" fill="currentColor" className="star full">
  //         <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  //       </svg>
  //     );
  //   }

  //   if (hasHalfStar) {
  //     stars.push(
  //       <svg key="half" viewBox="0 0 24 24" fill="currentColor" className="star half">
  //         <defs>
  //           <linearGradient id="halfStar">
  //             <stop offset="50%" stopColor="currentColor" />
  //             <stop offset="50%" stopColor="#e5e7eb" />
  //           </linearGradient>
  //         </defs>
  //         <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="url(#halfStar)" />
  //       </svg>
  //     );
  //   }

  //   const emptyStars = 5 - Math.ceil(rating);
  //   for (let i = 0; i < emptyStars; i++) {
  //     stars.push(
  //       <svg key={`empty-${i}`} viewBox="0 0 24 24" fill="#e5e7eb" className="star empty">
  //         <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  //       </svg>
  //     );
  //   }

  //   return stars;
  // };

  return (

              <Link to={`/trekking/${tour?.id}`} key={tour?.id} className="top-tours__card card">
                <div className="top-tours__image">
                  <img src={tour?.images[0]} alt={tour?.title} />
                  <div className="top-tours__overlay">
                    <h3 className="top-tours__title">{tour?.title}</h3>
                    <div className="tour-meta">
                      <span className="top-tours__location"><span><i className="fa-solid fa-clock"></i></span>{tour?.duration}</span>
                      <div className="top-tours__price">{tour?.price}</div>

                    </div>

                  </div>
                </div>

                {/* <div className="top-tours__content">
                <h3 className="top-tours__title">{tour.title}</h3>
                <div className="top-tours__rating">
                  <div className="top-tours__stars">
                    {renderStars(tour.rating)}
                  </div>
                  <span className="top-tours__rating-text">{tour.rating}</span>
                </div>
                <div className="top-tours__price">{tour.price}</div>
              </div> */}
              </Link>
         
 
  );
};

export default TrekCard;
