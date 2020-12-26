'use strict';

const BaseControllerCRUD = require('../../base/BaseControllerCRUD');
const TransactionService = require('./service');

class TransactionController extends BaseControllerCRUD {
  constructor() {
    super(new TransactionService());
  }

  createOne(request) {
    const { payload,  auth: { credentials: { id } } } = request;
    payload.userId = id;
    return this.service.createOne(payload);
  }
}

module.exports = TransactionController;
