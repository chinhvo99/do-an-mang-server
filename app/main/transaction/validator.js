'use strict';

const Joi = require('@hapi/joi');
const { queryParams, checkToken } = require('../../utils/validatorUtils');

exports.queryParams = queryParams;

exports.checkToken = checkToken;

exports.idParam = Joi.number().required().description('id is required');

exports.createTransaction = {
  type: Joi.number().required(),
  categoryId: Joi.number().required(),
  amount: Joi.number().required(),
  description: Joi.string(),
  createdAt: Joi.date()
};

exports.updateTransaction = {
  categoryId: Joi.number(),
  amount: Joi.number(),
  description: Joi.string()
};
