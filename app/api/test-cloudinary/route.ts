import { NextRequest, NextResponse } from 'next/server';
import { uploadToCloudinary, getCloudinaryUrl } from '@/lib/cloudinary';

export async function GET() {
  return NextResponse.json({
    message: 'This endpoint requires a POST request with a file uploaded using form-data',
    usage: {
      method: 'POST',
      formData: 'Include a file with key "file"',
      supportedTypes: 'Images and videos'
    }
  });
}

export async function POST(request: NextRequest) {
  try {
    // Check if environment variables are set
    if (!process.env.CLOUDINARY_CLOUD_NAME || 
        !process.env.CLOUDINARY_API_KEY || 
        !process.env.CLOUDINARY_API_SECRET) {
      return NextResponse.json({
        success: false,
        error: 'Cloudinary environment variables are not set',
        environmentCheck: {
          cloudName: !!process.env.CLOUDINARY_CLOUD_NAME,
          apiKey: !!process.env.CLOUDINARY_API_KEY,
          apiSecret: !!process.env.CLOUDINARY_API_SECRET
        }
      }, { status: 500 });
    }
    
    // Parse form data
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({
        success: false,
        error: 'No file uploaded',
        message: 'Please provide a file in the request body with key "file"'
      }, { status: 400 });
    }
    
    // Validate file type
    if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
      return NextResponse.json({
        success: false,
        error: 'Invalid file type',
        message: 'Only image and video files are supported'
      }, { status: 400 });
    }
    
    // Convert file to buffer for upload
    const buffer = await file.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    const dataURI = `data:${file.type};base64,${base64}`;
    
    // Upload to Cloudinary - use test folder to avoid cluttering production
    const uploadResult = await uploadToCloudinary(dataURI, {
      folder: 'test-uploads',
      resourceType: file.type.startsWith('image/') ? 'image' : 'video',
      tags: ['test']
    });
    
    // Create various transformations to demonstrate functionality
    const transformations: Record<string, string> = {};
    
    if (file.type.startsWith('image/')) {
      transformations['thumbnail'] = getCloudinaryUrl(uploadResult.public_id, {
        width: 150,
        height: 150,
        crop: 'fill'
      });
      
      transformations['medium'] = getCloudinaryUrl(uploadResult.public_id, {
        width: 600,
        crop: 'scale'
      });
    }
    
    return NextResponse.json({
      success: true,
      message: 'File uploaded successfully to Cloudinary',
      uploadResult: {
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id,
        format: uploadResult.format,
        resourceType: uploadResult.resource_type
      },
      transformations
    });
    
  } catch (error) {
    console.error('Error testing Cloudinary:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'Failed to upload file to Cloudinary'
    }, { status: 500 });
  }
} 