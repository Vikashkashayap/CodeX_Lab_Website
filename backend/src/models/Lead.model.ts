import mongoose, { Schema, Document } from 'mongoose';

export interface ILead extends Document {
  name: string;
  email: string;
  projectType: string;
  budgetRange: string;
  message: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema = new Schema<ILead>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    projectType: {
      type: String,
      required: true,
    },
    budgetRange: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'qualified', 'converted', 'lost'],
      default: 'new',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ILead>('Lead', LeadSchema);

