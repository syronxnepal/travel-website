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
    const shortTourRepository = AppDataSource.getRepository(ShortTour);
    const shortTour = shortTourRepository.create(req.body);
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
    
    Object.assign(shortTour, req.body);
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

