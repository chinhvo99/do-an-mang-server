'use strict';

const CustomModel = require('./CustomModel');
const Category = require('./Category');

class Transaction extends CustomModel {
  static get tableName() {
    return 'transaction';
  }
  static get relationMappings() {
    return {
      category: {
        relation: CustomModel.BelongsToOneRelation,
        modelClass: Category,
        join: {
          from: 'transaction.categoryId',
          to: 'category.id'
        }
      }
    };
  }
}

module.exports = Transaction;
