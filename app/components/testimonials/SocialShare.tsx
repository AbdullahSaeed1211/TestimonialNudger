'use client';

import React, { useState } from 'react';
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Link2, 
  Mail, 
  CheckCircle,
  Share2
} from 'lucide-react';

interface SocialShareProps {
  testimonial: {
    _id: string;
    content: string;
    authorName: string;
    authorCompany?: string;
  };
  businessName: string;
  className?: string;
  variant?: 'icon' | 'full';
}

export default function SocialShare({ 
  testimonial, 
  businessName,
  className = '',
  variant = 'full'
}: SocialShareProps) {
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const baseUrl = typeof window !== 'undefined' 
    ? window.location.origin 
    : 'https://testimonialnudger.com';
    
  const shareUrl = `${baseUrl}/t/${testimonial._id}`;
  
  const shareText = `"${truncateContent(testimonial.content)}" - ${testimonial.authorName}${
    testimonial.authorCompany ? `, ${testimonial.authorCompany}` : ''
  } via ${businessName}`;
  
  const toggleShareOptions = () => {
    setShowShareOptions(!showShareOptions);
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const shareToFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`,
      '_blank'
    );
  };
  
  const shareToTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
      '_blank'
    );
  };
  
  const shareToLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      '_blank'
    );
  };
  
  const shareByEmail = () => {
    window.open(
      `mailto:?subject=${encodeURIComponent(`Testimonial from ${testimonial.authorName} for ${businessName}`)}&body=${encodeURIComponent(`${shareText}\n\nView more: ${shareUrl}`)}`,
      '_blank'
    );
  };
  
  if (variant === 'icon') {
    return (
      <div className={`relative ${className}`}>
        <button
          onClick={toggleShareOptions}
          className="p-2 text-gray-500 hover:text-indigo-600 transition-colors rounded-full hover:bg-gray-100"
          aria-label="Share testimonial"
        >
          <Share2 size={16} />
        </button>
        
        {showShareOptions && (
          <div className="absolute right-0 z-10 mt-2 bg-white rounded-md shadow-lg p-2 flex space-x-2 border border-gray-200">
            <button
              onClick={shareToFacebook}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
              aria-label="Share on Facebook"
            >
              <Facebook size={16} />
            </button>
            <button
              onClick={shareToTwitter}
              className="p-2 text-sky-500 hover:bg-sky-50 rounded-full"
              aria-label="Share on Twitter"
            >
              <Twitter size={16} />
            </button>
            <button
              onClick={shareToLinkedIn}
              className="p-2 text-blue-700 hover:bg-blue-50 rounded-full"
              aria-label="Share on LinkedIn"
            >
              <Linkedin size={16} />
            </button>
            <button
              onClick={shareByEmail}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
              aria-label="Share by Email"
            >
              <Mail size={16} />
            </button>
            <button
              onClick={copyToClipboard}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
              aria-label="Copy link"
            >
              {copied ? <CheckCircle size={16} className="text-green-600" /> : <Link2 size={16} />}
            </button>
          </div>
        )}
      </div>
    );
  }
  
  return (
    <div className={`${className}`}>
      <div className="flex gap-2 items-center">
        <button
          onClick={shareToFacebook}
          className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
          aria-label="Share on Facebook"
        >
          <Facebook size={18} />
        </button>
        <button
          onClick={shareToTwitter}
          className="p-2 text-sky-500 hover:bg-sky-50 rounded-full"
          aria-label="Share on Twitter"
        >
          <Twitter size={18} />
        </button>
        <button
          onClick={shareToLinkedIn}
          className="p-2 text-blue-700 hover:bg-blue-50 rounded-full"
          aria-label="Share on LinkedIn"
        >
          <Linkedin size={18} />
        </button>
        <button
          onClick={shareByEmail}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
          aria-label="Share by Email"
        >
          <Mail size={18} />
        </button>
        <button
          onClick={copyToClipboard}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
          aria-label="Copy link"
        >
          {copied ? <CheckCircle size={18} className="text-green-600" /> : <Link2 size={18} />}
        </button>
      </div>
    </div>
  );
}

function truncateContent(content: string, maxLength = 100): string {
  if (content.length <= maxLength) return content;
  return content.slice(0, maxLength) + '...';
} 