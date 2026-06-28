import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Not } from 'typeorm';
import { Page } from '../models/Page';

export const getPages = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const pageRepository = AppDataSource.getRepository(Page);
    const pages = await pageRepository.find({
      order: { createdAt: 'DESC' }
    });
    return res.json({ success: true, data: pages });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getPage = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const pageRepository = AppDataSource.getRepository(Page);
    const page = await pageRepository.findOne({
      where: { id: parseInt(req.params.id) }
    });
    
    if (!page) {
      return res.status(404).json({ success: false, message: 'Page not found' });
    }
    
    return res.json({ success: true, data: page });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getPageByType = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const pageRepository = AppDataSource.getRepository(Page);
    const pageType = req.params.pageType;
    
    const page = await pageRepository.findOne({
      where: { 
        pageType: pageType as Page['pageType'],
        status: 'published'
      }
    });
    
    if (!page) {
      return res.status(404).json({ success: false, message: 'Page not found' });
    }
    
    return res.json({ success: true, data: page });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createPage = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { pageType, image, topTitle, heading, status } = req.body;

    // Validate required fields
    if (!pageType || !image || !topTitle || !heading) {
      return res.status(400).json({ 
        success: false, 
        message: 'Page type, image, top title, and heading are required' 
      });
    }

    // Validate pageType
    const validPageTypes = ['about', 'about-our-story', 'about-why-choose-us', 'contact', 'trek-listing', 'tour-listing', 'short-tour-listing', 'gallery', 'blogs', 'custom-listing'];
    if (!validPageTypes.includes(pageType)) {
      return res.status(400).json({ 
        success: false, 
        message: `Invalid page type. Must be one of: ${validPageTypes.join(', ')}` 
      });
    }

    const pageRepository = AppDataSource.getRepository(Page);
    
    // Check if a page with this type already exists
    const existingPage = await pageRepository.findOne({
      where: { pageType: pageType as Page['pageType'] }
    });

    if (existingPage) {
      return res.status(400).json({ 
        success: false, 
        message: `A page with type "${pageType}" already exists. Please update the existing page instead.` 
      });
    }

    const page = pageRepository.create({
      pageType: pageType as Page['pageType'],
      image: image.trim(),
      topTitle: topTitle.trim(),
      heading: heading.trim(),
      status: status || 'draft'
    });
    
    const savedPage = await pageRepository.save(page);
    return res.status(201).json({ success: true, data: savedPage });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const updatePage = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const pageRepository = AppDataSource.getRepository(Page);
    const page = await pageRepository.findOne({
      where: { id: parseInt(req.params.id) }
    });
    
    if (!page) {
      return res.status(404).json({ success: false, message: 'Page not found' });
    }

    const { pageType, image, topTitle, heading, status } = req.body;

    // Validate pageType if provided
    if (pageType !== undefined) {
      const validPageTypes = ['about', 'about-our-story', 'about-why-choose-us', 'contact', 'trek-listing', 'tour-listing', 'short-tour-listing', 'gallery', 'blogs', 'custom-listing'];
      if (!validPageTypes.includes(pageType)) {
        return res.status(400).json({ 
          success: false, 
          message: `Invalid page type. Must be one of: ${validPageTypes.join(', ')}` 
        });
      }

      // Check if another page with this type already exists
      const existingPage = await pageRepository.findOne({
        where: { 
          pageType: pageType as Page['pageType'],
          id: Not(page.id)
        }
      });

      if (existingPage) {
        return res.status(400).json({ 
          success: false, 
          message: `A page with type "${pageType}" already exists.` 
        });
      }
    }

    if (pageType !== undefined) page.pageType = pageType as Page['pageType'];
    if (image !== undefined) page.image = image.trim();
    if (topTitle !== undefined) page.topTitle = topTitle.trim();
    if (heading !== undefined) page.heading = heading.trim();
    if (status !== undefined) page.status = status;
    
    const updatedPage = await pageRepository.save(page);
    return res.json({ success: true, data: updatedPage });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const deletePage = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const pageRepository = AppDataSource.getRepository(Page);
    const page = await pageRepository.findOne({
      where: { id: parseInt(req.params.id) }
    });
    
    if (!page) {
      return res.status(404).json({ success: false, message: 'Page not found' });
    }
    
    await pageRepository.remove(page);
    return res.json({ success: true, message: 'Page deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

