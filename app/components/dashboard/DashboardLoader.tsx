'use client';

interface DashboardLoaderProps {
  type: 'stats' | 'testimonials' | 'general';
}

export default function DashboardLoader({ type }: DashboardLoaderProps) {
  return (
    <div className="rounded-lg border p-6 bg-card animate-pulse">
      {type === 'stats' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="p-6 rounded-lg bg-gray-100 dark:bg-gray-800">
              <div className="h-4 w-1/3 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
              <div className="h-8 w-1/2 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>
      )}
      
      {type === 'testimonials' && (
        <div className="space-y-4">
          <div className="h-6 w-1/4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
          
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="p-4 border rounded-lg flex items-start space-x-4">
              <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 w-1/3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {type === 'general' && (
        <div className="space-y-4">
          <div className="h-6 w-1/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      )}
    </div>
  );
} 