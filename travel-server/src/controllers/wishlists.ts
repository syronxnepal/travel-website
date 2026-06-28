import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Wishlist } from '../models/Wishlist';
import { Trek } from '../models/Trek';
import { Tour } from '../models/Tour';
import { ShortTour } from '../models/ShortTour';

export const getWishlists = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const wishlistRepository = AppDataSource.getRepository(Wishlist);
    const { userId } = req.query;
    
    const where: any = {};
    if (userId) where.userId = parseInt(userId as string);
    
    const wishlists = await wishlistRepository.find({
      where,
      order: { createdAt: 'DESC' }
    });
    
    // Fetch full item details for each wishlist item
    const wishlistItems = await Promise.all(wishlists.map(async (wishlist) => {
      let item: any = null;
      
      if (wishlist.itemType === 'trek') {
        const trekRepository = AppDataSource.getRepository(Trek);
        item = await trekRepository.findOne({ where: { id: wishlist.itemId } });
      } else if (wishlist.itemType === 'tour') {
        const tourRepository = AppDataSource.getRepository(Tour);
        item = await tourRepository.findOne({ where: { id: wishlist.itemId } });
      } else if (wishlist.itemType === 'short-tour') {
        const shortTourRepository = AppDataSource.getRepository(ShortTour);
        item = await shortTourRepository.findOne({ where: { id: wishlist.itemId } });
      }
      
      return {
        id: wishlist.id,
        itemId: wishlist.itemId,
        itemType: wishlist.itemType,
        item: item,
        createdAt: wishlist.createdAt
      };
    }));
    
    return res.json({ success: true, data: wishlistItems });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getWishlist = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const wishlistRepository = AppDataSource.getRepository(Wishlist);
    const wishlist = await wishlistRepository.findOne({
      where: { id: parseInt(req.params.id) }
    });
    
    if (!wishlist) {
      return res.status(404).json({ success: false, message: 'Wishlist item not found' });
    }
    
    return res.json({ success: true, data: wishlist });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createWishlist = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { itemId, itemType, userId } = req.body;

    if (!itemId || !itemType) {
      return res.status(400).json({ 
        success: false, 
        message: 'Item ID and item type are required' 
      });
    }

    if (!['trek', 'tour', 'short-tour'].includes(itemType)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid item type. Must be trek, tour, or short-tour' 
      });
    }

    const wishlistRepository = AppDataSource.getRepository(Wishlist);
    
    // Check if item already exists in wishlist
    const existing = await wishlistRepository.findOne({
      where: { 
        itemId: parseInt(itemId),
        itemType: itemType,
        ...(userId && { userId: parseInt(userId) })
      }
    });

    if (existing) {
      return res.status(400).json({ 
        success: false, 
        message: 'Item already in wishlist' 
      });
    }

    const wishlist = wishlistRepository.create({
      itemId: parseInt(itemId),
      itemType: itemType,
      ...(userId && { userId: parseInt(userId) })
    });
    
    const savedWishlist = await wishlistRepository.save(wishlist);
    return res.status(201).json({ success: true, data: savedWishlist });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteWishlist = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const wishlistRepository = AppDataSource.getRepository(Wishlist);
    const { itemId, itemType, userId } = req.query;
    
    let wishlist;
    
    if (req.params.id) {
      // Delete by wishlist ID
      wishlist = await wishlistRepository.findOne({
        where: { id: parseInt(req.params.id) }
      });
    } else if (itemId && itemType) {
      // Delete by item ID and type
      const where: any = {
        itemId: parseInt(itemId as string),
        itemType: itemType as string
      };
      if (userId) where.userId = parseInt(userId as string);
      
      wishlist = await wishlistRepository.findOne({ where });
    }
    
    if (!wishlist) {
      return res.status(404).json({ success: false, message: 'Wishlist item not found' });
    }
    
    await wishlistRepository.remove(wishlist);
    return res.json({ success: true, message: 'Wishlist item deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

