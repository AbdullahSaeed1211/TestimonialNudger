import './globals.css';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { Suspense } from 'react';
import Navbar from './components/layout/Navbar';
import { Toaster } from "@/components/ui/sonner";
import { GoogleAnalytics } from './components/analytics/GoogleAnalytics';
import { CookieConsent } from './components/analytics/CookieConsent';

const inter = Inter({ subsets: ['latin'] });

// Define fallback URL for deployments
const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://testimonial-nudger.vercel.app';

// Enhanced metadata for better SEO
export const metadata = {
  title: {
    default: 'TestimonialNudger - Collect & Display Client Testimonials',
    template: '%s | TestimonialNudger'
  },
  description: 'Automate testimonial collection, manage client feedback, and showcase powerful social proof on your website with TestimonialNudger.',
  keywords: ['testimonials', 'client feedback', 'social proof', 'reviews', 'testimonial collection', 'business growth'],
  authors: [{ name: 'TestimonialNudger Team' }],
  creator: 'TestimonialNudger',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: 'TestimonialNudger - Collect & Display Client Testimonials',
    description: 'Automate testimonial collection, manage client feedback, and showcase powerful social proof on your website.',
    siteName: 'TestimonialNudger',
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'TestimonialNudger - Testimonial Collection Platform',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TestimonialNudger - Collect & Display Client Testimonials',
    description: 'Automate testimonial collection, manage client feedback, and showcase powerful social proof on your website.',
    images: [`${siteUrl}/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: `${siteUrl}/site.webmanifest`,
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Suspense fallback={null}>
            <GoogleAnalytics />
          </Suspense>
          <Navbar />
          <main>{children}</main>
          <Toaster position="top-right" closeButton richColors />
          <CookieConsent />
        </body>
      </html>
    </ClerkProvider>
  );
}
