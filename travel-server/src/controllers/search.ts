import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Trek } from '../models/Trek';
import { Tour } from '../models/Tour';
import { ShortTour } from '../models/ShortTour';
import { Blog } from '../models/Blog';

export const search = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { q } = req.query;
    
    if (!q || typeof q !== 'string' || q.trim().length === 0) {
      return res.json({ 
        success: true, 
        data: {
          treks: [],
          tours: [],
          shortTours: [],
          blogs: []
        }
      });
    }

    const searchQuery = q.trim().toLowerCase();
    
    // Search in Treks
    const trekRepository = AppDataSource.getRepository(Trek);
    const treks = await trekRepository
      .createQueryBuilder('trek')
      .where('LOWER(trek.title) LIKE :query', { query: `%${searchQuery}%` })
      .orWhere('LOWER(trek.location) LIKE :query', { query: `%${searchQuery}%` })
      .orWhere('LOWER(trek.description) LIKE :query', { query: `%${searchQuery}%` })
      .getMany();

    // Search in Tours
    const tourRepository = AppDataSource.getRepository(Tour);
    const tours = await tourRepository
      .createQueryBuilder('tour')
      .where('LOWER(tour.title) LIKE :query', { query: `%${searchQuery}%` })
      .orWhere('LOWER(tour.location) LIKE :query', { query: `%${searchQuery}%` })
      .orWhere('LOWER(tour.description) LIKE :query', { query: `%${searchQuery}%` })
      .getMany();

    // Search in Short Tours
    const shortTourRepository = AppDataSource.getRepository(ShortTour);
    const shortTours = await shortTourRepository
      .createQueryBuilder('shortTour')
      .where('LOWER(shortTour.title) LIKE :query', { query: `%${searchQuery}%` })
      .orWhere('LOWER(shortTour.location) LIKE :query', { query: `%${searchQuery}%` })
      .orWhere('LOWER(shortTour.description) LIKE :query', { query: `%${searchQuery}%` })
      .getMany();

    // Search in Blogs
    const blogRepository = AppDataSource.getRepository(Blog);
    const blogs = await blogRepository
      .createQueryBuilder('blog')
      .where('LOWER(blog.title) LIKE :query', { query: `%${searchQuery}%` })
      .orWhere('LOWER(blog.content) LIKE :query', { query: `%${searchQuery}%` })
      .orWhere('LOWER(blog.excerpt) LIKE :query', { query: `%${searchQuery}%` })
      .getMany();

    return res.json({
      success: true,
      data: {
        treks: treks.slice(0, 10), // Limit to 10 results per category
        tours: tours.slice(0, 10),
        shortTours: shortTours.slice(0, 10),
        blogs: blogs.slice(0, 10)
      }
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

