import mongoose, { Schema, Document } from 'mongoose';

export interface ITrek extends Document {
  title: string;
  location: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging' | 'Expert';
  duration: string;
  price: number;
  rating: number;
  image: string;
  images?: string[];
  description: string;
  itinerary: string[];
  included: string[];
  excluded: string[];
  featured: boolean;
  createdAt: Date;
}

const TrekSchema = new Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  difficulty: { type: String, enum: ['Easy', 'Moderate', 'Challenging', 'Expert'], required: true },
  duration: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  image: { type: String, required: true },
  images: [String],
  description: { type: String, required: true },
  itinerary: [String],
  included: [String],
  excluded: [String],
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<ITrek>('Trek', TrekSchema);

