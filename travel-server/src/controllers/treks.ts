import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Trek } from '../models/Trek';

export const getTreks = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const trekRepository = AppDataSource.getRepository(Trek);
    const treks = await trekRepository.find({
      order: { createdAt: 'DESC' }
    });
    return res.json({ success: true, data: treks });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getTrek = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const trekRepository = AppDataSource.getRepository(Trek);
    const trek = await trekRepository.findOne({
      where: { id: parseInt(req.params.id) }
    });
    
    if (!trek) {
      return res.status(404).json({ success: false, message: 'Trek not found' });
    }
    
    return res.json({ success: true, data: trek });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createTrek = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { image, ...trekData } = req.body;

    // Validate required fields
    if (!trekData.title || !trekData.location || !trekData.description) {
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

    // Ensure image is a valid URL string (can be relative or absolute)
    const imageUrl = image.trim();
    if (imageUrl.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Image URL cannot be empty' 
      });
    }

    const trekRepository = AppDataSource.getRepository(Trek);
    const trek = trekRepository.create({
      ...trekData,
      image: imageUrl, // Store the image URL string
      // Ensure numeric fields are properly converted
      reviewCount: trekData.reviewCount ? parseInt(trekData.reviewCount) || 0 : 0,
    });
    
    const savedTrek = await trekRepository.save(trek);
    return res.status(201).json({ success: true, data: savedTrek });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const updateTrek = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const trekRepository = AppDataSource.getRepository(Trek);
    const trek = await trekRepository.findOne({
      where: { id: parseInt(req.params.id) }
    });
    
    if (!trek) {
      return res.status(404).json({ success: false, message: 'Trek not found' });
    }

    const { image, ...updateData } = req.body;

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

    // Ensure numeric fields are properly converted if provided
    if (updateData.reviewCount !== undefined) {
      updateData.reviewCount = parseInt(updateData.reviewCount) || 0;
    }
    
    Object.assign(trek, updateData);
    const updatedTrek = await trekRepository.save(trek);
    return res.json({ success: true, data: updatedTrek });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteTrek = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const trekRepository = AppDataSource.getRepository(Trek);
    const trek = await trekRepository.findOne({
      where: { id: parseInt(req.params.id) }
    });
    
    if (!trek) {
      return res.status(404).json({ success: false, message: 'Trek not found' });
    }
    
    await trekRepository.remove(trek);
    return res.json({ success: true, message: 'Trek deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

