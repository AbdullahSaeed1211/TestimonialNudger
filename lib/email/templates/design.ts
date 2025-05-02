import { EmailTemplate } from './index';

export const designRequestTemplates: EmailTemplate[] = [
  {
    id: 'design-portfolio',
    name: 'Portfolio Showcase',
    subject: 'Your project in our portfolio - with your feedback?',
    description: 'Requests testimonial for portfolio showcase',
    industry: 'design',
    tags: ['portfolio', 'showcase', 'visual'],
    body: `Hi {{clientName}},

I hope you're enjoying your new design! We're thrilled with how your project turned out and would love to feature it in our portfolio.

Before we do, we'd like to include your perspective on the design process and results. Would you be willing to share a brief testimonial about your experience working with us?

Your feedback would add tremendous value alongside the visual work and help potential clients understand the experience of working with {{businessName}}.

Share your thoughts here:
{{testimonialLink}}

Thank you for being a wonderful client to work with!

Creatively yours,
{{senderName}}
{{businessName}}
`,
  },
  {
    id: 'design-creative-process',
    name: 'Creative Process',
    subject: 'How was your creative experience with us?',
    description: 'Focuses on the creative collaboration process',
    industry: 'design',
    tags: ['creative', 'collaboration', 'process'],
    body: `Hello {{clientName}},

I hope your new design is serving you well! The creative process we went through together was truly enjoyable, and I believe we created something that perfectly represents your vision.

As a designer, I value hearing about your experience during our creative collaboration. Would you be willing to share your thoughts in a brief testimonial? 

Your perspective on our design process, communication, and the final results would be incredibly helpful for other clients considering our services.

You can share your experience here:
{{testimonialLink}}

Thank you for choosing {{businessName}} for your design needs!

Artistically yours,
{{senderName}}
{{businessName}}
`,
  },
  {
    id: 'design-vision-reality',
    name: 'Vision to Reality',
    subject: 'From vision to reality - your feedback matters',
    description: 'Emphasizes turning client vision into tangible design',
    industry: 'design',
    tags: ['vision', 'transformation', 'reality'],
    body: `Dear {{clientName}},

It was a pleasure bringing your vision to life through our design work together! Seeing your ideas transform into a finished design was truly rewarding for our team.

I'm reaching out because we'd love to hear about your experience watching your concept become reality. Would you be willing to share a brief testimonial about how the final design matched your expectations?

Your insights would be valuable to others who are considering entrusting us with their design projects but may be unsure about whether we can capture their vision.

Share your thoughts here:
{{testimonialLink}}

Thank you for the opportunity to work on such an inspiring project!

Creatively,
{{senderName}}
{{businessName}}
`,
  }
]; 