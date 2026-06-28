import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Blog } from '../models/Blog';

export const getBlogs = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const blogRepository = AppDataSource.getRepository(Blog);
    const blogs = await blogRepository.find({
      order: { createdAt: 'DESC' }
    });
    return res.json({ success: true, data: blogs });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getBlog = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const blogRepository = AppDataSource.getRepository(Blog);
    const blog = await blogRepository.findOne({
      where: { id: parseInt(req.params.id) }
    });
    
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    
    return res.json({ success: true, data: blog });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createBlog = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { image, images, ...blogData } = req.body;

    // Validate required fields
    if (!blogData.title || !blogData.author || !blogData.content || !blogData.excerpt) {
      return res.status(400).json({ 
        success: false, 
        message: 'Title, author, content, and excerpt are required' 
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

    const blogRepository = AppDataSource.getRepository(Blog);
    const blog = blogRepository.create({
      title: blogData.title,
      author: blogData.author,
      category: blogData.category || 'General',
      image: imageUrl,
      images: imagesArray,
      content: blogData.content,
      excerpt: blogData.excerpt,
      date: blogData.date ? new Date(blogData.date) : new Date(),
      readTime: blogData.readTime || undefined,
      views: blogData.views ? parseInt(blogData.views) || 0 : 0,
      featured: blogData.featured === true || blogData.featured === 'true' || false,
      published: blogData.published === true || blogData.published === 'true' || false,
    });
    
    const savedBlog = await blogRepository.save(blog);
    return res.status(201).json({ success: true, data: savedBlog });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const updateBlog = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const blogRepository = AppDataSource.getRepository(Blog);
    const blog = await blogRepository.findOne({
      where: { id: parseInt(req.params.id) }
    });
    
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
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
    if (updateData.views !== undefined) {
      updateData.views = parseInt(updateData.views) || 0;
    }

    // Handle date conversion if provided
    if (updateData.date !== undefined) {
      updateData.date = new Date(updateData.date);
    }

    // Handle boolean fields
    if (updateData.featured !== undefined) {
      updateData.featured = updateData.featured === true || updateData.featured === 'true';
    }
    if (updateData.published !== undefined) {
      updateData.published = updateData.published === true || updateData.published === 'true';
    }

    // Handle optional string fields
    if (updateData.readTime !== undefined) {
      updateData.readTime = updateData.readTime || undefined;
    }
    
    Object.assign(blog, updateData);
    const updatedBlog = await blogRepository.save(blog);
    return res.json({ success: true, data: updatedBlog });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteBlog = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const blogRepository = AppDataSource.getRepository(Blog);
    const blog = await blogRepository.findOne({
      where: { id: parseInt(req.params.id) }
    });
    
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    
    await blogRepository.remove(blog);
    return res.json({ success: true, message: 'Blog deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

