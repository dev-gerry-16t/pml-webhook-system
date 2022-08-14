import GLOBAL_CONSTANTS from "../constants/constants.js";

const exchangeWhatsApp = GLOBAL_CONSTANTS.EXCHANGE_WHATSAPP;
const routingKeyWhatsApp = GLOBAL_CONSTANTS.ROUTING_KEY_WHATSAPP;

const exchangeMetaMap = GLOBAL_CONSTANTS.EXCHANGE_METAMAP;
const routingKeyMetaMap = GLOBAL_CONSTANTS.ROUTING_KEY_METAMAP;

const configExchange = {
  type: "direct",
  assert: true,
};

const jsonConfig = {
  vhosts: {
    "/": {
      connection: {
        protocol: GLOBAL_CONSTANTS.PROTOCOL_AMQP,
        hostname: GLOBAL_CONSTANTS.HOST_AMQP,
        user: GLOBAL_CONSTANTS.USERNAME_AMQP,
        password: GLOBAL_CONSTANTS.PASSWORD_AMQP,
        port: GLOBAL_CONSTANTS.PORT_AMQP,
        options: {
          heartbeat: 10,
          connection_timeout: 10000,
        },
        retry: {
          min: 1000,
          max: 60000,
          strategy: "linear",
        },
      },
      exchanges: {
        [exchangeWhatsApp]: configExchange,
        [exchangeMetaMap]: configExchange,
      },
      publications: {
        toWhatsApp: {
          exchange: exchangeWhatsApp,
          routingKey: routingKeyWhatsApp,
        },
        toMetaMap: {
          exchange: exchangeMetaMap,
          routingKey: routingKeyMetaMap,
        },
      },
    },
  },
};

export default jsonConfig;
