import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage';
import OurStoryPage from './pages/OurStoryPage/OurStoryPage';
import WhyChooseUsPage from './pages/WhyChooseUsPage/WhyChooseUsPage';
import BlogsPage from './pages/BlogsPage/BlogsPage';
import GalleryPage from './pages/GalleryPage/GalleryPage';
import ContactPage from './pages/ContactPage/ContactPage';
import TrekkingPage from './pages/TrekkingPage/TrekkingPage';
import TrekDetailPage from './pages/TrekDetailPage/TrekDetailPage';
import ToursPage from './pages/ToursPage/ToursPage';
import ShortToursPage from './pages/ShortToursPage/ShortToursPage';
import CustomPackagesPage from './pages/CustomPackagesPage/CustomPackagesPage';
import TourDetailPage from './pages/TourDetailPage/TourDetailPage';
import ShortTourDetailPage from './pages/ShortTourDetailPage/ShortTourDetailPage';
import BookingPage from './pages/BookingPage/BookingPage';
import WishlistPage from './pages/WishlistPage/WishlistPage';
import AuthPage from './pages/AuthPage/AuthPage';
import CMS from './pages/CMS/CMS';
// Import CMS pages
import HeroPage from './pages/CMS/HeroPage/HeroPage';
import TreksPage from './pages/CMS/TreksPage/TreksPage';
import ToursCMSPage from './pages/CMS/ToursPage/ToursPage';
import WhyBookWithUsCMSPage from './pages/CMS/WhyBookWithUsPage/WhyBookWithUsPage';
import TestimonialsCMSPage from './pages/CMS/TestimonialsPage/TestimonialsPage';
import BlogSectionCMSPage from './pages/CMS/BlogSectionPage/BlogSectionPage';
import GallerySectionCMSPage from './pages/CMS/GallerySectionPage/GallerySectionPage';
// Import Home Page Section pages
import HeroSectionPage from './pages/CMS/HomePageSections/HeroSectionPage';
import TopTrekSectionPage from './pages/CMS/HomePageSections/TopTrekSectionPage';
import TopToursSectionPage from './pages/CMS/HomePageSections/TopToursSectionPage';
import TestimonialsSectionPage from './pages/CMS/HomePageSections/TestimonialsSectionPage';
import WhyChooseUsSectionPage from './pages/CMS/HomePageSections/WhyChooseUsSectionPage';
import BlogSectionPage from './pages/CMS/HomePageSections/BlogSectionPage';
// Import new management pages
import TrekManagement from './pages/CMS/TrekManagement/TrekManagement';
import TourManagement from './pages/CMS/TourManagement/TourManagement';
import ShortTourManagement from './pages/CMS/ShortTourManagement/ShortTourManagement';
import BlogManagement from './pages/CMS/BlogManagement/BlogManagement';
// Import form pages
import TourFormPage from './pages/CMS/TourFormPage/TourFormPage';
import TrekFormPage from './pages/CMS/TrekFormPage/TrekFormPage';
import BlogFormPage from './pages/CMS/BlogFormPage/BlogFormPage';
// Import category management pages
import GalleryCategoryManagement from './pages/CMS/GalleryCategoryManagement/GalleryCategoryManagement';
import BlogCategoryManagement from './pages/CMS/BlogCategoryManagement/BlogCategoryManagement';
// Import role management page
import RoleManagement from './pages/CMS/RoleManagement/RoleManagement';
import TestimonialManagement from './pages/CMS/TestimonialManagement/TestimonialManagement';
import BookingManagement from './pages/CMS/BookingManagement/BookingManagement';
import ContactManagement from './pages/CMS/ContactManagement/ContactManagement';
import Dashboard from './pages/CMS/Dashboard/Dashboard';
import UserManagement from './pages/CMS/UserManagement/UserManagement';
import UserProfile from './pages/CMS/UserProfile/UserProfile';
import AboutIntroSectionPage from './pages/CMS/AboutPageSections/AboutIntroSectionPage';
import AboutWhyChooseUsSectionPage from './pages/CMS/AboutPageSections/AboutWhyChooseUsSectionPage';
import ContactInfoPage from './pages/CMS/ContactPageSections/ContactInfoPage';
import PagesManagement from './pages/CMS/PagesManagement/PagesManagement';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Login from './components/Auth/Login';
import './App.scss';

function AppContent() {
  const location = useLocation();
  const isCMSRoute = location.pathname.startsWith('/cms');
  const isAuthRoute = location.pathname === '/auth';

  return (
    <div className="App">
      {!isCMSRoute && !isAuthRoute && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<OurStoryPage />} />
        <Route path="/our-story" element={<OurStoryPage />} />
        <Route path="/why-choose-us" element={<WhyChooseUsPage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/more" element={<CustomPackagesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/trekking" element={<TrekkingPage />} />
        <Route path="/trekking/:trekId" element={<TrekDetailPage />} />
        <Route path="/tours" element={<ToursPage />} />
        <Route path="/tours/:category" element={<ToursPage />} />
        <Route path="/tour/:tourId" element={<TourDetailPage />} />
        <Route path="/short-tours" element={<ShortToursPage />} />
        <Route path="/short-tours/:category" element={<ShortToursPage />} />
        <Route path="/short-tour/:tourId" element={<ShortTourDetailPage />} />
        <Route path="/custom-packages" element={<CustomPackagesPage />} />
        <Route path="/custom-packages/:category" element={<CustomPackagesPage />} />
        <Route path="/booking/:bookingType/:itemId" element={<BookingPage />} />
        <Route path="/signin" element={<AuthPage />} />
        <Route path="/auth" element={<Login />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        {/* CMS Routes - Protected */}
        <Route path="/cms" element={<ProtectedRoute><CMS /></ProtectedRoute>} />
        <Route path="/cms/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/cms/users/manage" element={<ProtectedRoute requiredRole="admin"><UserManagement /></ProtectedRoute>} />
        <Route path="/cms/users/roles" element={<ProtectedRoute requiredRole="admin"><RoleManagement /></ProtectedRoute>} />
        <Route path="/cms/users/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
        <Route path="/cms/hero" element={<ProtectedRoute><HeroPage /></ProtectedRoute>} />
        <Route path="/cms/treks" element={<ProtectedRoute><TreksPage /></ProtectedRoute>} />
        <Route path="/cms/tours" element={<ProtectedRoute><ToursCMSPage /></ProtectedRoute>} />
        <Route path="/cms/why-book-with-us" element={<ProtectedRoute><WhyBookWithUsCMSPage /></ProtectedRoute>} />
        <Route path="/cms/testimonials" element={<ProtectedRoute><TestimonialsCMSPage /></ProtectedRoute>} />
        <Route path="/cms/blog-section" element={<ProtectedRoute><BlogSectionCMSPage /></ProtectedRoute>} />
        <Route path="/cms/gallery-section" element={<ProtectedRoute><GallerySectionCMSPage /></ProtectedRoute>} />
        {/* Home Page Section Routes */}
        <Route path="/cms/home/hero-section" element={<ProtectedRoute><HeroSectionPage /></ProtectedRoute>} />
        <Route path="/cms/home/top-trek-section" element={<ProtectedRoute><TopTrekSectionPage /></ProtectedRoute>} />
        <Route path="/cms/home/top-tours-section" element={<ProtectedRoute><TopToursSectionPage /></ProtectedRoute>} />
        <Route path="/cms/home/testimonials-section" element={<ProtectedRoute><TestimonialsSectionPage /></ProtectedRoute>} />
        <Route path="/cms/home/why-choose-us-section" element={<ProtectedRoute><WhyChooseUsSectionPage /></ProtectedRoute>} />
        <Route path="/cms/home/blog-section" element={<ProtectedRoute><BlogSectionPage /></ProtectedRoute>} />
        
        {/* About Page Section Routes */}
        <Route path="/cms/about/intro-section" element={<ProtectedRoute><AboutIntroSectionPage /></ProtectedRoute>} />
        <Route path="/cms/about/why-choose-us" element={<ProtectedRoute><AboutWhyChooseUsSectionPage /></ProtectedRoute>} />
        
        {/* Contact Page Section Routes */}
        <Route path="/cms/contact/info" element={<ProtectedRoute><ContactInfoPage /></ProtectedRoute>} />
        
        {/* Management Routes - Protected */}
        <Route path="/cms/treks/manage" element={<ProtectedRoute><TrekManagement /></ProtectedRoute>} />
        <Route path="/cms/treks/form" element={<ProtectedRoute><TrekFormPage /></ProtectedRoute>} />
        <Route path="/cms/treks/form/:id" element={<ProtectedRoute><TrekFormPage /></ProtectedRoute>} />
        <Route path="/cms/tours/manage" element={<ProtectedRoute><TourManagement /></ProtectedRoute>} />
        <Route path="/cms/tours/form" element={<ProtectedRoute><TourFormPage /></ProtectedRoute>} />
        <Route path="/cms/tours/form/:id" element={<ProtectedRoute><TourFormPage /></ProtectedRoute>} />
        <Route path="/cms/tours/manage-short" element={<ProtectedRoute><ShortTourManagement /></ProtectedRoute>} />
        <Route path="/cms/blogs/manage" element={<ProtectedRoute><BlogManagement /></ProtectedRoute>} />
        <Route path="/cms/blogs/manage" element={<ProtectedRoute><BlogManagement /></ProtectedRoute>} />
        <Route path="/cms/blogs/form" element={<ProtectedRoute><BlogFormPage /></ProtectedRoute>} />
        <Route path="/cms/blogs/form/:id" element={<ProtectedRoute><BlogFormPage /></ProtectedRoute>} />
        <Route path="/cms/gallery/categories" element={<ProtectedRoute><GalleryCategoryManagement /></ProtectedRoute>} />
        <Route path="/cms/blogs/categories" element={<ProtectedRoute><BlogCategoryManagement /></ProtectedRoute>} />
        <Route path="/cms/testimonials/manage" element={<ProtectedRoute><TestimonialManagement /></ProtectedRoute>} />
        <Route path="/cms/bookings/manage" element={<ProtectedRoute><BookingManagement /></ProtectedRoute>} />
        <Route path="/cms/contacts/manage" element={<ProtectedRoute><ContactManagement /></ProtectedRoute>} />
        <Route path="/cms/pages/manage" element={<ProtectedRoute><PagesManagement /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
    <Router>
      <AppContent />
    </Router>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
