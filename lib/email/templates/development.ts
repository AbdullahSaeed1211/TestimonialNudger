import { EmailTemplate } from './index';

export const developmentRequestTemplates: EmailTemplate[] = [
  {
    id: 'development-solution',
    name: 'Technical Solution',
    subject: 'How did our technical solution work for you?',
    description: 'Requests feedback on technical solution quality',
    industry: 'development',
    tags: ['technical', 'solution', 'implementation'],
    body: `Hi {{clientName}},

I hope the solution we developed for you is running smoothly! Our team put a lot of thought and care into building something that would meet your specific requirements.

I'm reaching out because feedback on our technical implementations is incredibly valuable to us. Would you be willing to share your experience with the solution we built in a brief testimonial?

Your insights on the development process, the quality of the solution, and how it's benefiting your organization would be especially helpful for future clients with similar technical needs.

You can share your feedback here:
{{testimonialLink}}

Thank you for choosing {{businessName}} for your development project!

Regards,
{{senderName}}
{{businessName}}
`,
  },
  {
    id: 'development-problem-solving',
    name: 'Problem Solving',
    subject: 'Did we solve your technical challenges effectively?',
    description: 'Focuses on problem-solving and technical challenges',
    industry: 'development',
    tags: ['problem-solving', 'challenges', 'solution'],
    body: `Hello {{clientName}},

I hope the technical solution we developed is helping you overcome the challenges you were facing! We take pride in solving complex problems with elegant, efficient code.

I'm reaching out because I'd value your perspective on how effectively we addressed your technical needs. Would you be willing to share a brief testimonial about our problem-solving approach and the results you've experienced?

Your feedback would be especially helpful for others facing similar technical challenges who are considering our services.

Share your thoughts here:
{{testimonialLink}}

Thank you for trusting us with your project!

Best regards,
{{senderName}}
{{businessName}}
`,
  },
  {
    id: 'development-feature-completion',
    name: 'Feature Delivery',
    subject: 'Your new features are live - your feedback?',
    description: 'Emphasizes successful feature delivery and performance',
    industry: 'development',
    tags: ['features', 'delivery', 'performance'],
    body: `Dear {{clientName}},

I hope you're enjoying the new features we recently implemented! It was a pleasure working with you to bring these enhancements to life.

Now that you've had some time to use the new functionality, I'd love to hear about your experience. Would you be willing to share a brief testimonial about the feature development process and how the new capabilities are benefiting your business?

Your perspective would be invaluable to other clients who are considering feature additions or enhancements to their own applications.

You can share your feedback here:
{{testimonialLink}}

Thank you for the opportunity to work on this exciting project!

Technically yours,
{{senderName}}
{{businessName}}
`,
  }
]; 