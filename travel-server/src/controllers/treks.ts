import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Trek } from '../models/Trek';

export const getTreks = async (req: Request, res: Response) => {
  try {
    const trekRepository = AppDataSource.getRepository(Trek);
    const treks = await trekRepository.find({
      order: { createdAt: 'DESC' }
    });
    res.json({ success: true, data: treks });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getTrek = async (req: Request, res: Response) => {
  try {
    const trekRepository = AppDataSource.getRepository(Trek);
    const trek = await trekRepository.findOne({
      where: { id: parseInt(req.params.id) }
    });
    
    if (!trek) {
      return res.status(404).json({ success: false, message: 'Trek not found' });
    }
    
    res.json({ success: true, data: trek });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createTrek = async (req: Request, res: Response) => {
  try {
    const trekRepository = AppDataSource.getRepository(Trek);
    const trek = trekRepository.create(req.body);
    const savedTrek = await trekRepository.save(trek);
    res.status(201).json({ success: true, data: savedTrek });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateTrek = async (req: Request, res: Response) => {
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
    res.json({ success: true, data: updatedTrek });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteTrek = async (req: Request, res: Response) => {
  try {
    const trekRepository = AppDataSource.getRepository(Trek);
    const trek = await trekRepository.findOne({
      where: { id: parseInt(req.params.id) }
    });
    
    if (!trek) {
      return res.status(404).json({ success: false, message: 'Trek not found' });
    }
    
    await trekRepository.remove(trek);
    res.json({ success: true, message: 'Trek deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

