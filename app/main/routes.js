'use strict';

const _ = require('lodash');
const routes = [
  require('./auth/routers'),
  require('./user/routers'),
  require('./category/routers'),
  require('./transaction/routers')
  // require('./product/routers')
];
module.exports = _.flattenDeep(routes);
