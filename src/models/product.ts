import mongoose, { Model, Schema, models } from 'mongoose';

interface ProductSchema {
  title: string;
  description: string;
  price: string;
  image: string;
}

const productSchema = new Schema<ProductSchema>({
  title: {
    type: String,
    required: [true, 'Product title required'],
  },
  description: {
    type: String,
    required: [true, 'Product description required'],
  },
  price: {
    type: String,
    required: [true, 'Product price required'],
  },
  image: {
    type: String,
    required: [true, 'Product image required'],
  },
});

export const Product = (models.Product as Model<ProductSchema>) || mongoose.model('Product', productSchema);
