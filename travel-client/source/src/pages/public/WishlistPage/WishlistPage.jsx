import Header from '../../../components/common/Header/Header'
import Footer from '../../../components/common/Footer/Footer'
import PageHero from '../../../components/common/PageHero/PageHero'
import TourCard from '../../../components/tours/TourCard/TourCard'
import { useWishlist } from '../../../context/WishlistContext'
import './WishlistPage.css'

function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist()

  return (
    <div className="wishlist-page">
      <Header />
      <PageHero title="My Wishlist" subtitle="Adventures you've saved for later" breadcrumb="Home / Wishlist" />

      <section className="section">
        <div className="container">
          {wishlist.length === 0 ? (
            <div className="wishlist-page__empty">
              <i className="fa-regular fa-heart"></i>
              <h2>Your wishlist is empty</h2>
              <p>Save tours and treks you're interested in by clicking the heart icon.</p>
            </div>
          ) : (
            <>
              <p className="wishlist-page__count">{wishlist.length} item{wishlist.length !== 1 ? 's' : ''} saved</p>
              <div className="wishlist-slider">
                {wishlist.map((item) => (
                  <div key={`${item.type}-${item.id}`} className="wishlist-slider__item">
                    <TourCard tour={{ _id: item.id, title: item.title, image: item.image, price: item.price }} type={item.type} />
                    <button className="wishlist-slider__remove" onClick={() => removeFromWishlist(item.id, item.type)}>
                      <i className="fa-solid fa-trash"></i> Remove
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default WishlistPage
