import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { GalleryCategory } from '../models/GalleryCategory';

export const getGalleryCategories = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const categoryRepository = AppDataSource.getRepository(GalleryCategory);
    const categories = await categoryRepository.find({
      where: { isActive: true },
      order: { order: 'ASC', createdAt: 'DESC' }
    });
    return res.json({ success: true, data: categories });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getGalleryCategory = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const categoryRepository = AppDataSource.getRepository(GalleryCategory);
    const category = await categoryRepository.findOne({
      where: { id: parseInt(req.params.id) }
    });
    
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    
    return res.json({ success: true, data: category });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createGalleryCategory = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { name, slug, description, order, isActive } = req.body;

    if (!name) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name is required' 
      });
    }

    // Generate slug from name if not provided
    const categorySlug = slug || name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    const categoryRepository = AppDataSource.getRepository(GalleryCategory);
    
    // Check if slug already exists
    const existing = await categoryRepository.findOne({
      where: { slug: categorySlug }
    });
    
    if (existing) {
      return res.status(400).json({ 
        success: false, 
        message: 'Category with this slug already exists' 
      });
    }

    const category = categoryRepository.create({
      name: name.trim(),
      slug: categorySlug,
      description: description?.trim(),
      order: order ? parseInt(order) || 0 : 0,
      isActive: isActive === undefined ? true : (isActive === true || isActive === 'true')
    });
    
    const savedCategory = await categoryRepository.save(category);
    return res.status(201).json({ success: true, data: savedCategory });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const updateGalleryCategory = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const categoryRepository = AppDataSource.getRepository(GalleryCategory);
    const category = await categoryRepository.findOne({
      where: { id: parseInt(req.params.id) }
    });
    
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    const { name, slug, description, order, isActive } = req.body;

    if (name !== undefined) category.name = name.trim();
    if (slug !== undefined) {
      const categorySlug = slug.trim();
      // Check if slug already exists (excluding current category)
      const existing = await categoryRepository.findOne({
        where: { slug: categorySlug }
      });
      if (existing && existing.id !== category.id) {
        return res.status(400).json({ 
          success: false, 
          message: 'Category with this slug already exists' 
        });
      }
      category.slug = categorySlug;
    }
    if (description !== undefined) category.description = description?.trim();
    if (order !== undefined) category.order = parseInt(order) || 0;
    if (isActive !== undefined) category.isActive = isActive === true || isActive === 'true';
    
    const updatedCategory = await categoryRepository.save(category);
    return res.json({ success: true, data: updatedCategory });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteGalleryCategory = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const categoryRepository = AppDataSource.getRepository(GalleryCategory);
    const category = await categoryRepository.findOne({
      where: { id: parseInt(req.params.id) }
    });
    
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    
    await categoryRepository.remove(category);
    return res.json({ success: true, message: 'Category deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

