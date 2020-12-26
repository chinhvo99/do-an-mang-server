'use strict';

exports.up = function (knex, Promise) {
  return knex.schema.createTable('category', (table) => {
    table.increments('id').primary();
    table.string('name');
    table.integer('type');
    table.string('description');
    table.string('image');
    table.boolean('isActive').defaultTo(true);
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
    table.timestamp('deletedAt').defaultTo(null);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.raw('DROP TABLE category CASCADE');
};
