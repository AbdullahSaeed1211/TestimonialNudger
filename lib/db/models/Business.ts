import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBusiness extends Document {
  name: string;
  owner: mongoose.Types.ObjectId;
  logoUrl?: string;
  serviceTypes: string[];
  testimonials: mongoose.Types.ObjectId[];
  showcasePageEnabled: boolean;
  showcasePageSlug?: string;
}

const BusinessSchema = new Schema<IBusiness>(
  {
    name: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    logoUrl: { type: String },
    serviceTypes: [{ type: String }],
    testimonials: [{ type: Schema.Types.ObjectId, ref: 'Testimonial' }],
    showcasePageEnabled: { type: Boolean, default: true },
    showcasePageSlug: { type: String },
  },
  { timestamps: true }
);

// Check if model exists before creating it (for hot reloading in development)
const Business: Model<IBusiness> = mongoose.models.Business || mongoose.model<IBusiness>('Business', BusinessSchema);

export default Business; 