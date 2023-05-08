import { FC, useEffect, useState } from 'react';
import { useStripe } from '@stripe/react-stripe-js';
import { useCart } from '@/store/useCart';

interface Props {
  clientSecret: string;
}

const Order: FC<Props> = ({ clientSecret }) => {
  const [message, setMessage] = useState('');
  const stripe = useStripe();
  const { clear: clearCart } = useCart();

  useEffect(() => {
    if (!stripe) {
      return;
    }

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case 'succeeded':
          setMessage(`Payment succeeded! Order id: ${paymentIntent.id}`);
          clearCart();
          break;
        case 'processing':
          setMessage('Your payment is processing.');
          break;
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.');
          break;
        default:
          setMessage('Something went wrong.');
          break;
      }
    });
  }, [stripe, clearCart, clientSecret]);

  return <>{message}</>;
};

export default Order;
