import { useState } from 'react';
import { format } from 'date-fns';
import { MoreHorizontal, Check, X, Eye, Pencil, Trash } from 'lucide-react';
import Image from 'next/image';
import { 
  Card, 
  CardContent, 
  CardFooter,
  CardHeader 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { RatingPicker } from './RatingPicker';
import { TestimonialStatus } from '@/lib/db/models/Testimonial';

interface TestimonialCardProps {
  id: string;
  content: string;
  status: TestimonialStatus;
  rating: number;
  clientName: string;
  clientAvatar?: string;
  serviceType: string;
  createdAt: Date;
  mediaUrls?: string[];
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function TestimonialCard({
  id,
  content,
  status,
  rating,
  clientName,
  clientAvatar,
  serviceType,
  createdAt,
  mediaUrls = [],
  onApprove,
  onReject,
  onView,
  onEdit,
  onDelete
}: TestimonialCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Get the client's initials for the avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  // Format the date
  const formattedDate = format(createdAt, 'MMM d, yyyy');
  
  // Status color mapping
  const statusColors = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    APPROVED: 'bg-green-100 text-green-800',
    FLAGGED: 'bg-red-100 text-red-800'
  };
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4 flex flex-row justify-between items-start space-y-0 bg-gray-50/50">
        <div className="flex items-center space-x-3">
          <Avatar>
            {clientAvatar ? (
              <AvatarImage src={clientAvatar} alt={clientName} />
            ) : (
              <AvatarFallback>{getInitials(clientName)}</AvatarFallback>
            )}
          </Avatar>
          <div>
            <h3 className="font-medium">{clientName}</h3>
            <p className="text-sm text-gray-500">{serviceType}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className={`text-xs px-2 py-1 rounded-full ${statusColors[status]}`}>
            {status}
          </span>
          
          <div className="relative">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
            
            {isMenuOpen && (
              <div className="absolute right-0 mt-1 w-40 bg-white border rounded-md shadow-lg z-10">
                <div className="py-1">
                  {onView && (
                    <button 
                      onClick={() => { onView(id); setIsMenuOpen(false); }}
                      className="flex items-center w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </button>
                  )}
                  
                  {onEdit && (
                    <button 
                      onClick={() => { onEdit(id); setIsMenuOpen(false); }}
                      className="flex items-center w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                    >
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </button>
                  )}
                  
                  {onDelete && (
                    <button 
                      onClick={() => { onDelete(id); setIsMenuOpen(false); }}
                      className="flex items-center w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-gray-100"
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="mb-2">
          <RatingPicker value={rating} onChange={() => {}} readOnly size="sm" />
        </div>
        
        <p className="text-sm text-gray-700 line-clamp-3">{content}</p>
        
        {mediaUrls.length > 0 && (
          <div className="mt-3 flex -space-x-2 overflow-hidden">
            {mediaUrls.slice(0, 3).map((url, index) => (
              <div 
                key={index}
                className="inline-block h-10 w-10 rounded-md border-2 border-white bg-gray-200 overflow-hidden relative"
              >
                <Image 
                  src={url} 
                  alt="Media" 
                  fill
                  className="object-cover"
                />
              </div>
            ))}
            
            {mediaUrls.length > 3 && (
              <div className="inline-flex items-center justify-center h-10 w-10 rounded-md border-2 border-white bg-gray-100 text-xs text-gray-500">
                +{mediaUrls.length - 3}
              </div>
            )}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <span className="text-xs text-gray-500">{formattedDate}</span>
        
        {status === 'PENDING' && (
          <div className="flex space-x-2">
            {onApprove && (
              <Button 
                size="sm" 
                variant="outline" 
                className="h-8 text-green-600 border-green-600 hover:bg-green-50"
                onClick={() => onApprove(id)}
              >
                <Check className="mr-1 h-4 w-4" />
                Approve
              </Button>
            )}
            
            {onReject && (
              <Button 
                size="sm" 
                variant="outline" 
                className="h-8 text-red-600 border-red-600 hover:bg-red-50"
                onClick={() => onReject(id)}
              >
                <X className="mr-1 h-4 w-4" />
                Reject
              </Button>
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  );
} 