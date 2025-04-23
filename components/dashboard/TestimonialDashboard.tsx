import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { TestimonialGrid } from '@/components/testimonial/TestimonialGrid';
import { TestimonialStatus } from '@/lib/db/models/Testimonial';

interface DashboardTestimonial {
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

interface TestimonialDashboardProps {
  testimonials: DashboardTestimonial[];
  businessName: string;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TestimonialDashboard({
  testimonials,
  businessName,
  onApprove,
  onReject,
  onView,
  onEdit,
  onDelete
}: TestimonialDashboardProps) {
  const [activeTab, setActiveTab] = useState<string>('pending');
  
  // Count testimonials by status
  const pendingCount = testimonials.filter(t => t.status === 'PENDING').length;
  const approvedCount = testimonials.filter(t => t.status === 'APPROVED').length;
  const flaggedCount = testimonials.filter(t => t.status === 'FLAGGED').length;
  
  // Calculate statistics
  const avgRating = testimonials.length > 0
    ? (testimonials.reduce((sum, t) => sum + (t.rating || 0), 0) / testimonials.length).toFixed(1)
    : '0.0';
  
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Average Rating</CardDescription>
            <CardTitle className="text-3xl">{avgRating} / 5</CardTitle>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Response Rate</CardDescription>
            <CardTitle className="text-3xl">
              {testimonials.length > 0 ? `${((approvedCount / testimonials.length) * 100).toFixed(0)}%` : '0%'}
            </CardTitle>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Testimonials</CardDescription>
            <CardTitle className="text-3xl">{testimonials.length}</CardTitle>
          </CardHeader>
        </Card>
      </div>
      
      {/* Testimonials Card with Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Testimonials for {businessName}</CardTitle>
          <CardDescription>
            Manage and review testimonials from your clients
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs 
            defaultValue="pending" 
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="mb-4">
              <TabsTrigger value="pending">
                Pending 
                {pendingCount > 0 && (
                  <Badge variant="secondary" className="ml-2">{pendingCount}</Badge>
                )}
              </TabsTrigger>
              
              <TabsTrigger value="approved">
                Approved
                {approvedCount > 0 && (
                  <Badge variant="secondary" className="ml-2">{approvedCount}</Badge>
                )}
              </TabsTrigger>
              
              <TabsTrigger value="flagged">
                Flagged
                {flaggedCount > 0 && (
                  <Badge variant="secondary" className="ml-2">{flaggedCount}</Badge>
                )}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="pending">
              <TestimonialGrid 
                testimonials={testimonials}
                status="PENDING"
                onApprove={onApprove}
                onReject={onReject}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </TabsContent>
            
            <TabsContent value="approved">
              <TestimonialGrid 
                testimonials={testimonials}
                status="APPROVED"
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </TabsContent>
            
            <TabsContent value="flagged">
              <TestimonialGrid 
                testimonials={testimonials}
                status="FLAGGED"
                onApprove={onApprove}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
} 