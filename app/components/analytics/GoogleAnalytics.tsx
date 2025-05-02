'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// Type declarations for gtag
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'consent',
      targetId: string | Date,
      options?: Record<string, unknown>
    ) => void;
    dataLayer: Array<Record<string, unknown>>;
  }
}

// Main analytics component with scripts
export function GoogleAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  if (!measurementId) {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            // Default to denied until consent is given
            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'analytics_storage': 'denied'
            });
            
            // Check if consent was previously given
            const storedConsent = localStorage.getItem('cookie-consent');
            if (storedConsent === 'true') {
              gtag('consent', 'update', {
                'ad_storage': 'granted',
                'analytics_storage': 'granted'
              });
            }
            
            gtag('config', '${measurementId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <PageViewTracker measurementId={measurementId} />
    </>
  );
}

// Separate client component to handle page view tracking
function PageViewTracker({ measurementId }: { measurementId: string }) {
  // These hooks are now isolated in their own client component
  const [hasConsent, setHasConsent] = useState<boolean | null>(null);
  
  // Using the imports directly but wrapped in a client component
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Check for consent when component mounts
  useEffect(() => {
    const storedConsent = localStorage.getItem('cookie-consent');
    setHasConsent(storedConsent === 'true');
  }, []);

  // Track page views
  useEffect(() => {
    if (!measurementId || hasConsent === null) return;
    if (!hasConsent) return;
    
    // Send pageview with path and search parameters
    const url = pathname + searchParams.toString();
    window.gtag?.('config', measurementId, {
      page_path: url,
    });
  }, [pathname, searchParams, measurementId, hasConsent]);

  return null;
} 