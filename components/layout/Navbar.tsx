'use client';

import Link from 'next/link';
import { UserButton, SignInButton, SignUpButton, SignedIn, SignedOut } from '@clerk/nextjs';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Logo } from '@/components/ui/logo';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Logo height={40} href="/" className="hover:opacity-80 transition-opacity" />
          </div>
          
          {/* Desktop menu */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
            <Link href="/" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600">
              Home
            </Link>
            <Link href="/showcase" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600">
              Showcase
            </Link>
            
            <SignedIn>
              <Link href="/dashboard" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600">
                Dashboard
              </Link>
              <div className="ml-4">
                <UserButton 
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      userButtonAvatarBox: {
                        width: '2.5rem',
                        height: '2.5rem'
                      }
                    }
                  }}
                  userProfileMode="modal"
                  showName={true}
                />
              </div>
            </SignedIn>
            
            <SignedOut>
              <div className="flex space-x-2">
                <SignInButton mode="modal">
                  <button className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
                    Sign Up
                  </button>
                </SignUpButton>
              </div>
            </SignedOut>
          </div>
          
          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md">
              Home
            </Link>
            <Link href="/showcase" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md">
              Showcase
            </Link>
            
            <SignedIn>
              <Link href="/dashboard" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md">
                Dashboard
              </Link>
              <div className="flex items-center px-3 py-3">
                <span className="text-sm text-gray-500 mr-2">Your account</span>
                <UserButton 
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      userButtonAvatarBox: {
                        width: '2rem',
                        height: '2rem'
                      }
                    }
                  }}
                />
              </div>
            </SignedIn>
            
            <SignedOut>
              <div className="flex flex-col space-y-2 mt-3 px-3">
                <SignInButton mode="modal">
                  <button className="w-full px-4 py-2 text-sm font-medium text-center text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="w-full px-4 py-2 text-sm font-medium text-center text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
                    Sign Up
                  </button>
                </SignUpButton>
              </div>
            </SignedOut>
          </div>
        </div>
      )}
    </nav>
  );
} 