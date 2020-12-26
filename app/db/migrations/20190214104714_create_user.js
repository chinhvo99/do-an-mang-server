'use strict';

exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('avatar');
    table.string('fullName');
    table.string('email', 191).unique();
    table.string('password');
    table.decimal('moneyAmount', 13, 0).defaultTo(0);
    table.integer('roleId');
    table
      .foreign('roleId')
      .references('role.id')
      .onDelete('CASCADE');
    table.boolean('emailVerified').defaultTo(false);
    table.boolean('isDisabled').defaultTo(false);
    table.string('resetPasswordToken');
    table.timestamp('resetPasswordExpire');
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
    table.timestamp('deletedAt').defaultTo(null);
  });
};

exports.down = function (knex) {
  return knex.schema.raw('DROP TABLE users CASCADE');
};
