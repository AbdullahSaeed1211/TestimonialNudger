# Setting Up Analytics for TestimonialNudger

This guide will help you implement Google Analytics 4 (GA4) for your TestimonialNudger application.

## Google Analytics 4 Setup

1. **Create a Google Analytics 4 Property:**
   - Go to [Google Analytics](https://analytics.google.com/)
   - Sign in with your Google account
   - Create a new property (Admin > Create Property)
   - Choose "Web" as the platform
   - Enter your website URL and name
   - Complete the setup process

2. **Get Your Measurement ID:**
   - After creating your property, you'll receive a Measurement ID in the format `G-XXXXXXXXXX`
   - Copy this ID as you'll need it for the next step

3. **Add the Measurement ID to Environment Variables:**
   - Add the following line to your `.env.local` file:
   ```
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```
   - Replace `G-XXXXXXXXXX` with your actual Measurement ID
   - For production, make sure to add this environment variable to your hosting platform

## How It Works

The application is already set up with a `GoogleAnalytics` component that will:

- Load the Google Analytics script asynchronously
- Track page views automatically when users navigate around your site
- Handle environment variables properly (only loading when the ID is available)

## Custom Event Tracking

To track custom events (like button clicks or form submissions), you can use:

```typescript
// Track a button click
window.gtag?.('event', 'button_click', {
  button_name: 'request_testimonial',
  page: 'dashboard'
});

// Track a form submission
window.gtag?.('event', 'form_submit', {
  form_name: 'testimonial_request',
  success: true
});
```

## Privacy Considerations

- Make sure to update your Privacy Policy to disclose your use of Google Analytics
- Consider adding a cookie consent banner to comply with GDPR and other privacy regulations
- You can use the [Consent Mode](https://support.google.com/analytics/answer/9976101) feature of Google Analytics for enhanced compliance

## Alternative Analytics Options

If you prefer not to use Google Analytics, consider these alternatives:

1. **Plausible Analytics** - Privacy-focused, GDPR compliant, and lightweight
2. **Fathom Analytics** - Simple, privacy-focused analytics
3. **Cloudflare Web Analytics** - Free and privacy-focused
4. **Mixpanel** - For more advanced event tracking and user behavior analysis
5. **PostHog** - Open-source product analytics

To implement any of these alternatives, you would need to modify the `GoogleAnalytics.tsx` component accordingly. 