import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    address: { type: String, required: true },
    cakes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cake' }],
  },
  { timestamps: true },
);

export default mongoose.model('Order', OrderSchema);
