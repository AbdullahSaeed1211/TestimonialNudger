'use client';

/**
 * Custom hook for tracking analytics events throughout the application
 */
export function useAnalytics() {
  /**
   * Track a custom event
   * @param eventName - The name of the event to track
   * @param eventParams - Additional parameters to include with the event
   */
  const trackEvent = (
    eventName: string,
    eventParams?: Record<string, string | number | boolean>
  ) => {
    // Check if gtag is available
    if (!window.gtag) return;
    
    // Track the event
    window.gtag('event', eventName, eventParams);
  };

  /**
   * Track when a testimonial is submitted
   */
  const trackTestimonialSubmission = (testimonialId: string, rating: number) => {
    trackEvent('testimonial_submitted', {
      testimonial_id: testimonialId,
      rating,
    });
  };

  /**
   * Track when a testimonial request is sent
   */
  const trackTestimonialRequest = (recipientCount: number) => {
    trackEvent('testimonial_request_sent', {
      recipient_count: recipientCount,
    });
  };

  /**
   * Track when an embed code is generated
   */
  const trackEmbedGeneration = (testimonialCount: number, format: string) => {
    trackEvent('embed_code_generated', {
      testimonial_count: testimonialCount,
      format,
    });
  };

  return {
    trackEvent,
    trackTestimonialSubmission,
    trackTestimonialRequest,
    trackEmbedGeneration,
  };
} 