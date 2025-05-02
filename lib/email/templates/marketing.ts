import { EmailTemplate } from './index';

export const marketingRequestTemplates: EmailTemplate[] = [
  {
    id: 'marketing-campaign-results',
    name: 'Campaign Results',
    subject: 'Your marketing campaign results - share your feedback?',
    description: 'Focuses on marketing campaign performance and results',
    industry: 'marketing',
    tags: ['campaign', 'results', 'metrics'],
    body: `Hi {{clientName}},

I hope you're pleased with the results of the marketing campaign we executed for you! It's been exciting to see the metrics and engagement coming in.

I'm reaching out because I'd love to hear your perspective on the campaign performance and your experience working with our team. Would you be willing to share a brief testimonial about the results you've seen and your satisfaction with our marketing services?

Your insights would be particularly valuable for other businesses who are considering investing in similar marketing initiatives.

Share your thoughts here:
{{testimonialLink}}

Thank you for choosing {{businessName}} for your marketing needs!

Best regards,
{{senderName}}
{{businessName}}
`,
  },
  {
    id: 'marketing-brand-growth',
    name: 'Brand Growth',
    subject: 'Your brand growth journey - a quick request',
    description: 'Focuses on brand development and growth',
    industry: 'marketing',
    tags: ['brand', 'growth', 'awareness'],
    body: `Hello {{clientName}},

I hope your brand continues to thrive since we began working together! It's been a pleasure watching your brand awareness and presence grow over time.

I'm reaching out because I'd value your perspective on how our marketing services have contributed to your brand development. Would you be willing to share a brief testimonial about your brand growth journey and the impact of our work together?

Your insights would be especially helpful for other businesses looking to strengthen their brand position in the market.

Share your experience here:
{{testimonialLink}}

Thank you for allowing us to be part of your brand story!

Creatively yours,
{{senderName}}
{{businessName}}
`,
  },
  {
    id: 'marketing-audience-engagement',
    name: 'Audience Engagement',
    subject: 'How has your audience engagement changed?',
    description: 'Emphasizes audience connection and engagement metrics',
    industry: 'marketing',
    tags: ['audience', 'engagement', 'connection'],
    body: `Dear {{clientName}},

I hope you're continuing to see strong engagement from your audience! Building meaningful connections with your target market has been a central focus of our work together.

I'm reaching out because I'd love to hear your perspective on how our marketing strategies have impacted your audience engagement. Would you be willing to share a brief testimonial about the changes you've seen in audience response, interactions, or conversions?

Your insights would be particularly valuable for other businesses looking to strengthen their connection with their target audience.

You can share your feedback here:
{{testimonialLink}}

Thank you for the opportunity to help amplify your voice in the market!

With appreciation,
{{senderName}}
{{businessName}}
`,
  }
]; 