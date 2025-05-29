import * as Joi from 'joi';

export default Joi.object({
    NODE_ENV: Joi.string()
        .valid('development', 'production', 'test').default('development'),
    PORT: Joi.number().default(3000),
    DATABASE_URL: Joi.string().uri().required(),
    JWWT_SECRET: Joi.string().min(10).required(),
    JWT_TOKEN_AUDIENCE: Joi.string().uri().required(),
    JWT_TOKEN_ISSUER: Joi.string().uri().required(),
    JWT_ACCESS_TOKEN_TTL: Joi.number().integer().min(60).default(3600), // Minimum 60 seconds
    // JWT_ACCESS_TOKEN: Joi.number().required()

})