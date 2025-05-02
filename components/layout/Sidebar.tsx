'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Settings, 
  Users, 
  BarChart, 
  Menu, 
  X,
  Star
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/ui/logo';

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  // Close sidebar when navigating to a new page on mobile
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const navigationItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
      exact: true
    },
    {
      name: 'Testimonials',
      href: '/dashboard/testimonials',
      icon: Star
    },
    {
      name: 'Requests',
      href: '/dashboard/request',
      icon: MessageSquare
    },
    {
      name: 'Clients',
      href: '/dashboard/clients',
      icon: Users
    },
    {
      name: 'Analytics',
      href: '/dashboard/analytics',
      icon: BarChart
    },
    {
      name: 'Settings',
      href: '/dashboard/settings',
      icon: Settings
    }
  ];

  const isActiveLink = (item: typeof navigationItems[0]) => {
    if (item.exact) {
      return pathname === item.href;
    }
    return pathname.startsWith(item.href);
  };

  return (
    <>
      {/* Mobile menu button - always visible on mobile */}
      <button
        type="button"
        className="md:hidden fixed top-4 left-4 z-40 p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        aria-label={isMobileOpen ? "Close menu" : "Open menu"}
      >
        {isMobileOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      {/* Sidebar overlay - only on mobile */}
      <div 
        className={cn(
          "fixed inset-0 z-30 bg-gray-800 bg-opacity-50 transition-opacity duration-300 md:hidden",
          isMobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsMobileOpen(false)}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <div 
        className={cn(
          "fixed top-0 left-0 z-40 h-full w-72 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out shadow-lg md:shadow-none",
          isMobileOpen ? "transform-none" : "-translate-x-full md:translate-x-0",
          className
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-5 border-b border-gray-200 flex items-center justify-between">
            <Logo height={130} href="/dashboard" className="hover:opacity-80 transition-opacity" />
            
            {/* Close button - only visible on mobile */}
            <button
              type="button"
              className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none"
              onClick={() => setIsMobileOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <nav className="flex-1 px-3 py-6 bg-white space-y-2 overflow-y-auto">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center px-4 py-3 text-base font-medium rounded-md transition-colors",
                  isActiveLink(item)
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                )}
                onClick={() => setIsMobileOpen(false)}
              >
                <item.icon 
                  className={cn(
                    "flex-shrink-0 h-5 w-5 mr-3",
                    isActiveLink(item)
                      ? "text-indigo-500"
                      : "text-gray-400 group-hover:text-indigo-500"
                  )}
                />
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="p-5 border-t border-gray-200">
            <div className="flex flex-col space-y-2">
              <p className="text-sm font-medium text-gray-500">Need help?</p>
              <Link 
                href="/support" 
                className="text-indigo-600 hover:text-indigo-500 flex items-center"
                onClick={() => setIsMobileOpen(false)}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 