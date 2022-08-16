import Joi = require('joi');
export default Joi.object({
  NODE_ENV: Joi.string().valid('dev', 'stag', 'prod').default('dev'),

  HTTP_PORT: Joi.number().required(),
  JWT_SECRET_KEY: Joi.string().required(),
  JWT_TIME_EXPIRES_SECONDS: Joi.string().required(),

  MONGODB_URI: Joi.string().required(),
  MONGODB_USER: Joi.string().required(),
  MONGODB_PASSWORD: Joi.string().required(),
  MONGODB_NAME: Joi.string().required(),
  RANDOM_URL_API: Joi.string().required(),
});
