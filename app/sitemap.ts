// Fix MetadataRoute import for Next.js 15
type Sitemap = Array<{
  url: string;
  lastModified?: string | Date;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}>;

export default function sitemap(): Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://testimonialnudger.com';
  
  const routes = [
    '',
    '/showcase',
    '/contact',
    '/pricing',
    '/privacy-policy',
    '/terms-of-service',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return routes;
} 