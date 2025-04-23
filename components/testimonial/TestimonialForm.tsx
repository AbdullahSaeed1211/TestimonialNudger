import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Camera, UploadCloud, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { RatingPicker } from './RatingPicker';
import { TextareaWithAI } from './TextareaWithAI';
import { Button } from '@/components/ui/button';

// Define the testimonial form schema
const testimonialFormSchema = z.object({
  rating: z.number().min(1, { message: 'Please provide a rating' }).max(5),
  content: z.string().min(10, { message: 'Testimonial must be at least 10 characters' }),
  mediaUrls: z.array(z.string()).optional(),
});

type TestimonialFormValues = z.infer<typeof testimonialFormSchema>;

interface TestimonialFormProps {
  businessName: string;
  serviceType: string;
  clientName?: string;
  onSubmit: (data: TestimonialFormValues) => void;
  isSubmitting?: boolean;
}

export function TestimonialForm({
  businessName,
  serviceType,
  clientName,
  onSubmit,
  isSubmitting = false
}: TestimonialFormProps) {
  const [mediaFiles, setMediaFiles] = useState<{ url: string; file: File }[]>([]);
  
  // Initialize the form
  const form = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialFormSchema),
    defaultValues: {
      rating: 0,
      content: '',
      mediaUrls: [],
    },
  });

  // Handle form submission
  const handleSubmit = (values: TestimonialFormValues) => {
    // Add media URLs to form data
    const formData = {
      ...values,
      mediaUrls: mediaFiles.map(media => media.url),
    };
    
    onSubmit(formData);
  };

  // Handle file upload
  const handleFileUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    Array.from(files).forEach(file => {
      // Check if it's an image or video
      if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) return;
      
      const url = URL.createObjectURL(file);
      setMediaFiles(prev => [...prev, { url, file }]);
      
      // Update form value
      const currentUrls = form.getValues('mediaUrls') || [];
      form.setValue('mediaUrls', [...currentUrls, url]);
    });
  };

  // Handle file removal
  const removeFile = (index: number) => {
    setMediaFiles(prev => {
      const updated = [...prev];
      // Release the object URL to prevent memory leaks
      URL.revokeObjectURL(updated[index].url);
      updated.splice(index, 1);
      return updated;
    });
    
    // Update form value
    const currentUrls = form.getValues('mediaUrls') || [];
    const updatedUrls = [...currentUrls];
    updatedUrls.splice(index, 1);
    form.setValue('mediaUrls', updatedUrls);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Rating Field */}
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>How would you rate your experience?</FormLabel>
              <FormControl>
                <RatingPicker 
                  value={field.value} 
                  onChange={field.onChange}
                  size="lg"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Testimonial Content Field */}
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Your testimonial</FormLabel>
              <FormControl>
                <TextareaWithAI
                  value={field.value}
                  onChange={field.onChange}
                  context={{
                    businessName,
                    serviceType,
                    clientName,
                  }}
                  placeholder="Share your experience working with us..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Media Upload Section */}
        <div className="space-y-2">
          <FormLabel className="block">Add photos or videos (optional)</FormLabel>
          
          {/* Media Preview */}
          {mediaFiles.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-2">
              {mediaFiles.map((media, index) => (
                <div key={index} className="relative group rounded-md overflow-hidden bg-gray-100 aspect-square">
                  {media.file.type.startsWith('image/') ? (
                    <div className="relative w-full h-full">
                      <Image 
                        src={media.url} 
                        alt="Preview" 
                        fill
                        className="object-cover" 
                      />
                    </div>
                  ) : (
                    <video src={media.url} className="w-full h-full object-cover" />
                  )}
                  <button
                    type="button"
                    className="absolute top-1 right-1 p-1 rounded-full bg-white/80 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeFile(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
          
          {/* Upload Buttons */}
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              <UploadCloud className="h-4 w-4" />
              Upload
            </Button>
            
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              onClick={() => document.getElementById('camera-upload')?.click()}
            >
              <Camera className="h-4 w-4" />
              Take Photo
            </Button>
            
            <input
              id="file-upload"
              type="file"
              accept="image/*,video/*"
              multiple
              className="hidden"
              onChange={(e) => handleFileUpload(e.target.files)}
            />
            
            <input
              id="camera-upload"
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={(e) => handleFileUpload(e.target.files)}
            />
          </div>
        </div>

        {/* Submit Button */}
        <Button 
          type="submit" 
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Testimonial'}
        </Button>
      </form>
    </Form>
  );
} 