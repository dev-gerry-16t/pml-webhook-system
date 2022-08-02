import amqp from "amqplib";
import GLOBAL_CONSTANTS from "../constants/constants.js";

async function connectPublish() {
  try {
    const connection = await amqp.connect({
      protocol: GLOBAL_CONSTANTS.PROTOCOL_AMQP,
      username: GLOBAL_CONSTANTS.USERNAME_AMQP,
      password: GLOBAL_CONSTANTS.PASSWORD_AMQP,
      hostname: GLOBAL_CONSTANTS.HOST_AMQP,
      port: GLOBAL_CONSTANTS.PORT_AMQP,
    }); //GLOBAL_CONSTANTS.HOST_AMQP);
    const channel = await connection.createChannel();
    return channel;
  } catch (error) {
    throw error;
  }
}

export default connectPublish;
