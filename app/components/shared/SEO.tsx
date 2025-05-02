import { Metadata } from 'next/types';

type SEOProps = {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  noIndex?: boolean;
};

export function generateMetadata({
  title,
  description,
  canonical,
  ogImage,
  noIndex
}: SEOProps): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
      type: 'website',
      url: canonical,
    },
    robots: noIndex ? 'noindex, nofollow' : 'index, follow',
    alternates: {
      canonical: canonical,
    },
  };
}

export const defaultSEO: SEOProps = {
  title: 'TestimonialNudger - Automated Testimonial Collection Platform',
  description: 'TestimonialNudger helps businesses collect, manage, and showcase testimonials with features like AI-generated emails, media uploads, and a responsive UI.',
  ogImage: '/og-image.jpg',
}; 