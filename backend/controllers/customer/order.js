const Account = require('../../models/account');
const Order = require('../../models/order');
const { errorHandler, createError } = require('../../util/error-handler');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.getOrders = async (req, res, next) => {
  const userId = req.userId;

  try {
    const user = await Account.findById(userId);
    if (!user)
      throw createError('User not found!', 404);

    const orders = await Order.find({ 'buyer.accountId': user._id });
    if (!orders)
      throw createError('Orders not found!', 404);

    res.status(200).json({
      message: orders.length === 0 ? 'There is no order D:' : 'Fetched orders :D',
      orders: orders
    });
  } catch (error) {
    errorHandler(req, error, next);
  }
}

exports.createOrder = async (req, res, next) => {
  const { productIds } = req.body;
  const userId = req.userId;

  try {
    const user = await Account.findById(userId);
    if (!user)
      throw createError('User not found!', 404);

    console.log(productIds)
  } catch (error) {
    errorHandler(req, error, next);
  }
}

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

  res.status(200).json({
    message: 'Got sessionId :D',
    stripeCheckoutSessionId: stripeCheckoutSession.id
  })
};