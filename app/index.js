'use strict';
require('dotenv').config();
const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const Bell = require('@hapi/bell');
const HapiSwagger = require('hapi-swagger');
const hapiAuthJWT = require('hapi-auth-jwt2');
const cronPlugin = require('./plugins/node-cron');
const routes = require('./main/routes');

// create new server instance
const server = new Hapi.Server({
  host: process.env.APP_HOST || 'localhost',
  port: process.env.PORT || 3000,
  routes: {
    cors: {
      origin: ['*'], // an array of origins or 'ignore'
      headers: ['Authorization', 'Content-Type'], // an array of strings - 'Access-Control-Allow-Headers'
      credentials: true
    },
    validate: {
      failAction: async (request, h, err) => {
        if (process.env.NODE_ENV === 'production') {
          // In prod, log a limited error message and throw the default Bad Request error.
          throw err;
        } else {
          // During development, log and respond with the full error.
          console.error(err);
          throw err;
        }
      }
    }
  }
});

//Create server socket
const validateUser = (decoded, request) => {
  // This is a simple check that the `sub` claim
  // exists in the access token. Modify it to suit
  // the needs of your application
  if (decoded && decoded.id) {
    return {
      isValid: true
    };
  }
  return {
    isValid: false
  };
};

const apiVersionOptions = {
  basePath: '/api',
  validVersions: [1, 2],
  defaultVersion: 1,
  vendorName: 'api'
};

const swaggerOptions = {
  pathPrefixSize: 3,
  host: process.env.HOST,
  basePath: apiVersionOptions.basePath,
  info: {
    title: 'Proxibox API Documentation',
    description:
      'This is a Proxibox API documentation.' +
      '\n' +
      '###Basic api query use for getAll resources. Only support normal query if need complex or advanced use cases(fulltextsearch, geolocation...) contact server developers to support more.' +
      '\n' +
      '###$ Paginate with limit and offset. \nEx: ?limit=5&offset=5\n' +
      '###$ Order by fields and order reverse use prefix "-". \n Ex: ?orderBy=age,-name' +
      '\n' +
      '###$ Include other relate models(rare case caution on use). \nEx: users?includes=books (user has many books)' +
      '\n' +
      '###$ Select field on query (Only use in single models). \nEx: ?fields=age,name' +
      '\n' +
      '###$ Filter equal \n?filter={"name": "Hoang"}' +
      '\n' +
      '###$ Filter less than \n?filter={"age": {"$lt": 40}}' +
      '\n' +
      '###$ Filter greater than \n?filter={"age": {"$gt": 20}}' +
      '\n' +
      '###$ Filter less than and equal \n?filter={"age": {"$lte": 40}}' +
      '\n' +
      '###$ Filter greater than equal \n?filter={"age": {"$gte": 20}}' +
      '\n' +
      '###$ Filter field in many choice \n?filter={"name": {"$in": ["Alex", "Julia"]}}' +
      '\n' +
      '###$ Filter array field is subset of parent array \n?filter={"tags": {"$all": ["Vip", "Rich"]}}' +
      '\n' +
      '###$ Filter field by text \n?filter={"name": {"$like": "%oan%"}}'
  },
  deReference: false,
  securityDefinitions: {
    jwt: {
      type: 'Add Authorization Token here',
      name: 'Authorization',
      in: 'header'
    }
  },
  expanded: 'none',
  security: [{ jwt: [] }]
};

async function start() {
  // start your server
  const plugins = [
    Inert,
    Vision,
    {
      plugin: require('./plugins/logger'),
      options: {
        name: 'proxibox-pharma-api',
        prettyPrint: process.env.NODE_ENV !== 'production',
        redact: ['req.headers.authorization']
      }
    },
    hapiAuthJWT,
    Bell
  ];
  if (!process.env.SWAGGER_DISABLED) {
    console.log('SWAGGER OPTIONS');
    plugins.push({
      plugin: HapiSwagger,
      options: swaggerOptions
    });
  }
  try {
    await server.register(plugins);
    server.auth.strategy('jwt', 'jwt', {
      key: process.env.JWT_SECRET || 'enouvo123',
      validate: validateUser,
      verifyOptions: {
        ignoreExpiration: true
      }
    });
    server.auth.default('jwt');
    server.route(routes);
    await server.start();
  } catch (err) {
    process.exit(1);
  }

  console.log('Server running at: ', server.info.uri);
}

start();

module.exports = server;
