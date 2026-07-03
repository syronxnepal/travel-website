import { Request, Response } from 'express';
import { DeepPartial } from 'typeorm';
import { AppDataSource } from '../config/database';
import { Tour } from '../models/Tour';

export const getTours = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const tourRepository = AppDataSource.getRepository(Tour);
    const where: Record<string, any> = {};

    if (req.query.customActivity === 'true' || req.query.customActivity === '1') {
      where.customActivity = true;
    }

    const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;

    const tours = await tourRepository.find({
      where: Object.keys(where).length ? where : undefined,
      order: { createdAt: 'DESC' },
      take: limit
    });
    return res.json({ success: true, data: tours });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getTour = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const tourRepository = AppDataSource.getRepository(Tour);
    const tour = await tourRepository.findOne({
      where: { id: parseInt(req.params.id) }
    });
    
    if (!tour) {
      return res.status(404).json({ success: false, message: 'Tour not found' });
    }
    
    return res.json({ success: true, data: tour });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createTour = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { image, images, ...tourData } = req.body;

    // Validate required fields
    if (!tourData.title || !tourData.location || !tourData.description) {
      return res.status(400).json({ 
        success: false, 
        message: 'Title, location, and description are required' 
      });
    }

    // Validate image URL (must be a string)
    if (!image || typeof image !== 'string') {
      return res.status(400).json({ 
        success: false, 
        message: 'Image URL is required and must be a string' 
      });
    }

    // Ensure image is a valid URL string
    const imageUrl = image.trim();
    if (imageUrl.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Image URL cannot be empty' 
      });
    }

    // Validate images array if provided
    let imagesArray: string[] | undefined = undefined;
    if (images !== undefined) {
      if (!Array.isArray(images)) {
        return res.status(400).json({ 
          success: false, 
          message: 'Images must be an array' 
        });
      }
      imagesArray = images.filter((img: any) => typeof img === 'string' && img.trim().length > 0);
    }

    const tourRepository = AppDataSource.getRepository(Tour);
    const tour = tourRepository.create({
      title: tourData.title,
      location: tourData.location,
      category: tourData.category || 'Adventure',
      duration: tourData.duration,
      price: tourData.price,
      originalPrice: tourData.originalPrice || undefined,
      rating: tourData.rating || '0',
      reviewCount: tourData.reviewCount ? parseInt(tourData.reviewCount) || 0 : 0,
      image: imageUrl,
      images: imagesArray,
      description: tourData.description,
      difficulty: tourData.difficulty || undefined,
      groupSize: tourData.groupSize || undefined,
      highlights: Array.isArray(tourData.highlights) ? tourData.highlights : undefined,
      included: Array.isArray(tourData.included) ? tourData.included : undefined,
      excluded: Array.isArray(tourData.excluded) ? tourData.excluded : undefined,
      itinerary: Array.isArray(tourData.itinerary) ? tourData.itinerary : undefined,
      tourInfo: Array.isArray(tourData.tourInfo) ? tourData.tourInfo : undefined,
      faqs: Array.isArray(tourData.faqs) ? tourData.faqs : undefined,
      featured: tourData.featured === true || tourData.featured === 'true' || false,
      customActivity: tourData.customActivity === true || tourData.customActivity === 'true' || false,
    } as DeepPartial<Tour>);
    
    const savedTour = await tourRepository.save(tour);
    return res.status(201).json({ success: true, data: savedTour });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const updateTour = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const tourRepository = AppDataSource.getRepository(Tour);
    const tour = await tourRepository.findOne({
      where: { id: parseInt(req.params.id) }
    });
    
    if (!tour) {
      return res.status(404).json({ success: false, message: 'Tour not found' });
    }

    const { image, images, ...updateData } = req.body;

    // If image is provided, validate it's a string
    if (image !== undefined) {
      if (typeof image !== 'string') {
        return res.status(400).json({ 
          success: false, 
          message: 'Image must be a URL string' 
        });
      }
      
      const imageUrl = image.trim();
      if (imageUrl.length === 0) {
        return res.status(400).json({ 
          success: false, 
          message: 'Image URL cannot be empty' 
        });
      }
      
      updateData.image = imageUrl;
    }

    // Validate images array if provided
    if (images !== undefined) {
      if (!Array.isArray(images)) {
        return res.status(400).json({ 
          success: false, 
          message: 'Images must be an array' 
        });
      }
      updateData.images = images.filter((img: any) => typeof img === 'string' && img.trim().length > 0);
    }

    // Ensure numeric fields are properly converted if provided
    if (updateData.reviewCount !== undefined) {
      updateData.reviewCount = parseInt(updateData.reviewCount) || 0;
    }

    // Handle boolean fields
    if (updateData.featured !== undefined) {
      updateData.featured = updateData.featured === true || updateData.featured === 'true';
    }

    if (updateData.customActivity !== undefined) {
      updateData.customActivity = updateData.customActivity === true || updateData.customActivity === 'true';
    }

    // Ensure array fields are arrays
    if (updateData.highlights !== undefined) {
      updateData.highlights = Array.isArray(updateData.highlights) ? updateData.highlights : undefined;
    }
    if (updateData.included !== undefined) {
      updateData.included = Array.isArray(updateData.included) ? updateData.included : undefined;
    }
    if (updateData.excluded !== undefined) {
      updateData.excluded = Array.isArray(updateData.excluded) ? updateData.excluded : undefined;
    }
    if (updateData.itinerary !== undefined) {
      updateData.itinerary = Array.isArray(updateData.itinerary) ? updateData.itinerary : undefined;
    }
    if (updateData.tourInfo !== undefined) {
      updateData.tourInfo = Array.isArray(updateData.tourInfo) ? updateData.tourInfo : undefined;
    }
    if (updateData.faqs !== undefined) {
      updateData.faqs = Array.isArray(updateData.faqs) ? updateData.faqs : undefined;
    }
    
    Object.assign(tour, updateData);
    const updatedTour = await tourRepository.save(tour);
    return res.json({ success: true, data: updatedTour });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteTour = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const tourRepository = AppDataSource.getRepository(Tour);
    const tour = await tourRepository.findOne({
      where: { id: parseInt(req.params.id) }
    });
    
    if (!tour) {
      return res.status(404).json({ success: false, message: 'Tour not found' });
    }
    
    await tourRepository.remove(tour);
    return res.json({ success: true, message: 'Tour deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

