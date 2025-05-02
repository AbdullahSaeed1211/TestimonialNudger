'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserButton, SignInButton, SignUpButton, useAuth } from '@clerk/nextjs';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const { isSignedIn, isLoaded } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const isActive = (path: string) => {
    return pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm global-navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-indigo-600">
                TestimonialNudger
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {isSignedIn && (
                <>
                  <Link 
                    href="/dashboard" 
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      isActive('/dashboard') 
                        ? 'border-indigo-500 text-gray-900' 
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    href="/dashboard/testimonials" 
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      isActive('/dashboard/testimonials') 
                        ? 'border-indigo-500 text-gray-900' 
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    Testimonials
                  </Link>
                  <Link 
                    href="/dashboard/request" 
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      isActive('/dashboard/request') 
                        ? 'border-indigo-500 text-gray-900' 
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    Request
                  </Link>
                </>
              )}
              <Link 
                href="/showcase" 
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/showcase') 
                    ? 'border-indigo-500 text-gray-900' 
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Showcase
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            {isLoaded && (
              <>
                {isSignedIn ? (
                  <UserButton afterSignOutUrl="/" showName={true} />
                ) : (
                  <>
                    <SignInButton mode="modal">
                      <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
                        Sign In
                      </button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
                        Sign Up
                      </button>
                    </SignUpButton>
                  </>
                )}
              </>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-expanded={isMobileMenuOpen}
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              <svg 
                className="block h-6 w-6" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                aria-hidden="true"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu, show/hide based on menu state */}
      <div className={`sm:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="pt-2 pb-3 space-y-1">
          {isSignedIn && (
            <>
              <Link 
                href="/dashboard" 
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  isActive('/dashboard') 
                    ? 'bg-indigo-50 border-indigo-500 text-indigo-700' 
                    : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Dashboard
              </Link>
              <Link 
                href="/dashboard/testimonials" 
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  isActive('/dashboard/testimonials') 
                    ? 'bg-indigo-50 border-indigo-500 text-indigo-700' 
                    : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Testimonials
              </Link>
              <Link 
                href="/dashboard/request" 
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  isActive('/dashboard/request') 
                    ? 'bg-indigo-50 border-indigo-500 text-indigo-700' 
                    : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Request
              </Link>
            </>
          )}
          <Link 
            href="/showcase" 
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
              isActive('/showcase') 
                ? 'bg-indigo-50 border-indigo-500 text-indigo-700' 
                : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
            }`}
          >
            Showcase
          </Link>
          {!isSignedIn && isLoaded && (
            <>
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center px-4">
                  <div className="flex-grow ml-3">
                    <SignInButton mode="modal">
                      <button className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                        Sign In
                      </button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <button className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                        Sign Up
                      </button>
                    </SignUpButton>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
} 