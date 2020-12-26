'use strict';

const handler = require('./handler');

const Routes = [
  {
    method: 'GET',
    path: '/api/v1/users',
    config: handler.getMany
  },
  {
    method: 'GET',
    path: '/api/v1/users/{id}',
    config: handler.getOne
  },
  {
    method: 'GET',
    path: '/api/v1/users/count',
    config: handler.count
  },
  {
    method: 'PUT',
    path: '/api/v1/users/{id}',
    config: handler.updateOne
  },
  {
    method: 'GET',
    path: '/api/v1/users/me',
    config: handler.getMe
  },
  {
    method: 'PUT',
    path: '/api/v1/users/me',
    config: handler.updateMe
  },
  {
    method: 'GET',
    path: '/api/v1/users/me/transactions',
    config: handler.getMyTransaction
  }
];

module.exports = Routes;
