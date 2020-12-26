'use strict';

const handler = require('./handler');

const Routes = [
  {
    method: 'GET',
    path: '/api/v1/wallets',
    config: handler.getMany
  },
  {
    method: 'GET',
    path: '/api/v1/wallets/{id}',
    config: handler.getOne
  },
  {
    method: 'GET',
    path: '/api/v1/wallets/count',
    config: handler.count
  },
  {
    method: 'POST',
    path: '/api/v1/wallets',
    config: handler.createOne
  },
  {
    method: 'PUT',
    path: '/api/v1/wallets/{id}',
    config: handler.updateOne
  },
  {
    method: 'DELETE',
    path: '/api/v1/wallets/{id}',
    config: handler.deleteOne
  }
];

module.exports = Routes;
