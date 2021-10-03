import mongoose from 'mongoose';

const CakeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image_url: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, required: true },
    num_orders: { type: Number, required: true },
    type: {
      type: String,
      enum: [
        'CAKE',
        'DONUT',
        'CUPCAKE',
        'TEATIMECAKES',
        'COOKIES',
        'CHOCOLATES',
      ],
      default: 'CAKE',
    },
  },
  { timestamps: true },
);

export default mongoose.model('Cake', CakeSchema);
