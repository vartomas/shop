import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Elements } from '@stripe/react-stripe-js';
import { Appearance, StripeElementsOptions, loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '@/components/CheckoutForm';
import { useCart } from '@/store/useCart';
import Order from '../components/Order';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

const Checkout = () => {
  const [loaded, setLoaded] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const products = useCart((state) => state.products);
  const router = useRouter();

  const { payment_intent_client_secret: clientSecretParam } = router.query;

  useEffect(() => {
    setLoaded(true);
  }, [products]);

  useEffect(() => {
    if (products.length) {
      fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ products: products ? products : [] }),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    }
  }, [products]);

  const appearance = {
    theme: 'stripe',
    variables: {
      fontWeightNormal: '500',
      colorTextPlaceholder: '#27528F',
      colorBackground: '#1d3557',
      colorText: 'white',
    },
  } as Appearance;

  const options = {
    clientSecret,
    appearance,
  } as StripeElementsOptions;

  if (!loaded) {
    return null;
  }

  return (
    <div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          {clientSecretParam ? <Order clientSecret={clientSecretParam as string} /> : <CheckoutForm />}
        </Elements>
      )}
    </div>
  );
};

export default Checkout;
