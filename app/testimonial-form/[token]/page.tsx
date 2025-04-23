'use client';

import { useState, useEffect } from 'react';
import { useForm, Resolver, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { Star, Upload, X, Check } from 'lucide-react';

// Form validation schema
const testimonialSchema = z.object({
  content: z.string().min(10, 'Testimonial must be at least 10 characters').max(1000, 'Testimonial cannot exceed 1000 characters'),
  rating: z.number().min(1, 'Please select a rating').max(5),
  clientName: z.string().min(2, 'Name must be at least 2 characters').max(100),
  clientRole: z.string().optional(),
  allowPublishing: z.boolean().default(true),
});

type TestimonialFormData = z.infer<typeof testimonialSchema>;

interface BusinessData {
  id: string;
  name: string;
  logo?: string;
  serviceType: string;
}

export default function TestimonialFormPage({ params }: { params: { token: string } }) {
  const [isLoading, setIsLoading] = useState(true);
  const [businessData, setBusinessData] = useState<BusinessData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadPreviews, setUploadPreviews] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TestimonialFormData>({
    resolver: zodResolver(testimonialSchema) as Resolver<TestimonialFormData>,
    defaultValues: {
      rating: 0,
      allowPublishing: true,
    },
  });

  const currentRating = watch('rating');

  // Fetch business data using the token
  useEffect(() => {
    const fetchBusinessData = async () => {
      try {
        // Fetch business data using the token API
        const response = await fetch(`/api/testimonial-tokens/${params.token}`);
        if (!response.ok) {
          throw new Error('Failed to validate token');
        }
        
        const data = await response.json();
        setBusinessData(data.business);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching business data:', error);
        setSubmitError('Invalid or expired token. Please contact the business for a new link.');
        setIsLoading(false);
      }
    };

    fetchBusinessData();
  }, [params.token]);

  const handleRatingClick = (rating: number) => {
    setValue('rating', rating, { shouldValidate: true });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newFiles: File[] = [];
    const newPreviews: string[] = [];

    Array.from(files).forEach(file => {
      // Check if it's an image or video
      if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
        newFiles.push(file);
        
        // Create preview URL
        const previewUrl = URL.createObjectURL(file);
        newPreviews.push(previewUrl);
      }
    });

    setUploadedFiles([...uploadedFiles, ...newFiles]);
    setUploadPreviews([...uploadPreviews, ...newPreviews]);
  };

  const removeFile = (index: number) => {
    const newFiles = [...uploadedFiles];
    const newPreviews = [...uploadPreviews];
    
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(newPreviews[index]);
    
    newFiles.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setUploadedFiles(newFiles);
    setUploadPreviews(newPreviews);
  };

  const onSubmit = async (data: TestimonialFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Create form data for file upload
      const formData = new FormData();
      formData.append('content', data.content);
      formData.append('rating', data.rating.toString());
      formData.append('clientName', data.clientName);
      formData.append('token', params.token);
      formData.append('allowPublishing', data.allowPublishing.toString());
      
      if (data.clientRole) {
        formData.append('clientRole', data.clientRole);
      }
      
      // Add recommender info if available from URL params
      const urlParams = new URLSearchParams(window.location.search);
      const recommenderEmail = urlParams.get('ref_email');
      const recommenderName = urlParams.get('ref_name');
      const personalNote = urlParams.get('note');
      
      if (recommenderEmail) {
        formData.append('recommenderEmail', recommenderEmail);
      }
      
      if (recommenderName) {
        formData.append('recommenderName', recommenderName);
      }
      
      if (personalNote) {
        formData.append('personalNote', personalNote);
      }
      
      // Add uploaded files
      if (uploadedFiles.length > 0) {
        uploadedFiles.forEach((file) => {
          formData.append('media', file);
        });
      }
      
      // Submit the form
      const response = await fetch('/api/testimonials', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit testimonial');
      }
      
      setSubmitSuccess(true);
    } catch (error) {
      console.error('Error submitting testimonial:', error);
      setSubmitError(error instanceof Error ? error.message : 'Failed to submit testimonial. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (submitSuccess) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
        <p className="text-lg text-gray-700 mb-6">
          Your testimonial has been submitted successfully. We appreciate you taking the time to share your feedback!
        </p>
        <p className="text-gray-500">
          You can now close this page.
        </p>
      </div>
    );
  }

  if (!businessData) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Invalid Token</h1>
        <p className="text-gray-700">
          This testimonial request link is invalid or has expired. Please contact the business for a new link.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        {businessData.logo && (
          <div className="mb-4 flex justify-center">
            <Image 
              src={businessData.logo} 
              alt={`${businessData.name} logo`} 
              width={80} 
              height={80}
              className="rounded-md"
            />
          </div>
        )}
        <h1 className="text-2xl font-bold mb-2">{businessData.name}</h1>
        <p className="text-gray-600">
          Please share your feedback about our {businessData.serviceType} service
        </p>
      </div>

      {submitError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
          {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit as SubmitHandler<TestimonialFormData>)} className="space-y-6">
        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How would you rate your experience?*
          </label>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                type="button"
                onMouseEnter={() => setHoveredRating(rating)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => handleRatingClick(rating)}
                className="p-1 focus:outline-none"
              >
                <Star
                  className={`h-8 w-8 ${
                    rating <= (hoveredRating || currentRating)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
            <span className="ml-2 text-sm text-gray-500">
              {currentRating > 0 && (
                <span>
                  You selected {currentRating} star{currentRating > 1 ? 's' : ''}
                </span>
              )}
            </span>
          </div>
          {errors.rating && (
            <p className="mt-1 text-sm text-red-600">{errors.rating.message}</p>
          )}
        </div>

        {/* Testimonial Content */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Your Testimonial*
          </label>
          <textarea
            id="content"
            rows={5}
            className={`w-full px-4 py-2 border rounded-md ${
              errors.content ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Please share your experience working with us..."
            {...register('content')}
          ></textarea>
          {errors.content && (
            <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            Your testimonial will help others understand the quality of our services
          </p>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="clientName" className="block text-sm font-medium text-gray-700 mb-1">
              Your Name*
            </label>
            <input
              id="clientName"
              type="text"
              className={`w-full px-4 py-2 border rounded-md ${
                errors.clientName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="How you'd like to be credited"
              {...register('clientName')}
            />
            {errors.clientName && (
              <p className="mt-1 text-sm text-red-600">{errors.clientName.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="clientRole" className="block text-sm font-medium text-gray-700 mb-1">
              Your Title/Company (Optional)
            </label>
            <input
              id="clientRole"
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="e.g. Marketing Director at XYZ Corp"
              {...register('clientRole')}
            />
          </div>
        </div>

        {/* Media Upload */}
        <div>
          <span className="block text-sm font-medium text-gray-700 mb-1">
            Add Photos or Videos (Optional)
          </span>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    accept="image/*,video/*"
                    multiple
                    onChange={handleFileUpload}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">
                PNG, JPG, GIF, MP4 up to 10MB
              </p>
            </div>
          </div>

          {uploadPreviews.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-4">
              {uploadPreviews.map((preview, index) => (
                <div key={index} className="relative group">
                  {preview.includes('video') ? (
                    <video
                      src={preview}
                      className="h-24 w-full object-cover rounded-md"
                      controls
                    />
                  ) : (
                    <div className="relative h-24 w-full">
                      <Image
                        src={preview}
                        alt={`Upload ${index + 1}`}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 group-hover:opacity-100 opacity-70"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Publishing Permission */}
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="allowPublishing"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
              {...register('allowPublishing')}
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="allowPublishing" className="font-medium text-gray-700">
              Allow publishing
            </label>
            <p className="text-gray-500">
              I give permission to {businessData.name} to use my testimonial on their website and marketing materials.
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full px-6 py-3 text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Testimonial'}
          </button>
        </div>
      </form>
    </div>
  );
} 