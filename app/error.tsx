'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Unhandled application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-lg w-full p-8 text-center">
        <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-300" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Something went wrong</h1>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          We encountered an unexpected error. Our team has been notified and is working on the issue.
        </p>
        
        {error.digest && (
          <div className="bg-gray-100 dark:bg-gray-700 rounded-md p-3 mb-6">
            <p className="text-sm text-gray-700 dark:text-gray-300 font-mono">Error ID: {error.digest}</p>
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            Try again
          </button>
          
          <Link 
            href="/"
            className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-md transition-colors"
          >
            <Home className="h-4 w-4" />
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
} 