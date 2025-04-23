import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  email: string;
  avatarUrl?: string;
  businesses: mongoose.Types.ObjectId[];
  testimonials: mongoose.Types.ObjectId[];
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    avatarUrl: { type: String },
    businesses: [{ type: Schema.Types.ObjectId, ref: 'Business' }],
    testimonials: [{ type: Schema.Types.ObjectId, ref: 'Testimonial' }],
  },
  { timestamps: true }
);

// Check if model exists before creating it (for hot reloading in development)
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User; 