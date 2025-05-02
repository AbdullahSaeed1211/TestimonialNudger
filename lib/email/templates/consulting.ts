import { EmailTemplate } from './index';

export const consultingRequestTemplates: EmailTemplate[] = [
  {
    id: 'consulting-roi',
    name: 'ROI Focus',
    subject: 'The ROI from our consulting work - your feedback?',
    description: 'Focuses on measurable return on investment',
    industry: 'consulting',
    tags: ['roi', 'results', 'business impact'],
    body: `Hi {{clientName}},

I hope this message finds you well! I'm reaching out to follow up on the consulting work we completed together and to see how the implemented strategies have been performing for your business.

As you know, measuring the return on investment is crucial in consulting relationships. Would you be willing to share your perspective on the ROI and business impact of our work together in a brief testimonial?

Your insights on specific results, metrics, or improvements would be especially valuable for other businesses considering similar consulting services.

You can share your feedback here:
{{testimonialLink}}

Thank you for the opportunity to contribute to your business success!

Best regards,
{{senderName}}
{{businessName}}
`,
  },
  {
    id: 'consulting-strategy',
    name: 'Strategic Implementation',
    subject: 'How is our strategy working for you?',
    description: 'Focuses on strategic implementation and results',
    industry: 'consulting',
    tags: ['strategy', 'implementation', 'long-term'],
    body: `Hello {{clientName}},

I hope the strategic changes we implemented together are continuing to yield positive results for your organization! It's been a pleasure working with you to develop and execute these important initiatives.

I'm reaching out because I'd value your perspective on how the strategy has been performing. Would you be willing to share a brief testimonial about the strategic work we did together and its impact on your business?

Your insights would be particularly helpful for other leaders looking to make similar strategic changes in their organizations.

Share your thoughts here:
{{testimonialLink}}

Thank you for your collaboration on this important work!

Strategically yours,
{{senderName}}
{{businessName}}
`,
  },
  {
    id: 'consulting-expertise',
    name: 'Expert Guidance',
    subject: 'Your feedback on our consulting expertise',
    description: 'Emphasizes specialized expertise and guidance',
    industry: 'consulting',
    tags: ['expertise', 'guidance', 'specialized'],
    body: `Dear {{clientName}},

I hope this message finds you well! I'm reaching out because your perspective on our consulting engagement would be incredibly valuable.

As you know, providing expert guidance in our specialized field is at the core of what we do at {{businessName}}. Would you be willing to share your experience with our expertise and the quality of guidance you received in a brief testimonial?

Your insights would help other organizations understand the value of working with specialized consultants for their similar challenges.

You can share your feedback here:
{{testimonialLink}}

Thank you for the opportunity to work with you and your team!

With appreciation,
{{senderName}}
{{businessName}}
`,
  }
]; 