'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { templateCategories, EmailTemplate } from '@/lib/email/templates';

// Form validation schema
const testimonialRequestSchema = z.object({
  clientName: z.string().min(2, 'Name must be at least 2 characters').max(100),
  clientEmail: z.string().email('Please enter a valid email address'),
  serviceType: z.string().min(2, 'Service type must be at least 2 characters').max(100),
  projectDescription: z.string().optional(),
  completionDate: z.string().optional(),
  templateId: z.string(),
});

type TestimonialRequestFormData = z.infer<typeof testimonialRequestSchema>;

export default function TestimonialRequestForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [previewHtml, setPreviewHtml] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<TestimonialRequestFormData>({
    resolver: zodResolver(testimonialRequestSchema),
    defaultValues: {
      templateId: 'general-simple',
    },
  });

  const watchTemplateId = watch('templateId');
  const watchClientName = watch('clientName');
  const watchServiceType = watch('serviceType');

  // Update the preview when template changes
  useEffect(() => {
    if (!watchTemplateId) return;
    
    // Find the template
    for (const category of templateCategories) {
      const template = category.templates.find(t => t.id === watchTemplateId);
      if (template) {
        setSelectedTemplate(template);
        
        // Update the preview with placeholders filled in where possible
        let previewBody = template.body
          .replace(/{{clientName}}/g, watchClientName || 'Client Name')
          .replace(/{{businessName}}/g, 'Your Business')
          .replace(/{{senderName}}/g, 'Your Name')
          .replace(/{{testimonialLink}}/g, 'https://example.com/testimonial-link')
          .replace(/{{serviceType}}/g, watchServiceType || 'your service');
        
        // Convert newlines to <br> tags
        previewBody = previewBody.replace(/\n/g, '<br>');
        
        setPreviewHtml(previewBody);
        break;
      }
    }
  }, [watchTemplateId, watchClientName, watchServiceType]);

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
    <div className="max-w-6xl mx-auto px-4 py-8">
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
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/2">
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
            
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-4">Select Email Template</h2>
              
              {/* Template category tabs */}
              <div className="flex flex-wrap border-b border-gray-200 mb-4">
                {templateCategories.map(category => (
                  <button
                    key={category.id}
                    type="button"
                    className={`px-4 py-2 text-sm font-medium ${
                      selectedCategory === category.id
                        ? 'border-b-2 border-indigo-500 text-indigo-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
              
              {/* Templates */}
              <div className="grid grid-cols-1 gap-3 mb-4">
                {templateCategories
                  .find(c => c.id === selectedCategory)
                  ?.templates.map(template => (
                    <div key={template.id} className="relative">
                      <input
                        type="radio"
                        id={template.id}
                        value={template.id}
                        className="sr-only"
                        {...register('templateId')}
                      />
                      <label
                        htmlFor={template.id}
                        className={`block p-4 rounded-md border ${
                          watchTemplateId === template.id
                            ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-500'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <div className="font-medium">{template.name}</div>
                        <div className="text-sm text-gray-600 mt-1">{template.description}</div>
                      </label>
                    </div>
                  ))}
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Request'}
              </button>
            </div>
          </form>
        </div>
        
        <div className="lg:w-1/2 mt-8 lg:mt-0">
          <div className="sticky top-8">
            <h2 className="text-lg font-semibold mb-4">Template Preview</h2>
            
            {selectedTemplate && (
              <div className="border border-gray-300 rounded-md overflow-hidden">
                <div className="bg-gray-100 px-4 py-2 border-b border-gray-300">
                  <div className="font-medium">Subject: {selectedTemplate.subject}</div>
                </div>
                <div className="p-6 bg-white">
                  <div 
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: previewHtml }}
                  />
                </div>
              </div>
            )}
            
            <div className="mt-4 text-sm text-gray-600">
              <p>This preview shows how your email will look. The template will be personalized with your business details and the client&apos;s information before sending.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 