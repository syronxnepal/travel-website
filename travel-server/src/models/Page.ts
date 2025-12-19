import mongoose, { Schema, Document } from 'mongoose';

export interface IPage extends Document {
  image: string;
  topTitle: string;
  heading: string;
  status: 'published' | 'draft';
  createdAt: Date;
}

const PageSchema = new Schema({
  image: { type: String, required: true },
  topTitle: { type: String, required: true },
  heading: { type: String, required: true },
  status: { type: String, enum: ['published', 'draft'], default: 'draft' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IPage>('Page', PageSchema);

