'use strict';

const TransactionController = require('./controller');
const validator = require('./validator');

const controller = new TransactionController();

exports.getMany = {
  description: 'Get transactions list',
  notes: 'Return transactions',
  tags: ['api', 'v1'],
  handler: controller.getMany.bind(controller),
  auth: {
    strategy: 'jwt',
    scope: ['admin']
  },
  validate: {
    headers: validator.checkToken,
    query: validator.queryParams
  }
};

exports.count = {
  description: 'Count transactions list',
  notes: 'Return a count result of transactions items',
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
  description: 'Get a transaction',
  notes: 'Return a transaction by id',
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
  description: 'Create a new transaction',
  notes: 'Return created transaction',
  tags: ['api', 'v1'],
  handler: controller.createOne.bind(controller),
  auth: {
    strategy: 'jwt'
  },
  validate: {
    headers: validator.checkToken,
    payload: validator.createTransaction
  }
};

exports.updateOne = {
  description: 'Update transaction',
  notes: 'Return updated transaction by id',
  tags: ['api', 'v1'],
  handler: controller.updateOne.bind(controller),
  auth: {
    strategy: 'jwt'
  },
  validate: {
    headers: validator.checkToken,
    params: {
      id: validator.idParam
    },
    payload: validator.updateTransaction
  }
};

exports.deleteOne = {
  description: 'Delete a transaction',
  notes: 'Return deleted transaction by id',
  tags: ['api', 'v1'],
  handler: controller.deleteOne.bind(controller),
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
