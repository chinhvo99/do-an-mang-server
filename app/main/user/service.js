'use strict';

const Models = require('../../db/models');
const BaseServiceCRUD = require('../../base/BaseServiceCRUD');
const TransactionService = require('../transaction/service');
const transactionService = new TransactionService();

class UserService extends BaseServiceCRUD {
  constructor() {
    super(Models.User, 'User');
  }

  static getService() {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  getMe(userId) {
    return Models.User.query().findById(userId);
  }

  updateMe(userId, body) {
    return Models.User.query().patchAndFetchById(userId, body);
  }

  getMyTransaction(query, id) {
    try {
      query.filter = { ...query.filter, userId: id };
      return transactionService.getMany({ query });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = UserService;
