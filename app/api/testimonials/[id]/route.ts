import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db/connect';
import Testimonial, { TestimonialStatus } from '@/lib/db/models/Testimonial';
import { deleteFromCloudinary } from '@/lib/cloudinary';

// Get a single testimonial by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Extract id from context
    const { id } = await params;
    
    // Connect to database
    await connectToDatabase();
    
    // Find the testimonial
    const testimonial = await Testimonial.findById(id)
      .populate('client', 'email name role')
      .populate('business', 'name logoUrl');
    
    if (!testimonial) {
      return NextResponse.json(
        { error: 'Testimonial not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: testimonial
    });
  } catch (error) {
    console.error('Error fetching testimonial:', error);
    return NextResponse.json(
      { error: 'Failed to fetch testimonial' },
      { status: 500 }
    );
  }
}

// Define allowed update types
interface TestimonialUpdates {
  status?: TestimonialStatus;
  content?: string;
  rating?: number;
}

// Update testimonial status or content
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Extract id from context
    const { id } = await params;
    
    // Connect to database
    await connectToDatabase();
    
    // Get request body
    const updates = await request.json();
    const allowedUpdates = ['status', 'content', 'rating'];
    
    // Filter to only allow certain fields to be updated
    const sanitizedUpdates: TestimonialUpdates = {};
    Object.keys(updates).forEach(key => {
      if (allowedUpdates.includes(key)) {
        sanitizedUpdates[key as keyof TestimonialUpdates] = updates[key];
      }
    });
    
    // Update the testimonial
    const testimonial = await Testimonial.findByIdAndUpdate(
      id,
      sanitizedUpdates,
      { new: true, runValidators: true }
    );
    
    if (!testimonial) {
      return NextResponse.json(
        { error: 'Testimonial not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: testimonial
    });
  } catch (error) {
    console.error('Error updating testimonial:', error);
    return NextResponse.json(
      { error: 'Failed to update testimonial' },
      { status: 500 }
    );
  }
}

// Delete a testimonial
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Extract id from context
    const { id } = await params;
    
    // Connect to database
    await connectToDatabase();
    
    // Find the testimonial first to get mediaUrls for Cloudinary cleanup
    const testimonial = await Testimonial.findById(id);
    
    if (!testimonial) {
      return NextResponse.json(
        { error: 'Testimonial not found' },
        { status: 404 }
      );
    }
    
    // Delete the testimonial
    await Testimonial.findByIdAndDelete(id);
    
    // Clean up media from Cloudinary if any
    const { mediaUrls } = testimonial;
    if (mediaUrls && mediaUrls.length > 0) {
      // Delete each media file
      for (const url of mediaUrls) {
        try {
          // Extract public ID from Cloudinary URL
          const publicId = url.split('/').slice(-1)[0].split('.')[0];
          if (publicId) {
            await deleteFromCloudinary(publicId);
          }
        } catch (deleteError) {
          console.error(`Error deleting media file ${url}:`, deleteError);
          // Continue with other deletions even if one fails
        }
      }
    }
    
    return NextResponse.json({
      success: true,
      message: `Testimonial with ID: ${id} has been deleted`
    });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    return NextResponse.json(
      { error: 'Failed to delete testimonial' },
      { status: 500 }
    );
  }
} 