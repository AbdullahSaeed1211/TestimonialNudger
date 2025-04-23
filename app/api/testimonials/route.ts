import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db/connect';
import Testimonial from '@/lib/db/models/Testimonial';
import User from '@/lib/db/models/User';
import Business from '@/lib/db/models/Business';
import TestimonialToken from '@/lib/db/models/TestimonialToken';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { sendThankYouEmail } from '@/lib/email/sendThankYouEmail';

// POST endpoint to create a new testimonial
export async function POST(request: NextRequest) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Parse multipart form data
    const formData = await request.formData();
    
    // Extract form fields
    const content = formData.get('content') as string;
    const rating = parseInt(formData.get('rating') as string);
    const clientName = formData.get('clientName') as string;
    const clientRole = formData.get('clientRole') as string || undefined;
    const allowPublishing = formData.get('allowPublishing') === 'true';
    const token = formData.get('token') as string;
    const personalNote = formData.get('personalNote') as string || undefined;
    
    // Validate required fields
    if (!content || !rating || !clientName || !token) {
      return NextResponse.json(
        { error: 'Missing required fields' }, 
        { status: 400 }
      );
    }
    
    // Find the token in the database
    const testimonialToken = await TestimonialToken.findOne({
      token,
      isUsed: false,
      expiresAt: { $gt: new Date() },
    });

    if (!testimonialToken) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 404 }
      );
    }
    
    // Get the business from the token
    const business = await Business.findById(testimonialToken.business);
    if (!business) {
      return NextResponse.json(
        { error: 'Business not found' },
        { status: 404 }
      );
    }
    
    // Find or create client user
    const clientEmail = testimonialToken.clientEmail;
    let clientUser = await User.findOne({ email: clientEmail });
    
    if (!clientUser) {
      clientUser = await User.create({
        email: clientEmail,
        // Add additional client details here
      });
    }
    
    // Process media files if any
    const mediaUrls: string[] = [];
    const files = formData.getAll('media') as File[];
    
    if (files && files.length > 0) {
      for (const file of files) {
        if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
          continue;
        }
        
        // Convert file to buffer for upload
        const buffer = await file.arrayBuffer();
        const base64 = Buffer.from(buffer).toString('base64');
        const dataURI = `data:${file.type};base64,${base64}`;
        
        // Upload to Cloudinary
        try {
          const result = await uploadToCloudinary(dataURI, {
            folder: `testimonials/${business._id}`,
            resourceType: file.type.startsWith('image/') ? 'image' : 'video',
          });
          
          mediaUrls.push(result.secure_url);
        } catch (error) {
          console.error('Error uploading file to Cloudinary:', error);
        }
      }
    }
    
    // Create the testimonial
    const testimonial = await Testimonial.create({
      content,
      rating,
      mediaUrls,
      client: clientUser._id,
      business: business._id,
      status: allowPublishing ? 'PENDING' : 'PRIVATE',
    });
    
    // Update the token as used
    testimonialToken.isUsed = true;
    await testimonialToken.save();
    
    // Update the client and business with the new testimonial
    await User.findByIdAndUpdate(clientUser._id, {
      $push: { testimonials: testimonial._id }
    });
    
    await Business.findByIdAndUpdate(business._id, {
      $push: { testimonials: testimonial._id }
    });
    
    // Update client with role if provided
    if (clientRole) {
      await User.findByIdAndUpdate(clientUser._id, {
        $set: { role: clientRole },
      });
    }
    
    // Send thank you email to the recommender if available
    const recommenderEmail = formData.get('recommenderEmail') as string;
    const recommenderName = formData.get('recommenderName') as string;
    
    if (recommenderEmail && recommenderEmail !== clientEmail) {
      await sendThankYouEmail({
        businessName: business.name,
        clientName,
        recommenderEmail,
        recommenderName,
        logoUrl: business.logoUrl,
        personalNote,
      });
    }
    
    // Return the created testimonial
    return NextResponse.json({
      success: true,
      data: testimonial
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating testimonial:', error);
    return NextResponse.json(
      { error: 'Failed to create testimonial' }, 
      { status: 500 }
    );
  }
}

// Mock testimonial data for demonstration
const mockTestimonials = [
  {
    id: '1',
    content: 'Working with this team was amazing! They delivered the project on time and exceeded our expectations. The communication was excellent throughout the process.',
    rating: 5,
    status: 'APPROVED',
    clientName: 'John Smith',
    clientRole: 'Marketing Director at XYZ Company',
    clientEmail: 'john@example.com',
    serviceType: 'Web Development',
    createdAt: new Date('2023-08-15').toISOString(),
    mediaUrls: ['https://images.unsplash.com/photo-1499951360447-b19be8fe80f5']
  },
  {
    id: '2',
    content: 'Good service overall, but there were some delays in the project timeline. The final result was satisfactory.',
    rating: 4,
    status: 'PENDING',
    clientName: 'Sarah Johnson',
    clientRole: 'Product Manager',
    clientEmail: 'sarah@example.com',
    serviceType: 'UI/UX Design',
    createdAt: new Date('2023-09-01').toISOString()
  },
  {
    id: '3',
    content: 'Average experience. The quality was good but not exceptional.',
    rating: 3,
    status: 'APPROVED',
    clientName: 'Michael Brown',
    clientEmail: 'michael@example.com',
    serviceType: 'Logo Design',
    createdAt: new Date('2023-07-22').toISOString()
  },
  {
    id: '4',
    content: 'This project went smoothly from start to finish. I was impressed by the professionalism and creativity.',
    rating: 5,
    status: 'APPROVED',
    clientName: 'Emily Davis',
    clientRole: 'CEO at Startup X',
    clientEmail: 'emily@example.com',
    serviceType: 'Brand Identity',
    createdAt: new Date('2023-10-05').toISOString()
  },
  {
    id: '5',
    content: 'Exceeded expectations in every way. Would definitely recommend and work with again.',
    rating: 5,
    status: 'APPROVED',
    clientName: 'David Wilson',
    clientRole: 'Founder',
    clientEmail: 'david@example.com',
    serviceType: 'Web Development',
    createdAt: new Date('2023-11-12').toISOString(),
    mediaUrls: ['https://images.unsplash.com/photo-1522542550221-31fd19575a2d']
  }
];

// GET endpoint to fetch testimonials
export async function GET(request: NextRequest) {
  try {
    // In production, connect to database and query real data
    const isProduction = process.env.NODE_ENV === 'production';
    
    if (isProduction) {
      await connectToDatabase();
      
      // Extract query parameters
      const url = new URL(request.url);
      const status = url.searchParams.get('status');
      const minRating = url.searchParams.get('minRating');
      const businessId = url.searchParams.get('businessId');
      
      // Build query
      const query: Record<string, unknown> = {};
      
      if (status && status !== 'ALL') {
        query.status = status;
      }
      
      if (minRating) {
        query.rating = { $gte: parseInt(minRating) };
      }
      
      if (businessId) {
        query.business = businessId;
      }
      
      // Execute query with populated client details
      const testimonials = await Testimonial.find(query)
        .populate('client', 'email')
        .sort({ createdAt: -1 });
      
      return NextResponse.json({ testimonials });
    } else {
      // In development, use mock data as fallback
      // Extract query parameters
      const url = new URL(request.url);
      const status = url.searchParams.get('status');
      const minRating = url.searchParams.get('minRating');
      const serviceType = url.searchParams.get('serviceType');
      
      // Filter testimonials based on query parameters
      let filteredTestimonials = [...mockTestimonials];
      
      if (status && status !== 'ALL') {
        filteredTestimonials = filteredTestimonials.filter(t => t.status === status);
      }
      
      if (minRating) {
        const rating = parseInt(minRating);
        if (!isNaN(rating)) {
          filteredTestimonials = filteredTestimonials.filter(t => t.rating >= rating);
        }
      }
      
      if (serviceType) {
        filteredTestimonials = filteredTestimonials.filter(t => 
          t.serviceType.toLowerCase().includes(serviceType.toLowerCase())
        );
      }
      
      // Sort by date (most recent first)
      filteredTestimonials.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      
      return NextResponse.json({
        testimonials: filteredTestimonials
      });
    }
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
      { status: 500 }
    );
  }
} 