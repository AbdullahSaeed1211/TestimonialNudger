import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import ShowcaseClient from './ShowcaseClient';

interface PageProps {
  params: Promise<{
    businessSlug: string;
  }>;
}

// This is now a server component that handles the async params
export default async function ShowcasePage({ params }: PageProps) {
  const { businessSlug } = await params;
  
  if (!businessSlug) {
    notFound();
  }
  
  // We'll pass the resolved slug to the client component
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    }>
      <ShowcaseClient businessSlug={businessSlug} />
    </Suspense>
  );
} 