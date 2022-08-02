const GLOBAL_CONSTANTS = {
  VERSION: "v0.0.1",
  PORT: process.env.PORT,
  DATABASE_LOGS: process.env.DATABASE_LOGS,
  LOG_DOCUMENT_WARNING: process.env.LOG_DOCUMENT_WARNING,
  LOG_DOCUMENT_ERROR: process.env.LOG_DOCUMENT_ERROR,
  PROTOCOL_AMQP: process.env.PROTOCOL_AMQP,
  USERNAME_AMQP: process.env.USERNAME_AMQP,
  PASSWORD_AMQP: process.env.PASSWORD_AMQP,
  PORT_AMQP: process.env.PORT_AMQP,
  HOST_AMQP: process.env.HOST_AMQP,
  EXCHANGE_WHATSAPP: process.env.EXCHANGE_WHATSAPP,
  EXCHANGE_MANDRILL: process.env.EXCHANGE_MANDRILL,
  EXCHANGE_METAMAP: process.env.EXCHANGE_METAMAP,
  ROUTING_KEY_WHATSAPP: process.env.ROUTING_KEY_WHATSAPP,
  ROUTING_KEY_MANDRILL: process.env.ROUTING_KEY_MANDRILL,
  ROUTING_KEY_METAMAP: process.env.ROUTING_KEY_METAMAP,
  MATI_WEBHOOK_SECRET: process.env.MATI_WEBHOOK_SECRET,
  VERIFY_TOKEN_WHATSAPP: process.env.VERIFY_TOKEN_WHATSAPP,
};

export default GLOBAL_CONSTANTS;
