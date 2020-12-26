'use strict';

const path = require('path');

const BASE_PATH = path.join(__dirname, 'app', 'db');

module.exports = {
  test: {
    client: 'pg',
    connection:
      'postgresql://postgres:hoang123@localhost:5432/do-an-csn-mang',
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds')
    }
  },
  development: {
    client: 'pg',
    connection:
      'postgresql://postgres:123123@localhost:5432/do-an-csn-mang',
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds')
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds')
    },
    pool: {
      min: parseInt(process.env.DB_POOL_MIN),
      max: parseInt(process.env.DB_POOL_MAX)
    }
  }
};
