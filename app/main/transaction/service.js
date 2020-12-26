'use strict';

const Models = require('../../db/models');
const BaseServiceCRUD = require('../../base/BaseServiceCRUD');
const Boom = require('@hapi/boom');
const UserModel = require('../../db/models/User');

class TransactionService extends BaseServiceCRUD {
  constructor() {
    super(Models.Transaction, 'Transaction');
  }

  static getService() {
    if (!TransactionService.instance) {
      TransactionService.instance = new TransactionService();
    }
    return TransactionService.instance;
  }
  async getMany({ query }) {
    try {
      return Models.Transaction.queryBuilder(query)
        .eager('category');
    } catch (error) {
      console.log(error);
      throw Boom.badImplementation('Lỗi server');
    }
  }
  async createOne(payload) {
    try {
      let { moneyAmount } = await UserModel.query().findById(payload.userId);
      if (payload.type === 1) {
        moneyAmount += payload.amount;
      } else {
        if (moneyAmount - payload.amount < 0) {
          throw Boom.badRequest('Số tiền lớn hơn số tiền bạn đang có');
        }
        moneyAmount -= payload.amount;
      }
      await UserModel.query().patchAndFetchById(payload.userId, { moneyAmount });
      return this.model
        .query()
        .insert(payload)
        .returning('*');
    } catch (error) {
      console.log(error);
      throw Boom.badImplementation('Lỗi server');
    }
  }

  async getOne(id) {
    const result = await this.model.query().findById(id).eager('category');
    if (!result) {
      throw Boom.notFound(`${this.modelName} not found`);
    }
    return result;
  }
}

module.exports = TransactionService;
