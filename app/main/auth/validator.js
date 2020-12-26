'use strict';

const Joi = require('@hapi/joi');
const {
  strEmail,
  strPassword
} = require('../../utils/validatorUtils');

exports.validateLogin = {
  email: strEmail().required(),
  password: strPassword().required()
};

exports.validateRegister = {
  email: strEmail().required(),
  password: strPassword().required()
};

exports.forgotPassword = {
  email: strEmail().required()
};

exports.resetPassword = {
  resetPasswordToken: Joi.string().required(),
  password: strPassword().required()
};
