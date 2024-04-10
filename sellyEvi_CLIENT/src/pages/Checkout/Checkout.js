import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import './Checkout.css';

import CheckoutForm from '../../components/checkoutform/CheckoutForm';

const stripe = loadStripe("pk_test_51O4YpaC34BY5NMlip6rkCnbpRRzt0iAP4ERRHOEtUtpZaJFBBNP6vf3sZI4Bf7yYzgV8VeSt9qVcdbnscdIxN3n100Xpu2Au6U");

function Checkout() {
  return (
    <Elements stripe={stripe}>
      <section id='checkout'>
        <div className='loader'><p>THIS IS NOT A REAL E-COMMERSE APP. SO NO CHARGE WILL BE DONE NEITHER YOUR ACCOUNT INFROMATION WILL BE STORED </p></div>
        <br/>
        <div className='  error'><p>FOR SECURITY MEASURES DO NOT ADD REAL ACCOUNT INFORMATION </p></div>
        <CheckoutForm />
      </section>
    </Elements>
  );
}

export default Checkout;
