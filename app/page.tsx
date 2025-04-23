'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MessageCircle, Star, Bot, CheckCircle, ArrowRight, CheckCircle2, X } from 'lucide-react';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'ai' | 'template'>('ai');

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
            <Link href="/sign-up" className="px-6 md:px-8 py-3 md:py-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 font-medium shadow-lg hover:shadow-xl transition-all duration-200">
              Start Free • No Card Needed
            </Link>
          </div>
          
          {/* Mini Testimonial Carousel */}
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto mb-8 relative">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">
              Sample Testimonial
            </div>
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-gray-200 h-12 w-12 flex-shrink-0"></div>
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
          
          {/* Flow Diagram */}
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
                    <MessageCircle className="w-6 h-6 text-purple-600" />
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

      {/* Built-In Intelligence Section */}
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
                      <MessageCircle className="w-4 h-4 text-green-600" />
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

      {/* Proof + Social Cred Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Used by 100+ freelancers, coaches, and agencies.
          </h2>
          
          {/* Badge Bar */}
          <div className="flex flex-wrap justify-center gap-6 mb-16">
            <div className="bg-gray-50 px-6 py-3 rounded-lg border border-gray-200 flex items-center">
              <span className="font-semibold">Vercel</span>
            </div>
            <div className="bg-gray-50 px-6 py-3 rounded-lg border border-gray-200 flex items-center">
              <span className="font-semibold">Supabase</span>
            </div>
            <div className="bg-gray-50 px-6 py-3 rounded-lg border border-gray-200 flex items-center">
              <span className="font-semibold">Stripe</span>
            </div>
            <div className="bg-gray-50 px-6 py-3 rounded-lg border border-gray-200 flex items-center">
              <span className="font-semibold">Clerk</span>
            </div>
          </div>
          
          {/* Testimonial Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="italic text-gray-700 mb-4">
                &ldquo;Collected more testimonials in 1 week than I did in all of 2024.&rdquo;
              </p>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-200 rounded-full mr-3"></div>
                <span className="font-medium text-sm">Alex P. • Web Developer</span>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="italic text-gray-700 mb-4">
                &ldquo;Feels like a polite robot assistant I didn&apos;t know I needed.&rdquo;
              </p>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-200 rounded-full mr-3"></div>
                <span className="font-medium text-sm">Jamie R. • Marketing Consultant</span>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="italic text-gray-700 mb-4">
                &ldquo;Got a video testimonial — from someone who never leaves reviews.&rdquo;
              </p>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-200 rounded-full mr-3"></div>
                <span className="font-medium text-sm">Taylor M. • Freelance Designer</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            Your setup is 2 minutes. The impact is forever.
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Connect Stripe / Calendar</h3>
              <p className="text-gray-600">Automatically trigger requests after payments or appointments</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Customize your tone & form</h3>
              <p className="text-gray-600">Match your brand voice and capture what matters most</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Start collecting client love</h3>
              <p className="text-gray-600">Watch as testimonials roll in without any effort</p>
            </div>
          </div>
          
          {/* Dashboard Preview */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-12 max-w-4xl mx-auto">
            <div className="bg-gray-800 text-white p-3">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm ml-2">TestimonialNudger Dashboard</span>
              </div>
            </div>
            <div className="p-4">
              <div className="flex border-b border-gray-200">
                <button className="py-2 px-4 text-sm font-medium text-indigo-600 border-b-2 border-indigo-600">
                  Pending (3)
                </button>
                <button className="py-2 px-4 text-sm font-medium text-gray-500">
                  Approved (12)
                </button>
                <button className="py-2 px-4 text-sm font-medium text-gray-500">
                  Showcase
                </button>
              </div>
              
              <div className="py-4">
                <div className="mb-4 p-4 border border-gray-200 rounded-md">
                  <div className="flex justify-between mb-2">
                    <div className="font-medium">Sarah Johnson</div>
                    <div className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Pending</div>
                  </div>
                  <p className="text-gray-700 text-sm mb-2">
                    &ldquo;Working with this team was amazing! They delivered the project on time...&rdquo;
                  </p>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>
                
                <div className="mb-4 p-4 border border-gray-200 rounded-md">
                  <div className="flex justify-between mb-2">
                    <div className="font-medium">John Davis</div>
                    <div className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Pending</div>
                  </div>
                  <p className="text-gray-700 text-sm mb-2">
                    &ldquo;Exceptional service from start to finish. Highly recommend...&rdquo;
                  </p>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Start collecting praise on autopilot.
          </h2>
          <div className="mb-8">
            <Link href="/sign-up" className="inline-block px-8 py-4 bg-white text-indigo-600 font-medium rounded-md hover:bg-gray-100 shadow-lg transition-all duration-200">
              Try it Free
            </Link>
            <p className="mt-3 text-indigo-200">No credit card. Cancel anytime.</p>
          </div>
          
          <p className="mb-8 text-indigo-100">
            Works great for freelancers, coaches, and small agencies.
          </p>
          
          <div className="text-indigo-200 text-sm">
            Made with ♥ by indie devs
          </div>
        </div>
      </section>
    </div>
  );
}
