'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { RatingPicker } from '@/components/testimonial/RatingPicker';

interface ShowcaseTestimonial {
  id: string;
  content: string;
  rating: number;
  client: {
    id: string;
    name: string;
    avatarUrl?: string;
  };
  serviceType: string;
  createdAt: Date;
  mediaUrls: string[];
}

interface PageProps {
  params: {
    businessSlug: string;
  };
}

// Mock data for showcase
const MOCK_SHOWCASE_TESTIMONIALS: ShowcaseTestimonial[] = [
  {
    id: '1',
    content: 'Working with this team was amazing! They delivered the project on time and exceeded our expectations. Highly recommended for anyone looking for quality work.',
    rating: 5,
    client: {
      id: 'c1',
      name: 'John Smith',
      avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    serviceType: 'Web Development',
    createdAt: new Date('2023-06-15'),
    mediaUrls: []
  },
  {
    id: '5',
    content: 'Professional service from start to finish. I appreciate their attention to detail and clear communication throughout the project.',
    rating: 5,
    client: {
      id: 'c5',
      name: 'Emily Taylor',
      avatarUrl: 'https://randomuser.me/api/portraits/women/22.jpg'
    },
    serviceType: 'Brand Strategy',
    createdAt: new Date('2023-09-10'),
    mediaUrls: ['https://picsum.photos/seed/brand/200/200']
  },
  {
    id: '6',
    content: 'Great experience working with this agency. The team was responsive, creative, and delivered exactly what we needed.',
    rating: 4,
    client: {
      id: 'c6',
      name: 'Michael Chen',
      avatarUrl: 'https://randomuser.me/api/portraits/men/52.jpg'
    },
    serviceType: 'UX Design',
    createdAt: new Date('2023-08-25'),
    mediaUrls: []
  },
  {
    id: '7',
    content: 'I\'ve worked with many agencies, but this one truly stands out. They took the time to understand our needs and delivered a solution that perfectly matches our brand.',
    rating: 5,
    client: {
      id: 'c7',
      name: 'Laura Peterson',
    },
    serviceType: 'Marketing Strategy',
    createdAt: new Date('2023-07-30'),
    mediaUrls: ['https://picsum.photos/seed/marketing/200/200']
  }
];

function TestimonialCard({ testimonial }: { testimonial: ShowcaseTestimonial }) {
  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  return (
    <Card className="h-full flex flex-col">
      <CardContent className="p-6 flex-grow flex flex-col">
        <div className="mb-4">
          <RatingPicker value={testimonial.rating} onChange={() => {}} readOnly size="sm" />
        </div>
        
        <blockquote className="text-gray-700 flex-grow mb-4">
          &quot;{testimonial.content}&quot;
        </blockquote>
        
        <div className="flex items-center mt-auto pt-4 border-t">
          <Avatar className="mr-3">
            {testimonial.client.avatarUrl ? (
              <AvatarImage src={testimonial.client.avatarUrl} alt={testimonial.client.name} />
            ) : (
              <AvatarFallback>{getInitials(testimonial.client.name)}</AvatarFallback>
            )}
          </Avatar>
          <div>
            <div className="font-medium">{testimonial.client.name}</div>
            <div className="text-sm text-gray-500">{testimonial.serviceType}</div>
          </div>
        </div>
        
        {testimonial.mediaUrls.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-2">
            {testimonial.mediaUrls.map((url, index) => (
              <div key={index} className="rounded-md overflow-hidden bg-gray-100 aspect-square relative">
                <Image 
                  src={url} 
                  alt="Media" 
                  fill
                  className="object-cover" 
                />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function ShowcasePage({ params }: PageProps) {
  const [testimonials, setTestimonials] = useState<ShowcaseTestimonial[]>([]);
  const [businessData, setBusinessData] = useState<{ name: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, fetch business and testimonials from API
    // For now, simulate API call with mock data
    setTimeout(() => {
      setBusinessData({ name: 'Acme Web Services' });
      setTestimonials(MOCK_SHOWCASE_TESTIMONIALS);
      setIsLoading(false);
    }, 1000);
    
    // Real implementation:
    // async function fetchData() {
    //   try {
    //     // Fetch business data
    //     const businessResponse = await fetch(`/api/businesses/by-slug/${params.businessSlug}`);
    //     if (!businessResponse.ok) throw new Error('Failed to load business');
    //     const businessData = await businessResponse.json();
    //     
    //     // Fetch approved testimonials
    //     const testimonialsResponse = await fetch(
    //       `/api/testimonials?businessId=${businessData.id}&status=APPROVED`
    //     );
    //     if (!testimonialsResponse.ok) throw new Error('Failed to load testimonials');
    //     const testimonialsData = await testimonialsResponse.json();
    //     
    //     setBusinessData(businessData);
    //     setTestimonials(testimonialsData.data);
    //   } catch (error) {
    //     console.error('Error fetching showcase data:', error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // }
    // 
    // fetchData();
  }, [params.businessSlug]);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">
          What Our Clients Say About {businessData?.name}
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Read testimonials from our satisfied clients about their experiences working with us.
        </p>
      </div>
      
      {testimonials.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">No testimonials available yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map(testimonial => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      )}
    </div>
  );
} 