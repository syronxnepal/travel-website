import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { AboutWhyChooseUsItem } from '../models/AboutWhyChooseUsItem';

export const getAboutWhyChooseUsItems = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const itemRepository = AppDataSource.getRepository(AboutWhyChooseUsItem);
    const items = await itemRepository.find({
      where: { isActive: true },
      order: { order: 'ASC', createdAt: 'DESC' }
    });
    return res.json({ success: true, data: items });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getAboutWhyChooseUsItem = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const itemRepository = AppDataSource.getRepository(AboutWhyChooseUsItem);
    const item = await itemRepository.findOne({
      where: { id: parseInt(req.params.id) }
    });
    
    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }
    
    return res.json({ success: true, data: item });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createAboutWhyChooseUsItem = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { heading, paragraph, icon, order, isActive } = req.body;

    if (!heading || !paragraph || !icon) {
      return res.status(400).json({ 
        success: false, 
        message: 'Heading, paragraph, and icon are required' 
      });
    }

    const itemRepository = AppDataSource.getRepository(AboutWhyChooseUsItem);
    const item = itemRepository.create({
      heading: heading.trim(),
      paragraph: paragraph.trim(),
      icon: icon.trim(),
      order: order ? parseInt(order) || 0 : 0,
      isActive: isActive === undefined ? true : (isActive === true || isActive === 'true')
    });
    
    const savedItem = await itemRepository.save(item);
    return res.status(201).json({ success: true, data: savedItem });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const updateAboutWhyChooseUsItem = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const itemRepository = AppDataSource.getRepository(AboutWhyChooseUsItem);
    const item = await itemRepository.findOne({
      where: { id: parseInt(req.params.id) }
    });
    
    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }

    const { heading, paragraph, icon, order, isActive } = req.body;

    if (heading !== undefined) item.heading = heading.trim();
    if (paragraph !== undefined) item.paragraph = paragraph.trim();
    if (icon !== undefined) item.icon = icon.trim();
    if (order !== undefined) item.order = parseInt(order) || 0;
    if (isActive !== undefined) item.isActive = isActive === true || isActive === 'true';
    
    const updatedItem = await itemRepository.save(item);
    return res.json({ success: true, data: updatedItem });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteAboutWhyChooseUsItem = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const itemRepository = AppDataSource.getRepository(AboutWhyChooseUsItem);
    const item = await itemRepository.findOne({
      where: { id: parseInt(req.params.id) }
    });
    
    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }
    
    await itemRepository.remove(item);
    return res.json({ success: true, message: 'Item deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

