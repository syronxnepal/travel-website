import { DataSource } from 'typeorm';
import { User } from '../models/User';
import { Trek } from '../models/Trek';
import { Tour } from '../models/Tour';
import { ShortTour } from '../models/ShortTour';
import { Blog } from '../models/Blog';
import { Page } from '../models/Page';
import { Testimonial } from '../models/Testimonial';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'travel_cms',
  entities: [User, Trek, Tour, ShortTour, Blog, Page, Testimonial],
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

