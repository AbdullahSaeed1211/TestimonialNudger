import { NextRequest, NextResponse } from 'next/server';
import { getTestimonialRequestEmailWithFallback } from '@/lib/ai/generateRequestEmail';
import { sendTestimonialRequest } from '@/lib/email/sendTestimonialRequest';

export async function POST(request: NextRequest) {
  try {
    const { 
      clientName, 
      clientEmail, 
      serviceType, 
      businessName,
      templateType = 'friendly'
    } = await request.json();
    
    // Validate required fields
    if (!clientName || !clientEmail || !serviceType || !businessName) {
      return NextResponse.json(
        { error: 'Missing required fields: clientName, clientEmail, serviceType, and businessName are required' },
        { status: 400 }
      );
    }
    
    // Only send to the provided email or a test email
    const targetEmail = process.env.NODE_ENV === 'production' 
      ? clientEmail 
      : process.env.TEST_EMAIL || clientEmail;
    
    // For testing, use a placeholder form link
    const formLink = `https://testimonialnudger.com/form/test-token`;
    
    // Generate the email content with Claude AI
    const emailText = await getTestimonialRequestEmailWithFallback(
      {
        clientName,
        serviceType,
        businessName,
        formLink
      },
      templateType as 'friendly' | 'professional' | 'snappy'
    );
    
    // For testing, we'll send both AI-generated and template versions
    const useReactEmail = true;
    
    // Send the email using Resend
    const emailResult = await sendTestimonialRequest({
      clientName,
      clientEmail: targetEmail, // Use the safe target email
      serviceType,
      businessName,
      formLink,
      templateType: templateType as 'friendly' | 'professional' | 'snappy',
      useReactEmail
    });
    
    if (!emailResult.success) {
      return NextResponse.json({
        success: false,
        error: emailResult.error,
        aiGeneratedContent: emailText
      }, { status: 500 });
    }
    
    return NextResponse.json({
      success: true,
      emailId: emailResult.id,
      aiGeneratedContent: emailText,
      sentToEmail: targetEmail,
      usedReactTemplate: useReactEmail
    });
    
  } catch (error) {
    console.error('Error testing Claude email generation:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 });
  }
} 