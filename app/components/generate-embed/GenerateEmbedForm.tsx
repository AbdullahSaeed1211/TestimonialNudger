'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import { useAuth } from '@clerk/nextjs';
import { CheckCircle, Copy, ExternalLink } from 'lucide-react';

interface Business {
  _id: string;
  name: string;
}

export default function GenerateEmbedForm() {
  const { userId } = useAuth();
  const [businessId, setBusinessId] = useState('');
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [embedSettings, setEmbedSettings] = useState({
    count: 3,
    theme: 'light',
    showRating: true,
    layout: 'carousel',
    minRating: 4,
  });
  const [copied, setCopied] = useState(false);
  
  useEffect(() => {
    async function fetchBusinesses() {
      try {
        const res = await fetch(`/api/business?userId=${userId}`);
        if (res.ok) {
          const data = await res.json();
          setBusinesses(data.businesses);
          
          // Set the first business as default if available
          if (data.businesses && data.businesses.length > 0) {
            setBusinessId(data.businesses[0]._id);
          }
        }
      } catch (error) {
        console.error('Error fetching businesses:', error);
      } finally {
        setLoading(false);
      }
    }
    
    if (userId) {
      fetchBusinesses();
    }
  }, [userId]);
  
  const handleSettingsChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setEmbedSettings({
      ...embedSettings,
      [name]: type === 'checkbox' ? checked : value,
    });
  };
  
  const generateScriptUrl = () => {
    return `${window.location.origin}/api/embed-script.js`;
  };
  
  const generateEmbedCode = () => {
    const params = new URLSearchParams({
      businessId,
      count: embedSettings.count.toString(),
      theme: embedSettings.theme,
      showRating: embedSettings.showRating.toString(),
      layout: embedSettings.layout,
      minRating: embedSettings.minRating.toString(),
    }).toString();
    
    return `<div id="testimonial-nudger-embed"></div>
<script src="${generateScriptUrl()}?${params}"></script>
<link rel="stylesheet" href="${window.location.origin}/testimonial-embed.css" />`;
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateEmbedCode()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Generate Embed Code</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Embed Settings</h2>
        
        {loading ? (
          <p>Loading your businesses...</p>
        ) : businesses.length === 0 ? (
          <div className="bg-yellow-50 p-4 rounded-md mb-6">
            <p className="text-yellow-800">
              You need to create a business first before generating embed code.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business
              </label>
              <select
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={businessId}
                onChange={(e) => setBusinessId(e.target.value)}
              >
                {businesses.map((business) => (
                  <option key={business._id} value={business._id}>
                    {business.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Testimonials
                </label>
                <select
                  name="count"
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  value={embedSettings.count}
                  onChange={handleSettingsChange}
                >
                  {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Theme
                </label>
                <select
                  name="theme"
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  value={embedSettings.theme}
                  onChange={handleSettingsChange}
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="auto">Auto (Follows User&apos;s Preference)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Layout
                </label>
                <select
                  name="layout"
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  value={embedSettings.layout}
                  onChange={handleSettingsChange}
                >
                  <option value="carousel">Carousel (Sliding)</option>
                  <option value="grid">Grid</option>
                  <option value="list">List</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum Rating
                </label>
                <select
                  name="minRating"
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  value={embedSettings.minRating}
                  onChange={handleSettingsChange}
                >
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <option key={rating} value={rating}>
                      {rating}+ Stars
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="showRating"
                  name="showRating"
                  checked={embedSettings.showRating}
                  onChange={handleSettingsChange}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label htmlFor="showRating" className="ml-2 block text-sm text-gray-700">
                  Show Star Ratings
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {businessId && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Your Embed Code</h2>
          <p className="text-sm text-gray-600 mb-4">
            Copy and paste this code into your website where you want the testimonials to appear.
          </p>
          
          <div className="relative">
            <pre className="bg-gray-50 p-4 rounded-md border border-gray-200 overflow-x-auto text-sm">
              {generateEmbedCode()}
            </pre>
            
            <button
              onClick={copyToClipboard}
              className="absolute top-3 right-3 p-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
              aria-label="Copy to clipboard"
            >
              {copied ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <Copy className="h-5 w-5 text-gray-700" />
              )}
            </button>
          </div>
          
          <div className="mt-6">
            <h3 className="text-md font-medium mb-2">Preview</h3>
            <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
              <p className="text-center text-sm text-gray-600">
                Preview not available in the embed generator. To see how it will look, add it to your website.
              </p>
              <div className="mt-4 flex justify-center">
                <a
                  href={`/showcase?preview=true&businessId=${businessId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
                >
                  <span>See example in showcase</span>
                  <ExternalLink className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 