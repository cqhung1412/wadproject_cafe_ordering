const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.getCheckout = async (req, res, next) => {
  const { products } = req.body;
  const line_items = products.map(product => {
    return {
      name: product.name,
      description: product.note || 'No description!',
      amount: product.totalPrice,
      currency: 'vnd',
      quantity: product.quantity
    };
  });

  const stripeCheckoutSession = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: line_items,
    success_url: `${req.protocol}://${process.env.FRONTEND_URL}/checkout/success`,
    cancel_url: `${req.protocol}://${process.env.FRONTEND_URL}/checkout/cancel`
  });

  console.log(stripeCheckoutSession)

  res.status(200).json({
    message: 'Got sessionId :D',
    stripeCheckoutSessionId: stripeCheckoutSession.id
  })
};