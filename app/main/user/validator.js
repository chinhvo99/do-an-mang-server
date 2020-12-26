'use strict';

const Joi = require('@hapi/joi');
const {
  queryParams,
  strEmail,
  strPassword,
  checkToken,
  searchParams
} = require('../../utils/validatorUtils');

exports.queryParams = queryParams;

exports.searchParams = searchParams;

exports.checkToken = checkToken;

exports.idParam = Joi.string()
  .required()
  .description('id is required');

exports.createUser = {
  email: strEmail().required(),
  password: strPassword().required(),
  roleId: Joi.number(),
  avatar: Joi.string(),
  fullName: Joi.string()
};

exports.updateUser = {
  avatar: Joi.string(),
  fullName: Joi.string()
};

exports.resetPassword = {
  verificationCode: Joi.string().required(),
  password: strPassword().required()
};

exports.activate = Joi.boolean().required();
