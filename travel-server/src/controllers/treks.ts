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
    const trekRepository = AppDataSource.getRepository(Trek);
    const trek = trekRepository.create(req.body);
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
    
    Object.assign(trek, req.body);
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

