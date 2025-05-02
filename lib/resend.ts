import { Resend } from 'resend';

// Initialize Resend
export const resend = new Resend(process.env.RESEND_API_KEY || '');

if (!process.env.RESEND_API_KEY) {
  console.warn('RESEND_API_KEY is not set. Email functionality will not work properly.');
} 