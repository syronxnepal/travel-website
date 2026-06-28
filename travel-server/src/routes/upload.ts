import express, { Request, Response } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { uploadSingle, uploadMultiple } from '../utils/upload';
import { AppDataSource } from '../config/database';
import { Media } from '../models/Media';
const sizeOf = require('image-size');
import path from 'path';
import fs from 'fs';

const router = express.Router();

/**
 * Upload single image
 * POST /api/upload/image
 * Returns the URL to access the uploaded image and saves to database
 */
router.post('/image', authenticate, authorize('admin', 'editor'), uploadSingle, async (req: Request, res: Response): Promise<Response | void> => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file provided'
      });
    }

    const fileUrl = `/uploads/${req.file.filename}`;
    const filePath = `uploads/${req.file.filename}`;
    const fullPath = path.join(process.cwd(), 'uploads', req.file.filename);

    // Get image dimensions
    let width: number | undefined;
    let height: number | undefined;
    try {
      const dimensions = sizeOf(fullPath) as { width?: number; height?: number };
      if (dimensions.width && dimensions.height) {
        width = dimensions.width;
        height = dimensions.height;
      }
    } catch (error) {
      console.warn('Could not get image dimensions:', error);
    }

    // Save to database
    const mediaRepository = AppDataSource.getRepository(Media);
    const media = mediaRepository.create({
      filename: req.file.filename,
      originalName: req.file.originalname,
      url: fileUrl,
      path: filePath,
      mimeType: req.file.mimetype,
      size: req.file.size,
      width,
      height,
      isDeleted: false
    });

    const savedMedia = await mediaRepository.save(media);

    return res.json({
      success: true,
      data: {
        id: savedMedia.id,
        url: savedMedia.url,
        filename: savedMedia.filename,
        originalname: savedMedia.originalName,
        size: savedMedia.size,
        mimetype: savedMedia.mimeType,
        width: savedMedia.width,
        height: savedMedia.height
      }
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to upload image'
    });
  }
});

/**
 * Upload multiple images
 * POST /api/upload/images
 * Returns URLs to access the uploaded images and saves to database
 */
router.post('/images', authenticate, authorize('admin', 'editor'), uploadMultiple, async (req: Request, res: Response): Promise<Response | void> => {
  try {
    if (!req.files || (Array.isArray(req.files) && req.files.length === 0)) {
      return res.status(400).json({
        success: false,
        message: 'No image files provided'
      });
    }

    const files = Array.isArray(req.files) ? req.files : [req.files];
    const mediaRepository = AppDataSource.getRepository(Media);
    const results: any[] = [];

    for (const file of files as Express.Multer.File[]) {
      const fileUrl = `/uploads/${file.filename}`;
      const filePath = `uploads/${file.filename}`;
      const fullPath = path.join(process.cwd(), 'uploads', file.filename);

      // Get image dimensions
      let width: number | undefined;
      let height: number | undefined;
      try {
        const dimensions = sizeOf(fullPath) as { width?: number; height?: number };
        if (dimensions.width && dimensions.height) {
          width = dimensions.width;
          height = dimensions.height;
        }
      } catch (error) {
        console.warn('Could not get image dimensions:', error);
      }

      // Save to database
      const media = mediaRepository.create({
        filename: file.filename,
        originalName: file.originalname,
        url: fileUrl,
        path: filePath,
        mimeType: file.mimetype,
        size: file.size,
        width,
        height,
        isDeleted: false
      }) as Media;

      const savedMedia = await mediaRepository.save(media);

      results.push({
        id: savedMedia.id,
        url: savedMedia.url,
        filename: savedMedia.filename,
        originalname: savedMedia.originalName,
        size: savedMedia.size,
        mimetype: savedMedia.mimeType,
        width: savedMedia.width,
        height: savedMedia.height
      });
    }

    return res.json({
      success: true,
      data: results
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to upload images'
    });
  }
});

/**
 * Get list of all uploaded images (from database)
 * GET /api/upload/list
 * Returns array of image metadata from database
 * This route is kept for backward compatibility, but now uses database
 */
router.get('/list', authenticate, authorize('admin', 'editor'), async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const mediaRepository = AppDataSource.getRepository(Media);
    
    // Get all non-deleted media items, sorted by creation date
    const mediaItems = await mediaRepository.find({
      where: { isDeleted: false },
      order: { createdAt: 'DESC' }
    });

    // Format response to match old API format for backward compatibility
    const formattedData = mediaItems.map(media => ({
      url: media.url,
      filename: media.filename,
      size: media.size,
      uploadedAt: media.createdAt,
      modifiedAt: media.updatedAt
    }));

    return res.json({
      success: true,
      data: formattedData
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to list images'
    });
  }
});

export default router;

