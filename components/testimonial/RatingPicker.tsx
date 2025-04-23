import { useState } from 'react';
import { Star } from 'lucide-react';

interface RatingPickerProps {
  value: number;
  onChange: (rating: number) => void;
  size?: 'sm' | 'md' | 'lg';
  readOnly?: boolean;
}

export function RatingPicker({
  value = 0,
  onChange,
  size = 'md',
  readOnly = false
}: RatingPickerProps) {
  const [hoverRating, setHoverRating] = useState(0);
  
  const sizeMap = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  const starSize = sizeMap[size];
  
  // Create an array of 5 stars
  const stars = Array.from({ length: 5 }, (_, index) => index + 1);
  
  return (
    <div className="flex items-center space-x-1">
      {stars.map((star) => {
        const isActive = star <= (hoverRating || value);
        
        return (
          <button
            key={star}
            type="button"
            disabled={readOnly}
            className={`p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-transform ${
              isActive ? 'text-yellow-400 scale-110' : 'text-gray-300'
            } ${readOnly ? 'cursor-default' : 'cursor-pointer'}`}
            onClick={() => !readOnly && onChange(star)}
            onMouseEnter={() => !readOnly && setHoverRating(star)}
            onMouseLeave={() => !readOnly && setHoverRating(0)}
            aria-label={`Rate ${star} out of 5 stars`}
          >
            <Star 
              className={`${starSize} ${isActive ? 'fill-current' : ''}`} 
            />
          </button>
        );
      })}
      
      {/* Visually hidden input for form submission */}
      <input 
        type="hidden" 
        name="rating" 
        value={value} 
      />
    </div>
  );
} 