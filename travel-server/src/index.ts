import dotenv from 'dotenv';

// Load environment variables
dotenv.config();
import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import connectDB from './config/database';
import errorHandler from './middleware/errorHandler';

const app = express();

// Security middleware
app.use(helmet());

// CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));

// Stripe webhook route - must be before express.json() middleware
// This route needs raw body for signature verification
app.use('/api/stripe/webhook', express.raw({ type: 'application/json' }), async (req, res, next) => {
  const { handleWebhook } = await import('./controllers/stripe');
  handleWebhook(req, res, next);
});

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from uploads directory with CORS headers
app.use('/uploads', (req, res, next): void => {
  // Set CORS headers for image requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Max-Age', '86400'); // 24 hours
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
    return;
  }
  
  next();
}, express.static('uploads', {
  maxAge: '1d',
  etag: true,
  lastModified: true
}));

// Compression middleware
app.use(compression());

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Travel CMS Server is running',
    timestamp: new Date().toISOString()
  });
});

// Import routes
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import trekRoutes from './routes/treks';
import tourRoutes from './routes/tours';
import shortTourRoutes from './routes/shortTours';
import blogRoutes from './routes/blogs';
import blogCategoryRoutes from './routes/blogCategories';
import homePageSectionRoutes from './routes/homePageSections';
import heroSliderRoutes from './routes/heroSliders';
import aboutPageSectionRoutes from './routes/aboutPageSections';
import aboutWhyChooseUsItemRoutes from './routes/aboutWhyChooseUsItems';
import aboutMissionItemRoutes from './routes/aboutMissionItems';
import contactPageSectionRoutes from './routes/contactPageSections';
import contactSocialLinkRoutes from './routes/contactSocialLinks';
import galleryCategoryRoutes from './routes/galleryCategories';
import galleryImageRoutes from './routes/galleryImages';
import testimonialRoutes from './routes/testimonials';
import bookingRoutes from './routes/bookings';
import contactRoutes from './routes/contacts';
import pageRoutes from './routes/pages';
import cmsRoutes from './routes/cms';
import uploadRoutes from './routes/upload';
import mediaRoutes from './routes/media';
import wishlistRoutes from './routes/wishlists';
import searchRoutes from './routes/search';
import stripePaymentRoutes from './routes/stripe';

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/treks', trekRoutes);
app.use('/api/tours', tourRoutes);
app.use('/api/short-tours', shortTourRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/blog-categories', blogCategoryRoutes);
app.use('/api/home-page-sections', homePageSectionRoutes);
app.use('/api/hero-sliders', heroSliderRoutes);
app.use('/api/about-page-sections', aboutPageSectionRoutes);
app.use('/api/about-why-choose-us-items', aboutWhyChooseUsItemRoutes);
app.use('/api/about-mission-items', aboutMissionItemRoutes);
app.use('/api/contact-page-sections', contactPageSectionRoutes);
app.use('/api/contact-social-links', contactSocialLinkRoutes);
app.use('/api/gallery-categories', galleryCategoryRoutes);
app.use('/api/gallery-images', galleryImageRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/pages', pageRoutes);
app.use('/api/cms', cmsRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/wishlists', wishlistRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/stripe', stripePaymentRoutes);

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found' 
  });
});

// Connect to database
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

export default app;

