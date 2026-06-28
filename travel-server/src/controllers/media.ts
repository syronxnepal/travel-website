import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Media } from '../models/Media';
import path from 'path';

/**
 * Get all media items (excluding soft-deleted)
 * GET /api/media
 */
export const getMedia = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { search, category, page = '1', limit = '50' } = req.query;
    const mediaRepository = AppDataSource.getRepository(Media);
    
    const queryBuilder = mediaRepository.createQueryBuilder('media')
      .where('media.isDeleted = :isDeleted', { isDeleted: false });

    // Search by filename, title, or description
    if (search && typeof search === 'string') {
      queryBuilder.andWhere(
        '(media.filename ILIKE :search OR media.title ILIKE :search OR media.description ILIKE :search)',
        { search: `%${search}%` }
      );
    }

    // Filter by category
    if (category && typeof category === 'string') {
      queryBuilder.andWhere('media.category = :category', { category });
    }

    // Pagination
    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    const skip = (pageNum - 1) * limitNum;

    queryBuilder
      .orderBy('media.createdAt', 'DESC')
      .skip(skip)
      .take(limitNum);

    const [mediaItems, total] = await queryBuilder.getManyAndCount();

    return res.json({
      success: true,
      data: mediaItems,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum)
      }
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Get single media item
 * GET /api/media/:id
 */
export const getMediaById = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const mediaRepository = AppDataSource.getRepository(Media);
    const media = await mediaRepository.findOne({
      where: { id: parseInt(req.params.id), isDeleted: false }
    });

    if (!media) {
      return res.status(404).json({ success: false, message: 'Media not found' });
    }

    return res.json({ success: true, data: media });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Create media item (called after file upload)
 * POST /api/media
 */
export const createMedia = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { filename, originalName, url, path: filePath, mimeType, size, title, description, alt, category, tags } = req.body;

    if (!filename || !originalName || !url || !mimeType || !size) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: filename, originalName, url, mimeType, size'
      });
    }

    const mediaRepository = AppDataSource.getRepository(Media);

    // Get image dimensions if it's an image
    let width: number | undefined;
    let height: number | undefined;
    
    try {
      const sizeOf = require('image-size');
      const fullPath = path.join(process.cwd(), filePath || url.replace(/^\//, ''));
      const dimensions = sizeOf(fullPath);
      if (dimensions.width && dimensions.height) {
        width = dimensions.width;
        height = dimensions.height;
      }
    } catch (error) {
      // If we can't get dimensions, that's okay - just leave them undefined
      console.warn('Could not get image dimensions:', error);
    }

    const media = mediaRepository.create({
      filename,
      originalName,
      url,
      path: filePath || url,
      mimeType,
      size: parseInt(size),
      width,
      height,
      title,
      description,
      alt,
      category,
      tags: Array.isArray(tags) ? tags : undefined,
      isDeleted: false
    });

    const savedMedia = await mediaRepository.save(media);

    return res.status(201).json({ success: true, data: savedMedia });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * Update media item
 * PUT /api/media/:id
 */
export const updateMedia = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const mediaRepository = AppDataSource.getRepository(Media);
    const media = await mediaRepository.findOne({
      where: { id: parseInt(req.params.id), isDeleted: false }
    });

    if (!media) {
      return res.status(404).json({ success: false, message: 'Media not found' });
    }

    const { title, description, alt, category, tags } = req.body;

    // Update only provided fields
    if (title !== undefined) media.title = title;
    if (description !== undefined) media.description = description;
    if (alt !== undefined) media.alt = alt;
    if (category !== undefined) media.category = category;
    if (tags !== undefined) media.tags = Array.isArray(tags) ? tags : undefined;

    const updatedMedia = await mediaRepository.save(media);

    return res.json({ success: true, data: updatedMedia });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * Delete media item (soft delete)
 * DELETE /api/media/:id
 */
export const deleteMedia = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const mediaRepository = AppDataSource.getRepository(Media);
    const media = await mediaRepository.findOne({
      where: { id: parseInt(req.params.id), isDeleted: false }
    });

    if (!media) {
      return res.status(404).json({ success: false, message: 'Media not found' });
    }

    // Soft delete
    media.isDeleted = true;
    await mediaRepository.save(media);

    return res.json({ success: true, message: 'Media deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Hard delete media item (permanently delete file and database record)
 * DELETE /api/media/:id/hard
 */
export const hardDeleteMedia = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const mediaRepository = AppDataSource.getRepository(Media);
    const media = await mediaRepository.findOne({
      where: { id: parseInt(req.params.id) }
    });

    if (!media) {
      return res.status(404).json({ success: false, message: 'Media not found' });
    }

    // Delete file from filesystem
    const fs = require('fs');
    const filePath = path.join(process.cwd(), media.path);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Delete from database
    await mediaRepository.remove(media);

    return res.json({ success: true, message: 'Media permanently deleted' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

