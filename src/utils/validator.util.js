const Joi = require('joi');
const { ParamsError } = require('./response.util');
const parseStringJoi = Joi.extend(
  {
    type: 'object',
    base: Joi.object(),
    messages: {
      'object.base': '{{#label}} must be string of json object',
    },
    coerce: {
      from: 'string',
      method(value, helpers) {
        try {
          if (value[0] !== '{' && !/^\s*\{/.test(value)) {
            return { errors: [helpers.error('object.base')] };
          }

          return { value: JSON.parse(value) };
        } catch (err) {
          return { errors: [helpers.error('object.base')] };
        }
      },
    },
  },
  {
    type: 'array',
    base: Joi.array(),
    messages: {
      'array.base': '{{#label}} must be string of json array',
    },
    coerce: {
      from: 'string',
      method(value, helpers) {
        if (
          typeof value !== 'string' ||
          (value[0] !== '[' && !/^\s*\[/.test(value))
        ) {
          return { value, errors: [helpers.error('array.base')] };
        }
        try {
          return { value: JSON.parse(value) };
        } catch (err) {
          return { value, errors: [helpers.error('array.base')] };
        }
      },
    },
  }
);

module.exports.validate = (target, schema, isArray = false) => {
  const validation = isArray
    ? Joi.array().items(Joi.object(schema)).validate(target)
    : Joi.object(schema).validate(target);
  if (validation.error) {
    throw new ParamsError(validation.error.details[0].message);
  }
  return validation;
};

module.exports.schema = {
  timestamp: () => Joi.date().timestamp(),
  arrayNumber: () => Joi.array().items(Joi.number()),
  object: () => parseStringJoi.object(),
  array: () => parseStringJoi.array(),
  boolean: () => Joi.boolean(),
  string: () => Joi.string(),
  number: () => Joi.number().min(0).max(999999999),
  integer: () => Joi.number().integer(),
  email: () => Joi.string().email(),
  isoString: () => Joi.date().iso(),
  genderStatus: () => Joi.string().valid('UNKNOWN', 'MALE', 'FEMALE'),
  objects: () => Joi.alternatives().try(Joi.object(), Joi.array()),
  alternatives: () => Joi.alternatives(),
};
