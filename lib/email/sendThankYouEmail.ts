import { Resend } from 'resend';
import ThankYouEmail from './templates/ThankYouEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendThankYouEmailProps {
  businessName: string;
  clientName: string;
  recommenderEmail: string;
  recommenderName?: string;
  logoUrl?: string;
  personalNote?: string;
  baseUrl?: string;
}

/**
 * Send a thank you email to the person who recommended a client who left a testimonial
 */
export async function sendThankYouEmail({
  businessName,
  clientName,
  recommenderEmail,
  recommenderName,
  logoUrl,
  personalNote,
  baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://testimonialnudger.com'
}: SendThankYouEmailProps) {
  try {
    const fromEmail = process.env.EMAIL_FROM || 'testimonials@yourdomain.com';
    const subject = `Thank you for the testimonial from ${clientName}`;

    const data = await resend.emails.send({
      from: fromEmail,
      to: recommenderEmail,
      subject,
      react: ThankYouEmail({
        businessName,
        clientName,
        recommenderName,
        logoUrl,
        personalNote,
        baseUrl
      }),
    });

    return { success: true, data };
  } catch (error) {
    console.error('Error sending thank you email:', error);
    return { success: false, error };
  }
} 