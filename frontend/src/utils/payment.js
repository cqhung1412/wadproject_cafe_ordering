import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY || 'pk_test_51IuK3NFc28cnctTXfVMFNQPak8N8qAMPwT3aauqo7FmfZHaq9rFXh5StcwwGwZUmmEKGFDY2PtXVV3D5QW9HYArL00yMy0ML14');

export const processToPayment = (sessionId) => {
  stripePromise.then(stripe => stripe.redirectToCheckout({
    sessionId: sessionId
  }))
    .catch(err => console.log(err));
}
