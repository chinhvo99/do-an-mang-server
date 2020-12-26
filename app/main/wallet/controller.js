'use strict';

const BaseControllerCRUD = require('../../base/BaseControllerCRUD');
const WalletService = require('./service');

class WalletController extends BaseControllerCRUD {
  constructor() {
    super(new WalletService());
  }
}

module.exports = WalletController;
