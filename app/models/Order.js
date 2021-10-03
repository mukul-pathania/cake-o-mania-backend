import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    address: { type: String, required: true },
    cart: { type: mongoose.Types.ObjectId, ref: 'Cart' },
    delivery_date: { type: Date, required: true },
  },
  { timestamps: true },
);

export default mongoose.model('Order', OrderSchema);
