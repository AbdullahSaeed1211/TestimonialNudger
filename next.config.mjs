/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  experimental: {
    // Using esmExternals to improve compatibility
    esmExternals: true,
  },
};

export default nextConfig; 