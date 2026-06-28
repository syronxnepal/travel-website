import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { BlogCategory } from '../models/BlogCategory';

export const getBlogCategories = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const categoryRepository = AppDataSource.getRepository(BlogCategory);
    const categories = await categoryRepository.find({
      order: { name: 'ASC' }
    });
    return res.json({ success: true, data: categories });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getBlogCategory = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const categoryRepository = AppDataSource.getRepository(BlogCategory);
    const category = await categoryRepository.findOne({
      where: { id: parseInt(req.params.id) }
    });
    
    if (!category) {
      return res.status(404).json({ success: false, message: 'Blog category not found' });
    }
    
    return res.json({ success: true, data: category });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createBlogCategory = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { name, slug, description, isActive } = req.body;

    // Validate required fields
    if (!name || !slug) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name and slug are required' 
      });
    }

    // Validate slug format
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (!slugRegex.test(slug)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Slug must be lowercase alphanumeric with hyphens only' 
      });
    }

    const categoryRepository = AppDataSource.getRepository(BlogCategory);
    
    // Check if slug already exists
    const existingCategory = await categoryRepository.findOne({
      where: [{ slug }, { name }]
    });
    
    if (existingCategory) {
      return res.status(400).json({ 
        success: false, 
        message: 'Category with this name or slug already exists' 
      });
    }

    const category = categoryRepository.create({
      name: name.trim(),
      slug: slug.trim().toLowerCase(),
      description: description?.trim() || undefined,
      isActive: isActive === true || isActive === 'true' || true,
    });
    
    const savedCategory = await categoryRepository.save(category);
    return res.status(201).json({ success: true, data: savedCategory });
  } catch (error: any) {
    // Handle unique constraint violation
    if (error.code === '23505') {
      return res.status(400).json({ 
        success: false, 
        message: 'Category with this name or slug already exists' 
      });
    }
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const updateBlogCategory = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const categoryRepository = AppDataSource.getRepository(BlogCategory);
    const category = await categoryRepository.findOne({
      where: { id: parseInt(req.params.id) }
    });
    
    if (!category) {
      return res.status(404).json({ success: false, message: 'Blog category not found' });
    }

    const { name, slug, description, isActive } = req.body;
    const updateData: any = {};

    if (name !== undefined) {
      updateData.name = name.trim();
    }

    if (slug !== undefined) {
      // Validate slug format
      const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
      if (!slugRegex.test(slug)) {
        return res.status(400).json({ 
          success: false, 
          message: 'Slug must be lowercase alphanumeric with hyphens only' 
        });
      }
      updateData.slug = slug.trim().toLowerCase();
    }

    if (description !== undefined) {
      updateData.description = description?.trim() || undefined;
    }

    if (isActive !== undefined) {
      updateData.isActive = isActive === true || isActive === 'true';
    }

    // Check for duplicate name or slug if updating
    if (updateData.name || updateData.slug) {
      const existingCategory = await categoryRepository.findOne({
        where: [
          updateData.name ? { name: updateData.name } : {},
          updateData.slug ? { slug: updateData.slug } : {}
        ]
      });
      
      if (existingCategory && existingCategory.id !== category.id) {
        return res.status(400).json({ 
          success: false, 
          message: 'Category with this name or slug already exists' 
        });
      }
    }
    
    Object.assign(category, updateData);
    const updatedCategory = await categoryRepository.save(category);
    return res.json({ success: true, data: updatedCategory });
  } catch (error: any) {
    // Handle unique constraint violation
    if (error.code === '23505') {
      return res.status(400).json({ 
        success: false, 
        message: 'Category with this name or slug already exists' 
      });
    }
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteBlogCategory = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const categoryRepository = AppDataSource.getRepository(BlogCategory);
    const category = await categoryRepository.findOne({
      where: { id: parseInt(req.params.id) }
    });
    
    if (!category) {
      return res.status(404).json({ success: false, message: 'Blog category not found' });
    }
    
    await categoryRepository.remove(category);
    return res.json({ success: true, message: 'Blog category deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

