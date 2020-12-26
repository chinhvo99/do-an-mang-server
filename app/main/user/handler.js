'use strict';

const UserController = require('./controller');
const validator = require('./validator');

const controller = new UserController();

exports.getMany = {
  description: 'Get User list',
  notes: 'Return User items',
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
  description: 'Count User list',
  notes: 'Return a count result of user items',
  tags: ['api', 'v1'],
  handler: controller.count.bind(controller),
  auth: {
    strategy: 'jwt',
    scope: ['admin']
  },
  validate: {
    headers: validator.checkToken
  }
};

exports.getOne = {
  description: 'Get a User',
  notes: 'Return a User by id',
  tags: ['api', 'v1'],
  handler: controller.getOne.bind(controller),
  auth: {
    strategy: 'jwt',
    scope: ['admin']
  },
  validate: {
    headers: validator.checkToken,
    params: {
      id: validator.idParam
    }
  }
};

exports.updateOne = {
  description: 'Update User',
  notes: 'Return updated User by id',
  tags: ['api', 'v1'],
  handler: controller.updateOne.bind(controller),
  auth: {
    strategy: 'jwt',
    scope: ['admin']
  },
  validate: {
    headers: validator.checkToken,
    params: {
      id: validator.idParam
    },
    payload: validator.updateUser
  }
};

exports.getMe = {
  description: 'Get own user information',
  notes: 'Return User information by id',
  tags: ['api', 'v1'],
  handler: controller.getMe.bind(controller),
  auth: 'jwt',
  validate: {
    headers: validator.checkToken
  }
};

exports.updateMe = {
  description: 'Update own user information',
  notes: 'Update own user information',
  tags: ['api', 'v1'],
  handler: controller.updateMe.bind(controller),
  auth: 'jwt',
  validate: {
    headers: validator.checkToken,
    payload: validator.updateProfile
  }
};

exports.getMyTransaction = {
  description: 'Get User Transaction',
  notes: 'Return User Transaction',
  tags: ['api', 'v1'],
  handler: controller.getMyTransaction.bind(controller),
  auth: {
    strategy: 'jwt'
  },
  validate: {
    headers: validator.checkToken,
    query: validator.queryParams
  }
};
