'use strict';

const Joi = require('@hapi/joi');
const { queryParams, checkToken } = require('../../utils/validatorUtils');

exports.queryParams = queryParams;

exports.checkToken = checkToken;

exports.idParam = Joi.number()
  .required()
  .description('id is required');

exports.createWallet = {
  name: Joi.string().required(),
  description: Joi.string(),
  image: Joi.string(),
  amount: Joi.number().required()
};

exports.updateWallet = {
  name: Joi.string(),
  description: Joi.string(),
  image: Joi.string(),
  amount: Joi.number(),
  isActive: Joi.boolean()
};
