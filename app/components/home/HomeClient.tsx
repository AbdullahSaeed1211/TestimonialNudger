'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Star, CheckCircle, CheckCircle2, X, ArrowRight, MessageSquare, Zap, Shield } from 'lucide-react';
import { useAuth, SignUpButton, SignInButton } from '@clerk/nextjs';
import SocialShare from '@/app/components/testimonials/SocialShare';

export default function HomeClient() {
  const { isSignedIn, isLoaded } = useAuth();

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
        </div>
      </section>

      {/* AI Capabilities Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-indigo-50 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold mb-6">AI-Crafted Requests That Convert</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our AI understands your business and crafts personalized emails that get results. No more generic templates or awkward follow-ups.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                  <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs font-medium">AI Generated</span>
                  <span>|</span>
                  <span>Personalized for Sarah&apos;s Web Design</span>
                </div>
                
                <div className="space-y-3">
                  <p className="font-medium">Subject: Your thoughts on your new website?</p>
                  
                  <p>Hi Jessica,</p>
                  
                  <p>I hope you&apos;re enjoying your new website! It was a pleasure working with you on bringing your vision to life.</p>
                  
                  <p>Since launching last week, have you received any comments from your customers about the new design? I&apos;d love to hear how it&apos;s working for your business.</p>
                  
                  <p>If you have a moment, would you mind sharing your experience working with us? It would mean a lot and help other businesses like yours find the design help they need.</p>
                  
                  <p>Just click below to share your thoughts - it only takes 60 seconds:</p>
                  
                  <div className="bg-indigo-50 text-indigo-700 py-2 px-4 rounded-md text-center font-medium">
                    Leave a Quick Review →
                  </div>
                  
                  <p>Thanks again for choosing Sarah&apos;s Web Design!</p>
                  
                  <p>Best regards,<br />Sarah</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
                <div className="flex gap-3 mb-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Personalized Outreach</h3>
                    <p className="text-gray-600">Each email is tailored to your client&apos;s project and experience</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
                <div className="flex gap-3 mb-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                    <Zap className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Perfect Timing</h3>
                    <p className="text-gray-600">Automatically sent when client satisfaction is at its peak</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
                <div className="flex gap-3 mb-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                    <Shield className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Sentiment Filter</h3>
                    <p className="text-gray-600">Negative feedback stays private, positive goes public</p>
                  </div>
                </div>
              </div>
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
      
      {/* How It Works Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold mb-6">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Get more high-quality testimonials with our simple three-step process.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 relative">
              <div className="w-12 h-12 bg-indigo-600 rounded-full text-white font-semibold flex items-center justify-center absolute -top-6 left-6">1</div>
              <div className="pt-4">
                <h3 className="text-xl font-semibold mb-3">Connect Your Tools</h3>
                <p className="text-gray-600 mb-4">
                  Integrate with your existing payment processor or calendar. We&apos;ll know exactly when to request testimonials.
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-20 h-10 bg-gray-100 rounded flex items-center justify-center text-xs">Stripe Logo</div>
                  <div className="w-24 h-10 bg-gray-100 rounded flex items-center justify-center text-xs">Calendly Logo</div>
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
                    Start Free Trial <ArrowRight className="h-5 w-5" />
                  </button>
                </SignUpButton>
              </div>
            )
          )}
          
          <p className="mt-6 text-indigo-200 text-sm">No credit card required. 14-day free trial.</p>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="mb-6 md:mb-0">
              <h3 className="text-white text-xl font-bold mb-2">TestimonialNudger</h3>
              <p className="text-sm">Turn happy clients into powerful testimonials</p>
            </div>
            
            <div className="flex gap-6">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                Terms
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                Support
              </Link>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-sm text-center">
            <p>© 2025 TestimonialNudger. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 