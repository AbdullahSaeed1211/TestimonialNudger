'use client';

import { Sidebar } from '@/components/layout/Sidebar';
import { UserButton } from '@clerk/nextjs';
import { useEffect } from 'react';

// This layout wraps all dashboard pages
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Use useEffect to hide global navbar on dashboard pages
  useEffect(() => {
    // Get the navbar by its class
    const navbar = document.querySelector('nav.global-navbar') as HTMLElement;
    if (navbar) {
      navbar.style.display = 'none';
    }
    
    // Cleanup function to show navbar when navigating away
    return () => {
      const navbar = document.querySelector('nav.global-navbar') as HTMLElement;
      if (navbar) {
        navbar.style.display = '';
      }
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      {/* Main content */}
      <div className="md:pl-72 flex flex-col min-h-screen">
        {/* Top header */}
        <header className="bg-white shadow-sm py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="md:hidden w-8">
            {/* This empty div balances the header */}
          </div>
          <h1 className="md:hidden text-xl font-semibold text-gray-800">
            Testimonial Nudger
          </h1>
          <UserButton afterSignOutUrl="/" showName={true} />
        </header>
        
        {/* Main content */}
        <main className="flex-1">
          <div className="py-6 px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
} 