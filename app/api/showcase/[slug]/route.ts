import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db/connect';
import Testimonial from '@/lib/db/models/Testimonial';
import Business from '@/lib/db/models/Business';
import { SortOrder } from 'mongoose';

// GET showcase testimonials for a specific business by slug
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    
    if (!slug) {
      return NextResponse.json(
        { error: 'Business slug is required' },
        { status: 400 }
      );
    }

    // Extract query parameters for filtering
    const url = new URL(request.url);
    const minRating = url.searchParams.get('minRating');
    const limit = url.searchParams.get('limit') || '10';
    const page = url.searchParams.get('page') || '1';
    const sortBy = url.searchParams.get('sortBy') || 'recent'; // 'recent' or 'rating'
    
    // Parse numeric parameters
    const minRatingNum = minRating ? parseInt(minRating) : 0;
    const limitNum = parseInt(limit);
    const pageNum = parseInt(page);
    const skip = (pageNum - 1) * limitNum;
    
    await connectToDatabase();
    
    // Find the business by showcasePageSlug
    const business = await Business.findOne({ 
      showcasePageSlug: slug,
      showcasePageEnabled: true
    });
    
    if (!business) {
      return NextResponse.json(
        { error: 'Showcase page not found or disabled' },
        { status: 404 }
      );
    }
    
    // Build the query
    const query: Record<string, unknown> = {
      business: business._id,
      status: 'APPROVED'
    };
    
    // Add rating filter if provided
    if (minRatingNum > 0) {
      query.rating = { $gte: minRatingNum };
    }
    
    // Determine sort order
    const sortOptions: { [key: string]: SortOrder } = {};
    if (sortBy === 'rating') {
      sortOptions.rating = -1; // High to low
    } else {
      sortOptions.createdAt = -1; // Most recent first
    }
    
    // Count total records for pagination
    const totalCount = await Testimonial.countDocuments(query);
    
    // Execute query with populated client details
    const testimonials = await Testimonial.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNum)
      .populate('client', 'email');
    
    // Format the testimonials
    const formattedTestimonials = testimonials.map(t => {
      const clientData = t.client as unknown as { email?: string };
      return {
        id: t._id,
        content: t.content,
        rating: t.rating,
        clientName: clientData.email?.split('@')[0] || 'Anonymous',
        createdAt: t.createdAt,
        mediaUrls: t.mediaUrls
      };
    });
    
    return NextResponse.json({
      success: true,
      data: {
        testimonials: formattedTestimonials,
        business: {
          name: business.name,
          logoUrl: business.logoUrl
        },
        pagination: {
          total: totalCount,
          page: pageNum,
          limit: limitNum,
          totalPages: Math.ceil(totalCount / limitNum)
        }
      }
    });
  } catch (error) {
    console.error('Error fetching showcase testimonials:', error);
    return NextResponse.json(
      { error: 'Failed to fetch showcase testimonials' },
      { status: 500 }
    );
  }
} 