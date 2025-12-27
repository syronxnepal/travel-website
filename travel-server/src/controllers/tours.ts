import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Tour } from '../models/Tour';

export const getTours = async (req: Request, res: Response) => {
  try {
    const tourRepository = AppDataSource.getRepository(Tour);
    const tours = await tourRepository.find({
      order: { createdAt: 'DESC' }
    });
    res.json({ success: true, data: tours });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getTour = async (req: Request, res: Response) => {
  try {
    const tourRepository = AppDataSource.getRepository(Tour);
    const tour = await tourRepository.findOne({
      where: { id: parseInt(req.params.id) }
    });
    
    if (!tour) {
      return res.status(404).json({ success: false, message: 'Tour not found' });
    }
    
    res.json({ success: true, data: tour });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createTour = async (req: Request, res: Response) => {
  try {
    const tourRepository = AppDataSource.getRepository(Tour);
    const tour = tourRepository.create(req.body);
    const savedTour = await tourRepository.save(tour);
    res.status(201).json({ success: true, data: savedTour });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateTour = async (req: Request, res: Response) => {
  try {
    const tourRepository = AppDataSource.getRepository(Tour);
    const tour = await tourRepository.findOne({
      where: { id: parseInt(req.params.id) }
    });
    
    if (!tour) {
      return res.status(404).json({ success: false, message: 'Tour not found' });
    }
    
    Object.assign(tour, req.body);
    const updatedTour = await tourRepository.save(tour);
    res.json({ success: true, data: updatedTour });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteTour = async (req: Request, res: Response) => {
  try {
    const tourRepository = AppDataSource.getRepository(Tour);
    const tour = await tourRepository.findOne({
      where: { id: parseInt(req.params.id) }
    });
    
    if (!tour) {
      return res.status(404).json({ success: false, message: 'Tour not found' });
    }
    
    await tourRepository.remove(tour);
    res.json({ success: true, message: 'Tour deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

