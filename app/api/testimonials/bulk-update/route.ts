import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import connectToDatabase from '@/lib/db/connect';
import Testimonial, { TestimonialStatus } from '@/lib/db/models/Testimonial';
import Business from '@/lib/db/models/Business';

interface BulkUpdateRequest {
  testimonialIds: string[];
  action: 'approve' | 'reject' | 'archive';
}

// POST endpoint to bulk update testimonials (approve, reject, etc.)
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectToDatabase();
    
    // Get the business associated with this user
    const business = await Business.findOne({ owner: userId });
    
    if (!business) {
      return NextResponse.json(
        { error: 'Business not found' },
        { status: 404 }
      );
    }
    
    // Get the request body
    const { testimonialIds, action }: BulkUpdateRequest = await request.json();
    
    // Validate the request
    if (!testimonialIds || !Array.isArray(testimonialIds) || testimonialIds.length === 0) {
      return NextResponse.json(
        { error: 'No testimonial IDs provided' },
        { status: 400 }
      );
    }
    
    if (!action || !['approve', 'reject', 'archive'].includes(action)) {
      return NextResponse.json(
        { error: 'Invalid action. Must be "approve", "reject", or "archive"' },
        { status: 400 }
      );
    }
    
    // Map the action to a status
    const statusMap: Record<string, TestimonialStatus> = {
      'approve': 'APPROVED',
      'reject': 'FLAGGED',
      'archive': 'ARCHIVED' as TestimonialStatus
    };
    
    const status = statusMap[action];
    
    // Update all testimonials that belong to this business
    const result = await Testimonial.updateMany(
      { 
        _id: { $in: testimonialIds },
        business: business._id
      },
      { $set: { status } }
    );
    
    return NextResponse.json({
      success: true,
      message: `Updated ${result.modifiedCount} testimonials with status: ${status}`,
      totalRequested: testimonialIds.length,
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    console.error('Error performing bulk update:', error);
    return NextResponse.json(
      { error: 'Failed to update testimonials' },
      { status: 500 }
    );
  }
}

// DELETE endpoint to bulk delete testimonials
export async function DELETE(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectToDatabase();
    
    // Get the business associated with this user
    const business = await Business.findOne({ owner: userId });
    
    if (!business) {
      return NextResponse.json(
        { error: 'Business not found' },
        { status: 404 }
      );
    }
    
    // Parse query parameters
    const url = new URL(request.url);
    const idsParam = url.searchParams.get('ids');
    
    if (!idsParam) {
      return NextResponse.json(
        { error: 'No testimonial IDs provided' },
        { status: 400 }
      );
    }
    
    const testimonialIds = idsParam.split(',');
    
    // Delete all testimonials that belong to this business
    const result = await Testimonial.deleteMany(
      { 
        _id: { $in: testimonialIds },
        business: business._id
      }
    );
    
    return NextResponse.json({
      success: true,
      message: `${result.deletedCount} testimonials deleted successfully`,
      data: {
        deletedCount: result.deletedCount
      }
    });
  } catch (error) {
    console.error('Error deleting testimonials:', error);
    return NextResponse.json(
      { error: 'Failed to delete testimonials' },
      { status: 500 }
    );
  }
} 