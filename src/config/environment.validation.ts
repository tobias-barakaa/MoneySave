import * as Joi from 'joi';

export default Joi.object({
    NODE_ENV: Joi.string()
        .valid('development', 'production', 'test').default('development'),
    PORT: Joi.number().default(3000),
    DATABASE_URL: Joi.string().uri().required(),
    // JWT_SECRET: Joi.string().min(10).required(),
    // JWT_EXPIRATION: Joi.string().default('1h'),
    // JWT_REFRESH_SECRET: Joi.string().min(10).required(),
    // JWT_REFRESH_EXPIRATION: Joi.string().default('7d'),
    // REDIS_URL: Joi.string().uri().required(),
    // REDIS_PORT: Joi.number().default(6379),
    // REDIS_PASSWORD: Joi.string().optional().allow(''),
    // LOG_LEVEL: Joi.string()
})