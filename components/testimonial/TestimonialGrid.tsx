import { TestimonialCard } from './TestimonialCard';
import { TestimonialStatus } from '@/lib/db/models/Testimonial';

interface Testimonial {
  id: string;
  content: string;
  status: TestimonialStatus;
  rating: number;
  client: {
    id: string;
    name: string;
    email?: string;
    avatarUrl?: string;
  };
  serviceType: string;
  createdAt: Date;
  mediaUrls: string[];
}

interface TestimonialGridProps {
  testimonials: Testimonial[];
  status?: TestimonialStatus;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function TestimonialGrid({
  testimonials,
  status,
  onApprove,
  onReject,
  onView,
  onEdit,
  onDelete
}: TestimonialGridProps) {
  // Filter testimonials by status if provided
  const filteredTestimonials = status 
    ? testimonials.filter(t => t.status === status)
    : testimonials;
    
  if (filteredTestimonials.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No testimonials found.</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredTestimonials.map((testimonial) => (
        <TestimonialCard
          key={testimonial.id}
          id={testimonial.id}
          content={testimonial.content}
          status={testimonial.status}
          rating={testimonial.rating}
          clientName={testimonial.client.name}
          clientEmail={testimonial.client.email}
          clientAvatar={testimonial.client.avatarUrl}
          serviceType={testimonial.serviceType}
          createdAt={testimonial.createdAt}
          mediaUrls={testimonial.mediaUrls}
          onApprove={onApprove}
          onReject={onReject}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
} 