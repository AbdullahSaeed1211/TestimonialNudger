import { Resend } from 'resend';
import { ServiceData, getTestimonialRequestEmailWithFallback } from '../ai/generateRequestEmail';
import TestimonialRequest from './templates/TestimonialRequest';
import { renderAsync } from '@react-email/render';

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Interface for sending testimonial request email
 */
interface SendTestimonialRequestOptions extends ServiceData {
  clientEmail: string;
  fromEmail?: string;
  fromName?: string;
  bccEmail?: string;
  templateType?: 'friendly' | 'professional' | 'snappy';
  useReactEmail?: boolean;
  logoUrl?: string;
  baseUrl?: string;
}

/**
 * Send testimonial request email to client
 */
export async function sendTestimonialRequest({
  clientName,
  clientEmail,
  serviceType,
  businessName,
  formLink,
  projectDescription,
  completionDate,
  fromEmail = 'contact@resend.abdullahsaeed.me',
  fromName = 'TestimonialNudger',
  bccEmail = 'audit@testimonialnudger.com',
  templateType = 'friendly',
  useReactEmail = true,
  logoUrl,
  baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://testimonialnudger.com'
}: SendTestimonialRequestOptions): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    let html: string | undefined;
    let text: string;

    if (useReactEmail) {
      // Use React Email template
      html = await renderAsync(
        TestimonialRequest({
          clientName,
          serviceType,
          businessName,
          formLink,
          projectDescription,
          completionDate,
          logoUrl,
          baseUrl
        })
      );
      
      // Fallback text version
      text = `Hi ${clientName},\n\nThank you for choosing ${businessName} for your ${serviceType} service. We'd appreciate your feedback.\n\nShare your testimonial here: ${formLink}\n\nThanks,\n${businessName}`;
    } else {
      // Get email content using AI or fallback template
      text = await getTestimonialRequestEmailWithFallback(
        {
          clientName,
          serviceType,
          businessName,
          formLink,
          projectDescription,
          completionDate
        },
        templateType
      );
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: `${fromName} <${fromEmail}>`,
      to: clientEmail,
      subject: `How was your ${serviceType} experience?`,
      text,
      html,
      bcc: bccEmail ? bccEmail : undefined,
    });

    if (error) {
      console.error('Error sending testimonial request email:', error);
      return { success: false, error: error.message };
    }

    return { success: true, id: data?.id };
  } catch (error) {
    console.error('Failed to send testimonial request:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error sending email' 
    };
  }
} 