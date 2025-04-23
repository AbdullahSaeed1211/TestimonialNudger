'use client';

import Link from 'next/link';
import { UserButton, SignInButton, SignUpButton, SignedIn, SignedOut } from '@clerk/nextjs';
import { Menu, X, Home, Star, Info, MessageCircle, LogIn } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Logo } from '@/components/ui/logo';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    
    // Prevent scrolling when menu is open
    document.body.style.overflow = !isMenuOpen ? 'hidden' : '';
  };

  // Close mobile menu when navigating to a new page
  useEffect(() => {
    setIsMenuOpen(false);
    document.body.style.overflow = '';
  }, [pathname]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Don't render navbar on dashboard paths
  if (pathname?.startsWith('/dashboard')) {
    return null;
  }

  // Navigation items for mobile sidebar
  const navigationItems = [
    {
      name: 'Home',
      href: '/',
      icon: Home,
    },
    {
      name: 'Showcase',
      href: '/showcase',
      icon: Star,
    },
    {
      name: 'About',
      href: '/about',
      icon: Info,
    },
    {
      name: 'Support',
      href: '/support',
      icon: MessageCircle,
    }
  ];

  const isActiveLink = (href: string) => {
    if (!pathname) return false;
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className={`global-navbar bg-white border-b border-gray-200 sticky top-0 z-50 transition-all ${scrolled ? 'shadow-md' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Logo height={40} href="/" className="hover:opacity-80 transition-opacity" />
          </div>
          
          {/* Desktop menu */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
            <Link href="/" className={`px-3 py-2 text-sm font-medium transition-colors ${isActiveLink('/') ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'}`}>
              Home
            </Link>
            <Link href="/showcase" className={`px-3 py-2 text-sm font-medium transition-colors ${isActiveLink('/showcase') ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'}`}>
              Showcase
            </Link>
            
            <SignedIn>
              <Link href="/dashboard" className={`px-3 py-2 text-sm font-medium transition-colors ${isActiveLink('/dashboard') ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'}`}>
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
                  <button className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors">
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
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
              onClick={toggleMenu}
            >
              <span className="sr-only">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile overlay */}
      <div
        className={`sm:hidden fixed inset-0 z-50 transition-opacity duration-300 bg-gray-800 bg-opacity-50 ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />
      
      {/* Mobile sidebar menu */}
      <div
        className={`sm:hidden fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-xl transform transition-transform ease-in-out duration-300 ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-5 border-b border-gray-200 flex justify-between items-center">
            <Logo height={40} href="/" className="hover:opacity-80 transition-opacity" />
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>
          
          <nav className="flex-1 pt-5 pb-4 overflow-y-auto">
            <div className="px-4 space-y-3">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-4 py-3 text-base font-medium rounded-md transition-colors ${
                    isActiveLink(item.href)
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className={`mr-4 h-6 w-6 ${
                    isActiveLink(item.href) ? 'text-indigo-500' : 'text-gray-400 group-hover:text-indigo-500'
                  }`} />
                  {item.name}
                </Link>
              ))}
            </div>
            
            <div className="px-4 mt-10 pt-6 border-t border-gray-200">
              <SignedIn>
                <Link
                  href="/dashboard"
                  className={`group flex items-center px-4 py-3 text-base font-medium rounded-md transition-colors ${
                    isActiveLink('/dashboard')
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg className={`mr-4 h-6 w-6 ${isActiveLink('/dashboard') ? 'text-indigo-500' : 'text-gray-400 group-hover:text-indigo-500'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Dashboard
                </Link>
                <div className="flex items-center px-4 py-4 mt-4">
                  <span className="text-sm text-gray-500 mr-3">Your account</span>
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
                  />
                </div>
              </SignedIn>
              
              <SignedOut>
                <div className="space-y-3 p-2 mt-2">
                  <SignInButton mode="modal">
                    <button className="w-full flex items-center px-4 py-3 text-base font-medium rounded-md text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors">
                      <LogIn className="mr-4 h-6 w-6 text-gray-400" />
                      Sign In
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="w-full px-4 py-3 text-base font-medium text-center text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors">
                      Sign Up
                    </button>
                  </SignUpButton>
                </div>
              </SignedOut>
            </div>
          </nav>
        </div>
      </div>
    </nav>
  );
} 