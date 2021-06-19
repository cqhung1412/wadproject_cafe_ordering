const Order = require('../../models/order');
const {
  errorHandler,
  createError
} = require('../../util/error-handler');
const constants = require('../../util/constants');
const io = require('../../util/socket');

exports.updateOrderCompleted = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);
    if (!order)
      throw createError('Order not found!', 404);
    
    order.orderStatus = constants.ORDER_STATUSES.COMPLETED;
    await order.save();

    const orderGroups = await Order.aggregate([
      {
        $group: {
          _id: '$orderStatus',
          orders: {
            $push: '$$ROOT',
          }
        }
      },
    ]);
    const orders = orderGroups.map(g => {
      return {
        status: g._id,
        orders: g.orders
      };
    });

    const userOrders = await Order.find({ 'buyer.accountId': order.buyer.accountId });
    io.getIO().emit('completed-order', {
      action: 'update',
      orders: userOrders,
      userId: order.buyer.accountId
    });

    res.status(200).json({
      message: 'Changed status :D',
      orders: orders
    });
  } catch (error) {
    errorHandler(req, error, next);
  }
}

exports.getOrdersGroupByStatus = async (req, res, next) => {
  try {
    const orderGroups = await Order.aggregate([
      {
        $group: {
          _id: '$orderStatus',
          orders: {
            $push: '$$ROOT',
          }
        }
      },
    ]);
    const orders = orderGroups.map(g => {
      return {
        status: g._id,
        orders: g.orders
      };
    });

    res.status(200).json({
      message: 'Fetched orders',
      orders: orders
    })
  } catch (error) {
    errorHandler(req, error, next);
  }
}
