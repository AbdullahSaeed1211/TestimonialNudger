import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db/connect';
import TestimonialToken from '@/lib/db/models/TestimonialToken';
import Business from '@/lib/db/models/Business';

// GET endpoint to validate a testimonial token and return business info
export async function GET(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    const token = params.token;
    if (!token) {
      return NextResponse.json({ error: 'Token is required' }, { status: 400 });
    }

    // Connect to the database
    await connectToDatabase();

    // Find the token in the database
    const testimonialToken = await TestimonialToken.findOne({
      token,
      isUsed: false,
      expiresAt: { $gt: new Date() },
    });

    if (!testimonialToken) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 404 }
      );
    }

    // Get the business data
    const business = await Business.findById(testimonialToken.business);
    if (!business) {
      return NextResponse.json(
        { error: 'Business not found' },
        { status: 404 }
      );
    }

    // Return the business data and token info
    return NextResponse.json({
      business: {
        id: business._id,
        name: business.name,
        logo: business.logoUrl,
        serviceType: testimonialToken.serviceType || business.serviceTypes[0] || 'Services',
      },
      token: {
        clientName: testimonialToken.clientName,
        clientEmail: testimonialToken.clientEmail,
        serviceType: testimonialToken.serviceType,
      },
    });
  } catch (error) {
    console.error('Error validating token:', error);
    return NextResponse.json(
      { error: 'Failed to validate token' },
      { status: 500 }
    );
  }
} 