import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6)
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export const productSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(10),
  price: z.number().positive(),
  images: z.array(z.string().url()).min(1),
  stock: z.number().int().nonnegative(),
  category: z.string().min(2)
});

export const orderSchema = z.object({
  products: z.array(z.object({ productId: z.string(), quantity: z.number().int().min(1) })).min(1),
  fullName: z.string().min(2),
  phone: z.string().min(10),
  address: z.string().min(8),
  pincode: z.string().min(4),
  paymentMethod: z.enum(['COD', 'UPI'])
});
