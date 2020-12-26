'use strict';

const Models = require('../../db/models');
const BaseServiceCRUD = require('../../base/BaseServiceCRUD');

class WalletService extends BaseServiceCRUD {
  constructor() {
    super(Models.Wallet, 'Wallet');
  }
}

module.exports = WalletService;
