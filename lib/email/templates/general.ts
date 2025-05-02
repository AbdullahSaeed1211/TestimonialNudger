import { EmailTemplate } from './index';

export const generalRequestTemplates: EmailTemplate[] = [
  {
    id: 'general-simple',
    name: 'Simple Request',
    subject: 'Would you share your experience with us?',
    description: 'A short, direct request that works for most businesses',
    industry: 'general',
    tags: ['simple', 'direct', 'short'],
    body: `Hi {{clientName}},

I hope you're doing well! I wanted to personally reach out and thank you for choosing {{businessName}}.

We're constantly working to improve our service, and your feedback would be incredibly helpful. Would you be willing to share your experience with us by leaving a quick testimonial?

It should only take a minute, and it would mean a lot to us:

{{testimonialLink}}

Thank you for your time!

Best regards,
{{senderName}}
{{businessName}}
`,
  },
  {
    id: 'general-satisfaction',
    name: 'Satisfaction Check',
    subject: 'How was your experience with {{businessName}}?',
    description: 'Checks satisfaction first before asking for a testimonial',
    industry: 'general',
    tags: ['satisfaction', 'feedback', 'medium'],
    body: `Hello {{clientName}},

I hope this email finds you well! I wanted to personally check in and see how satisfied you were with our recent work together.

We take great pride in what we do at {{businessName}}, and we're always looking for ways to improve. Your feedback is invaluable to us, and we'd love to hear about your experience.

If you were happy with our service, would you consider sharing a brief testimonial? It would really help us grow our business and let others know what to expect when working with us.

Simply click the link below to share your thoughts:
{{testimonialLink}}

Thank you so much for your time and for choosing {{businessName}}!

Warm regards,
{{senderName}}
{{businessName}}
`,
  },
  {
    id: 'general-value',
    name: 'Value Focused',
    subject: 'Your feedback helps us grow - a quick request',
    description: 'Emphasizes the value of testimonials to the business',
    industry: 'general',
    tags: ['value', 'business growth', 'medium'],
    body: `Dear {{clientName}},

I hope you've been well since we completed our work together. As a small business, word of mouth and testimonials are incredibly important to us at {{businessName}}.

Your opinion matters greatly, and hearing about your experience would not only help us improve but also help potential clients make informed decisions.

Would you be willing to take a moment to share your thoughts? A few sentences about your experience working with us would be tremendously appreciated.

Share your testimonial here:
{{testimonialLink}}

Thank you in advance for your support. It's clients like you that make what we do possible.

With gratitude,
{{senderName}}
{{businessName}}
`,
  },
  {
    id: 'general-professional',
    name: 'Professional Network',
    subject: 'A professional request for your testimonial',
    description: 'More formal approach for professional services',
    industry: 'general',
    tags: ['professional', 'formal', 'business'],
    body: `Dear {{clientName}},

I trust this message finds you well. I'm reaching out regarding our recent professional engagement through {{businessName}}.

As part of our commitment to excellence and continuous improvement, we value feedback from our esteemed clients. Your insights would be particularly valuable given the nature of our collaboration.

If you found our services beneficial, I would greatly appreciate if you could share your professional assessment in the form of a testimonial. This would assist other potential clients in making informed decisions about our services.

You can submit your testimonial through this secure link:
{{testimonialLink}}

Thank you for considering this request. Your professional opinion is highly valued.

Regards,
{{senderName}}
{{businessName}}
`,
  },
  {
    id: 'general-referral',
    name: 'Referral Request',
    subject: 'Your testimonial + a special offer',
    description: 'Combines testimonial request with referral program',
    industry: 'general',
    tags: ['referral', 'incentive', 'offer'],
    body: `Hi {{clientName}},

I hope everything is going great! I'm reaching out because your opinion means a lot to us at {{businessName}}.

If you've enjoyed working with us, would you consider sharing your experience in a brief testimonial? It would help us reach more clients like you who could benefit from our services.

As a thank you, we'd like to offer you a special discount on your next purchase/service with us. Additionally, if you refer a friend who becomes a client, you'll both receive a special bonus!

Submit your testimonial here:
{{testimonialLink}}

Thank you for being a valued client. We truly appreciate your support!

Best wishes,
{{senderName}}
{{businessName}}

P.S. Feel free to reply directly to this email if you have any questions about our referral program.
`,
  }
]; 