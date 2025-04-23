'use client';

import { useState, useEffect } from 'react';
import { Star, ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';

interface Testimonial {
  id: string;
  content: string;
  rating: number;
  clientName: string;
  clientRole?: string;
  serviceType: string;
  mediaUrl?: string;
  mediaUrls?: string[];
  createdAt: Date;
  status?: string;
}

export default function ShowcasePage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [filterByRating, setFilterByRating] = useState<number | null>(null);

  // Fetch testimonials from API
  useEffect(() => {
    const fetchTestimonials = async () => {
      setIsLoading(true);
      try {
        // Only fetch approved testimonials
        const response = await fetch('/api/testimonials?status=APPROVED');
        const data = await response.json();
        
        if (data.testimonials) {
          // Convert string dates to Date objects
          const formattedTestimonials = data.testimonials.map((testimonial: Omit<Testimonial, 'createdAt'> & { createdAt: string }) => ({
            ...testimonial,
            // Convert some fields to match our showcase component
            mediaUrl: testimonial.mediaUrls?.[0],
            createdAt: new Date(testimonial.createdAt)
          }));
          setTestimonials(formattedTestimonials);
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTestimonials();
  }, []);

  const filteredTestimonials = filterByRating 
    ? testimonials.filter(t => t.rating === filterByRating)
    : testimonials;

  const goToNextSlide = () => {
    setCurrentSlide(current => 
      current === filteredTestimonials.length - 1 ? 0 : current + 1
    );
  };

  const goToPrevSlide = () => {
    setCurrentSlide(current => 
      current === 0 ? filteredTestimonials.length - 1 : current - 1
    );
  };

  const renderStarRating = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 ${
              star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-indigo-50 to-white min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Read testimonials from our satisfied clients who have experienced our exceptional services firsthand.
          </p>
        </div>

        {/* Rating Filter */}
        <div className="flex justify-center mb-12">
          <div className="bg-white p-2 rounded-full shadow-md flex space-x-1">
            <button 
              onClick={() => setFilterByRating(null)}
              className={`px-4 py-2 rounded-full ${
                filterByRating === null 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {[5, 4, 3].map(rating => (
              <button
                key={rating}
                onClick={() => setFilterByRating(rating)}
                className={`px-4 py-2 rounded-full ${
                  filterByRating === rating 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {rating}★
              </button>
            ))}
          </div>
        </div>

        {/* Testimonial Carousel */}
        {filteredTestimonials.length > 0 ? (
          <div className="relative max-w-4xl mx-auto">
            <div className="flex justify-between absolute top-1/2 transform -translate-y-1/2 left-0 right-0 z-10 px-4">
              <button
                onClick={goToPrevSlide}
                className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100"
                aria-label="Previous testimonial"
              >
                <ArrowLeft className="h-6 w-6 text-gray-700" />
              </button>
              <button
                onClick={goToNextSlide}
                className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100"
                aria-label="Next testimonial"
              >
                <ArrowRight className="h-6 w-6 text-gray-700" />
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-xl p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                {filteredTestimonials[currentSlide].mediaUrl && (
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden">
                      <Image
                        src={filteredTestimonials[currentSlide].mediaUrl}
                        alt={filteredTestimonials[currentSlide].clientName}
                        width={128}
                        height={128}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
                
                <div className="flex-1">
                  <div className="mb-4">
                    {renderStarRating(filteredTestimonials[currentSlide].rating)}
                  </div>
                  
                  <blockquote className="text-xl italic text-gray-800 mb-6">
                    &ldquo;{filteredTestimonials[currentSlide].content}&rdquo;
                  </blockquote>
                  
                  <div>
                    <p className="text-lg font-semibold">
                      {filteredTestimonials[currentSlide].clientName}
                    </p>
                    {filteredTestimonials[currentSlide].clientRole && (
                      <p className="text-gray-600">
                        {filteredTestimonials[currentSlide].clientRole}
                      </p>
                    )}
                    <p className="text-indigo-600 text-sm mt-1">
                      {filteredTestimonials[currentSlide].serviceType}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Carousel Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {filteredTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 w-${
                    index === currentSlide ? '6' : '2'
                  } rounded-full ${
                    index === currentSlide ? 'bg-indigo-600' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <p className="text-gray-500">No testimonials match your filter</p>
          </div>
        )}

        {/* Grid View */}
        <div className="mt-24">
          <h2 className="text-2xl font-bold text-center mb-12">More Client Testimonials</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="mb-3">
                  {renderStarRating(testimonial.rating)}
                </div>
                
                <p className="text-gray-800 mb-4 line-clamp-4">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                
                <div className="flex items-center mt-6 pt-4 border-t border-gray-100">
                  {testimonial.mediaUrl && (
                    <div className="mr-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <Image
                          src={testimonial.mediaUrl}
                          alt={testimonial.clientName}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <p className="font-medium">{testimonial.clientName}</p>
                    <p className="text-sm text-gray-600">{testimonial.serviceType}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 