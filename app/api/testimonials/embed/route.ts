import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db/connect';
import Testimonial from '@/lib/db/models/Testimonial';
import Business from '@/lib/db/models/Business';

// Add CORS headers to allow embedding on any website
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

// Add cache revalidation period - testimonials are unlikely to change often
export const revalidate = 3600; // Revalidate at most every hour

export async function GET(request: NextRequest) {
  try {
    // Extract query parameters
    const url = new URL(request.url);
    const businessId = url.searchParams.get('businessId');
    const count = parseInt(url.searchParams.get('count') || '3');
    const minRating = parseInt(url.searchParams.get('minRating') || '0');
    
    if (!businessId) {
      return NextResponse.json({ error: 'Business ID is required' }, { 
        status: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      });
    }
    
    // Connect to the database
    await connectToDatabase();
    
    // Verify business exists
    const business = await Business.findById(businessId);
    if (!business) {
      return NextResponse.json({ error: 'Business not found' }, { 
        status: 404,
        headers: {
          'Access-Control-Allow-Origin': '*',
        }, 
      });
    }
    
    // Find approved testimonials for this business
    const testimonials = await Testimonial.find({
      business: businessId,
      status: 'APPROVED',
      rating: { $gte: minRating },
    })
    .sort({ createdAt: -1 })
    .limit(count)
    .populate('client', 'name email');
    
    // Transform testimonials for client consumption
    const formattedTestimonials = testimonials.map(t => {
      const testimonial = t.toObject();
      // Safely handle client properties in case client is just an ObjectId or null
      const clientName = testimonial.client && typeof testimonial.client === 'object' && 'name' in testimonial.client 
        ? testimonial.client.name 
        : 'Anonymous';
      
      return {
        _id: testimonial._id,
        content: testimonial.content,
        rating: testimonial.rating || 5,
        authorName: clientName,
        // Since these properties don't exist in the model, provide defaults
        authorCompany: 'clientCompany' in testimonial ? testimonial.clientCompany : '',
        authorAvatar: 'clientAvatar' in testimonial ? testimonial.clientAvatar : '',
        mediaUrls: testimonial.mediaUrls || [],
        createdAt: testimonial.createdAt,
      };
    });
    
    // Return the testimonials with CORS headers and stronger caching
    return NextResponse.json({ 
      testimonials: formattedTestimonials,
      businessName: business.name,
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=3600, s-maxage=7200, stale-while-revalidate=86400', // Cache for 1 hour browser, 2 hours CDN, stale for 24 hours
      },
    });
  } catch (error) {
    console.error('Error fetching testimonials for embed:', error);
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { 
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
} 