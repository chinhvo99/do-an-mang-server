<div align="center">

- Use pg and knex for database setup and objectionjs for orm (https://knexjs.org/, https://vincit.github.io/objection.js/)
- Use joi for validation (https://github.com/hapijs/joi)
- Log rotation and log management using [Bunyan](https://github.com/trentm/node-bunyan)
- A super small and optimized [Docker](https://www.docker.com/) image based on Alpine image
- [Swagger](https://swagger.io/) API documentation based on JSDoc
- Continuous integration and delivery using [CircleCI](https://circleci.com/)
- Unit Test and Integration Test along with Test Coverage using [Jest](https://facebook.github.io/jest/) testing framework

---

## Getting Started

```zsh
$ yarn
$ yarn start
```

## Commands

### Run

```zsh
# Setup postgresdb
# Run normally
$ yarn start
# Run the application with nodemon for development
$ yarn dev
$ Run migration knex migrate:latest
$ Run seed knex seed:run

# Run migration-up
$ npm run knex migrate:latest

# Run migration-down
$ npm run knex migrate:rollback

# Create a named migration or seed file
$ npm run knex migrate:make <name>
$ npm run knex seed:make <make>

# Run seed files
$ npm run knex seed:run
```

$Use docker docker-compose build and docker-compose up

### Test

```zsh
# Test
$ yarn test                           # Run all test
$ yarn test:unit                      # Run only unit test
$ yarn test:integration               # Run only integration test
# Test (Watch Mode for development)
$ yarn test:watch                     # Run all test with watch mode
$ yarn test:watch:unit                # Run only unit test with watch mode
$ yarn test:watch:integration         # Run only integration test with watch mode
# Test Coverage
$ yarn test:coverage                  # Calculate the coverage of all test
$ yarn test:coverage:unit             # Calculate the coverage of unit test
$ yarn test:coverage:integration      # Calculate the coverage of integration test
# Test consistent coding style (Lint)
$ yarn lint                           # Lint all sourcecode
$ yarn lint:app                       # Lint app sourcecode
$ yarn lint:test                      # Lint test sourcecode
```

### Archive

```zsh
$ yarn pack
```

###Basic api query use for getAll resources. Only support normal query if need complex or advanced use cases(fulltextsearch, geolocation...) contact server developers to support more.
$ Paginate with limit and offset. Ex: ?limit=5&offset=5
$ Order by fields and order reverse use prefix "-". Ex: ?orderBy=age,-name
$ Include other relate models(rare case caution on use). Ex: users?includes=books (user has many books)
$ Select field on query (Only use in single models). Ex: ?fields=age,name
$ Filter equal ?filter={"name": "Hoang"}
$ Filter less than ?filter={"age": {"$lt": 40}}
$ Filter greater than ?filter={"age": {"$gt": 20}}
$ Filter less than and equal ?filter={"age": {"$lte": 40}}
$ Filter greater than equal ?filter={"age": {"$gte": 20}}
$ Filter field in many choice ?filter={"name": {"$in": ["Hoang", "MMMM"]}}
$ Filter array field is subset of parent array ?filter={"tags": {"$all": ["JAV", "Lesbian"]}}
