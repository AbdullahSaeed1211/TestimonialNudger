import { generalRequestTemplates } from './general';
import { coachingRequestTemplates } from './coaching';
import { designRequestTemplates } from './design';
import { developmentRequestTemplates } from './development';
import { consultingRequestTemplates } from './consulting';
import { marketingRequestTemplates } from './marketing';

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  description: string;
  industry: string;
  tags: string[];
}

export interface TemplateCategory {
  id: string;
  name: string;
  description: string;
  templates: EmailTemplate[];
}

// All templates grouped by industry
export const templateCategories: TemplateCategory[] = [
  {
    id: 'general',
    name: 'General',
    description: 'Universal templates that work for any business',
    templates: generalRequestTemplates,
  },
  {
    id: 'coaching',
    name: 'Coaching',
    description: 'Templates for life coaches, business coaches, and consultants',
    templates: coachingRequestTemplates,
  },
  {
    id: 'design',
    name: 'Design',
    description: 'Templates for graphic designers, web designers, and creative professionals',
    templates: designRequestTemplates,
  },
  {
    id: 'development',
    name: 'Development',
    description: 'Templates for web developers, software engineers, and technical professionals',
    templates: developmentRequestTemplates,
  },
  {
    id: 'consulting',
    name: 'Consulting',
    description: 'Templates for business consultants and advisory services',
    templates: consultingRequestTemplates,
  },
  {
    id: 'marketing',
    name: 'Marketing',
    description: 'Templates for marketers, social media managers, and content creators',
    templates: marketingRequestTemplates,
  },
];

// Flat list of all templates
export const allTemplates = templateCategories.flatMap(category => category.templates);

// Helper to find template by ID
export function findTemplateById(id: string): EmailTemplate | undefined {
  return allTemplates.find(template => template.id === id);
}

// Helper to find templates by tag
export function findTemplatesByTag(tag: string): EmailTemplate[] {
  return allTemplates.filter(template => template.tags.includes(tag));
}

// Helper to find templates by industry
export function findTemplatesByIndustry(industry: string): EmailTemplate[] {
  return allTemplates.filter(template => template.industry === industry);
} 