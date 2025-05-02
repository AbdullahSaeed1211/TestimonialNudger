import { NextRequest, NextResponse } from 'next/server';
import { sendTestimonialRequest } from '@/lib/email/sendTestimonialRequest';
import { generateToken } from '@/lib/utils';
import connectToDatabase from '@/lib/db/connect';
import TestimonialToken from '@/lib/db/models/TestimonialToken';
import Business from '@/lib/db/models/Business';
import mongoose from 'mongoose';

// In-memory storage as fallback
const testimonialRequests = new Map();

export async function POST(request: NextRequest) {
  try {
    const { 
      clientName,
      clientEmail,
      serviceType,
      businessId,
      projectDescription,
      completionDate,
      templateType = 'friendly'
    } = await request.json();
    
    // Validate required fields
    if (!clientName || !clientEmail || !serviceType) {
      return NextResponse.json(
        { error: 'Missing required fields' }, 
        { status: 400 }
      );
    }
    
    // Generate a unique token for this testimonial request
    const token = generateToken();
    
    // Generate the form link
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const formLink = `${appUrl}/testimonial-form/${token}`;
    
    // Set token expiration (30 days from now)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);
    
    // Prepare testimonial request data
    const tokenData = {
      token,
      clientName,
      clientEmail,
      serviceType,
      expiresAt,
      isUsed: false
    };

    // Flag to track if we're using fallback storage
    let usingFallback = true;
    let requestId = '';
    let businessName = 'TestimonialNudger'; // Default business name
    
    try {
      // Connect to MongoDB
      await connectToDatabase();
      
      // Get business data
      const business = await Business.findOne({ 
        _id: businessId || 'default-business'
      });
      
      if (business?.name) {
        businessName = business.name;
      }
      
      // Create testimonial token in database
      const testimonialToken = new TestimonialToken({
        ...tokenData,
        business: businessId || 'default-business'
      });
      
      await testimonialToken.save();
      
      // Access the ID safely
      if (testimonialToken.id) {
        requestId = testimonialToken.id;
      } else {
        requestId = new mongoose.Types.ObjectId().toString();
      }
      
      usingFallback = false;
    } catch (dbError) {
      console.error('Database error:', dbError);
      // Fall back to in-memory storage
      requestId = Math.random().toString(36).substring(2, 15);
      testimonialRequests.set(requestId, {
        id: requestId,
        ...tokenData,
        projectDescription: projectDescription || '',
        completionDate: completionDate || '',
        templateType,
        businessId: businessId || 'default-business',
        status: 'PENDING',
        createdAt: new Date(),
      });
    }

    // Send email with testimonial request link
    try {
      const emailResult = await sendTestimonialRequest({
        clientName,
        clientEmail,
        serviceType,
        businessName, // Use the retrieved business name
        formLink,
        projectDescription: projectDescription || '',
        completionDate: completionDate || '',
        templateType: templateType || 'friendly',
      });
      
      if (!emailResult.success) {
        console.error('Email sending error:', emailResult.error);
        return NextResponse.json(
          { 
            error: emailResult.error || 'Failed to send email',
            requestSaved: !usingFallback
          },
          { status: 500 }
        );
      }
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      return NextResponse.json(
        { 
          error: 'Failed to send email, but request was saved',
          requestSaved: !usingFallback
        },
        { status: 500 }
      );
    }

    // Return success response
    return NextResponse.json({
      message: 'Testimonial request sent successfully',
      requestId,
      formLink,
      token,
      usingFallback,
    });
  } catch (error) {
    console.error('Error sending testimonial request:', error);
    return NextResponse.json(
      { error: 'Failed to process testimonial request' },
      { status: 500 }
    );
  }
} 