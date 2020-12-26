'use strict';

exports.up = function (knex, Promise) {
  return knex.schema.createTable('transaction', (table) => {
    table.increments('id').primary();
    table.integer('type');
    table.integer('categoryId');
    table
      .foreign('categoryId')
      .references('category.id')
      .onDelete('CASCADE');
    table.integer('userId');
    table
      .foreign('userId')
      .references('users.id')
      .onDelete('CASCADE');
    table.decimal('amount', 13, 0).defaultTo(0);
    table.string('description');
    table.string('image');
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
    table.timestamp('deletedAt').defaultTo(null);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.raw('DROP TABLE transaction CASCADE');
};
