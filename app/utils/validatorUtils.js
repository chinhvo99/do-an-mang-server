'use strict';

const Joi = require('@hapi/joi');

function strSlug() {
  return Joi.string()
    .min(3)
    .regex(/^[A-Z]+(?:-[A-Z0-9]+)*$/);
}

function strAddressSlug() {
  return Joi.string()
    .regex(/^[a-z1-9]+(?:-[a-z0-9]+)*$/)
    .min(1);
}

function strAddressCode() {
  return Joi.string().min(1);
}

function strAddressType() {
  return Joi.string()
    .min(3)
    .regex(/^[A-Z_]*$/);
}

function strHexColor() {
  return Joi.string().regex(/^#[A-Fa-f0-9]{6}/);
}

function strIconName() {
  return Joi.string().regex(/^[a-z1-9]+(?:-[a-z0-9]+)*$/);
}

function strEmail() {
  return Joi.string().email().lowercase({ force: true });
}

function strPhoneNumber() {
  return Joi.string().min(8);
}

function strUsername() {
  return Joi.string()
    .min(3)
    .max(100)
    .alphanum();
}

function strPassword() {
  return Joi.string().min(6).max(32);
}

function strGender() {
  return Joi.string().valid(['Male', 'Female', 'Others']);
}

function strLanguage() {
  return Joi.string().valid(['en', 'vi']);
}

function objectIcon() {
  return Joi.object({
    size: Joi.number()
      .integer()
      .min(8)
      .required(),
    name: strIconName(),
    backgroundColor: strHexColor().required()
  });
}

function objectLocalization() {
  return Joi.object({
    en: Joi.string().required(),
    vi: Joi.string().required()
  });
}

function objectLocalizationWithSteps() {
  return Joi.object({
    order: Joi.number()
      .integer()
      .min(1)
      .required(),
    en: Joi.string().required(),
    vi: Joi.string().required()
  });
}

function objectGeoLocation() {
  return Joi.object().keys({
    1: Joi.object({
      latitude: Joi.number()
        .min(-90)
        .max(90)
        .required(),
      longitude: Joi.number()
        .min(-180)
        .max(180)
        .required()
    }),
    2: Joi.object({
      latitude: Joi.number()
        .min(-90)
        .max(90)
        .required(),
      longitude: Joi.number()
        .min(-180)
        .max(180)
        .required()
    })
  });
}

function strCaseStatusSlug() {
  return Joi.string().valid(['OPEN', 'CANCELLED', 'IN-PROGRESS', 'RESOLVED']);
}

function ratingValue() {
  return Joi.number()
    .integer()
    .min(1)
    .max(5);
}

function idNumber() {
  return Joi.number()
    .integer()
    .min(0);
}

const queryParams = {
  limit: Joi.number()
    .min(1)
    .max(100)
    .default(10),
  offset: Joi.number().default(0),
  orderBy: Joi.string(),
  filter: Joi.object(),
  fields: Joi.array()
};

const searchParams = {
  limit: Joi.number()
    .min(1)
    .max(100)
    .default(10),
  offset: Joi.number().default(0),
  orderBy: Joi.string(),
  filter: Joi.object(),
  fields: Joi.array(),
  q: Joi.string()
};

const checkToken = Joi.object({
  Authorization: Joi.string()
}).options({ allowUnknown: true });

module.exports = {
  strSlug,
  strAddressSlug,
  strAddressCode,
  strAddressType,
  strHexColor,
  strIconName,
  strPhoneNumber,
  strUsername,
  strPassword,
  strGender,
  strLanguage,
  strEmail,
  strCaseStatusSlug,
  objectIcon,
  objectLocalization,
  objectLocalizationWithSteps,
  objectGeoLocation,
  ratingValue,
  idNumber,
  queryParams,
  searchParams,
  checkToken
};
