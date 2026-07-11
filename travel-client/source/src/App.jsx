import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ToastProvider } from './context/ToastContext'
import { WishlistProvider } from './context/WishlistContext'

// Public Pages
import HomePage from './pages/public/HomePage/HomePage'
import BlogsPage from './pages/public/BlogsPage/BlogsPage'
import BlogDetailPage from './pages/public/BlogDetailPage/BlogDetailPage'
import ToursPage from './pages/public/ToursPage/ToursPage'
import TourDetailPage from './pages/public/TourDetailPage/TourDetailPage'
import TrekkingPage from './pages/public/TrekkingPage/TrekkingPage'
import TrekkingDetailPage from './pages/public/TrekkingDetailPage/TrekkingDetailPage'
import ShortToursPage from './pages/public/ShortToursPage/ShortToursPage'
import ShortTourDetailPage from './pages/public/ShortTourDetailPage/ShortTourDetailPage'
import CustomPackagesPage from './pages/public/CustomPackagesPage/CustomPackagesPage'
import GalleryPage from './pages/public/GalleryPage/GalleryPage'
import ContactPage from './pages/public/ContactPage/ContactPage'
import OurStoryPage from './pages/public/OurStoryPage/OurStoryPage'
import WhyChooseUsPage from './pages/public/WhyChooseUsPage/WhyChooseUsPage'
import BookingPage from './pages/public/BookingPage/BookingPage'
import AuthPage from './pages/public/AuthPage/AuthPage'
import ProfilePage from './pages/public/ProfilePage/ProfilePage'
import WishlistPage from './pages/public/WishlistPage/WishlistPage'
import MorePage from './pages/public/MorePage/MorePage'
import SearchResultsPage from './pages/public/SearchResultsPage/SearchResultsPage'

// CMS Pages
import CMSLayout from './components/cms/CMSLayout/CMSLayout'
import ProtectedRoute from './components/cms/ProtectedRoute/ProtectedRoute'
import DashboardPage from './pages/cms/DashboardPage/DashboardPage'

// CMS - Home Sections
import HeroSectionCMS from './pages/cms/home/HeroSectionCMS/HeroSectionCMS'
import TopToursSectionCMS from './pages/cms/home/TopToursSectionCMS/TopToursSectionCMS'
import TopTrekSectionCMS from './pages/cms/home/TopTrekSectionCMS/TopTrekSectionCMS'
import BlogSectionCMS from './pages/cms/home/BlogSectionCMS/BlogSectionCMS'
import GallerySectionCMSHome from './pages/cms/home/GallerySectionCMS/GallerySectionCMS'
import TestimonialsSectionCMS from './pages/cms/home/TestimonialsSectionCMS/TestimonialsSectionCMS'
import ReachUsSectionCMS from './pages/cms/home/ReachUsSectionCMS/ReachUsSectionCMS'
import WhyChooseUsSectionCMS from './pages/cms/home/WhyChooseUsSectionCMS/WhyChooseUsSectionCMS'

// CMS - About
import AboutIntroSectionCMS from './pages/cms/about/AboutIntroSectionCMS/AboutIntroSectionCMS'
import AboutWhyChooseUsCMS from './pages/cms/about/AboutWhyChooseUsCMS/AboutWhyChooseUsCMS'
import AboutMissionItemsCMS from './pages/cms/about/AboutMissionItemsCMS/AboutMissionItemsCMS'

// CMS - Hero
import HeroCMS from './pages/cms/HeroCMS/HeroCMS'

// CMS - Gallery
import GallerySectionCMS from './pages/cms/gallery/GallerySectionCMS/GallerySectionCMS'
import GalleryCategoriesCMS from './pages/cms/gallery/GalleryCategoriesCMS/GalleryCategoriesCMS'

// CMS - Blogs
import ManageBlogsCMS from './pages/cms/blogs/ManageBlogsCMS/ManageBlogsCMS'
import BlogFormCMS from './pages/cms/blogs/BlogFormCMS/BlogFormCMS'
import BlogCategoriesCMS from './pages/cms/blogs/BlogCategoriesCMS/BlogCategoriesCMS'

// CMS - Tours
import TourFormCMS from './pages/cms/tours/TourFormCMS/TourFormCMS'
import ManageToursCMS from './pages/cms/tours/ManageToursCMS/ManageToursCMS'
import ManageShortToursCMS from './pages/cms/tours/ManageShortToursCMS/ManageShortToursCMS'
import SeedToursPage from './pages/cms/tours/SeedToursPage/SeedToursPage'

// CMS - Treks
import TrekFormCMS from './pages/cms/treks/TrekFormCMS/TrekFormCMS'
import ManageTreksCMS from './pages/cms/treks/ManageTreksCMS/ManageTreksCMS'

// CMS - Short Tours
import ShortTourFormCMS from './pages/cms/short-tours/ShortTourFormCMS/ShortTourFormCMS'

// CMS - Testimonials
import TestimonialsCMS from './pages/cms/testimonials/TestimonialsCMS/TestimonialsCMS'
import ManageTestimonialsCMS from './pages/cms/testimonials/ManageTestimonialsCMS/ManageTestimonialsCMS'

// CMS - Bookings / Contacts / Users / Pages / WhyBook
import ManageBookingsCMS from './pages/cms/bookings/ManageBookingsCMS/ManageBookingsCMS'
import ManageContactsCMS from './pages/cms/contacts/ManageContactsCMS/ManageContactsCMS'
import ContactInfoCMS from './pages/cms/contacts/ContactInfoCMS/ContactInfoCMS'
import WhyBookWithUsCMS from './pages/cms/WhyBookWithUsCMS/WhyBookWithUsCMS'
import ManageUsersCMS from './pages/cms/users/ManageUsersCMS/ManageUsersCMS'
import UserProfileCMS from './pages/cms/users/UserProfileCMS/UserProfileCMS'
import UserRolesCMS from './pages/cms/users/UserRolesCMS/UserRolesCMS'
import ManagePagesCMS from './pages/cms/pages/ManagePagesCMS/ManagePagesCMS'

const router = createBrowserRouter([
  // Public routes
  { path: '/', element: <HomePage /> },
  { path: '/about', element: <Navigate to="/our-story" replace /> },
  { path: '/blogs', element: <BlogsPage /> },
  { path: '/blog/:id', element: <BlogDetailPage /> },
  { path: '/blogs/:blogId', element: <BlogDetailPage /> },
  { path: '/search', element: <SearchResultsPage /> },
  { path: '/tours', element: <ToursPage /> },
  { path: '/tours/:category', element: <ToursPage /> },
  { path: '/tour/:tourId', element: <TourDetailPage /> },
  { path: '/trekking', element: <TrekkingPage /> },
  { path: '/trekking/:trekId', element: <TrekkingDetailPage /> },
  { path: '/short-tours', element: <ShortToursPage /> },
  { path: '/short-tours/:category', element: <ShortToursPage /> },
  { path: '/short-tour/:tourId', element: <ShortTourDetailPage /> },
  { path: '/custom-packages', element: <CustomPackagesPage /> },
  { path: '/custom-packages/:category', element: <CustomPackagesPage /> },
  { path: '/gallery', element: <GalleryPage /> },
  { path: '/contact', element: <ContactPage /> },
  { path: '/our-story', element: <OurStoryPage /> },
  { path: '/why-choose-us', element: <WhyChooseUsPage /> },
  { path: '/more', element: <MorePage /> },
  { path: '/booking/:bookingType/:itemId', element: <BookingPage /> },
  { path: '/signin', element: <AuthPage /> },
  { path: '/auth', element: <AuthPage /> },
  { path: '/profile', element: <ProfilePage /> },
  { path: '/wishlist', element: <WishlistPage /> },

  // CMS routes
  {
    path: '/cms',
    element: <ProtectedRoute><CMSLayout /></ProtectedRoute>,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'dashboard', element: <DashboardPage /> },

      // Hero
      { path: 'hero', element: <HeroCMS /> },

      // Home sections
      { path: 'home/hero-section', element: <HeroSectionCMS /> },
      { path: 'home/top-tours-section', element: <TopToursSectionCMS /> },
      { path: 'home/top-trek-section', element: <TopTrekSectionCMS /> },
      { path: 'home/blog-section', element: <BlogSectionCMS /> },
      { path: 'home/gallery-section', element: <GallerySectionCMSHome /> },
      { path: 'home/testimonials-section', element: <TestimonialsSectionCMS /> },
      { path: 'home/reach-us-section', element: <ReachUsSectionCMS /> },
      { path: 'home/why-choose-us-section', element: <WhyChooseUsSectionCMS /> },

      // About
      { path: 'about/intro-section', element: <AboutIntroSectionCMS /> },
      { path: 'about/mission-items', element: <AboutMissionItemsCMS /> },
      { path: 'about/why-choose-us', element: <AboutWhyChooseUsCMS /> },

      // Gallery
      { path: 'gallery-section', element: <GallerySectionCMS /> },
      { path: 'gallery/categories', element: <GalleryCategoriesCMS /> },

      // Blog
      { path: 'blog-section', element: <BlogSectionCMS /> },
      { path: 'blogs/categories', element: <BlogCategoriesCMS /> },
      { path: 'blogs/manage', element: <ManageBlogsCMS /> },
      { path: 'blogs/form', element: <BlogFormCMS /> },
      { path: 'blogs/form/:id', element: <BlogFormCMS /> },

      // Tours
      { path: 'tours', element: <ManageToursCMS /> },
      { path: 'tours/form', element: <TourFormCMS /> },
      { path: 'tours/form/:id', element: <TourFormCMS /> },
      { path: 'tours/manage', element: <ManageToursCMS /> },
      { path: 'tours/manage-short', element: <ManageShortToursCMS /> },
      { path: 'tours/seed', element: <SeedToursPage /> },

      // Treks
      { path: 'treks', element: <ManageTreksCMS /> },
      { path: 'treks/form', element: <TrekFormCMS /> },
      { path: 'treks/form/:id', element: <TrekFormCMS /> },
      { path: 'treks/manage', element: <ManageTreksCMS /> },

      // Short Tours
      { path: 'short-tours/form', element: <ShortTourFormCMS /> },
      { path: 'short-tours/form/:id', element: <ShortTourFormCMS /> },

      // Testimonials
      { path: 'testimonials', element: <TestimonialsCMS /> },
      { path: 'testimonials/manage', element: <ManageTestimonialsCMS /> },

      // Bookings
      { path: 'bookings/manage', element: <ManageBookingsCMS /> },

      // Contacts
      { path: 'contacts/manage', element: <ManageContactsCMS /> },
      { path: 'contact/info', element: <ContactInfoCMS /> },

      // Why Book With Us
      { path: 'why-book-with-us', element: <WhyBookWithUsCMS /> },

      // Users
      { path: 'users/manage', element: <ManageUsersCMS /> },
      { path: 'users/profile', element: <UserProfileCMS /> },
      { path: 'users/roles', element: <UserRolesCMS /> },

      // Pages
      { path: 'pages/manage', element: <ManagePagesCMS /> },
    ],
  },
])

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <WishlistProvider>
          <RouterProvider router={router} />
        </WishlistProvider>
      </ToastProvider>
    </AuthProvider>
  )
}

export default App
