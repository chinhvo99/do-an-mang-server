'use strict';

const Boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const crypto = require('crypto');
const Models = require('../../db/models');
const jwt = require('../../services/jwt');
const PasswordUtils = require('../../services/password');
const MailUtils = require('../../emailService');

const mainWebUrl = process.env.WEB_URL || 'https://enouvo-tcrm-api-staging.enouvo.com/';

class AuthService {
  async login(body) {
    try {
      const { email } = body;
      const user = await Models.User.query()
        .findOne({
          email
        })
        .leftJoin('role', 'users.roleId', 'role.id')
        .select([
          'users.*',
          'role.name as scope'
        ]);
      if (!user) {
        throw Boom.notFound('This account is not exist');
      }
      const isCorrectPassword = await PasswordUtils.compare(
        body.password,
        user.password
      );
      if (!isCorrectPassword) {
        throw Boom.unauthorized('Incorrect email or password');
      }

      const data = _.pick(user, ['email', 'id', 'scope']);
      // MailUtils.sendEmailResetPasswordMobile(
      //   user.email,
      //   'https://open.spotify.com'
      // );
      return _.assign(
        {
          token: jwt.issue(data)
        },
        data
      );
    } catch (err) {
      throw err;
    }
  }

  async register(payload) {
    try {
      const { email } = payload;
      const checkUserByEmail = await Models.User.query().findOne({
        email
      });
      if (checkUserByEmail) {
        throw Boom.badRequest('Email is existing');
      }
      const hashPassword = await PasswordUtils.hash(payload.password);

      payload.password = hashPassword;
      const findRole = await Models.Role.query().findOne({
        name: 'user'
      });
      payload.roleId = findRole.id;

      let data = await Models.User.query()
        .insert(payload)
        .returning('*');
      data.scope = findRole.name;
      data = _.pick(data, ['email', 'id', 'scope']);
      return _.assign(
        {
          token: jwt.issue(data)
        },
        data
      );
    } catch (err) {
      throw err;
    }
  }

  async resetPassword(token, password) {
    const user = await Models.User.query()
      .where('resetPasswordToken', token)
      .where('resetPasswordExpire', '>', new Date().toISOString())
      .first();
    if (!user) {
      throw Boom.conflict('Your password token is incorrect ore expired');
    }
    const newHashPassword = await bcrypt.hash(password, 5);
    await Models.User.query().patchAndFetchById(user.id, {
      resetPasswordToken: null,
      resetPasswordExpire: null,
      password: newHashPassword
    });
    return {
      message: 'Your password has been reset'
    };
  }

  async forgotPassword(email) {
    const user = await Models.User.query()
      .findOne({
        email
      })
      .innerJoin('role')
      .select([
        'users.*',
        'users.password as hashPassword',
        'role.name as scope'
      ]);
    if (!user) {
      throw Boom.notFound('Email is not found');
    }
    // Generate random token.
    const resetPasswordToken = crypto.randomBytes(64).toString('hex');
    const resetPasswordExpire = new Date();
    resetPasswordExpire.setDate(resetPasswordExpire.getDate() + 1);
    await Models.User.query().patchAndFetchById(user.id, {
      resetPasswordToken,
      resetPasswordExpire: resetPasswordExpire.toISOString() // Token will expire in 24 hours
    });
    MailUtils.sendEmailResetPassword(
      user.email,
      `${mainWebUrl}reset-password?token=${resetPasswordToken}`
    );
    return {
      message: 'Your reset password request has been confirmed'
    };
  }
}

module.exports = AuthService;
