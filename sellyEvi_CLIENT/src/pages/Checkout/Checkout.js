import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import CheckoutForm from '../../components/checkoutform/CheckoutForm';

const stripe = loadStripe("pk_test_51O4YpaC34BY5NMlip6rkCnbpRRzt0iAP4ERRHOEtUtpZaJFBBNP6vf3sZI4Bf7yYzgV8VeSt9qVcdbnscdIxN3n100Xpu2Au6U");

function Checkout() {
  return (
    <Elements stripe={stripe}>
      <div style={{display: 'flex', backgroundColor: 'blue'}}>
        <CheckoutForm />
      </div>
    </Elements>
  );
}

export default Checkout;
