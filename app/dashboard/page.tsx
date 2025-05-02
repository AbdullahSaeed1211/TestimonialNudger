import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { Suspense } from 'react';
import { PiggyBank, Send, Settings } from "lucide-react";

// Simple loader component for Suspense fallbacks
function DashboardSectionLoader() {
  return (
    <div className="rounded-lg border p-6 animate-pulse">
      <div className="h-6 w-1/4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-40 bg-gray-100 dark:bg-gray-800 rounded-lg"></div>
        ))}
      </div>
    </div>
  );
}

export default async function DashboardPage() {
  const user = await currentUser();
  const userName = user?.firstName || user?.emailAddresses[0]?.emailAddress?.split('@')[0] || 'there';
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">Welcome, {userName}! Manage your testimonials below.</p>
      
      <Suspense fallback={<DashboardSectionLoader />}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link
            href="/dashboard/testimonials"
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">Testimonials</h2>
              <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-md">
                <PiggyBank className="h-5 w-5 text-blue-600 dark:text-blue-300" />
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              Manage all your client testimonials in one place
            </p>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              View Testimonials →
            </span>
          </Link>

          <Link
            href="/dashboard/request"
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">Request</h2>
              <div className="bg-green-100 dark:bg-green-900 p-2 rounded-md">
                <Send className="h-5 w-5 text-green-600 dark:text-green-300" />
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              Send new testimonial requests to your clients
            </p>
            <span className="text-sm font-medium text-green-600 dark:text-green-400">
              Create Request →
            </span>
          </Link>

          <Link
            href="/dashboard/generate-embed"
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">Embed Code</h2>
              <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-md">
                <Settings className="h-5 w-5 text-purple-600 dark:text-purple-300" />
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              Generate code to embed testimonials on your site
            </p>
            <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
              Configure →
            </span>
          </Link>
        </div>
      </Suspense>
      
      <Suspense fallback={<DashboardSectionLoader />}>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Your recent testimonial activity will appear here.
          </p>
        </div>
      </Suspense>
    </div>
  );
} 