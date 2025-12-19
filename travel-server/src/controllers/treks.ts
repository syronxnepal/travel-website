import { Request, Response } from 'express';
import Trek from '../models/Trek';

export const getTreks = async (req: Request, res: Response) => {
  try {
    const treks = await Trek.find().sort({ createdAt: -1 });
    res.json({ success: true, data: treks });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getTrek = async (req: Request, res: Response) => {
  try {
    const trek = await Trek.findById(req.params.id);
    
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
    const trek = await Trek.create(req.body);
    res.status(201).json({ success: true, data: trek });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateTrek = async (req: Request, res: Response) => {
  try {
    const trek = await Trek.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!trek) {
      return res.status(404).json({ success: false, message: 'Trek not found' });
    }
    
    res.json({ success: true, data: trek });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteTrek = async (req: Request, res: Response) => {
  try {
    const trek = await Trek.findByIdAndDelete(req.params.id);
    
    if (!trek) {
      return res.status(404).json({ success: false, message: 'Trek not found' });
    }
    
    res.json({ success: true, message: 'Trek deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

