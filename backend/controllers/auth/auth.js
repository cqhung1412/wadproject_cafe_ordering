const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

exports.login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      throw createError('Validation failed D:', 422, errors.array());

    const { email, password } = req.body;

    const acc = await Account.findOne({ email });
    if (!acc)
      throw createError('Account not found D:', 401); // 401: not authenticated

    const isEqual = await bcrypt.compare(password, acc.password);
    if (!isEqual)
      throw createError('Wrong password D:', 401);

    const token = jwt.sign(
      {
        email: acc.email,
        userId: acc._id.toString(),
        isAdmin: acc.isAdmin
      },
      'asecretprivatekey',
      { expiresIn: '24h' }
    );

    res.status(200).json({
      user: {
        token,
        userId: acc._id.toString(),
        isAdmin: acc.isAdmin,
        expireTime: 60 * 60 * 24000 // 5 hours
      },
      message: 'Login successfully :D'
    });
  } catch (error) {
    errorHandler(req, error, next);
  }
};

exports.customerSignup = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      throw createError('Validation failed D:', 422, errors.array());

    const { firstName, lastName, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);
    const account = new Account({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      isAdmin: false,
      phoneNumbers: [],
      shipAddresses: [],
      creditCards: []
    });
    const createdAcc = await account.save();

    res.status(201).json({
      message: 'Account created successfully :D',
      userId: createdAcc._id
    });
  } catch (error) {
    errorHandler(req, error, next);
  }
};