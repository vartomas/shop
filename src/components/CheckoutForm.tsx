import React from 'react';
import { AddressElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { StripePaymentElementOptions } from '@stripe/stripe-js';
import { useToast } from '@/store/useToast';
import Button from './Button';

const CheckoutForm = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url:
          process.env.NODE_ENV === 'development' ? 'http://localhost:3000/checkout' : 'http://localghost.lt/checkout',
      },
    });

    if (error.type === 'card_error' || error.type === 'validation_error') {
      toast({ type: 'error', message: error.message || 'An unexpected error occurred.' });
    } else {
      toast({ type: 'error', message: 'An unexpected error occurred.' });
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: 'auto',
  } as StripePaymentElementOptions;

  return (
    <div className="checkout-form">
      <form onSubmit={handleSubmit}>
        <h2 className="checkout-form__shipping-header">Shipping details</h2>
        <AddressElement options={{ mode: 'shipping' }} />
        <h2 className="checkout-form__card-header">Card details</h2>
        <PaymentElement options={paymentElementOptions} />
        <div className="checkout-form__pay-button">
          <Button disabled={isLoading || !stripe || !elements} title="Pay now" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
