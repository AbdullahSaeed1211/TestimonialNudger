'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [settings, setSettings] = useState({
    showcaseTheme: 'light',
    testimonialLayout: 'carousel',
    displayRatings: true,
    displayClientInfo: true,
    displayDate: false,
    autoRotate: true,
    rotationSpeed: 5000,
    maxTestimonialsShown: 6,
    customCss: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setSettings({
        ...settings,
        [name]: target.checked,
      });
    } else if (type === 'number') {
      setSettings({
        ...settings,
        [name]: parseInt(value),
      });
    } else {
      setSettings({
        ...settings,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would save the settings to your backend
      // const response = await fetch('/api/settings', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(settings),
      // });
      
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Showcase Settings</h1>
      
      {saveSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-md">
          Settings saved successfully!
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium mb-4">Appearance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="showcaseTheme" className="block text-sm font-medium text-gray-700 mb-1">
                Theme
              </label>
              <select
                id="showcaseTheme"
                name="showcaseTheme"
                value={settings.showcaseTheme}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="colorful">Colorful</option>
                <option value="minimal">Minimal</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="testimonialLayout" className="block text-sm font-medium text-gray-700 mb-1">
                Layout
              </label>
              <select
                id="testimonialLayout"
                name="testimonialLayout"
                value={settings.testimonialLayout}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="carousel">Carousel</option>
                <option value="grid">Grid</option>
                <option value="masonry">Masonry</option>
                <option value="list">List</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium mb-4">Display Options</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="displayRatings"
                  name="displayRatings"
                  type="checkbox"
                  checked={settings.displayRatings}
                  onChange={handleChange}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="displayRatings" className="font-medium text-gray-700">
                  Show Ratings
                </label>
                <p className="text-gray-500">Display star ratings alongside testimonials</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="displayClientInfo"
                  name="displayClientInfo"
                  type="checkbox"
                  checked={settings.displayClientInfo}
                  onChange={handleChange}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="displayClientInfo" className="font-medium text-gray-700">
                  Show Client Information
                </label>
                <p className="text-gray-500">Display client name, role, and company</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="displayDate"
                  name="displayDate"
                  type="checkbox"
                  checked={settings.displayDate}
                  onChange={handleChange}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="displayDate" className="font-medium text-gray-700">
                  Show Date
                </label>
                <p className="text-gray-500">Display the date when the testimonial was submitted</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium mb-4">Carousel Settings</h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="autoRotate"
                  name="autoRotate"
                  type="checkbox"
                  checked={settings.autoRotate}
                  onChange={handleChange}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="autoRotate" className="font-medium text-gray-700">
                  Auto-rotate Testimonials
                </label>
                <p className="text-gray-500">Automatically cycle through testimonials</p>
              </div>
            </div>
            
            <div>
              <label htmlFor="rotationSpeed" className="block text-sm font-medium text-gray-700 mb-1">
                Rotation Speed (ms)
              </label>
              <input
                id="rotationSpeed"
                name="rotationSpeed"
                type="number"
                min="1000"
                step="500"
                value={settings.rotationSpeed}
                onChange={handleChange}
                disabled={!settings.autoRotate}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                  !settings.autoRotate ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              />
            </div>
            
            <div>
              <label htmlFor="maxTestimonialsShown" className="block text-sm font-medium text-gray-700 mb-1">
                Maximum Testimonials Shown
              </label>
              <input
                id="maxTestimonialsShown"
                name="maxTestimonialsShown"
                type="number"
                min="1"
                max="50"
                value={settings.maxTestimonialsShown}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p className="mt-1 text-sm text-gray-500">Limit the number of testimonials displayed on your showcase page</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium mb-4">Advanced Customization</h2>
          <div>
            <label htmlFor="customCss" className="block text-sm font-medium text-gray-700 mb-1">
              Custom CSS
            </label>
            <textarea
              id="customCss"
              name="customCss"
              rows={6}
              value={settings.customCss}
              onChange={handleChange}
              placeholder=".testimonial-item { /* your custom styles */ }"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm"
            ></textarea>
            <p className="mt-1 text-sm text-gray-500">Add custom CSS to style your testimonials showcase</p>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => router.push('/dashboard')}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 mr-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className={`px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 ${
              isSaving ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isSaving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
} 