import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';
import fs from 'fs';
import path from 'path';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface UploadResult {
  url: string;
  public_id: string;
  secure_url: string;
}

/**
 * Upload a file to Cloudinary from a file path
 */
export const uploadToCloudinary = async (filePath: string, folder?: string): Promise<UploadResult> => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folder || 'travel-cms',
      resource_type: 'auto',
    });

    // Delete local file after upload
    fs.unlinkSync(filePath);

    return {
      url: result.url,
      public_id: result.public_id,
      secure_url: result.secure_url,
    };
  } catch (error: any) {
    // Clean up local file on error
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    throw new Error(`Cloudinary upload failed: ${error.message}`);
  }
};

/**
 * Upload multiple files to Cloudinary
 */
export const uploadMultipleToCloudinary = async (
  filePaths: string[],
  folder?: string
): Promise<UploadResult[]> => {
  const uploadPromises = filePaths.map((filePath) =>
    uploadToCloudinary(filePath, folder)
  );
  return Promise.all(uploadPromises);
};

/**
 * Delete an image from Cloudinary
 */
export const deleteFromCloudinary = async (publicId: string): Promise<void> => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error: any) {
    console.error(`Failed to delete from Cloudinary: ${error.message}`);
    // Don't throw - deletion failure shouldn't break the flow
  }
};

/**
 * Extract public_id from Cloudinary URL
 */
export const extractPublicId = (url: string): string | null => {
  try {
    const urlParts = url.split('/');
    const filename = urlParts[urlParts.length - 1];
    const publicId = filename.split('.')[0];
    const folder = urlParts.slice(-2, -1)[0];
    return folder ? `${folder}/${publicId}` : publicId;
  } catch {
    return null;
  }
};

