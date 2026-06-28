import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { ContactSocialLink } from '../models/ContactSocialLink';

export const getContactSocialLinks = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const linkRepository = AppDataSource.getRepository(ContactSocialLink);
    const links = await linkRepository.find({
      where: { isActive: true },
      order: { order: 'ASC', createdAt: 'DESC' }
    });
    return res.json({ success: true, data: links });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getContactSocialLink = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const linkRepository = AppDataSource.getRepository(ContactSocialLink);
    const link = await linkRepository.findOne({
      where: { id: parseInt(req.params.id) }
    });
    
    if (!link) {
      return res.status(404).json({ success: false, message: 'Social link not found' });
    }
    
    return res.json({ success: true, data: link });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createContactSocialLink = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { platform, url, icon, order, isActive } = req.body;

    if (!platform || !url) {
      return res.status(400).json({ 
        success: false, 
        message: 'Platform and URL are required' 
      });
    }

    const linkRepository = AppDataSource.getRepository(ContactSocialLink);
    const link = linkRepository.create({
      platform: platform.trim(),
      url: url.trim(),
      icon: icon?.trim(),
      order: order ? parseInt(order) || 0 : 0,
      isActive: isActive === undefined ? true : (isActive === true || isActive === 'true')
    });
    
    const savedLink = await linkRepository.save(link);
    return res.status(201).json({ success: true, data: savedLink });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const updateContactSocialLink = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const linkRepository = AppDataSource.getRepository(ContactSocialLink);
    const link = await linkRepository.findOne({
      where: { id: parseInt(req.params.id) }
    });
    
    if (!link) {
      return res.status(404).json({ success: false, message: 'Social link not found' });
    }

    const { platform, url, icon, order, isActive } = req.body;

    if (platform !== undefined) link.platform = platform.trim();
    if (url !== undefined) link.url = url.trim();
    if (icon !== undefined) link.icon = icon?.trim();
    if (order !== undefined) link.order = parseInt(order) || 0;
    if (isActive !== undefined) link.isActive = isActive === true || isActive === 'true';
    
    const updatedLink = await linkRepository.save(link);
    return res.json({ success: true, data: updatedLink });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteContactSocialLink = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const linkRepository = AppDataSource.getRepository(ContactSocialLink);
    const link = await linkRepository.findOne({
      where: { id: parseInt(req.params.id) }
    });
    
    if (!link) {
      return res.status(404).json({ success: false, message: 'Social link not found' });
    }
    
    await linkRepository.remove(link);
    return res.json({ success: true, message: 'Social link deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

