import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { AboutMissionItem } from '../models/AboutMissionItem';

export const getAboutMissionItems = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const itemRepository = AppDataSource.getRepository(AboutMissionItem);
    const items = await itemRepository.find({
      where: { isActive: true },
      order: { order: 'ASC', createdAt: 'DESC' }
    });
    return res.json({ success: true, data: items });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getAboutMissionItem = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const itemRepository = AppDataSource.getRepository(AboutMissionItem);
    const item = await itemRepository.findOne({
      where: { id: parseInt(req.params.id) }
    });
    
    if (!item) {
      return res.status(404).json({ success: false, message: 'Mission item not found' });
    }
    
    return res.json({ success: true, data: item });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createAboutMissionItem = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { heading, paragraph, order, isActive } = req.body;

    if (!heading || !paragraph) {
      return res.status(400).json({ 
        success: false, 
        message: 'Heading and paragraph are required' 
      });
    }

    const itemRepository = AppDataSource.getRepository(AboutMissionItem);
    const item = itemRepository.create({
      heading: heading.trim(),
      paragraph: paragraph.trim(),
      order: order ? parseInt(order) || 0 : 0,
      isActive: isActive === undefined ? true : (isActive === true || isActive === 'true')
    });
    
    const savedItem = await itemRepository.save(item);
    return res.status(201).json({ success: true, data: savedItem });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const updateAboutMissionItem = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const itemRepository = AppDataSource.getRepository(AboutMissionItem);
    const item = await itemRepository.findOne({
      where: { id: parseInt(req.params.id) }
    });
    
    if (!item) {
      return res.status(404).json({ success: false, message: 'Mission item not found' });
    }

    const { heading, paragraph, order, isActive } = req.body;

    if (heading !== undefined) item.heading = heading.trim();
    if (paragraph !== undefined) item.paragraph = paragraph.trim();
    if (order !== undefined) item.order = parseInt(order) || 0;
    if (isActive !== undefined) item.isActive = isActive === true || isActive === 'true';
    
    const updatedItem = await itemRepository.save(item);
    return res.json({ success: true, data: updatedItem });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteAboutMissionItem = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const itemRepository = AppDataSource.getRepository(AboutMissionItem);
    const item = await itemRepository.findOne({
      where: { id: parseInt(req.params.id) }
    });
    
    if (!item) {
      return res.status(404).json({ success: false, message: 'Mission item not found' });
    }
    
    await itemRepository.remove(item);
    return res.json({ success: true, message: 'Mission item deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

