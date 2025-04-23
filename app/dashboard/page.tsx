import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function DashboardPage() {
  const user = await currentUser();
  
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Welcome, {user.firstName || user.emailAddresses[0]?.emailAddress}</h2>
        <p className="text-gray-600">
          This is your testimonial management dashboard. From here, you can request new testimonials, 
          manage existing ones, and customize how they appear on your showcase page.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Request Testimonials</h3>
          <p className="text-gray-600 mb-4">Send email requests to your clients to collect new testimonials.</p>
          <Link href="/dashboard/request" className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
            New Request
          </Link>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Manage Testimonials</h3>
          <p className="text-gray-600 mb-4">View, edit, and organize all your collected testimonials.</p>
          <Link href="/dashboard/testimonials" className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
            View All
          </Link>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Showcase Settings</h3>
          <p className="text-gray-600 mb-4">Customize how your testimonials are displayed on your showcase page.</p>
          <Link href="/dashboard/settings" className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
            Configure
          </Link>
        </div>
      </div>
    </div>
  );
} 