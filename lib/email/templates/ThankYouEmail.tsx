import React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface ThankYouEmailProps {
  businessName: string;
  clientName: string;
  recommenderName?: string;
  logoUrl?: string;
  personalNote?: string;
  baseUrl?: string;
}

export default function ThankYouEmail({
  businessName,
  clientName,
  recommenderName,
  logoUrl,
  personalNote,
  baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://yourdomain.com',
}: ThankYouEmailProps) {
  const previewText = `Thank you for the testimonial from ${clientName}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoContainer}>
            <Img
              src={logoUrl || `${baseUrl}/TestiomonialNudgerLogo.svg`}
              width="120"
              height="auto"
              alt={`${businessName} logo`}
              style={logo}
            />
          </Section>
          
          <Section style={content}>
            <Heading style={heading}>Thank You!</Heading>
            
            <Text style={paragraph}>
              Hi {recommenderName || 'there'},
            </Text>
            
            <Text style={paragraph}>
              We&apos;re thrilled to let you know that {clientName} has submitted a testimonial, 
              thanks to your recommendation. We truly appreciate your help in collecting 
              valuable feedback about our services.
            </Text>
            
            {personalNote && (
              <Section style={noteBox}>
                <Text style={noteText}>
                  <em>&ldquo;{personalNote}&rdquo;</em>
                </Text>
              </Section>
            )}
            
            <Text style={paragraph}>
              Testimonials like this are incredibly valuable for our business. Thank you for
              being an advocate for our services and taking the time to connect us with your 
              network.
            </Text>
            
            <Text style={paragraph}>
              We look forward to working with you again soon!
            </Text>
            
            <Text style={paragraph}>
              Best regards,<br />
              The team at {businessName}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '24px',
  marginBottom: '64px',
  borderRadius: '4px',
  maxWidth: '600px',
};

const content = {
  padding: '8px 20px 20px',
};

const logoContainer = {
  marginTop: '24px',
  marginBottom: '24px',
  textAlign: 'center' as const,
};

const logo = {
  maxWidth: '120px',
  display: 'block',
  margin: '0 auto',
};

const heading = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#3d4852',
  padding: '0',
  margin: '30px 0',
  textAlign: 'center' as const,
};

const paragraph = {
  color: '#3d4852',
  fontSize: '16px',
  lineHeight: '26px',
  marginBottom: '20px',
};

const noteBox = {
  backgroundColor: '#f4f7ff',
  borderRadius: '8px',
  padding: '12px 16px',
  marginBottom: '24px',
};

const noteText = {
  color: '#5c6bc0',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0',
}; 