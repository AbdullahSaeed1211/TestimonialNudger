import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import TestimonialFormClient from '@/app/testimonial-form/[token]/TestimonialFormClient';

interface PageProps {
  params: Promise<{
    token: string;
  }>;
}

// This is now a server component that handles the async params
export default async function TestimonialFormPage({ params }: PageProps) {
  const { token } = await params;
  
  if (!token) {
    notFound();
  }
  
  // We'll pass the resolved token to the client component
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    }>
      <TestimonialFormClient token={token} />
    </Suspense>
  );
} 