import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db/connect';
import Testimonial, { TestimonialStatus } from '@/lib/db/models/Testimonial';

interface RouteParams {
  params: {
    id: string;
  };
}

// GET a specific testimonial
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    await connectToDatabase();
    
    const testimonial = await Testimonial.findById(params.id)
      .populate('client', 'email avatarUrl')
      .populate('business', 'name');
    
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

// UPDATE a testimonial
export async function PATCH(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    await connectToDatabase();
    
    const { status, content, rating, mediaUrls } = await request.json();
    
    const testimonial = await Testimonial.findById(params.id);
    
    if (!testimonial) {
      return NextResponse.json(
        { error: 'Testimonial not found' }, 
        { status: 404 }
      );
    }
    
    // Update fields if provided
    if (status) testimonial.status = status as TestimonialStatus;
    if (content) testimonial.content = content;
    if (rating) testimonial.rating = rating;
    if (mediaUrls) testimonial.mediaUrls = mediaUrls;
    
    await testimonial.save();
    
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

// DELETE a testimonial
export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    await connectToDatabase();
    
    const testimonial = await Testimonial.findByIdAndDelete(params.id);
    
    if (!testimonial) {
      return NextResponse.json(
        { error: 'Testimonial not found' }, 
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Testimonial deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    return NextResponse.json(
      { error: 'Failed to delete testimonial' }, 
      { status: 500 }
    );
  }
} 