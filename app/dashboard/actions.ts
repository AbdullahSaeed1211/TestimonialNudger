'use server';

import { auth, currentUser } from '@clerk/nextjs/server';
import connectToDatabase from '@/lib/db/connect';
import Testimonial from '@/lib/db/models/Testimonial';
import Business from '@/lib/db/models/Business';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { revalidatePath } from 'next/cache';

// Update testimonial status
export async function updateTestimonialStatus(
  testimonialId: string,
  status: 'APPROVED' | 'FLAGGED' | 'PENDING'
) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      throw new Error('Unauthorized: You must be signed in');
    }
    
    await connectToDatabase();
    
    // Get the business associated with this user
    const business = await Business.findOne({ owner: userId });
    
    if (!business) {
      throw new Error('Business not found');
    }
    
    // Update the testimonial status
    const result = await Testimonial.findOneAndUpdate(
      { 
        _id: testimonialId,
        business: business._id
      },
      { status },
      { new: true }
    );
    
    if (!result) {
      throw new Error('Testimonial not found or not authorized to update');
    }
    
    // Revalidate the dashboard page to reflect changes
    revalidatePath('/dashboard/testimonials');
    
    return { success: true, data: result };
  } catch (error) {
    console.error('Error updating testimonial status:', error);
    throw error;
  }
}

// Delete testimonial
export async function deleteTestimonial(testimonialId: string) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      throw new Error('Unauthorized: You must be signed in');
    }
    
    await connectToDatabase();
    
    // Get the business associated with this user
    const business = await Business.findOne({ owner: userId });
    
    if (!business) {
      throw new Error('Business not found');
    }
    
    // Delete the testimonial
    const result = await Testimonial.findOneAndDelete({ 
      _id: testimonialId,
      business: business._id
    });
    
    if (!result) {
      throw new Error('Testimonial not found or not authorized to delete');
    }
    
    // Revalidate the dashboard page to reflect changes
    revalidatePath('/dashboard/testimonials');
    
    return { success: true, message: 'Testimonial deleted successfully' };
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    throw error;
  }
}

// Update business settings
export async function updateBusinessSettings(formData: FormData) {
  try {
    const user = await currentUser();
    
    if (!user) {
      throw new Error('Unauthorized: You must be signed in');
    }
    
    await connectToDatabase();
    
    // Extract form fields
    const name = formData.get('name') as string;
    const showcasePageEnabled = formData.get('showcasePageEnabled') === 'true';
    const showcasePageSlug = formData.get('showcasePageSlug') as string;
    const serviceTypesArray = formData.getAll('serviceTypes') as string[];
    const logoFile = formData.get('logo') as File;
    
    // Validate required fields
    if (!name) {
      throw new Error('Business name is required');
    }
    
    // Find the business or create if it doesn't exist
    let business = await Business.findOne({ owner: user.id });
    
    if (!business) {
      business = new Business({
        name,
        owner: user.id,
        serviceTypes: serviceTypesArray.length > 0 ? serviceTypesArray : [],
        showcasePageEnabled,
        showcasePageSlug
      });
    } else {
      business.name = name;
      business.serviceTypes = serviceTypesArray.length > 0 ? serviceTypesArray : business.serviceTypes;
      business.showcasePageEnabled = showcasePageEnabled;
      
      if (showcasePageSlug) {
        business.showcasePageSlug = showcasePageSlug;
      }
    }
    
    // Upload and update logo if provided
    if (logoFile && logoFile.size > 0) {
      const buffer = await logoFile.arrayBuffer();
      const base64 = Buffer.from(buffer).toString('base64');
      const dataURI = `data:${logoFile.type};base64,${base64}`;
      
      try {
        const result = await uploadToCloudinary(dataURI, {
          folder: `business/${business._id}/logo`,
          resourceType: 'image',
        });
        
        business.logoUrl = result.secure_url;
      } catch (error) {
        console.error('Error uploading logo to Cloudinary:', error);
        throw new Error('Failed to upload logo');
      }
    }
    
    // Save the business
    await business.save();
    
    // Revalidate the settings page to reflect changes
    revalidatePath('/dashboard/settings');
    
    return { 
      success: true, 
      data: {
        id: business._id,
        name: business.name,
        logoUrl: business.logoUrl,
        serviceTypes: business.serviceTypes,
        showcasePageEnabled: business.showcasePageEnabled,
        showcasePageSlug: business.showcasePageSlug
      }
    };
  } catch (error) {
    console.error('Error updating business settings:', error);
    throw error;
  }
} 