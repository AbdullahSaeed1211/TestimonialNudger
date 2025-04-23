'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Form validation schema
const testimonialRequestSchema = z.object({
  clientName: z.string().min(2, 'Name must be at least 2 characters').max(100),
  clientEmail: z.string().email('Please enter a valid email address'),
  serviceType: z.string().min(2, 'Service type must be at least 2 characters').max(100),
  projectDescription: z.string().optional(),
  completionDate: z.string().optional(),
  templateType: z.enum(['friendly', 'professional', 'snappy']),
});

type TestimonialRequestFormData = z.infer<typeof testimonialRequestSchema>;

export default function TestimonialRequestPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TestimonialRequestFormData>({
    resolver: zodResolver(testimonialRequestSchema),
    defaultValues: {
      templateType: 'friendly',
    },
  });

  const onSubmit = async (data: TestimonialRequestFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const response = await fetch('/api/testimonial-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          businessId: 'default-business', // Using a default business ID for now
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send testimonial request');
      }

      console.log('Testimonial request sent successfully:', result);
      setSubmitSuccess(true);
      reset();
      
      // Navigate to success page or show success message
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } catch (error) {
      console.error('Error sending testimonial request:', error);
      setSubmitError(error instanceof Error ? error.message : 'Unknown error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Request a Testimonial</h1>
      
      {submitSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-md">
          Testimonial request sent successfully!
        </div>
      )}
      
      {submitError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
          Error: {submitError}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="clientName" className="block text-sm font-medium text-gray-700 mb-1">
              Client Name*
            </label>
            <input
              id="clientName"
              type="text"
              className={`w-full px-4 py-2 border rounded-md ${
                errors.clientName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="John Smith"
              {...register('clientName')}
            />
            {errors.clientName && (
              <p className="mt-1 text-sm text-red-600">{errors.clientName.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="clientEmail" className="block text-sm font-medium text-gray-700 mb-1">
              Client Email*
            </label>
            <input
              id="clientEmail"
              type="email"
              className={`w-full px-4 py-2 border rounded-md ${
                errors.clientEmail ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="client@example.com"
              {...register('clientEmail')}
            />
            {errors.clientEmail && (
              <p className="mt-1 text-sm text-red-600">{errors.clientEmail.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-1">
              Service Type*
            </label>
            <input
              id="serviceType"
              type="text"
              className={`w-full px-4 py-2 border rounded-md ${
                errors.serviceType ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Web Development, Logo Design, etc."
              {...register('serviceType')}
            />
            {errors.serviceType && (
              <p className="mt-1 text-sm text-red-600">{errors.serviceType.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="completionDate" className="block text-sm font-medium text-gray-700 mb-1">
              Completion Date
            </label>
            <input
              id="completionDate"
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              {...register('completionDate')}
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-700 mb-1">
            Project Description
          </label>
          <textarea
            id="projectDescription"
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Briefly describe the project or service you provided"
            {...register('projectDescription')}
          ></textarea>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Template Style
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center">
              <input
                id="friendly"
                type="radio"
                value="friendly"
                className="h-4 w-4 text-indigo-600 border-gray-300"
                {...register('templateType')}
              />
              <label htmlFor="friendly" className="ml-2 text-sm text-gray-700">
                Friendly (Conversational)
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="professional"
                type="radio"
                value="professional"
                className="h-4 w-4 text-indigo-600 border-gray-300"
                {...register('templateType')}
              />
              <label htmlFor="professional" className="ml-2 text-sm text-gray-700">
                Professional (Formal)
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="snappy"
                type="radio"
                value="snappy"
                className="h-4 w-4 text-indigo-600 border-gray-300"
                {...register('templateType')}
              />
              <label htmlFor="snappy" className="ml-2 text-sm text-gray-700">
                Snappy (Short & Fun)
              </label>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => router.push('/dashboard')}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 mr-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Sending...' : 'Send Request'}
          </button>
        </div>
      </form>
    </div>
  );
} 