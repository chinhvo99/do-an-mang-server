'use strict';

const handler = require('./handler');

const Routes = [
  {
    method: 'GET',
    path: '/api/v1/transactions',
    config: handler.getMany
  },
  {
    method: 'GET',
    path: '/api/v1/transactions/{id}',
    config: handler.getOne
  },
  {
    method: 'GET',
    path: '/api/v1/transactions/count',
    config: handler.count
  },
  {
    method: 'POST',
    path: '/api/v1/transactions',
    config: handler.createOne
  },
  {
    method: 'PUT',
    path: '/api/v1/transactions/{id}',
    config: handler.updateOne
  },
  {
    method: 'DELETE',
    path: '/api/v1/transactions/{id}',
    config: handler.deleteOne
  }
];

module.exports = Routes;
