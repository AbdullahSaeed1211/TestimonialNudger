import { NextRequest, NextResponse } from 'next/server';
import { sendTestimonialRequest } from '@/lib/email/sendTestimonialRequest';
import { generateToken } from '@/lib/utils';

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
    const requestId = Math.random().toString(36).substring(2, 15);
    
    // Generate the form link
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const formLink = `${appUrl}/testimonial-form/${token}`;
    
    // Store the request data
    const testimonialRequest = {
      id: requestId,
      token,
      clientName,
      clientEmail,
      serviceType,
      projectDescription: projectDescription || '',
      completionDate: completionDate || '',
      templateType: templateType || 'friendly',
      businessId: businessId || 'default-business',
      status: 'PENDING',
      createdAt: new Date(),
    };

    // Flag to track if we're using fallback storage
    const usingFallback = true;
    
    // In a real app, we would try connecting to MongoDB here
    // and only use the fallback if it fails
    try {
      // Attempt to connect to the database and save the data
      // const db = await connectToDatabase();
      // const result = await db.collection('testimonialRequests').insertOne(testimonialRequest);
      // testimonialRequest.id = result.insertedId;
      // usingFallback = false;
    } catch (dbError) {
      console.error('Database error:', dbError);
      // We'll continue with the fallback approach
    }
    
    // Store in memory as fallback
    testimonialRequests.set(requestId, testimonialRequest);

    // Send email with testimonial request link
    try {
      const emailResult = await sendTestimonialRequest({
        clientName,
        clientEmail,
        serviceType,
        businessName: 'TestimonialNudger', // Default business name as fallback
        formLink,
        projectDescription: projectDescription || '',
        completionDate: completionDate || '',
        templateType: templateType || 'friendly',
      });
      
      if (!emailResult.success) {
        return NextResponse.json(
          { error: emailResult.error || 'Failed to send email' },
          { status: 500 }
        );
      }
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      return NextResponse.json(
        { error: 'Failed to send email, but request was saved' },
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