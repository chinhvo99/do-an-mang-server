'use strict';

const BaseControllerCRUD = require('../../base/BaseControllerCRUD');
const UserService = require('./service');

class UserController extends BaseControllerCRUD {
  constructor() {
    super(new UserService());
  }

  async getMe(request) {
    try {
      const userId = request.auth.credentials.id;
      return await this.service.getMe(userId);
    } catch (err) {
      throw err;
    }
  }

  async updateMe(request) {
    try {
      const userId = request.auth.credentials.id;
      return await this.service.updateMe(userId, request.payload);
    } catch (err) {
      throw err;
    }
  }

  getMyTransaction(request) {
    const { query, auth: { credentials: { id } } } = request;
    return this.service.getMyTransaction(query, id);
  }
}

module.exports = UserController;
