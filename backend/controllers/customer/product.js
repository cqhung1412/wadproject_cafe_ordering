const Product = require('../../models/product');
const {
  errorHandler,
  createError
} = require('../../util/error-handler');

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      message: 'Fetched products :D',
      products
    });
  } catch (error) {
    errorHandler(req, error, next);
  }
};

exports.getProductsByCategories = async (req, res, next) => {
  try {
    const agg = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          products: {
            $push: {
              name: '$name',
              unitPrice: '$unitPrice',
              desc: '$desc',
              isMustTry: '$isMustTry',
              sizes: '$sizes',
              toppings: '$toppings'
            }
          }
        }
      },
      {
        $sort: {
          _id: 1
        }
      }
    ]);
    const result = agg.map(a => {
      return {
        category: a._id,
        products: a.products
      };
    });
    res.status(200).json({
      message: 'Fetch products successfully :D',
      products: result
    });
  } catch (error) {
    errorHandler(req, error, next);
  }
};