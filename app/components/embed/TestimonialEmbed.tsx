'use client';

import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import Image from 'next/image';

interface Testimonial {
  _id: string;
  authorName: string;
  authorCompany?: string;
  authorAvatar?: string;
  rating: number;
  content: string;
  mediaUrls?: string[];
}

interface EmbedProps {
  businessId: string;
  count?: number;
  theme?: 'light' | 'dark' | 'auto';
  showRating?: boolean;
  layout?: 'grid' | 'carousel' | 'list';
  minRating?: number;
}

export default function TestimonialEmbed({
  businessId,
  count = 3,
  theme = 'light',
  showRating = true,
  layout = 'carousel',
  minRating = 4,
}: EmbedProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const res = await fetch(
          `/api/testimonials/embed?businessId=${businessId}&count=${count}&minRating=${minRating}`
        );
        
        if (!res.ok) {
          throw new Error('Failed to fetch testimonials');
        }
        
        const data = await res.json();
        setTestimonials(data.testimonials);
      } catch (err) {
        setError('Could not load testimonials');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchTestimonials();
  }, [businessId, count, minRating]);

  // Auto-rotate carousel
  useEffect(() => {
    if (layout === 'carousel' && testimonials.length > 0) {
      const interval = setInterval(() => {
        setActiveSlide((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [layout, testimonials.length]);

  // Determine theme class
  const themeClass = theme === 'auto' 
    ? 'tn-light dark:tn-dark' 
    : theme === 'dark' ? 'tn-dark' : 'tn-light';

  if (loading) {
    return (
      <div className={`tn-testimonial-embed ${themeClass} tn-loading`}>
        <div className="tn-loader"></div>
      </div>
    );
  }

  if (error || testimonials.length === 0) {
    return (
      <div className={`tn-testimonial-embed ${themeClass} tn-error`}>
        {error || 'No testimonials found'}
      </div>
    );
  }

  // Helper function to render author avatar
  const renderAvatar = (testimonial: Testimonial) => {
    if (!testimonial.authorAvatar) return null;
    
    return (
      <div className="tn-avatar-container relative h-10 w-10 rounded-full overflow-hidden">
        <Image 
          src={testimonial.authorAvatar} 
          alt={testimonial.authorName}
          fill
          className="object-cover"
          sizes="40px"
        />
      </div>
    );
  };

  return (
    <div className={`tn-testimonial-embed ${themeClass}`}>
      {layout === 'carousel' && (
        <div className="tn-carousel">
          <div className="tn-slides">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial._id} 
                className={`tn-slide ${index === activeSlide ? 'tn-active' : ''}`}
              >
                <div className="tn-content">&ldquo;{testimonial.content}&rdquo;</div>
                
                {showRating && (
                  <div className="tn-rating">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`tn-star ${i < testimonial.rating ? 'tn-filled' : ''}`}
                      />
                    ))}
                  </div>
                )}
                
                <div className="tn-author">
                  {testimonial.authorAvatar && renderAvatar(testimonial)}
                  <div className="tn-author-info">
                    <div className="tn-name">{testimonial.authorName}</div>
                    {testimonial.authorCompany && (
                      <div className="tn-company">{testimonial.authorCompany}</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="tn-controls">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`tn-dot ${index === activeSlide ? 'tn-active' : ''}`}
                onClick={() => setActiveSlide(index)}
                aria-label={`Testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
      
      {layout === 'grid' && (
        <div className="tn-grid">
          {testimonials.map((testimonial) => (
            <div key={testimonial._id} className="tn-grid-item">
              <div className="tn-content">&ldquo;{testimonial.content}&rdquo;</div>
              
              {showRating && (
                <div className="tn-rating">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`tn-star ${i < testimonial.rating ? 'tn-filled' : ''}`}
                    />
                  ))}
                </div>
              )}
              
              <div className="tn-author">
                {testimonial.authorAvatar && renderAvatar(testimonial)}
                <div className="tn-author-info">
                  <div className="tn-name">{testimonial.authorName}</div>
                  {testimonial.authorCompany && (
                    <div className="tn-company">{testimonial.authorCompany}</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {layout === 'list' && (
        <div className="tn-list">
          {testimonials.map((testimonial) => (
            <div key={testimonial._id} className="tn-list-item">
              <div className="tn-content">&ldquo;{testimonial.content}&rdquo;</div>
              
              {showRating && (
                <div className="tn-rating">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`tn-star ${i < testimonial.rating ? 'tn-filled' : ''}`}
                    />
                  ))}
                </div>
              )}
              
              <div className="tn-author">
                {testimonial.authorAvatar && renderAvatar(testimonial)}
                <div className="tn-author-info">
                  <div className="tn-name">{testimonial.authorName}</div>
                  {testimonial.authorCompany && (
                    <div className="tn-company">{testimonial.authorCompany}</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="tn-badge">
        Powered by <a href="https://testimonialnudger.com" target="_blank" rel="noopener noreferrer">TestimonialNudger</a>
      </div>
    </div>
  );
} 