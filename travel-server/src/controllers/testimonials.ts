import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Testimonial } from '../models/Testimonial';

export const getTestimonials = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const testimonialRepository = AppDataSource.getRepository(Testimonial);
    const testimonials = await testimonialRepository.find({
      where: { isActive: true },
      order: { createdAt: 'DESC' }
    });
    return res.json({ success: true, data: testimonials });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getTestimonial = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const testimonialRepository = AppDataSource.getRepository(Testimonial);
    const testimonial = await testimonialRepository.findOne({
      where: { id: parseInt(req.params.id) }
    });
    
    if (!testimonial) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }
    
    return res.json({ success: true, data: testimonial });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createTestimonial = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { name, role, image, rating, comment, isActive } = req.body;

    if (!name || !role || !image || !rating || !comment) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, role, image, rating, and comment are required' 
      });
    }

    const testimonialRepository = AppDataSource.getRepository(Testimonial);
    const testimonial = testimonialRepository.create({
      name: name.trim(),
      role: role.trim(),
      image: image.trim(),
      rating: parseInt(rating) || 5,
      comment: comment.trim(),
      isActive: isActive === undefined ? true : (isActive === true || isActive === 'true')
    });
    
    const savedTestimonial = await testimonialRepository.save(testimonial);
    return res.status(201).json({ success: true, data: savedTestimonial });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const updateTestimonial = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const testimonialRepository = AppDataSource.getRepository(Testimonial);
    const testimonial = await testimonialRepository.findOne({
      where: { id: parseInt(req.params.id) }
    });
    
    if (!testimonial) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }

    const { name, role, image, rating, comment, isActive } = req.body;

    if (name !== undefined) testimonial.name = name.trim();
    if (role !== undefined) testimonial.role = role.trim();
    if (image !== undefined) testimonial.image = image.trim();
    if (rating !== undefined) testimonial.rating = parseInt(rating) || 5;
    if (comment !== undefined) testimonial.comment = comment.trim();
    if (isActive !== undefined) testimonial.isActive = isActive === true || isActive === 'true';
    
    const updatedTestimonial = await testimonialRepository.save(testimonial);
    return res.json({ success: true, data: updatedTestimonial });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteTestimonial = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const testimonialRepository = AppDataSource.getRepository(Testimonial);
    const testimonial = await testimonialRepository.findOne({
      where: { id: parseInt(req.params.id) }
    });
    
    if (!testimonial) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }
    
    await testimonialRepository.remove(testimonial);
    return res.json({ success: true, message: 'Testimonial deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

