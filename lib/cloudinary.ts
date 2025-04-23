import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload a file to Cloudinary
 * @param file The file buffer or a File object
 * @param options Upload options
 * @returns The upload response from Cloudinary
 */
export async function uploadToCloudinary(
  file: string,
  options: {
    folder?: string;
    publicId?: string;
    resourceType?: 'image' | 'video' | 'raw' | 'auto';
    tags?: string[];
  } = {}
) {
  const uploadOptions = {
    folder: options.folder || 'testimonials',
    public_id: options.publicId,
    resource_type: options.resourceType || 'auto',
    tags: options.tags || [],
  };

  return cloudinary.uploader.upload(file, uploadOptions);
}

/**
 * Get a secure URL for a Cloudinary asset
 * @param publicId The public ID of the asset
 * @param options Transformation options
 * @returns The secure URL for the asset
 */
export function getCloudinaryUrl(
  publicId: string,
  options: {
    width?: number;
    height?: number;
    crop?: string;
    quality?: number;
  } = {}
) {
  return cloudinary.url(publicId, {
    secure: true,
    width: options.width,
    height: options.height,
    crop: options.crop,
    quality: options.quality || 'auto',
    fetch_format: 'auto',
  });
}

/**
 * Delete a file from Cloudinary
 * @param publicId The public ID of the asset to delete
 * @returns The deletion response from Cloudinary
 */
export async function deleteFromCloudinary(publicId: string) {
  return cloudinary.uploader.destroy(publicId);
}

export default cloudinary; 