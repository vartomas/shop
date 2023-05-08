import { NextApiRequest, NextApiResponse } from 'next';
import { ProductDto } from '@/types/productModel';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const calculateOrderAmount = (products: { product: ProductDto; quantity: number }[]) => {
  return products.reduce((a, c) => a + Number(c.product.price) * c.quantity, 0);
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { products }: { products: { product: ProductDto; quantity: number }[] } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(products),
      currency: 'eur',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: products.reduce((a, c) => ({ ...a, [c.product._id]: c.quantity }), {}),
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  }
};

export default handler;
