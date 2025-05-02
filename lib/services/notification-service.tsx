import { resend } from '@/lib/resend';
import React from 'react';

// Define a simplified testimonial interface for notifications
interface NotificationTestimonial {
  authorName: string;
  authorEmail: string;
  authorCompany?: string;
  content: string;
  rating: number;
  mediaUrls?: string[];
}

export async function sendNewTestimonialNotification(
  testimonial: NotificationTestimonial,
  businessEmail: string,
  businessName: string
) {
  try {
    const result = await resend.emails.send({
      from: `TestimonialNudger <notifications@testimonialnudger.com>`,
      to: [businessEmail],
      subject: `🎉 New Testimonial Received from ${testimonial.authorName}`,
      react: NewTestimonialEmailTemplate({
        testimonial,
        businessName,
      }),
    });

    return { success: true, data: result };
  } catch (error) {
    console.error('Failed to send testimonial notification:', error);
    return { success: false, error };
  }
}

interface EmailTemplateProps {
  testimonial: NotificationTestimonial;
  businessName: string;
}

function NewTestimonialEmailTemplate({ testimonial, businessName }: EmailTemplateProps) {
  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      color: '#333',
    }}>
      <div style={{
        textAlign: 'center',
        padding: '20px 0',
        borderBottom: '1px solid #eee',
      }}>
        <h1 style={{ color: '#4f46e5', margin: '0' }}>
          You&apos;ve Received a New Testimonial!
        </h1>
      </div>
      
      <div style={{ padding: '20px 0' }}>
        <p>Hello {businessName},</p>
        <p>Great news! You&apos;ve received a new testimonial from <strong>{testimonial.authorName}</strong>.</p>
        
        <div style={{
          margin: '20px 0',
          padding: '15px',
          backgroundColor: '#f9fafb',
          borderRadius: '5px',
          borderLeft: '4px solid #4f46e5',
        }}>
          <div style={{ marginBottom: '10px' }}>
            {'⭐'.repeat(testimonial.rating)}
          </div>
          <p style={{ fontStyle: 'italic' }}>&quot;{testimonial.content}&quot;</p>
          <p style={{ marginBottom: '0', fontWeight: 'bold' }}>- {testimonial.authorName}</p>
          {testimonial.authorCompany && (
            <p style={{ margin: '0', fontSize: '14px' }}>{testimonial.authorCompany}</p>
          )}
        </div>
        
        <p>
          Login to your dashboard to review and approve this testimonial for your showcase.
        </p>
        
        <div style={{ 
          textAlign: 'center', 
          margin: '30px 0' 
        }}>
          <a 
            href={`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/testimonials`}
            style={{
              backgroundColor: '#4f46e5',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '4px',
              textDecoration: 'none',
              fontWeight: 'bold',
              display: 'inline-block',
            }}
          >
            View on Dashboard
          </a>
        </div>
      </div>
      
      <div style={{
        borderTop: '1px solid #eee',
        padding: '20px 0',
        fontSize: '12px',
        color: '#666',
        textAlign: 'center',
      }}>
        <p>
          This email was sent from TestimonialNudger.
          <br />
          You received this because you&apos;re using our service to collect testimonials.
        </p>
      </div>
    </div>
  );
} 