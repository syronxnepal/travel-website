import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { GalleryImage } from '../models/GalleryImage';

export const getGalleryImages = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const imageRepository = AppDataSource.getRepository(GalleryImage);
    const categoryId = req.query.categoryId ? parseInt(req.query.categoryId as string) : undefined;
    
    const where: any = { isActive: true };
    if (categoryId) {
      where.categoryId = categoryId;
    }
    
    const images = await imageRepository.find({
      where,
      relations: ['category'],
      order: { order: 'ASC', createdAt: 'DESC' }
    });
    return res.json({ success: true, data: images });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getGalleryImage = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const imageRepository = AppDataSource.getRepository(GalleryImage);
    const image = await imageRepository.findOne({
      where: { id: parseInt(req.params.id) },
      relations: ['category']
    });
    
    if (!image) {
      return res.status(404).json({ success: false, message: 'Image not found' });
    }
    
    return res.json({ success: true, data: image });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createGalleryImage = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { title, alt, image, location, categoryId, size, order, isActive } = req.body;

    if (!title || !alt || !image || !categoryId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Title, alt, image, and categoryId are required' 
      });
    }

    const imageRepository = AppDataSource.getRepository(GalleryImage);
    const galleryImage = imageRepository.create({
      title: title.trim(),
      alt: alt.trim(),
      image: image.trim(),
      location: location?.trim(),
      categoryId: parseInt(categoryId),
      size: size || 'medium',
      order: order ? parseInt(order) || 0 : 0,
      isActive: isActive === undefined ? true : (isActive === true || isActive === 'true')
    });
    
    const savedImage = await imageRepository.save(galleryImage);
    const imageWithCategory = await imageRepository.findOne({
      where: { id: savedImage.id },
      relations: ['category']
    });
    return res.status(201).json({ success: true, data: imageWithCategory });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const updateGalleryImage = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const imageRepository = AppDataSource.getRepository(GalleryImage);
    const image = await imageRepository.findOne({
      where: { id: parseInt(req.params.id) }
    });
    
    if (!image) {
      return res.status(404).json({ success: false, message: 'Image not found' });
    }

    const { title, alt, image: imageUrl, location, categoryId, size, order, isActive } = req.body;

    if (title !== undefined) image.title = title.trim();
    if (alt !== undefined) image.alt = alt.trim();
    if (imageUrl !== undefined) image.image = imageUrl.trim();
    if (location !== undefined) image.location = location?.trim();
    if (categoryId !== undefined) image.categoryId = parseInt(categoryId);
    if (size !== undefined) image.size = size;
    if (order !== undefined) image.order = parseInt(order) || 0;
    if (isActive !== undefined) image.isActive = isActive === true || isActive === 'true';
    
    const updatedImage = await imageRepository.save(image);
    const imageWithCategory = await imageRepository.findOne({
      where: { id: updatedImage.id },
      relations: ['category']
    });
    return res.json({ success: true, data: imageWithCategory });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteGalleryImage = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const imageRepository = AppDataSource.getRepository(GalleryImage);
    const image = await imageRepository.findOne({
      where: { id: parseInt(req.params.id) }
    });
    
    if (!image) {
      return res.status(404).json({ success: false, message: 'Image not found' });
    }
    
    await imageRepository.remove(image);
    return res.json({ success: true, message: 'Image deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

