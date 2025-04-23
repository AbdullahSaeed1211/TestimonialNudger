import * as React from 'react';
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface TestimonialRequestProps {
  clientName: string;
  serviceType: string;
  businessName: string;
  projectDescription?: string;
  completionDate?: string;
  formLink: string;
  logoUrl?: string;
  baseUrl: string;
}

export const TestimonialRequest = ({
  clientName = 'Valued Client',
  serviceType = 'service',
  businessName = 'Our Business',
  projectDescription,
  completionDate,
  formLink,
  logoUrl,
  baseUrl,
}: TestimonialRequestProps) => {
  const completionInfo = completionDate 
    ? `completed on ${completionDate}` 
    : 'recently completed';
  
  const projectInfo = projectDescription 
    ? `for the ${projectDescription} project` 
    : '';

  const previewText = `We&apos;d love your feedback on your ${serviceType} experience`;

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
          
          <Heading style={h1}>How was your experience with {businessName}?</Heading>
          
          <Text style={text}>
            Hello {clientName},
          </Text>
          
          <Text style={text}>
            Thank you for choosing {businessName} for your {serviceType} {projectInfo}. We hope you&apos;re enjoying the results of our work {completionInfo}.
          </Text>
          
          <Text style={text}>
            We value your opinion and would appreciate if you could take a moment to share your experience with us. Your feedback helps us improve and helps other potential clients make informed decisions.
          </Text>
          
          <Section style={buttonContainer}>
            <Button style={button} href={formLink}>
              Share Your Testimonial
            </Button>
          </Section>
          
          <Text style={text}>
            Thank you for your time and continued support!
          </Text>
          
          <Hr style={hr} />
          
          <Text style={footer}>
            © {new Date().getFullYear()} {businessName}. All rights reserved.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default TestimonialRequest;

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  padding: '20px 0',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px',
  borderRadius: '5px',
  maxWidth: '600px',
};

const h1 = {
  color: '#333',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '30px 0',
  padding: '0',
  textAlign: 'center' as const,
};

const text = {
  color: '#333',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '16px 0',
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '30px 0',
};

const button = {
  backgroundColor: '#4F46E5',
  borderRadius: '5px',
  color: '#fff',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  padding: '12px 20px',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '30px 0',
};

const footer = {
  color: '#8898aa',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontSize: '12px',
  lineHeight: '16px',
  margin: '20px 0 0 0',
  textAlign: 'center' as const,
};

const logoContainer = {
  textAlign: 'center' as const,
  margin: '30px 0',
};

const logo = {
  width: '120px',
  height: 'auto',
}; 