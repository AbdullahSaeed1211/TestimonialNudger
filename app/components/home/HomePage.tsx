'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, CheckCircle, CheckCircle2, X, ArrowRight, MessageSquare, Bot } from 'lucide-react';
import { useAuth, SignUpButton, SignInButton } from '@clerk/nextjs';
import SocialShare from '@/app/components/testimonials/SocialShare';

export default function HomePage() {
  const { isSignedIn, isLoaded } = useAuth();
  const [activeTab, setActiveTab] = useState<'ai' | 'template'>('ai');

  // Sample testimonials for showcase
  const sampleTestimonials = [
    {
      _id: 'testimonial-1',
      content: "We've seen a 40% increase in testimonials since using TestimonialNudger. The automated emails go out at just the right time and the AI writing is spot-on.",
      authorName: 'Michael B.',
      authorCompany: 'Agency Owner',
      rating: 5,
      mediaUrl: '/user2.png'
    },
    {
      _id: 'testimonial-2',
      content: "The sentiment filter is amazing. We get constructive feedback privately, while the positive reviews go straight to our website. Such a time-saver!",
      authorName: 'Jessica K.',
      authorCompany: 'Consultant',
      rating: 5,
      mediaUrl: '/user3.png'
    },
    {
      _id: 'testimonial-3',
      content: "Our clients love how easy it is to leave a testimonial. The video option has been a game-changer for our portfolio. Worth every penny!",
      authorName: 'David R.',
      authorCompany: 'Small Business Owner',
      rating: 5,
      mediaUrl: '/user4.png'
    }
  ];

  // Helper function to render star ratings
  const renderStarRating = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star 
            key={star} 
            className={`h-4 w-4 ${star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 to-white pointer-events-none"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h1 className="text-3xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Turn Clients into Marketers. <span className="text-indigo-600">Automatically.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            TestimonialNudger sends personalized, high-converting testimonial requests after every job — no chasing, no awkward asks.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 mb-12">
            <div className="flex items-center justify-center gap-2 text-gray-700">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <span>3× more reviews</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-700">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <span>AI-written messages</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-700">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <span>Auto-sent after payments</span>
            </div>
          </div>
          
          <div className="mb-12">
            {isLoaded && (
              isSignedIn ? (
                <Link 
                  href="/dashboard" 
                  className="px-6 md:px-8 py-3 md:py-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <SignUpButton mode="modal">
                    <button className="px-6 md:px-8 py-3 md:py-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 font-medium shadow-lg hover:shadow-xl transition-all duration-200">
                      Start Free • No Card Needed
                    </button>
                  </SignUpButton>
                  <SignInButton mode="modal">
                    <button className="px-6 md:px-8 py-3 md:py-4 border border-gray-300 bg-white rounded-md hover:bg-gray-50 font-medium transition-all duration-200">
                      Sign In
                    </button>
                  </SignInButton>
                </div>
              )
            )}
          </div>
          
          {/* Mini Testimonial Carousel */}
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto mb-8 relative">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">
              Sample Testimonial
            </div>
            <div className="flex items-start gap-4">
              <div className="rounded-full overflow-hidden h-12 w-12 flex-shrink-0">
                <Image 
                  src="/user1.png" 
                  alt="Sarah J."
                  width={48}
                  height={48}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="text-left">
                <div className="flex gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="italic text-gray-700 mb-2">
                  &ldquo;Working with this team was amazing! They delivered the project on time and exceeded our expectations.&rdquo;
                </p>
                <p className="text-sm font-medium">Sarah J. • Marketing Director</p>
              </div>
            </div>
          </div>
          
          {/* Integration Badge */}
          <div className="flex justify-center">
            <div className="bg-white shadow-sm border border-gray-200 rounded-full px-4 py-2 text-sm text-gray-600 flex items-center">
              <span>Works seamlessly with</span>
              <span className="mx-2 font-semibold">Stripe</span>
              <span>&</span>
              <span className="mx-2 font-semibold">Calendly</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why You Need It Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-12 md:mb-16">
            You&apos;re missing 90% of the praise you deserve.
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-6 text-gray-900">The Problem:</h3>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <X className="h-4 w-4 text-red-600" />
                </div>
                <div>
                  <p className="font-medium">&ldquo;I forgot to follow up.&rdquo;</p>
                  <p className="text-gray-600 text-sm">Missed opportunities that could boost your business</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <X className="h-4 w-4 text-red-600" />
                </div>
                <div>
                  <p className="font-medium">&ldquo;They said they&apos;d write one. Never did.&rdquo;</p>
                  <p className="text-gray-600 text-sm">Good intentions, but no follow-through</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <X className="h-4 w-4 text-red-600" />
                </div>
                <div>
                  <p className="font-medium">&ldquo;Asking feels pushy.&rdquo;</p>
                  <p className="text-gray-600 text-sm">That awkward moment when you have to ask for praise</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <X className="h-4 w-4 text-red-600" />
                </div>
                <div>
                  <p className="font-medium">&ldquo;What if they say something bad?&rdquo;</p>
                  <p className="text-gray-600 text-sm">Fear of negative feedback holding you back</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-6 text-gray-900">Our Solution:</h3>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Auto-send after service is complete</p>
                  <p className="text-gray-600 text-sm">Perfect timing when satisfaction is highest</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Pre-written copy that actually converts</p>
                  <p className="text-gray-600 text-sm">Crafted to maximize response rates</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Filters out negative sentiment</p>
                  <p className="text-gray-600 text-sm">Ensure only your best testimonials go public</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Collects media (video, images, etc.)</p>
                  <p className="text-gray-600 text-sm">Rich media testimonials that stand out</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Flow Diagram (from newer version) */}
          <div className="mt-16 flex justify-center">
            <div className="bg-white rounded-lg border border-gray-200 shadow-md p-6">
              <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-blue-600" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium">Stripe</span>
                </div>
                
                <ArrowRight className="text-gray-400" />
                
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-2">
                    <Bot className="w-6 h-6 text-indigo-600" />
                  </div>
                  <span className="text-sm font-medium">AI</span>
                </div>
                
                <ArrowRight className="text-gray-400" />
                
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                    <MessageSquare className="w-6 h-6 text-purple-600" />
                  </div>
                  <span className="text-sm font-medium">Resend</span>
                </div>
                
                <ArrowRight className="text-gray-400" />
                
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
                    <Star className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="text-sm font-medium">Feedback</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Built-In Intelligence Section (from newer version) */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            AI handles the ask. You just deliver the service.
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-center mb-12">
            Claude 3 crafts context-aware emails based on what you actually did.
            Fallback to proven templates if AI ever misses.
          </p>
          
          {/* Toggle Component */}
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden mb-12">
            <div className="flex border-b border-gray-200">
              <button 
                className={`flex-1 py-4 px-6 text-center font-medium ${
                  activeTab === 'ai' 
                    ? 'text-indigo-600 bg-indigo-50 border-b-2 border-indigo-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('ai')}
              >
                AI Message
              </button>
              <button 
                className={`flex-1 py-4 px-6 text-center font-medium ${
                  activeTab === 'template' 
                    ? 'text-indigo-600 bg-indigo-50 border-b-2 border-indigo-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('template')}
              >
                Template
              </button>
            </div>
            
            {activeTab === 'ai' && (
              <div className="p-6">
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mr-3">
                      <Bot className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">From: TestimonialNudger</p>
                      <p className="text-sm text-gray-500">To: client@example.com</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="font-medium mb-2">Subject: How was your logo design experience with us?</p>
                    <div className="text-gray-700 space-y-3">
                      <p>Hi Sarah,</p>
                      <p>I hope you&apos;re enjoying your new logo design! We loved working with you on creating a modern, versatile brand mark that reflects your company&apos;s innovative approach.</p>
                      <p>Would you mind taking a quick moment to share your thoughts on our work together? Your feedback would mean the world to us and help other businesses looking for design services.</p>
                      <p>Just click the button below to leave a quick testimonial:</p>
                      <div className="py-2">
                        <button className="bg-indigo-600 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-700">Share Your Experience</button>
                      </div>
                      <p>Thank you so much for trusting us with your branding needs!</p>
                      <p>Best regards,<br />The Design Team</p>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-500 border-t border-gray-200 pt-3 mt-3">
                    <p><strong>AI prompted with:</strong> &ldquo;Logo design for Sarah&apos;s tech startup, included brand guidelines and 3 revisions.&rdquo;</p>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'template' && (
              <div className="p-6">
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mr-3">
                      <MessageSquare className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">From: TestimonialNudger</p>
                      <p className="text-sm text-gray-500">To: client@example.com</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="font-medium mb-2">Subject: We&apos;d love to hear about your experience</p>
                    <div className="text-gray-700 space-y-3">
                      <p>Hello!</p>
                      <p>Thank you for choosing our services. Your satisfaction means everything to us, and we&apos;d be grateful to hear about your experience.</p>
                      <p>Would you be willing to take a moment to share your feedback? It would help us improve and assist others in their decision-making process.</p>
                      <p>Simply click below to leave your testimonial:</p>
                      <div className="py-2">
                        <button className="bg-green-600 text-white px-4 py-2 rounded-md font-medium hover:bg-green-700">Leave a Testimonial</button>
                      </div>
                      <p>We appreciate your time and support!</p>
                      <p>Thank you,<br />The Team</p>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-500 border-t border-gray-200 pt-3 mt-3">
                    <p><strong>Template type:</strong> Standard Follow-up (High response rate)</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Additional benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-indigo-600" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Perfect Timing</h3>
              <p className="text-gray-600">
                Automatically send requests when satisfaction is highest, increasing conversion rates.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-indigo-600" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Personalized Follow-up</h3>
              <p className="text-gray-600">
                Send gentle reminders to clients who haven&apos;t responded, without being pushy.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-indigo-600" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Quality Control</h3>
              <p className="text-gray-600">
                Review submissions before they go public, ensuring only positive experiences get showcased.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section - Using your existing components */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold mb-6">Loved by Businesses Like Yours</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              See how TestimonialNudger is helping businesses collect and showcase their best client feedback.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sampleTestimonials.map((testimonial, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                {renderStarRating(testimonial.rating)}
                
                <div className="my-4">
                  <p className="text-gray-700">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                      <Image 
                        src={testimonial.mediaUrl} 
                        alt={testimonial.authorName}
                        width={40}
                        height={40}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{testimonial.authorName}</p>
                      <p className="text-gray-500 text-xs">{testimonial.authorCompany}</p>
                    </div>
                  </div>
                  
                  <SocialShare 
                    testimonial={testimonial}
                    businessName="TestimonialNudger"
                    variant="icon"
                  />
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <Link href="/showcase" className="text-indigo-600 font-medium inline-flex items-center hover:underline">
              View our testimonial showcase <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section - Enhanced version with dashboard preview */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold mb-6">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Get more high-quality testimonials with our simple, automated process.
            </p>
          </div>
          
          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Step 1 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 relative">
              <div className="w-12 h-12 bg-indigo-600 rounded-full text-white font-semibold flex items-center justify-center absolute -top-6 left-6">1</div>
              <div className="pt-4">
                <h3 className="text-xl font-semibold mb-3">Connect Your Tools</h3>
                <p className="text-gray-600 mb-4">
                  Integrate with your existing payment processor or calendar. We&apos;ll know exactly when to request testimonials.
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-20 h-10 bg-gray-100 rounded flex items-center justify-center">
                    <svg className="h-6 w-auto" viewBox="0 0 60 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 10.0001H55V15.0001H5V10.0001Z" fill="#635BFF"/>
                    </svg>
                  </div>
                  <div className="w-24 h-10 bg-gray-100 rounded flex items-center justify-center">
                    <svg className="h-6 w-auto" viewBox="0 0 80 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="80" height="20" rx="4" fill="#006BFF" fillOpacity="0.2"/>
                      <path d="M15 5H65V15H15V5Z" fill="#006BFF"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 relative">
              <div className="w-12 h-12 bg-indigo-600 rounded-full text-white font-semibold flex items-center justify-center absolute -top-6 left-6">2</div>
              <div className="pt-4">
                <h3 className="text-xl font-semibold mb-3">Customize Templates</h3>
                <p className="text-gray-600 mb-4">
                  Set up AI-powered email templates that match your brand voice. Our system gets smarter over time.
                </p>
                <div className="bg-gray-50 p-2 rounded text-sm text-gray-600 border border-gray-200">
                  <span className="text-indigo-600 font-medium">AI:</span> Creating personalized outreach based on project details
                </div>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 relative">
              <div className="w-12 h-12 bg-indigo-600 rounded-full text-white font-semibold flex items-center justify-center absolute -top-6 left-6">3</div>
              <div className="pt-4">
                <h3 className="text-xl font-semibold mb-3">Collect & Display</h3>
                <p className="text-gray-600 mb-4">
                  Testimonials come in automatically. Approve them with one click and showcase them on your website.
                </p>
                <div className="flex gap-2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-xs font-medium">
                    +8
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Dashboard Preview */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
            <div className="border-b border-gray-200 p-4 bg-gray-50">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full mr-4"></div>
                <div className="bg-white rounded-md flex-1 py-1 px-3 text-sm text-gray-500 border border-gray-200">
                  testimonial-nudger.com/dashboard
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold text-lg">Recent Testimonials</h3>
                <button className="text-sm text-indigo-600 py-1 px-3 rounded-md font-medium hover:underline">View All</button>
              </div>
              <div className="space-y-4">
                {/* Sample Dashboard Data */}
                <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                      <Image 
                        src="/user2.png" 
                        alt="John D."
                        width={40}
                        height={40}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-sm">John D.</p>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-xs text-green-600 py-1 px-2 font-medium">Approved</span>
                    <button className="text-xs text-gray-600 py-1 px-2 border border-gray-200 rounded hover:bg-gray-50">View</button>
                  </div>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                      <Image 
                        src="/user3.png" 
                        alt="Lisa M."
                        width={40}
                        height={40}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Lisa M.</p>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-xs text-amber-600 py-1 px-2 font-medium">Pending</span>
                    <button className="text-xs text-gray-600 py-1 px-2 border border-gray-200 rounded hover:bg-gray-50">View</button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                      <Image 
                        src="/user4.png" 
                        alt="Robert K."
                        width={40}
                        height={40}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Robert K.</p>
                      <div className="flex">
                        {[1, 2, 3, 4].map((star) => (
                          <Star key={star} className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                        ))}
                        <Star className="h-3 w-3 text-gray-300" />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-xs text-green-600 py-1 px-2 font-medium">Approved</span>
                    <button className="text-xs text-gray-600 py-1 px-2 border border-gray-200 rounded hover:bg-gray-50">View</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Final CTA Section */}
      <section className="py-16 md:py-24 bg-indigo-700 text-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Start collecting testimonials today</h2>
          <p className="text-xl text-indigo-100 mb-10 max-w-3xl mx-auto">
            Join hundreds of businesses using TestimonialNudger to turn happy clients into powerful marketing assets.
          </p>
          
          {isLoaded && (
            isSignedIn ? (
              <Link 
                href="/dashboard" 
                className="px-8 py-4 bg-white text-indigo-700 rounded-md hover:bg-indigo-50 font-medium shadow-lg hover:shadow-xl transition-all duration-200 inline-flex items-center gap-2"
              >
                Go to Dashboard <ArrowRight className="h-5 w-5" />
              </Link>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <SignUpButton mode="modal">
                  <button className="px-8 py-4 bg-white text-indigo-700 rounded-md hover:bg-indigo-50 font-medium shadow-lg hover:shadow-xl transition-all duration-200 inline-flex items-center gap-2">
                    Start Free • No Card Needed <ArrowRight className="h-5 w-5" />
                  </button>
                </SignUpButton>
              </div>
            )
          )}
          
          <p className="mt-6 text-indigo-200 text-sm">No credit card required. 14-day free trial.</p>
        </div>
      </section>
    </div>
  );
} 