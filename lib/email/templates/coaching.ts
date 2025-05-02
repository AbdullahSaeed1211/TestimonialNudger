import { EmailTemplate } from './index';

export const coachingRequestTemplates: EmailTemplate[] = [
  {
    id: 'coaching-transformation',
    name: 'Transformation Story',
    subject: 'Would you share your transformation story?',
    description: 'Asks clients to share their transformation journey',
    industry: 'coaching',
    tags: ['transformation', 'journey', 'results'],
    body: `Hi {{clientName}},

I hope this finds you thriving after our coaching work together!

Your journey has been remarkable, and I'm reaching out because stories like yours can be incredibly inspiring to others who are considering making similar positive changes in their lives.

Would you be willing to share your transformation experience in a brief testimonial? It would mean a lot to me personally, and it could help others take that first step toward their own journey.

It only takes a minute:
{{testimonialLink}}

Thank you for considering this request!

Warmly,
{{senderName}}
{{businessName}}
`,
  },
  {
    id: 'coaching-results',
    name: 'Results Focused',
    subject: 'The results you achieved - could you share them?',
    description: 'Focuses on measurable results clients achieved',
    industry: 'coaching',
    tags: ['results', 'outcomes', 'achievements'],
    body: `Hello {{clientName}},

I've been reflecting on the progress and results you achieved during our coaching work together, and I'm genuinely proud of what you accomplished.

Success stories like yours highlight what's possible through dedicated coaching work, and I believe others could be inspired by hearing about your experience.

Would you be willing to share some of the specific results or changes you experienced in a brief testimonial? Your insights would be incredibly valuable to potential clients who are wondering what they might achieve.

You can share your story here:
{{testimonialLink}}

Thank you for considering this request!

With appreciation,
{{senderName}}
{{businessName}}
`,
  },
  {
    id: 'coaching-accountability',
    name: 'Accountability Partnership',
    subject: 'Our coaching partnership - a quick request',
    description: 'Emphasizes the coaching relationship and accountability',
    industry: 'coaching',
    tags: ['partnership', 'accountability', 'support'],
    body: `Dear {{clientName}},

I hope you're continuing to implement the strategies we developed during our coaching sessions together!

As your coach, it was my privilege to be part of your journey and to provide the accountability and support you needed to reach your goals.

If you found our coaching partnership valuable, would you consider sharing your experience in a brief testimonial? Your perspective would help others understand what it's like to work with a coach and how the accountability relationship contributes to success.

You can share your thoughts here:
{{testimonialLink}}

Thank you for your consideration, and please keep me updated on your continued progress!

In your corner,
{{senderName}}
{{businessName}}
`,
  }
]; 