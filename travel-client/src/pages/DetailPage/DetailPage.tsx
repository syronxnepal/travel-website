import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DetailHero from '../../components/DetailHero/DetailHero';
import DetailGallery from '../../components/DetailGallery/DetailGallery';
import DetailOverview from '../../components/DetailOverview/DetailOverview';
import DetailInfo from '../../components/DetailInfo/DetailInfo';
import DetailItinerary from '../../components/DetailItinerary/DetailItinerary';
import DetailBooking from '../../components/DetailBooking/DetailBooking';
import DetailFAQ from '../../components/DetailFAQ/DetailFAQ';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { tourData } from '../../assets/DummyData/TourData';
import { trekData } from '../../assets/DummyData/TrekData';
import './DetailPage.scss';

interface DetailPageProps {
  type: 'tour' | 'short-tour' | 'trek';
}

const DetailPage: React.FC<DetailPageProps> = ({ type }) => {
  const { tourId, trekId } = useParams<{ tourId?: string; trekId?: string }>();
  const navigate = useNavigate();
  
  // Get data based on type and ID
  let item = null;
  let backPath = '';
  
  if (type === 'trek' && trekId) {
    item = trekData.find(tr => Number(tr.id) === Number(trekId));
    backPath = '/trekking';
  } else if (type === 'tour' && tourId) {
    item = tourData.find(t => Number(t.id) === Number(tourId));
    backPath = '/tours';
  } else if (type === 'short-tour' && tourId) {
    item = tourData.find(t => Number(t.id) === Number(tourId));
    backPath = '/short-tours';
  }

  if (!item) {
    return (
      <div className="detail-page">
        <Header />
        <div className="detail-page__not-found">
          <h1>{type === 'trek' ? 'Trek' : 'Tour'} Not Found</h1>
          <p>The {type === 'trek' ? 'trek' : 'tour'} you're looking for doesn't exist.</p>
          <button 
            className="detail-page__back-btn"
            onClick={() => navigate(backPath)}
          >
            Back to {type === 'trek' ? 'Trekking' : type === 'tour' ? 'Tours' : 'Short Tours'}
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  // Transform data to common format
  const commonData = {
    id: item.id,
    title: item.title,
    location: item.location,
    rating: item.rating,
    reviewCount: item.reviewCount,
    duration: item.duration,
    difficulty: item.difficulty || 'Easy',
    price: item.price,
    originalPrice: (item as any).originalPrice || null,
    discount: (item as any).discount || null,
    image: (item as any).image || (item as any).images?.[0] || '',
    images: (item as any).images || [(item as any).image],
    description: (item as any).description || '',
    highlights: (item as any).highlights || [],
    included: (item as any).included || [],
    excluded: (item as any).excluded || [],
    tourInfo: (item as any).tourInfo || {},
    itinerary: (item as any).itinerary || [],
    category: (item as any).category || '',
    type: type
  };

  return (
    <div className="detail-page">
      <Header />
      
      <main className="detail-page__main">
            <DetailHero
              title={commonData.title}
              location={commonData.location}
              rating={commonData.rating}
              reviewCount={commonData.reviewCount}
              duration={commonData.duration}
              difficulty={commonData.difficulty}
              price={commonData.price}
              originalPrice={commonData.originalPrice}
              discount={commonData.discount}
              image={commonData.image}
              category={commonData.category}
              type={commonData.type}
            />

        <div className="detail-page__content">
          <div className="detail-page__left">
            <DetailGallery
              images={commonData.images}
              title={commonData.title}
            />

            <DetailOverview
              description={commonData.description}
              highlights={commonData.highlights}
              included={commonData.included}
              excluded={commonData.excluded}
            />

            <DetailInfo 
              tourInfo={commonData.tourInfo}
              type={commonData.type}
            />

            <DetailItinerary 
              itinerary={commonData.itinerary}
              type={commonData.type}
            />

            <DetailFAQ type={commonData.type} />
          </div>

          <div className="detail-page__right">
            <DetailBooking
              price={commonData.price}
              originalPrice={commonData.originalPrice}
              discount={commonData.discount}
              type={commonData.type}
              itemId={commonData.id.toString()}
              itemTitle={commonData.title}
              itemLocation={commonData.location}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DetailPage;
