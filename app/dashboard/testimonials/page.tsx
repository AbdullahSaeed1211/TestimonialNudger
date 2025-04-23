'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Star, 
  Check, 
  X, 
  AlertTriangle, 
  Eye, 
  Pencil, 
  Trash2, 
  ChevronDown, 
  ChevronUp, 
  Search
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { TableActions } from './table-actions';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

// Define the status types for testimonials
type TestimonialStatus = 'PENDING' | 'APPROVED' | 'FLAGGED' | 'REJECTED';

// Define the testimonial interface
interface Testimonial {
  id: string;
  content: string;
  rating: number;
  status: TestimonialStatus;
  clientName: string;
  clientRole?: string;
  clientEmail?: string;
  serviceType: string;
  createdAt: Date;
  mediaUrls?: string[];
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<TestimonialStatus | 'ALL'>('ALL');
  const [sortBy, setSortBy] = useState<'date' | 'rating'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Fetch testimonials from API
  useEffect(() => {
    const fetchTestimonials = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/testimonials');
        const data = await response.json();
        
        if (data.testimonials) {
          // Convert string dates to Date objects
          const formattedTestimonials = data.testimonials.map((testimonial: Omit<Testimonial, 'createdAt'> & { createdAt: string }) => ({
            ...testimonial,
            createdAt: new Date(testimonial.createdAt)
          }));
          setTestimonials(formattedTestimonials);
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTestimonials();
  }, []);

  // Filter testimonials by search term and status
  const filteredTestimonials = testimonials.filter(testimonial => {
    const matchesSearch = (
      testimonial.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.serviceType.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const matchesStatus = statusFilter === 'ALL' || testimonial.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Sort testimonials
  const sortedTestimonials = [...filteredTestimonials].sort((a, b) => {
    if (sortBy === 'date') {
      return sortOrder === 'asc' 
        ? a.createdAt.getTime() - b.createdAt.getTime()
        : b.createdAt.getTime() - a.createdAt.getTime();
    } else {
      return sortOrder === 'asc'
        ? a.rating - b.rating
        : b.rating - a.rating;
    }
  });

  // Handle testimonial actions
  const handleApprove = (id: string) => {
    setTestimonials(testimonials.map(t => 
      t.id === id ? { ...t, status: 'APPROVED' as TestimonialStatus } : t
    ));
  };

  const handleReject = (id: string) => {
    setTestimonials(testimonials.map(t => 
      t.id === id ? { ...t, status: 'REJECTED' as TestimonialStatus } : t
    ));
  };

  const handleFlag = (id: string) => {
    setTestimonials(testimonials.map(t => 
      t.id === id ? { ...t, status: 'FLAGGED' as TestimonialStatus } : t
    ));
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this testimonial? This action cannot be undone.')) {
      setTestimonials(testimonials.filter(t => t.id !== id));
    }
  };

  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  // Render status badge
  const renderStatusBadge = (status: TestimonialStatus) => {
    switch (status) {
      case 'APPROVED':
        return (
          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
            <Check className="mr-1 h-3 w-3" />
            Approved
          </span>
        );
      case 'PENDING':
        return (
          <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
            <AlertTriangle className="mr-1 h-3 w-3" />
            Pending
          </span>
        );
      case 'FLAGGED':
        return (
          <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
            <AlertTriangle className="mr-1 h-3 w-3" />
            Flagged
          </span>
        );
      case 'REJECTED':
        return (
          <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
            <X className="mr-1 h-3 w-3" />
            Rejected
          </span>
        );
    }
  };

  // Render star rating
  const renderStarRating = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  // Render testimonial card for mobile view
  const renderTestimonialCard = (testimonial: Testimonial) => {
    return (
      <Card key={testimonial.id} className="mb-4 overflow-hidden">
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-3">
            <div>
              {renderStarRating(testimonial.rating)}
              <p className="text-sm text-gray-500 mt-1">
                {new Date(testimonial.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              {renderStatusBadge(testimonial.status)}
              <TableActions 
                testimonialId={testimonial.id} 
                currentStatus={testimonial.status === 'REJECTED' ? 'PENDING' : testimonial.status} 
              />
            </div>
          </div>
          
          <div className="mb-4">
            <p className="text-gray-800 line-clamp-3">{testimonial.content}</p>
          </div>
          
          <div className="flex items-center">
            {testimonial.mediaUrls && testimonial.mediaUrls.length > 0 ? (
              <div className="mr-3">
                <Image 
                  src={testimonial.mediaUrls[0]} 
                  alt={testimonial.clientName}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
              </div>
            ) : (
              <Avatar className="mr-3 h-10 w-10">
                <AvatarFallback>
                  {testimonial.clientName.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            )}
            <div>
              <p className="font-medium">{testimonial.clientName}</p>
              <p className="text-sm text-gray-600">{testimonial.serviceType}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Manage Testimonials</h1>
        <Link 
          href="/dashboard/request" 
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 w-full sm:w-auto text-center"
        >
          Request New
        </Link>
      </div>

      {/* Filters and Search */}
      <div className="mb-6 bg-white p-4 rounded-md shadow">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search testimonials..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="w-full md:w-1/3">
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as TestimonialStatus | 'ALL')}
            >
              <option value="ALL">All Statuses</option>
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="FLAGGED">Flagged</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
          
          <div className="w-full md:w-1/3 flex space-x-2">
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'rating')}
            >
              <option value="date">Sort by Date</option>
              <option value="rating">Sort by Rating</option>
            </select>
            
            <button
              className="p-2 border border-gray-300 rounded-md"
              onClick={toggleSortOrder}
            >
              {sortOrder === 'asc' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Testimonials List */}
      <div className="block md:hidden">
        {sortedTestimonials.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-md shadow">
            <p className="text-gray-500">No testimonials found</p>
          </div>
        ) : (
          <div>
            {sortedTestimonials.map(testimonial => renderTestimonialCard(testimonial))}
          </div>
        )}
      </div>

      {/* Desktop Testimonials Table */}
      <div className="hidden md:block">
        {sortedTestimonials.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-md shadow">
            <p className="text-gray-500">No testimonials found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedTestimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-md shadow p-4">
                <div className="flex flex-col md:flex-row justify-between mb-3">
                  <div>
                    <div className="flex items-center mb-2">
                      <h3 className="font-semibold mr-2">{testimonial.clientName}</h3>
                      {testimonial.clientRole && (
                        <span className="text-sm text-gray-500">{testimonial.clientRole}</span>
                      )}
                    </div>
                    <div className="flex items-center space-x-3 text-sm text-gray-500">
                      <div>{renderStarRating(testimonial.rating)}</div>
                      <div>•</div>
                      <div>{testimonial.serviceType}</div>
                      <div>•</div>
                      <div>{new Date(testimonial.createdAt).toLocaleDateString()}</div>
                    </div>
                  </div>
                  <div className="mt-2 md:mt-0">
                    {renderStatusBadge(testimonial.status)}
                  </div>
                </div>
                
                <p className="mb-3 text-gray-700">{testimonial.content}</p>
                
                {testimonial.mediaUrls && testimonial.mediaUrls.length > 0 && (
                  <div className="mb-3 flex flex-wrap gap-2">
                    {testimonial.mediaUrls.map((url, index) => (
                      <div 
                        key={index} 
                        className="relative h-20 w-20 rounded-md overflow-hidden"
                      >
                        <Image
                          src={url} 
                          alt={`Media from ${testimonial.clientName}`} 
                          fill
                          className="object-cover" 
                        />
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-gray-100">
                  {testimonial.status !== 'APPROVED' && (
                    <button
                      onClick={() => handleApprove(testimonial.id)}
                      className="inline-flex items-center px-2 py-1 text-sm bg-green-100 text-green-800 rounded hover:bg-green-200"
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Approve
                    </button>
                  )}
                  
                  {testimonial.status !== 'REJECTED' && testimonial.status !== 'FLAGGED' && (
                    <button
                      onClick={() => handleReject(testimonial.id)}
                      className="inline-flex items-center px-2 py-1 text-sm bg-gray-100 text-gray-800 rounded hover:bg-gray-200"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Reject
                    </button>
                  )}
                  
                  {testimonial.status !== 'FLAGGED' && (
                    <button
                      onClick={() => handleFlag(testimonial.id)}
                      className="inline-flex items-center px-2 py-1 text-sm bg-red-100 text-red-800 rounded hover:bg-red-200"
                    >
                      <AlertTriangle className="h-4 w-4 mr-1" />
                      Flag
                    </button>
                  )}
                  
                  <button
                    onClick={() => {}}
                    className="inline-flex items-center px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </button>
                  
                  <button
                    onClick={() => {}}
                    className="inline-flex items-center px-2 py-1 text-sm bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200"
                  >
                    <Pencil className="h-4 w-4 mr-1" />
                    Edit
                  </button>
                  
                  <button
                    onClick={() => handleDelete(testimonial.id)}
                    className="inline-flex items-center px-2 py-1 text-sm bg-red-100 text-red-800 rounded hover:bg-red-200"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 