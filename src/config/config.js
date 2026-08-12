import dotenv from "dotenv";
import Joi from "joi";

dotenv.config();

const envVarsSchema = Joi.object({
  PORT: Joi.number().default(3000),

  MONGODB_URL: Joi.string().required(),

  JWT_SECRET: Joi.string().required(),

  JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30),

  JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30),
}).unknown();

const { value: envVars, error } =
  envVarsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  port: envVars.PORT,

  mongoose: {
    url: envVars.MONGODB_URL,
  },

  jwt: {
    secret: envVars.JWT_SECRET,

    accessExpirationMinutes:
      envVars.JWT_ACCESS_EXPIRATION_MINUTES,

    refreshExpirationDays:
      envVars.JWT_REFRESH_EXPIRATION_DAYS,
  },
};

export default config;