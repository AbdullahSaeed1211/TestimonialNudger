import * as React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from '@react-email/components';

interface TestEmailProps {
  userName?: string;
}

export const TestEmail = ({
  userName = 'Valued User',
}: TestEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Testimonial Nudger Email Test</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Welcome to Testimonial Nudger</Heading>
          <Text style={text}>
            Hello {userName},
          </Text>
          <Text style={text}>
            This is a test email to confirm that Resend is properly configured in your application.
          </Text>
          <Text style={text}>
            If you&apos;re seeing this, it means the email delivery system is working correctly.
          </Text>
          <Text style={footer}>
            © 2023 Testimonial Nudger. All rights reserved.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default TestEmail;

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
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

const footer = {
  color: '#8898aa',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontSize: '12px',
  lineHeight: '16px',
  margin: '50px 0 0 0',
  textAlign: 'center' as const,
}; 