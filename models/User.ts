import { model, models, Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    provider: { type: String, default: 'credentials' }
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

export const User = models.User || model('User', UserSchema);
