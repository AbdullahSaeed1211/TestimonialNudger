import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import connectToDatabase from '@/lib/db/connect';
import Business from '@/lib/db/models/Business';
import { uploadToCloudinary } from '@/lib/cloudinary';

// GET business settings
export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectToDatabase();
    
    const business = await Business.findOne({ owner: userId });
    
    if (!business) {
      return NextResponse.json(
        { error: 'Business not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: {
        id: business._id,
        name: business.name,
        logoUrl: business.logoUrl,
        serviceTypes: business.serviceTypes,
        showcasePageEnabled: business.showcasePageEnabled,
        showcasePageSlug: business.showcasePageSlug
      }
    });
  } catch (error) {
    console.error('Error fetching business settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch business settings' },
      { status: 500 }
    );
  }
}

// UPDATE business settings
export async function PATCH(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectToDatabase();
    
    // Handle form data for logo uploads
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const showcasePageEnabled = formData.get('showcasePageEnabled') === 'true';
    const showcasePageSlug = formData.get('showcasePageSlug') as string;
    const serviceTypes = formData.getAll('serviceTypes') as string[];
    const logoFile = formData.get('logo') as File;
    
    // Find the business
    const business = await Business.findOne({ owner: userId });
    
    if (!business) {
      return NextResponse.json(
        { error: 'Business not found' },
        { status: 404 }
      );
    }
    
    // Update logo if a new one is provided
    let logoUrl = business.logoUrl;
    if (logoFile && logoFile.size > 0) {
      const buffer = await logoFile.arrayBuffer();
      const base64 = Buffer.from(buffer).toString('base64');
      const dataURI = `data:${logoFile.type};base64,${base64}`;
      
      try {
        const result = await uploadToCloudinary(dataURI, {
          folder: `business/${business._id}/logo`,
          resourceType: 'image',
        });
        
        logoUrl = result.secure_url;
      } catch (error) {
        console.error('Error uploading logo to Cloudinary:', error);
      }
    }
    
    // Update business settings
    business.name = name || business.name;
    business.logoUrl = logoUrl;
    business.serviceTypes = serviceTypes.length > 0 ? serviceTypes : business.serviceTypes;
    business.showcasePageEnabled = showcasePageEnabled;
    business.showcasePageSlug = showcasePageSlug || business.showcasePageSlug;
    
    await business.save();
    
    return NextResponse.json({
      success: true,
      data: {
        id: business._id,
        name: business.name,
        logoUrl: business.logoUrl,
        serviceTypes: business.serviceTypes,
        showcasePageEnabled: business.showcasePageEnabled,
        showcasePageSlug: business.showcasePageSlug
      }
    });
  } catch (error) {
    console.error('Error updating business settings:', error);
    return NextResponse.json(
      { error: 'Failed to update business settings' },
      { status: 500 }
    );
  }
} 