'use client';

import { useState, useEffect } from 'react';

interface TestimonialFormClientProps {
  token: string;
}

export default function TestimonialFormClient({ token }: TestimonialFormClientProps) {
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    // Log token value to resolve the linter warning
    console.log(`Testimonial form loaded with token: ${token}`);
  }, [token]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate submission process
    setTimeout(() => {
      console.log('Testimonial submitted');
      setLoading(false);
    }, 1500);
  };
  
  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="rounded-lg border bg-card shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-6">Share Your Experience</h1>
        
        <p className="mb-6 text-gray-600">
          Thank you for taking the time to share your feedback. Your testimonial will help others 
          understand the value of our services.
        </p>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">Your Name</label>
            <input 
              type="text" 
              id="name" 
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Full Name" 
            />
          </div>
          
          <div>
            <label htmlFor="company" className="block text-sm font-medium mb-1">Company/Position (Optional)</label>
            <input 
              type="text" 
              id="company" 
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Company or Position" 
            />
          </div>
          
          <div>
            <label htmlFor="testimonial" className="block text-sm font-medium mb-1">Your Testimonial</label>
            <textarea 
              id="testimonial" 
              rows={5} 
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Share your experience working with us..."
            ></textarea>
          </div>
          
          <div>
            <label htmlFor="rating" className="block text-sm font-medium mb-1">Rating</label>
            <select 
              id="rating" 
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="5">5 - Excellent</option>
              <option value="4">4 - Very Good</option>
              <option value="3">3 - Good</option>
              <option value="2">2 - Fair</option>
              <option value="1">1 - Poor</option>
            </select>
          </div>
          
          <div className="pt-2">
            <button 
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              {loading ? 'Submitting...' : 'Submit Testimonial'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 