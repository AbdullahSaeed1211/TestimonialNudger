import mongoose, { Schema, Document, Model } from 'mongoose';

export type TestimonialStatus = 'PENDING' | 'APPROVED' | 'FLAGGED';

export interface ITestimonial extends Document {
  content: string;
  status: TestimonialStatus;
  rating?: number;
  client: mongoose.Types.ObjectId;
  business: mongoose.Types.ObjectId;
  mediaUrls: string[];
  createdAt: Date;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    content: { type: String, required: true },
    status: { 
      type: String, 
      enum: ['PENDING', 'APPROVED', 'FLAGGED'],
      default: 'PENDING' 
    },
    rating: { type: Number, min: 1, max: 5 },
    client: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    business: { type: Schema.Types.ObjectId, ref: 'Business', required: true },
    mediaUrls: [{ type: String }],
  },
  { timestamps: true }
);

// Check if model exists before creating it (for hot reloading in development)
const Testimonial: Model<ITestimonial> = mongoose.models.Testimonial || 
  mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);

export default Testimonial; 