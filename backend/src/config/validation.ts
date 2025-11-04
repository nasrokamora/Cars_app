import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  JWT_SECRET: Joi.string().required().messages({
    'any.required': 'jwt secret must be provided',
  }),
  JWT_EXPIRES_IN: Joi.alternatives()
    .try(Joi.string(), Joi.number())
    .default('15m')
    .messages({
      'any.only': 'jwt expiration time must be provided',
    }),

  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
});
