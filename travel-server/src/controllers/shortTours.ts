import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { ShortTour } from '../models/ShortTour';

export const getShortTours = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const shortTourRepository = AppDataSource.getRepository(ShortTour);
    const shortTours = await shortTourRepository.find({
      order: { createdAt: 'DESC' }
    });
    return res.json({ success: true, data: shortTours });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getShortTour = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const shortTourRepository = AppDataSource.getRepository(ShortTour);
    const shortTour = await shortTourRepository.findOne({
      where: { id: parseInt(req.params.id) }
    });
    
    if (!shortTour) {
      return res.status(404).json({ success: false, message: 'Short tour not found' });
    }
    
    return res.json({ success: true, data: shortTour });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createShortTour = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { image, images, ...shortTourData } = req.body;

    // Validate required fields
    if (!shortTourData.title || !shortTourData.location || !shortTourData.description) {
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

    const shortTourRepository = AppDataSource.getRepository(ShortTour);
    const shortTour = shortTourRepository.create({
      title: shortTourData.title,
      location: shortTourData.location,
      category: shortTourData.category || 'Cultural',
      duration: shortTourData.duration,
      price: shortTourData.price,
      originalPrice: shortTourData.originalPrice || undefined,
      rating: shortTourData.rating || '0',
      reviewCount: shortTourData.reviewCount ? parseInt(shortTourData.reviewCount) || 0 : 0,
      image: imageUrl,
      images: imagesArray,
      description: shortTourData.description,
      difficulty: shortTourData.difficulty || undefined,
      groupSize: shortTourData.groupSize || undefined,
      highlights: Array.isArray(shortTourData.highlights) ? shortTourData.highlights : undefined,
      included: Array.isArray(shortTourData.included) ? shortTourData.included : undefined,
      excluded: Array.isArray(shortTourData.excluded) ? shortTourData.excluded : undefined,
      itinerary: Array.isArray(shortTourData.itinerary) ? shortTourData.itinerary : undefined,
      tourInfo: Array.isArray(shortTourData.tourInfo) ? shortTourData.tourInfo : undefined,
      faqs: Array.isArray(shortTourData.faqs) ? shortTourData.faqs : undefined,
      featured: shortTourData.featured === true || shortTourData.featured === 'true' || false,
    });
    
    const savedShortTour = await shortTourRepository.save(shortTour);
    return res.status(201).json({ success: true, data: savedShortTour });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const updateShortTour = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const shortTourRepository = AppDataSource.getRepository(ShortTour);
    const shortTour = await shortTourRepository.findOne({
      where: { id: parseInt(req.params.id) }
    });
    
    if (!shortTour) {
      return res.status(404).json({ success: false, message: 'Short tour not found' });
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

    // Ensure numeric fields are properly converted if provided
    if (updateData.originalPrice !== undefined) {
      updateData.originalPrice = updateData.originalPrice || undefined;
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

    // Handle optional string fields
    if (updateData.difficulty !== undefined) {
      updateData.difficulty = updateData.difficulty || undefined;
    }
    if (updateData.groupSize !== undefined) {
      updateData.groupSize = updateData.groupSize || undefined;
    }
    
    Object.assign(shortTour, updateData);
    const updatedShortTour = await shortTourRepository.save(shortTour);
    return res.json({ success: true, data: updatedShortTour });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteShortTour = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const shortTourRepository = AppDataSource.getRepository(ShortTour);
    const shortTour = await shortTourRepository.findOne({
      where: { id: parseInt(req.params.id) }
    });
    
    if (!shortTour) {
      return res.status(404).json({ success: false, message: 'Short tour not found' });
    }
    
    await shortTourRepository.remove(shortTour);
    return res.json({ success: true, message: 'Short tour deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

