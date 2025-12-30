import express, { Request, Response } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { uploadSingle, uploadMultiple } from '../utils/upload';
import path from 'path';
import fs from 'fs';

const router = express.Router();

/**
 * Upload single image
 * POST /api/upload/image
 * Returns the URL to access the uploaded image
 */
router.post('/image', authenticate, authorize('admin', 'editor'), uploadSingle, async (req: Request, res: Response): Promise<Response | void> => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file provided'
      });
    }

    // Return the URL to access the uploaded file
    const fileUrl = `/uploads/${req.file.filename}`;

    return res.json({
      success: true,
      data: {
        url: fileUrl,
        filename: req.file.filename,
        originalname: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype
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
 * Returns URLs to access the uploaded images
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
    
    const results = files.map(file => ({
      url: `/uploads/${file.filename}`,
      filename: file.filename,
      originalname: file.originalname,
      size: file.size,
      mimetype: file.mimetype
    }));

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
 * Get list of all uploaded images
 * GET /api/upload/list
 * Returns array of image metadata
 */
router.get('/list', authenticate, authorize('admin', 'editor'), async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const uploadsDir = path.join(process.cwd(), 'uploads');
    
    // Check if uploads directory exists
    if (!fs.existsSync(uploadsDir)) {
      return res.json({
        success: true,
        data: []
      });
    }

    // Read all files from uploads directory
    const files = fs.readdirSync(uploadsDir);
    
    // Filter only image files and get their metadata
    const imageFiles = files
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
      })
      .map(file => {
        const filePath = path.join(uploadsDir, file);
        const stats = fs.statSync(filePath);
        
        return {
          url: `/uploads/${file}`,
          filename: file,
          size: stats.size,
          uploadedAt: stats.birthtime,
          modifiedAt: stats.mtime
        };
      })
      .sort((a, b) => {
        // Sort by upload date, newest first
        return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime();
      });

    return res.json({
      success: true,
      data: imageFiles
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to list images'
    });
  }
});

export default router;

