import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import TestEmail from '@/lib/email/templates/TestEmail';
import { renderAsync } from '@react-email/render';

export async function GET() {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    // Check if API key is set
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ 
        error: 'RESEND_API_KEY is not set in environment variables' 
      }, { status: 500 });
    }

    // Render the React Email template to HTML
    const html = await renderAsync(TestEmail({ userName: 'Test User' }));
    
    // Test connection to Resend API using the provided domain
    const result = await resend.emails.send({
      from: 'Testimonial Nudger <contact@resend.abdullahsaeed.me>',
      to: 'contact@resend.abdullahsaeed.me', // Using the provided email for testing
      subject: 'Testimonial Nudger - Email Test',
      html: html,
      text: 'This is a test email to verify Resend integration.',
    });
    
    return NextResponse.json({
      success: true,
      message: 'Resend is properly configured',
      apiKeyPresent: !!process.env.RESEND_API_KEY,
      data: result
    });
  } catch (error) {
    console.error('Error testing Resend:', error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Unknown error',
      apiKeyPresent: !!process.env.RESEND_API_KEY
    }, { status: 500 });
  }
} 