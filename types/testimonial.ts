export interface Testimonial {
  _id?: string;
  businessId: string;
  requestId?: string;
  authorName: string;
  authorEmail: string;
  authorCompany?: string;
  authorAvatar?: string;
  rating: number;
  content: string;
  mediaUrls?: string[];
  status: 'pending' | 'approved' | 'rejected';
  featured?: boolean;
  createdAt: Date;
  updatedAt?: Date;
} 