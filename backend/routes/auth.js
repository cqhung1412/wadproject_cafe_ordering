const express = require('express');
const { body } = require('express-validator');

const isAuth = require('../util/is-auth');

const authController = require('../controllers/auth/auth');

const Account = require('../models/account');

const Router = express.Router();

// Authorization
//________________________________________________________________
// POST /auth/signup
Router.post('/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Pls enter valid email D:')
      .custom((value, { req }) => {
        return Account.findOne({ email: value }).then(accDoc =>
          accDoc && Promise.reject('Email already existed D:')
        );
      })
      .normalizeEmail(),
    body('password').trim()
      .isLength({ min: 5 }),
    body('confirmPassword').trim()
      .isLength({ min: 5 })
      .custom(async (confirmPassword, {req}) => {
        const password = req.body.password;
        if (password !== confirmPassword)
          throw new Error('Confirm password is wrong D:');
      }),
    body('firstName').trim()
      .not().isEmpty(),
    body('lastName').trim()
      .not().isEmpty(),
  ],
  authController.customerSignup
);

// POST /auth/login
Router.post('/login',
  [
    body('email')
      .isEmail()
      .withMessage('Pls enter valid email D:')
      .normalizeEmail(),
    body('password').trim()
      .isLength({ min: 5 })
  ],
  authController.login
);
//________________________________________________________________

module.exports = Router;
