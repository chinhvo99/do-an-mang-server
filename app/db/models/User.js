'use strict';

const CustomModel = require('./CustomModel');

class User extends CustomModel {
  static get tableName() {
    return 'users';
  }
}

module.exports = User;
