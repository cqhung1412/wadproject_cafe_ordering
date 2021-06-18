const Order = require('../../models/order');
const {
  errorHandler,
  createError
} = require('../../util/error-handler');

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

    console.log(orders[0].orders)
    res.status(200).json({
      message: 'Fetched orders',
      orders: orders
    })
  } catch (error) {
    errorHandler(req, error, next);
  }
}
