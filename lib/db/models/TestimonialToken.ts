import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITestimonialToken extends Document {
  token: string;
  business: mongoose.Types.ObjectId;
  clientEmail: string;
  clientName?: string;
  serviceType?: string;
  isUsed: boolean;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialTokenSchema = new Schema<ITestimonialToken>(
  {
    token: { type: String, required: true, unique: true },
    business: { type: Schema.Types.ObjectId, ref: 'Business', required: true },
    clientEmail: { type: String, required: true },
    clientName: { type: String },
    serviceType: { type: String },
    isUsed: { type: Boolean, default: false },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);

// Create index for token lookup
TestimonialTokenSchema.index({ token: 1 });
// Create index for expiration and used status for cleanup operations
TestimonialTokenSchema.index({ expiresAt: 1, isUsed: 1 });

// Check if model exists before creating it (for hot reloading in development)
const TestimonialToken: Model<ITestimonialToken> = mongoose.models.TestimonialToken || 
  mongoose.model<ITestimonialToken>('TestimonialToken', TestimonialTokenSchema);

export default TestimonialToken; 