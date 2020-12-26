'use strict';

const WalletController = require('./controller');
const validator = require('./validator');

const controller = new WalletController();

exports.getMany = {
  description: 'Get Wallet list',
  notes: 'Return Wallet items',
  tags: ['api', 'v1'],
  handler: controller.getMany.bind(controller),
  auth: false,
  validate: {
    headers: validator.checkToken,
    query: validator.queryParams
  }
};

exports.count = {
  description: 'Count Wallet list',
  notes: 'Return a count result of Wallet items',
  tags: ['api', 'v1'],
  handler: controller.count.bind(controller),
  auth: {
    strategy: 'jwt',
    scope: ['admin', 'user']
  },
  validate: {
    headers: validator.checkToken
  }
};

exports.getOne = {
  description: 'Get a Wallet',
  notes: 'Return a Wallet by id',
  tags: ['api', 'v1'],
  handler: controller.getOne.bind(controller),
  auth: 'jwt',
  auth: {
    strategy: 'jwt'
  },
  validate: {
    headers: validator.checkToken,
    params: {
      id: validator.idParam
    }
  }
};

exports.createOne = {
  description: 'Create a new Wallet',
  notes: 'Return created Wallet',
  tags: ['api', 'v1'],
  handler: controller.createOne.bind(controller),
  auth: {
    strategy: 'jwt'
    // scope: ['admin']
  },
  validate: {
    headers: validator.checkToken,
    payload: validator.createWallet
  }
};

exports.updateOne = {
  description: 'Update Wallet',
  notes: 'Return updated Wallet by id',
  tags: ['api', 'v1'],
  handler: controller.updateOne.bind(controller),
  auth: {
    strategy: 'jwt'
    // scope: ['admin']
  },
  validate: {
    headers: validator.checkToken,
    params: {
      id: validator.idParam
    },
    payload: validator.updateWallet
  }
};

exports.deleteOne = {
  description: 'Delete a Wallet',
  notes: 'Return deleted Wallet by id',
  tags: ['api', 'v1'],
  handler: controller.deleteOne.bind(controller),
  auth: {
    strategy: 'jwt'
    // scope: ['admin']
  },
  validate: {
    headers: validator.checkToken,
    params: {
      id: validator.idParam
    }
  }
};
