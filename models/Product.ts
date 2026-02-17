import { model, models, Schema } from 'mongoose';

const ProductSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    images: [{ type: String, required: true }],
    stock: { type: Number, required: true, default: 0 },
    category: { type: String, required: true },
    isOutOfStock: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const Product = models.Product || model('Product', ProductSchema);
