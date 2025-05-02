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
  friendly: ({ clientName, serviceType, formLink, businessName }: ServiceData) => `
Hi ${clientName},

Hope you're doing well! We really enjoyed working with you on your recent ${serviceType} project. 

If you have a minute, we'd love to hear how the experience was. Your feedback helps us grow — and helps others feel confident in working with us too.

Click below to leave a quick testimonial (you can even upload a photo or video):
👉 ${formLink}

Thanks again for choosing ${businessName}!

Warmly,  
The ${businessName} Team
`,

  professional: ({ clientName, serviceType, formLink, businessName }: ServiceData) => `
Hello ${clientName},

Thank you for choosing ${businessName} for your recent ${serviceType}. We're always looking to improve, and your feedback would be incredibly valuable.

If you could take a moment to share a short testimonial, it would be greatly appreciated:  
👉 ${formLink}

Best regards,  
The ${businessName} Team
`,

  snappy: ({ clientName, serviceType, formLink, businessName }: ServiceData) => `
Yo ${clientName} 👋

Quick favor — how'd we do on your ${serviceType}?

Drop us a 30-second testimonial? 🙏  
👉 ${formLink}

Thanks a bunch,  
Team ${businessName} 🚀
`
};

/**
 * Generates a personalized testimonial request email using Claude AI
 */
export async function generateRequestEmail(serviceData: ServiceData, templateType: keyof typeof templates = 'friendly'): Promise<string> {
  // Check if API key is available
  const apiKey = process.env.CLAUDE_API_KEY;
  if (!apiKey) {
    console.warn('Claude API key not found, using fallback template');
    return templates[templateType](serviceData);
  }
  
  try {
    // Initialize Anthropic client
    const anthropic = new Claude({
      apiKey: apiKey,
    });

    // Create a more detailed prompt for Claude
    const response = await anthropic.messages.create({
      model: "claude-3-haiku-20240307", // Using a faster, cheaper model
      max_tokens: 1000,
      temperature: 0.7, // Adding some creativity
      messages: [{
        role: "user",
        content: `Generate a personalized testimonial request email with the following details:
        - Client Name: ${serviceData.clientName}
        - Service Type: ${serviceData.serviceType}
        - Business Name: ${serviceData.businessName}
        ${serviceData.projectDescription ? `- Project Description: ${serviceData.projectDescription}` : ''}
        ${serviceData.completionDate ? `- Completion Date: ${serviceData.completionDate}` : ''}
        - Form Link: ${serviceData.formLink}
        
        Style: ${templateType === 'friendly' ? 'Warm and conversational' : templateType === 'professional' ? 'Formal and professional' : 'Brief and casual with emojis'}
        
        The email should:
        1. Be personalized to the client and their specific service
        2. Be concise (max 150 words)
        3. Highlight the importance of their feedback
        4. Include the link to the testimonial form
        5. Mention they can upload photos or videos with their testimonial
        6. End with a warm signature from the business
        
        Format it as plain text, not HTML. Return only the email content, with no additional information.`
      }]
    });

    // Handle the Claude response format correctly
    // Check if the response contains content and if first block is text
    if (response?.content?.[0]?.type === 'text') {
      const textContent = response.content[0].text.trim();
      // Ensure we got a valid response
      if (textContent.length > 20) {
        return textContent;
      }
    }
    
    // If we didn't get a valid response, use the fallback template
    console.warn('Invalid response from Claude, using fallback template');
    return templates[templateType](serviceData);
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
    // Try AI generation with timeout
    const timeoutPromise = new Promise<string>((_, reject) => {
      setTimeout(() => reject(new Error('Claude API request timed out')), 5000);
    });
    
    const aiResponsePromise = generateRequestEmail(serviceData, templateType);
    
    // Race between the API call and the timeout
    const aiResponse = await Promise.race([aiResponsePromise, timeoutPromise]);
    return aiResponse || templates[templateType](serviceData);
  } catch (err) {
    console.error('Failed to generate testimonial email, using fallback:', err);
    return templates[templateType](serviceData);
  }
} 