import * as Joi from 'joi';
import * as dotenv from 'dotenv';

process.env.ENV_PATH
  ? dotenv.config({ path: process.env.ENV_PATH })
  : dotenv.config();

const envSchema = Joi.object({
  PORT: Joi.number().required(),
  NODE_ENV: Joi.string().valid('dev', 'staging', 'production').required(),
  DB_URL: Joi.string().required(),
})
  .unknown()
  .required();

const { error, value: envVars } = envSchema.validate(process.env);

if (error) {
  throw new Error(`ENV Configuration error: \n${error.message}`);
}

export const config = {
  IS_DEVELOPMENT:
    envVars.NODE_ENV === 'dev' || envVars.NODE_ENV === 'staging' ? true : false,
  IS_LOCALHOST: envVars.NODE_ENV === 'dev' ? true : false,
  PORT: envVars.PORT,
  NODE_ENV: envVars.NODE_ENV,

  // DB URL
  DB_URL: envVars.DB_URL,

  // Rabbit MQ Env
  RABBITMQ_URL: envVars.RABBITMQ_URL,

  RABBITMQ_USER_CLIENT: envVars.RABBITMQ_USER_CLIENT,
  RABBITMQ_USER_QUEUE: envVars.RABBITMQ_USER_QUEUE,

  RABBITMQ_ACCOUNT_CLIENT: envVars.RABBITMQ_ACCOUNT_CLIENT,
  RABBITMQ_ACCOUNT_QUEUE: envVars.RABBITMQ_ACCOUNT_QUEUE,

  RABBITMQ_MARKETPLACE_CLIENT: envVars.RABBITMQ_MARKETPLACE_CLIENT,
  RABBITMQ_MARKETPLACE_QUEUE: envVars.RABBITMQ_MARKETPLACE_QUEUE,

  RABBITMQ_CHAT_CLIENT: envVars.RABBITMQ_CHAT_CLIENT,
  RABBITMQ_CHAT_QUEUE: envVars.RABBITMQ_CHAT_QUEUE,

  RABBITMQ_NOTIFICATION_CLIENT: envVars.RABBITMQ_NOTIFICATION_CLIENT,
  RABBITMQ_NOTIFICATION_QUEUE: envVars.RABBITMQ_NOTIFICATION_QUEUE,

  // Mail ENVs
  MAIL_SMTP_HOST: envVars.MAIL_SMTP_HOST,
  MAIL_SMTP_PORT: envVars.MAIL_SMTP_PORT,
  MAIL_USERNAME: envVars.MAIL_USERNAME,
  MAIL_PASSWORD: envVars.MAIL_PASSWORD,
  MAIL_FROM: envVars.MAIL_FROM,

  // SMS ENVs
  TWILIO_SENDER_PHONE_NUMBER: envVars.TWILIO_SENDER_PHONE_NUMBER,
  TWILIO_ACCOUNT_SID: envVars.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: envVars.TWILIO_AUTH_TOKEN,
  TWILIO_PHONE_SMS_VERIFICATION_SERVICE_SID:
    envVars.TWILIO_PHONE_SMS_VERIFICATION_SERVICE_SID,
};
