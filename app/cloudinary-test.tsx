'use client';

import { useState } from 'react';
import Image from 'next/image';

interface UploadResult {
  success: boolean;
  message: string;
  uploadResult?: {
    url: string;
    publicId: string;
    format: string;
    resourceType: string;
  };
  transformations?: Record<string, string>;
}

export default function CloudinaryTestPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<UploadResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file first');
      return;
    }

    try {
      setUploading(true);
      setError(null);
      
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/test-cloudinary', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to upload file');
      }
      
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Cloudinary Upload Test</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="border-2 border-dashed border-gray-300 rounded-md p-6">
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full"
            accept="image/*,video/*"
            disabled={uploading}
          />
          <p className="text-sm text-gray-500 mt-2">Select an image or video file</p>
        </div>
        
        {file && (
          <div className="text-sm">
            Selected: <span className="font-medium">{file.name}</span> ({Math.round(file.size / 1024)} KB)
          </div>
        )}
        
        <button
          type="submit"
          disabled={uploading || !file}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
        >
          {uploading ? 'Uploading...' : 'Upload to Cloudinary'}
        </button>
      </form>
      
      {error && (
        <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-md">
          <p className="font-medium">Error:</p>
          <p>{error}</p>
        </div>
      )}
      
      {result && (
        <div className="mt-6 p-4 bg-green-50 rounded-md">
          <p className="font-medium text-green-800 mb-2">Upload Successful!</p>
          
          <div className="border border-green-200 rounded-md p-4 bg-white overflow-auto">
            <pre className="text-xs">{JSON.stringify(result, null, 2)}</pre>
          </div>
          
          {result.uploadResult?.url && result.uploadResult.resourceType === 'image' && (
            <div className="mt-4">
              <p className="font-medium mb-2">Uploaded Image:</p>
              <div className="relative w-full h-64">
                <Image 
                  src={result.uploadResult.url} 
                  alt="Uploaded" 
                  fill
                  className="object-contain rounded-md border border-gray-200" 
                />
              </div>
            </div>
          )}
          
          {result.transformations?.thumbnail && (
            <div className="mt-4">
              <p className="font-medium mb-2">Thumbnail:</p>
              <div className="relative w-48 h-48">
                <Image 
                  src={result.transformations.thumbnail} 
                  alt="Thumbnail" 
                  fill
                  className="object-contain rounded-md border border-gray-200" 
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 