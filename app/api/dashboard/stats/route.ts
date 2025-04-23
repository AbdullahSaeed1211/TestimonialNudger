import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import connectToDatabase from '@/lib/db/connect';
import Testimonial from '@/lib/db/models/Testimonial';
import Business from '@/lib/db/models/Business';
import TestimonialToken from '@/lib/db/models/TestimonialToken';

// GET dashboard statistics
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
    
    // Get the business associated with this user
    const business = await Business.findOne({ owner: userId });
    
    if (!business) {
      return NextResponse.json(
        { error: 'Business not found' },
        { status: 404 }
      );
    }
    
    // Get testimonial statistics
    const totalTestimonials = await Testimonial.countDocuments({ business: business._id });
    const approvedTestimonials = await Testimonial.countDocuments({ 
      business: business._id,
      status: 'APPROVED'
    });
    const pendingTestimonials = await Testimonial.countDocuments({ 
      business: business._id,
      status: 'PENDING'
    });
    const flaggedTestimonials = await Testimonial.countDocuments({ 
      business: business._id,
      status: 'FLAGGED'
    });
    
    // Get token statistics
    const totalTokens = await TestimonialToken.countDocuments({ business: business._id });
    const usedTokens = await TestimonialToken.countDocuments({ 
      business: business._id,
      isUsed: true
    });
    const pendingTokens = await TestimonialToken.countDocuments({ 
      business: business._id,
      isUsed: false,
      expiresAt: { $gt: new Date() }
    });
    const expiredTokens = await TestimonialToken.countDocuments({ 
      business: business._id,
      isUsed: false,
      expiresAt: { $lte: new Date() }
    });
    
    // Calculate conversion rate
    const conversionRate = totalTokens > 0 ? (usedTokens / totalTokens) * 100 : 0;
    
    // Get average rating
    const ratingsAggregation = await Testimonial.aggregate([
      { $match: { business: business._id, rating: { $exists: true } } },
      { $group: { _id: null, averageRating: { $avg: "$rating" } } }
    ]);
    const averageRating = ratingsAggregation.length > 0 ? ratingsAggregation[0].averageRating : 0;
    
    // Get recent testimonials
    const recentTestimonials = await Testimonial.find({ business: business._id })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('client', 'email');
    
    return NextResponse.json({
      success: true,
      data: {
        testimonials: {
          total: totalTestimonials,
          approved: approvedTestimonials,
          pending: pendingTestimonials,
          flagged: flaggedTestimonials
        },
        tokens: {
          total: totalTokens,
          used: usedTokens,
          pending: pendingTokens,
          expired: expiredTokens,
          conversionRate: conversionRate.toFixed(2)
        },
        ratings: {
          average: averageRating.toFixed(1)
        },
        recent: recentTestimonials
      }
    });
  } catch (error) {
    console.error('Error fetching dashboard statistics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard statistics' },
      { status: 500 }
    );
  }
} 