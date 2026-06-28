import { DataSource } from 'typeorm';
import { User } from '../models/User';
import { Trek } from '../models/Trek';
import { Tour } from '../models/Tour';
import { ShortTour } from '../models/ShortTour';
import { Blog } from '../models/Blog';
import { BlogCategory } from '../models/BlogCategory';
import { Page } from '../models/Page';
import { Testimonial } from '../models/Testimonial';
import { Media } from '../models/Media';
import { HomePageSection } from '../models/HomePageSection';
import { HeroSlider } from '../models/HeroSlider';
import { AboutPageSection } from '../models/AboutPageSection';
import { AboutWhyChooseUsItem } from '../models/AboutWhyChooseUsItem';
import { AboutMissionItem } from '../models/AboutMissionItem';
import { ContactPageSection } from '../models/ContactPageSection';
import { ContactSocialLink } from '../models/ContactSocialLink';
import { GalleryCategory } from '../models/GalleryCategory';
import { GalleryImage } from '../models/GalleryImage';
import { Booking } from '../models/Booking';
import { Contact } from '../models/Contact';
import { Wishlist } from '../models/Wishlist';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [
    User, Trek, Tour, ShortTour, Blog, BlogCategory, Page, Testimonial, Media, 
    HomePageSection, HeroSlider, AboutPageSection, AboutWhyChooseUsItem, AboutMissionItem,
    ContactPageSection, ContactSocialLink, GalleryCategory, GalleryImage, Booking, Contact, Wishlist
  ],
  synchronize: process.env.NODE_ENV !== 'production', // Auto-create tables in dev
  logging: process.env.NODE_ENV === 'development',
});

const connectDB = async () => {
  try {
    await AppDataSource.initialize();
    const options = AppDataSource.options as any;
    console.log(`✅ PostgreSQL Connected: ${options.host}:${options.port}/${options.database}`);
  } catch (error) {
    console.error('❌ PostgreSQL connection error:', error);
    process.exit(1);
  }
};

export default connectDB;

