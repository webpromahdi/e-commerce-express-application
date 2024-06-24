import { Schema, model } from 'mongoose';
import { Torder } from './order/order.interface';
import { z } from 'zod';

const emailSchema = z.string().email();

const OrderSchema = new Schema<Torder>({
  email: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) => {
        try {
          emailSchema.parse(value);
          return true;
        } catch (err) {
          return false;
        }
      },
      message: 'Invalid email address',
    },
  },
  productId: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

export const orderModel = model<Torder>('Order', OrderSchema);
