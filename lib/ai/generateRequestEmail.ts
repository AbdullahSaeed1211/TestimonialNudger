import Claude from '@anthropic-ai/sdk';

// Service data interface
export interface ServiceData {
  clientName: string;
  serviceType: string;
  projectDescription?: string;
  completionDate?: string;
  formLink: string;
  businessName: string;
}

// Fallback templates as specified in the PRD
export const templates = {
  friendly: ({ clientName, serviceType, formLink }: ServiceData) => `
Hi ${clientName},

Hope you're doing well! We really enjoyed working with you on your recent ${serviceType} project. 

If you have a minute, we'd love to hear how the experience was. Your feedback helps us grow — and helps others feel confident in working with us too.

Click below to leave a quick testimonial (you can even upload a photo or video):
👉 ${formLink}

Thanks again for choosing us!

Warmly,  
The TestimonialNudger Team
`,

  professional: ({ clientName, serviceType, formLink }: ServiceData) => `
Hello ${clientName},

Thank you for choosing us for your recent ${serviceType}. We're always looking to improve, and your feedback would be incredibly valuable.

If you could take a moment to share a short testimonial, it would be greatly appreciated:  
👉 ${formLink}

Best regards,  
The TestimonialNudger Team
`,

  snappy: ({ clientName, serviceType, formLink }: ServiceData) => `
Yo ${clientName} 👋

Quick favor — how'd we do on your ${serviceType}?

Drop us a 30-second testimonial? 🙏  
👉 ${formLink}

Thanks a bunch,  
Team TestimonialNudger 🚀
`
};

/**
 * Generates a personalized testimonial request email using Claude AI
 */
export async function generateRequestEmail(serviceData: ServiceData, templateType: keyof typeof templates = 'friendly'): Promise<string> {
  try {
    // Initialize Anthropic client (assuming API key is set in environment variables)
    const anthropic = new Claude({
      apiKey: process.env.CLAUDE_API_KEY || '',
    });

    // Create a prompt for Claude
    const response = await anthropic.messages.create({
      model: "claude-3-opus-20240229",
      max_tokens: 1000,
      messages: [{
        role: "user",
        content: `Generate a personalized testimonial request email with the following details:
        - Client Name: ${serviceData.clientName}
        - Service Type: ${serviceData.serviceType}
        - Business Name: ${serviceData.businessName}
        ${serviceData.projectDescription ? `- Project Description: ${serviceData.projectDescription}` : ''}
        ${serviceData.completionDate ? `- Completion Date: ${serviceData.completionDate}` : ''}
        - Form Link: ${serviceData.formLink}
        
        Make the email friendly, professional, and personalized to the client and their specific service.
        Keep it concise (max 150 words) and include the link to the testimonial form.
        Add emojis sparingly for a friendly touch.
        End with a warm signature.`
      }]
    });

    // Handle the Claude response format correctly
    // Check if the response contains content and if first block is text
    const firstBlock = response.content[0];
    let textContent = '';
    
    if (firstBlock.type === 'text') {
      textContent = firstBlock.text;
    } else {
      // If not a text block, fall back to template
      textContent = templates[templateType](serviceData);
    }
    
    return textContent;
  } catch (error) {
    console.error('Error generating testimonial request email:', error);
    // Return fallback template if AI generation fails
    return templates[templateType](serviceData);
  }
}

/**
 * AI fallback logic as specified in the PRD
 */
export async function getTestimonialRequestEmailWithFallback(
  serviceData: ServiceData, 
  templateType: keyof typeof templates = 'friendly'
): Promise<string> {
  try {
    const aiResponse = await generateRequestEmail(serviceData, templateType);
    return aiResponse || templates[templateType](serviceData);
  } catch (err) {
    console.error('Failed to generate testimonial email, using fallback:', err);
    return templates[templateType](serviceData);
  }
} 