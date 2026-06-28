import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { HeroSlider } from '../models/HeroSlider';

export const getHeroSliders = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const sliderRepository = AppDataSource.getRepository(HeroSlider);
    const sliders = await sliderRepository.find({
      order: { order: 'ASC', createdAt: 'DESC' }
    });
    return res.json({ success: true, data: sliders });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getHeroSlider = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const sliderRepository = AppDataSource.getRepository(HeroSlider);
    const slider = await sliderRepository.findOne({
      where: { id: parseInt(req.params.id) }
    });
    
    if (!slider) {
      return res.status(404).json({ success: false, message: 'Hero slider not found' });
    }
    
    return res.json({ success: true, data: slider });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createHeroSlider = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { image, title, paragraph, order, isActive } = req.body;

    // Validate required fields
    if (!image || !title || !paragraph) {
      return res.status(400).json({ 
        success: false, 
        message: 'Image, title, and paragraph are required' 
      });
    }

    // Validate image URL (must be a string)
    if (typeof image !== 'string' || image.trim().length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Image URL is required and must be a valid string' 
      });
    }

    const sliderRepository = AppDataSource.getRepository(HeroSlider);
    const slider = sliderRepository.create({
      image: image.trim(),
      title: title.trim(),
      paragraph: paragraph.trim(),
      order: order ? parseInt(order) || 0 : 0,
      isActive: isActive === undefined ? true : (isActive === true || isActive === 'true')
    });
    
    const savedSlider = await sliderRepository.save(slider);
    return res.status(201).json({ success: true, data: savedSlider });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const updateHeroSlider = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const sliderRepository = AppDataSource.getRepository(HeroSlider);
    const slider = await sliderRepository.findOne({
      where: { id: parseInt(req.params.id) }
    });
    
    if (!slider) {
      return res.status(404).json({ success: false, message: 'Hero slider not found' });
    }

    const { image, title, paragraph, order, isActive } = req.body;

    if (image !== undefined) {
      if (typeof image !== 'string' || image.trim().length === 0) {
        return res.status(400).json({ 
          success: false, 
          message: 'Image URL must be a valid string' 
        });
      }
      slider.image = image.trim();
    }

    if (title !== undefined) {
      slider.title = title.trim();
    }

    if (paragraph !== undefined) {
      slider.paragraph = paragraph.trim();
    }

    if (order !== undefined) {
      slider.order = parseInt(order) || 0;
    }

    if (isActive !== undefined) {
      slider.isActive = isActive === true || isActive === 'true';
    }
    
    const updatedSlider = await sliderRepository.save(slider);
    return res.json({ success: true, data: updatedSlider });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteHeroSlider = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const sliderRepository = AppDataSource.getRepository(HeroSlider);
    const slider = await sliderRepository.findOne({
      where: { id: parseInt(req.params.id) }
    });
    
    if (!slider) {
      return res.status(404).json({ success: false, message: 'Hero slider not found' });
    }
    
    await sliderRepository.remove(slider);
    return res.json({ success: true, message: 'Hero slider deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

