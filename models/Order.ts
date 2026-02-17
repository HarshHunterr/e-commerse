import { model, models, Schema } from 'mongoose';

const OrderSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    products: [
      {
        productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        title: String,
        price: Number,
        quantity: Number,
        image: String
      }
    ],
    totalAmount: { type: Number, required: true },
    fullName: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    pincode: { type: String, required: true },
    paymentMethod: { type: String, enum: ['COD', 'UPI'], default: 'COD' },
    status: { type: String, enum: ['Pending', 'Shipped', 'Delivered'], default: 'Pending' }
  },
  { timestamps: true }
);

export const Order = models.Order || model('Order', OrderSchema);
