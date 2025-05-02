'use client';

import Link from 'next/link';
import { Star, CheckCircle, CheckCircle2, X } from 'lucide-react';
import { useAuth, SignUpButton, SignInButton } from '@clerk/nextjs';

export default function HomeClient() {
  const { isSignedIn, isLoaded } = useAuth();

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
        </div>
      </section>
    </div>
  );
} 