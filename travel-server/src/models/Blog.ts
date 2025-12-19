import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  author: string;
  category: string;
  image: string;
  content: string;
  excerpt: string;
  date: Date;
  published: boolean;
  createdAt: Date;
}

const BlogSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  content: { type: String, required: true },
  excerpt: { type: String, required: true },
  date: { type: Date, required: true },
  published: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IBlog>('Blog', BlogSchema);

