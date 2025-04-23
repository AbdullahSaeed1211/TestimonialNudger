import { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface TextareaWithAIProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  context: {
    serviceType: string;
    businessName: string;
    clientName?: string;
  };
  minRows?: number;
  maxRows?: number;
  disabled?: boolean;
}

export function TextareaWithAI({
  value,
  onChange,
  placeholder = 'Share your experience...',
  context,
  minRows = 4,
  maxRows = 8,
  disabled = false
}: TextareaWithAIProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateTestimonial = async () => {
    try {
      setIsGenerating(true);
      
      // In a real implementation, this would call an API endpoint to generate text
      // For now, we'll simulate a delay and return a mock response
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const generatedText = `I had a fantastic experience working with ${context.businessName} on my ${context.serviceType} project. The team was professional, responsive, and delivered exactly what I needed. I'm very satisfied with the results and would definitely recommend their services to others.`;
      
      onChange(generatedText);
    } catch (error) {
      console.error('Error generating testimonial:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="relative">
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={minRows}
        className="resize-y min-h-[100px]"
        style={{ maxHeight: `${maxRows * 24}px` }}
        disabled={disabled || isGenerating}
      />
      
      <div className="absolute bottom-2 right-2">
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="h-8 px-2 text-xs"
          onClick={generateTestimonial}
          disabled={disabled || isGenerating}
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-1 h-3 w-3 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="mr-1 h-3 w-3" />
              Help me write this
            </>
          )}
        </Button>
      </div>
    </div>
  );
} 