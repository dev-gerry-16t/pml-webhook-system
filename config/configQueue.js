import GLOBAL_CONSTANTS from "../constants/constants.js";

const exchangeWhatsApp = GLOBAL_CONSTANTS.EXCHANGE_WHATSAPP;
const routingKeyWhatsApp = GLOBAL_CONSTANTS.ROUTING_KEY_WHATSAPP;
const queueNameWhatsApp = GLOBAL_CONSTANTS.QUEUE_NAME_WHATSAPP;

const exchangeMetaMap = GLOBAL_CONSTANTS.EXCHANGE_METAMAP;
const routingKeyMetaMap = GLOBAL_CONSTANTS.ROUTING_KEY_METAMAP;
const queueNameMetaMap = GLOBAL_CONSTANTS.QUEUE_NAME_METAMAP;

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
      queues: {
        [queueNameWhatsApp]: {},
        [queueNameMetaMap]: {},
      },
      exchanges: {
        [exchangeWhatsApp]: {
          type: "direct",
        },
        [exchangeMetaMap]: {
          type: "direct",
        },
      },
      bindings: {
        bindingWhatsApp: {
          source: exchangeWhatsApp,
          destination: queueNameWhatsApp,
          destinationType: "queue",
          bindingKey: routingKeyWhatsApp,
        },
        bindingMetaMap: {
          source: exchangeMetaMap,
          destination: queueNameMetaMap,
          destinationType: "queue",
          bindingKey: routingKeyMetaMap,
        },
      },
      publications: {
        toWhatsApp: {
          vhost: "/",
          exchange: exchangeWhatsApp,
          routingKey: routingKeyWhatsApp,
        },
        toMetaMap: {
          vhost: "/",
          exchange: exchangeMetaMap,
          routingKey: routingKeyMetaMap,
        },
      },
    },
  },
};

export default jsonConfig;
