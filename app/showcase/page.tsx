'use client';

import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
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

  // Format date helper function
  const formatDate = (date: Date) => {
    return date.toLocaleDateString();
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

        {/* Header and filters */}
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-4">Client Testimonials</h1>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-8">
            See what our clients have to say about working with us
          </p>
          
          {/* Rating filter - mobile dropdown */}
          <div className="md:hidden mb-6">
            <label htmlFor="rating-filter-mobile" className="block text-sm font-medium text-gray-700 mb-2">
              Filter by rating
            </label>
            <select
              id="rating-filter-mobile"
              value={filterByRating === null ? "0" : filterByRating.toString()}
              onChange={(e) => setFilterByRating(e.target.value === "0" ? null : Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="0">All Ratings</option>
              <option value="5">5 Stars Only</option>
              <option value="4">4+ Stars</option>
              <option value="3">3+ Stars</option>
            </select>
          </div>
          
          {/* Rating filter - desktop buttons */}
          <div className="hidden md:flex justify-center mb-8">
            <div className="inline-flex rounded-md shadow-sm">
              <button
                type="button"
                onClick={() => setFilterByRating(null)}
                className={`px-4 py-2 text-sm font-medium rounded-l-md ${
                  filterByRating === null
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                }`}
              >
                All Ratings
              </button>
              <button
                type="button"
                onClick={() => setFilterByRating(5)}
                className={`px-4 py-2 text-sm font-medium ${
                  filterByRating === 5
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-t border-b border-gray-300'
                }`}
              >
                5 Stars Only
              </button>
              <button
                type="button"
                onClick={() => setFilterByRating(4)}
                className={`px-4 py-2 text-sm font-medium ${
                  filterByRating === 4
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-t border-b border-gray-300'
                }`}
              >
                4+ Stars
              </button>
              <button
                type="button"
                onClick={() => setFilterByRating(3)}
                className={`px-4 py-2 text-sm font-medium rounded-r-md ${
                  filterByRating === 3
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                }`}
              >
                3+ Stars
              </button>
            </div>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : filteredTestimonials.length === 0 ? (
          <div className="text-center py-16 px-4">
            <p className="text-xl text-gray-600">No testimonials found matching the selected filter.</p>
            <button 
              onClick={() => setFilterByRating(null)}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
            >
              View All Testimonials
            </button>
          </div>
        ) : (
          <>
            {/* Testimonial Carousel */}
            <div className="mb-16 relative">
              <div className="max-w-3xl mx-auto px-4 sm:px-6">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="p-6 sm:p-8">
                    <div className="flex items-center mb-4">
                      <div className="flex gap-1">
                        {renderStarRating(filteredTestimonials[currentSlide].rating)}
                      </div>
                      <span className="ml-2 text-sm text-gray-500">
                        {formatDate(filteredTestimonials[currentSlide].createdAt)}
                      </span>
                    </div>
                    
                    <blockquote className="text-lg sm:text-xl italic text-gray-700 mb-6">
                      &ldquo;{filteredTestimonials[currentSlide].content}&rdquo;
                    </blockquote>
                    
                    <div className="flex items-center">
                      {filteredTestimonials[currentSlide].mediaUrl && (
                        <div className="mr-4">
                          <div className="h-12 w-12 rounded-full overflow-hidden">
                            <Image 
                              src={filteredTestimonials[currentSlide].mediaUrl} 
                              alt="Media" 
                              width={48} 
                              height={48} 
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </div>
                      )}
                      <div>
                        <p className="font-semibold">{filteredTestimonials[currentSlide].clientName}</p>
                        {filteredTestimonials[currentSlide].clientRole && (
                          <p className="text-sm text-gray-600">{filteredTestimonials[currentSlide].clientRole}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Navigation controls */}
              {filteredTestimonials.length > 1 && (
                <div className="absolute inset-x-0 top-1/2 -mt-10 flex justify-between items-center px-4 sm:px-10">
                  <button
                    onClick={goToPrevSlide}
                    className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-transform transform hover:scale-110"
                    aria-label="Previous testimonial"
                  >
                    <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={goToNextSlide}
                    className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-transform transform hover:scale-110"
                    aria-label="Next testimonial"
                  >
                    <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}
              
              {/* Dots/indicators */}
              {filteredTestimonials.length > 1 && (
                <div className="flex justify-center mt-6">
                  {filteredTestimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`mx-1 h-2 w-2 rounded-full focus:outline-none ${
                        currentSlide === index ? 'bg-indigo-600 w-4' : 'bg-gray-300'
                      } transition-all duration-200`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
            
            {/* Additional testimonials grid */}
            {filteredTestimonials.length > 1 && (
              <div className="mt-12 px-4 sm:px-6">
                <h2 className="text-2xl font-bold mb-6">More Testimonials</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTestimonials.map((testimonial, index) => (
                    index !== currentSlide && (
                      <div key={testimonial.id} className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-center mb-3">
                          <div className="flex gap-1">
                            {renderStarRating(testimonial.rating)}
                          </div>
                          <span className="ml-2 text-xs text-gray-500">
                            {formatDate(testimonial.createdAt)}
                          </span>
                        </div>
                        
                        <p className="text-gray-700 mb-4 line-clamp-3">
                          &ldquo;{testimonial.content}&rdquo;
                        </p>
                        
                        <div className="flex items-center">
                          {testimonial.mediaUrl ? (
                            <div className="mr-3">
                              <div className="h-8 w-8 rounded-full overflow-hidden">
                                <Image 
                                  src={testimonial.mediaUrl} 
                                  alt="Media" 
                                  width={32} 
                                  height={32} 
                                  className="h-full w-full object-cover"
                                />
                              </div>
                            </div>
                          ) : (
                            <div className="mr-3">
                              <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
                                <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                              </div>
                            </div>
                          )}
                          <div>
                            <p className="font-medium text-sm">{testimonial.clientName}</p>
                            {testimonial.clientRole && (
                              <p className="text-xs text-gray-600">{testimonial.clientRole}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
} 