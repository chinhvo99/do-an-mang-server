'use strict';

const CustomModel = require('./CustomModel');

class Category extends CustomModel {
  static get tableName() {
    return 'category';
  }
}

module.exports = Category;
