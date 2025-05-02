# TestimonialNudger

<img src="public/TestiomonialNudgerLogo.svg" alt="TestimonialNudger Logo" width="300" />

TestimonialNudger is an AI-powered SaaS platform for automated testimonial collection. Designed for freelancers and small businesses, it removes the friction in gathering client feedback using personalized AI-generated prompts and a streamlined UI/UX.

## 📊 Recent Enhancements & Implementation Status

### Mobile Responsiveness Improvements
- ✅ Enhanced Navbar with improved mobile sidebar navigation
- ✅ Fixed dashboard layout to properly hide global navbar
- ✅ Improved testimonial form mobile experience with better input sizing
- ✅ Enhanced showcase page with mobile-optimized filters and testimonial cards
- ✅ Made landing page responsive with appropriate spacing and sizing
- ✅ Added better touch targets and accessibility improvements throughout

### Remaining Tasks
- ⏳ Implement empty state UI for testimonial lists when no data exists
- ⏳ Add automated testimonial request scheduling feature
- ⏳ Complete API endpoints for analytics dashboard
- ⏳ Integrate Stripe webhook for automatic testimonial requests after payment
- ⏳ Add email notification settings for new testimonials
- ⏳ Improve error handling and implement retry logic for API failures
- ⏳ Add comprehensive end-to-end testing

## 🚀 Features

- **AI-Powered Testimonial Requests**: Claude AI generates personalized emails that get higher response rates
- **Elegant Client-Facing Forms**: Mobile-friendly forms with AI assistance for hesitant clients
- **Media Support**: Clients can add photos and videos to their testimonials
- **Beautiful Showcase Pages**: Display your testimonials on a public showcase page
- **Comprehensive Dashboard**: Manage, approve, and track testimonials in one place

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 18.3.1
- **UI Components**: shadcn/ui, Radix Primitives
- **Authentication**: Clerk
- **Database**: MongoDB (Mongoose)
- **Email**: Resend + React Email
- **AI**: Claude 3 Opus API
- **Hosting**: Vercel

## 📋 Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB database
- Clerk account
- Resend account
- Claude API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/testimonial-nudger.git
cd testimonial-nudger
```

2. Install dependencies:
```bash
npm install
```

3. Copy `.env.local.example` to `.env.local` and fill in your environment variables:
```bash
cp .env.local.example .env.local
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🌐 Deployment

The easiest way to deploy TestimonialNudger is with [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Ftestimonial-nudger)

## 📝 Environment Variables

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB connection string |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key |
| `CLERK_SECRET_KEY` | Clerk secret key |
| `RESEND_API_KEY` | Resend API key for emails |
| `CLAUDE_API_KEY` | Claude AI API key |
| `NEXT_PUBLIC_APP_URL` | Public URL of your application |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary secret key |
| `EMAIL_FROM` | The email address to send emails from |

## 📁 Project Structure

```
/
├── app/                      # Next.js app router pages
│   ├── api/                  # API routes
│   ├── dashboard/            # Dashboard pages
│   ├── showcase/             # Public showcase pages
│   ├── testimonial-form/     # Client-facing form pages
├── components/               # React components
│   ├── dashboard/            # Dashboard components
│   ├── testimonial/          # Testimonial-related components
│   ├── ui/                   # UI components (shadcn/ui)
├── lib/                      # Utility functions and libraries
│   ├── ai/                   # AI-related utilities
│   ├── db/                   # Database models and connection
│   ├── email/                # Email templates and sending
├── public/                   # Static assets
```

## 🧩 Core Concepts

### Automated Testimonial Collection Process

1. **Trigger**: Initiated via Stripe webhook (payment), calendar event, or manual trigger
2. **Personalization**: Claude AI generates contextual email based on service details
3. **Delivery**: Email sent via Resend with personalized testimonial form link
4. **Collection**: Client submits testimonial on mobile-friendly form with AI assistance
5. **Moderation**: Business approves testimonial in dashboard
6. **Showcase**: Approved testimonials displayed on public showcase page

### AI Fallback

If Claude fails to generate a testimonial request, the system falls back to pre-generated high-conversion templates.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support, please open an issue on GitHub or contact us at support@testimonialnudger.com.

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Clerk](https://clerk.dev/)
- [MongoDB](https://www.mongodb.com/)
- [Resend](https://resend.io/)
- [Anthropic Claude](https://www.anthropic.com/)