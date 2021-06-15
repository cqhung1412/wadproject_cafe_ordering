const { validationResult } = require('express-validator');

const Account = require('../../models/account');
const {
  errorHandler,
  createError
} = require('../../util/error-handler');

exports.addShippingAddress = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      throw createError('Validation failed D:', 422, errors.array());

    const { placeId, address, ward, district, city, phone } = req.body;
    const newAddress = { placeId, address, ward, district, city, phone };

    const acc = await Account.findById(req.userId);
    if (!acc)
      throw createError('Account not found D:', 401);

    acc.shipAddresses.push(newAddress);
    await acc.save();

    res.status(201).json({
      message: 'Added new shipping address :D',
      newAddress
    });
  } catch (error) {
    errorHandler(req, error, next);
  }
};